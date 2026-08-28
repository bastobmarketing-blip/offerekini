/* ==========================================================================
   OfferKini — Client-side app logic (frontend-only prototype)
   Centralizes: toast notifications, mobile drawer, cart state (localStorage),
   cart drawer rendering, add-to-cart bindings. Keep pricing/business logic
   out of markup — this file plus the embedded __OK_CATALOG__ is the single
   source of truth on the client.
   ========================================================================== */
(function () {
  'use strict';

  var STORAGE_KEY = 'offerkini_cart_v1';

  // ---------------------------------------------------------------------
  // Toast
  // ---------------------------------------------------------------------
  function toast(message, type) {
    var root = document.getElementById('toast-root');
    if (!root) return;
    var el = document.createElement('div');
    el.className = 'ok-toast ' + (type || '');
    var icon = type === 'success' ? 'fa-circle-check' : type === 'error' ? 'fa-circle-exclamation' : 'fa-circle-info';
    el.innerHTML = '<i class="fas ' + icon + '"></i><span>' + message + '</span>';
    root.appendChild(el);
    setTimeout(function () {
      el.classList.add('hide');
      setTimeout(function () { el.remove(); }, 220);
    }, 2600);
  }

  // ---------------------------------------------------------------------
  // Cart state (localStorage). Structure: [{ productId, variantId, quantity }]
  // ---------------------------------------------------------------------
  function getCart() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function saveCart(cart) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    renderCartBadge();
  }

  function findCatalogItem(productId) {
    var catalog = window.__OK_CATALOG__ || [];
    for (var i = 0; i < catalog.length; i++) {
      if (catalog[i].id === productId) return catalog[i];
    }
    return null;
  }

  function addToCart(productId, quantity, variantId, variantLabel) {
    var cart = getCart();
    quantity = quantity || 1;
    var existing = cart.find(function (c) {
      return c.productId === productId && c.variantId === (variantId || null);
    });
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({ productId: productId, variantId: variantId || null, variantLabel: variantLabel || null, quantity: quantity });
    }
    saveCart(cart);
    toast('কার্টে যুক্ত করা হয়েছে', 'success');
    renderCartDrawer();
  }

  function updateQuantity(productId, variantId, quantity) {
    var cart = getCart();
    var item = cart.find(function (c) { return c.productId === productId && c.variantId === (variantId || null); });
    if (!item) return;
    if (quantity <= 0) {
      cart = cart.filter(function (c) { return c !== item; });
    } else {
      item.quantity = quantity;
    }
    saveCart(cart);
    renderCartDrawer();
  }

  function removeFromCart(productId, variantId) {
    var cart = getCart().filter(function (c) { return !(c.productId === productId && c.variantId === (variantId || null)); });
    saveCart(cart);
    renderCartDrawer();
    toast('কার্ট থেকে সরানো হয়েছে');
  }

  function clearCart() {
    saveCart([]);
    renderCartDrawer();
  }

  function cartTotals() {
    var cart = getCart();
    var productTotal = 0;
    var deliveryTotal = 0;
    var seenDelivery = false;
    var maxDelivery = 0;
    cart.forEach(function (item) {
      var product = findCatalogItem(item.productId);
      if (!product) return;
      productTotal += product.price * item.quantity;
      // Delivery charge is a flat advance per order in this prototype —
      // we take the max delivery charge among cart items (simplification
      // for a single-merchant-style checkout demo).
      if (product.deliveryCharge > maxDelivery) maxDelivery = product.deliveryCharge;
      seenDelivery = true;
    });
    deliveryTotal = seenDelivery ? maxDelivery : 0;
    return {
      productTotal: productTotal,
      deliveryCharge: deliveryTotal,
      dueOnDelivery: productTotal,
      payNow: deliveryTotal,
      grandTotal: productTotal + deliveryTotal,
      itemCount: cart.reduce(function (sum, c) { return sum + c.quantity; }, 0)
    };
  }

  function formatBDT(n) {
    return '৳' + Math.round(n).toLocaleString('en-US');
  }

  // ---------------------------------------------------------------------
  // Render cart badge (header + mobile nav + bottom nav)
  // ---------------------------------------------------------------------
  function renderCartBadge() {
    var totals = cartTotals();
    var count = totals.itemCount;
    ['cart-count', 'mobile-cart-count'].forEach(function (id) {
      var el = document.getElementById(id);
      if (!el) return;
      if (count > 0) {
        el.textContent = count > 99 ? '99+' : String(count);
        el.classList.remove('hidden');
      } else {
        el.classList.add('hidden');
      }
    });
  }

  // ---------------------------------------------------------------------
  // Render cart drawer contents
  // ---------------------------------------------------------------------
  function renderCartDrawer() {
    var body = document.getElementById('cart-drawer-body');
    var footer = document.getElementById('cart-drawer-footer');
    if (!body) return;
    var cart = getCart();

    if (cart.length === 0) {
      body.innerHTML =
        '<div class="flex flex-col items-center justify-center h-full text-center py-16 gap-3">' +
        '<i class="fas fa-cart-shopping text-4xl text-ok-gray-300"></i>' +
        '<p class="text-ok-gray-500 font-medium">আপনার কার্ট খালি</p>' +
        '<a href="/products" class="text-ok-green-800 font-semibold text-sm underline">পণ্য দেখুন</a>' +
        '</div>';
      if (footer) footer.classList.add('hidden');
      return;
    }

    var html = '';
    cart.forEach(function (item) {
      var p = findCatalogItem(item.productId);
      if (!p) return;
      html +=
        '<div class="flex gap-3 border-b border-gray-100 pb-3">' +
        '<a href="/product/' + p.slug + '" class="w-16 h-16 rounded-lg overflow-hidden bg-gray-50 shrink-0"><img src="' + p.image + '" class="w-full h-full object-cover"/></a>' +
        '<div class="flex-1 min-w-0">' +
        '<a href="/product/' + p.slug + '" class="text-sm font-semibold line-clamp-2 leading-snug">' + p.name + '</a>' +
        (item.variantLabel ? '<p class="text-xs text-ok-gray-500 mt-0.5">' + item.variantLabel + '</p>' : '') +
        '<div class="flex items-center justify-between mt-2">' +
        '<div class="flex items-center border border-gray-200 rounded-lg">' +
        '<button data-qty-btn="dec" data-pid="' + item.productId + '" data-vid="' + (item.variantId || '') + '" class="w-7 h-7 flex items-center justify-center text-ok-charcoal hover:bg-gray-50">−</button>' +
        '<span class="w-8 text-center text-sm font-semibold">' + item.quantity + '</span>' +
        '<button data-qty-btn="inc" data-pid="' + item.productId + '" data-vid="' + (item.variantId || '') + '" class="w-7 h-7 flex items-center justify-center text-ok-charcoal hover:bg-gray-50">+</button>' +
        '</div>' +
        '<span class="font-bold text-ok-green-800 text-sm">' + formatBDT(p.price * item.quantity) + '</span>' +
        '</div>' +
        '</div>' +
        '<button data-remove-btn data-pid="' + item.productId + '" data-vid="' + (item.variantId || '') + '" class="text-ok-gray-400 hover:text-ok-red self-start"><i class="fas fa-xmark"></i></button>' +
        '</div>';
    });
    body.innerHTML = html;

    var totals = cartTotals();
    var subtotalEl = document.getElementById('cart-drawer-subtotal');
    var deliveryEl = document.getElementById('cart-drawer-delivery');
    if (subtotalEl) subtotalEl.textContent = formatBDT(totals.productTotal);
    if (deliveryEl) deliveryEl.textContent = formatBDT(totals.deliveryCharge);
    if (footer) footer.classList.remove('hidden');

    // Bind qty buttons
    body.querySelectorAll('[data-qty-btn]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var pid = btn.getAttribute('data-pid');
        var vid = btn.getAttribute('data-vid') || null;
        var cart = getCart();
        var item = cart.find(function (c) { return c.productId === pid && c.variantId === vid; });
        if (!item) return;
        var delta = btn.getAttribute('data-qty-btn') === 'inc' ? 1 : -1;
        updateQuantity(pid, vid, item.quantity + delta);
      });
    });
    body.querySelectorAll('[data-remove-btn]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        removeFromCart(btn.getAttribute('data-pid'), btn.getAttribute('data-vid') || null);
      });
    });
  }

  function openCartDrawer() {
    renderCartDrawer();
    var overlay = document.getElementById('cart-drawer-overlay');
    var drawer = document.getElementById('cart-drawer');
    if (!overlay || !drawer) return;
    overlay.classList.remove('hidden');
    drawer.classList.remove('hidden');
    requestAnimationFrame(function () {
      overlay.classList.remove('opacity-0');
      drawer.classList.remove('translate-x-full');
    });
    document.body.style.overflow = 'hidden';
  }

  function closeCartDrawer() {
    var overlay = document.getElementById('cart-drawer-overlay');
    var drawer = document.getElementById('cart-drawer');
    if (!overlay || !drawer) return;
    overlay.classList.add('opacity-0');
    drawer.classList.add('translate-x-full');
    setTimeout(function () {
      overlay.classList.add('hidden');
      drawer.classList.add('hidden');
    }, 250);
    document.body.style.overflow = '';
  }

  // ---------------------------------------------------------------------
  // Mobile menu drawer
  // ---------------------------------------------------------------------
  function openMobileMenu() {
    var overlay = document.getElementById('mobile-menu-overlay');
    var menu = document.getElementById('mobile-menu');
    if (!overlay || !menu) return;
    overlay.classList.remove('hidden');
    menu.classList.remove('hidden');
    menu.classList.add('flex');
    document.body.style.overflow = 'hidden';
  }
  function closeMobileMenu() {
    var overlay = document.getElementById('mobile-menu-overlay');
    var menu = document.getElementById('mobile-menu');
    if (!overlay || !menu) return;
    overlay.classList.add('hidden');
    menu.classList.add('hidden');
    menu.classList.remove('flex');
    document.body.style.overflow = '';
  }

  // ---------------------------------------------------------------------
  // Init bindings on DOM ready
  // ---------------------------------------------------------------------
  function init() {
    renderCartBadge();

    var cartBtn = document.getElementById('cart-btn');
    var mobileCartBtn = document.getElementById('mobile-nav-cart-btn');
    if (cartBtn) cartBtn.addEventListener('click', openCartDrawer);
    if (mobileCartBtn) mobileCartBtn.addEventListener('click', openCartDrawer);

    var closeCartBtn = document.getElementById('cart-drawer-close');
    var cartOverlay = document.getElementById('cart-drawer-overlay');
    if (closeCartBtn) closeCartBtn.addEventListener('click', closeCartDrawer);
    if (cartOverlay) cartOverlay.addEventListener('click', closeCartDrawer);

    var menuBtn = document.getElementById('mobile-menu-btn');
    var menuClose = document.getElementById('mobile-menu-close');
    var menuOverlay = document.getElementById('mobile-menu-overlay');
    if (menuBtn) menuBtn.addEventListener('click', openMobileMenu);
    if (menuClose) menuClose.addEventListener('click', closeMobileMenu);
    if (menuOverlay) menuOverlay.addEventListener('click', closeMobileMenu);

    // Generic add-to-cart buttons: <button data-add-to-cart data-pid="p-1" data-qty-input="#qty-input">
    document.querySelectorAll('[data-add-to-cart]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var pid = btn.getAttribute('data-pid');
        var qtyInputSel = btn.getAttribute('data-qty-input');
        var qty = 1;
        if (qtyInputSel) {
          var qtyEl = document.querySelector(qtyInputSel);
          if (qtyEl) qty = parseInt(qtyEl.value, 10) || 1;
        }
        var variantId = null, variantLabel = null;
        var variantSel = document.querySelector('[data-selected-variant]');
        if (variantSel) {
          variantId = variantSel.getAttribute('data-selected-variant') || null;
          variantLabel = variantSel.getAttribute('data-selected-variant-label') || null;
        }
        addToCart(pid, qty, variantId, variantLabel);
      });
    });

    // "Buy now" style buttons go straight to checkout after adding
    document.querySelectorAll('[data-buy-now]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var pid = btn.getAttribute('data-pid');
        var qtyInputSel = btn.getAttribute('data-qty-input');
        var qty = 1;
        if (qtyInputSel) {
          var qtyEl = document.querySelector(qtyInputSel);
          if (qtyEl) qty = parseInt(qtyEl.value, 10) || 1;
        }
        var variantId = null, variantLabel = null;
        var variantSel = document.querySelector('[data-selected-variant]');
        if (variantSel) {
          variantId = variantSel.getAttribute('data-selected-variant') || null;
          variantLabel = variantSel.getAttribute('data-selected-variant-label') || null;
        }
        addToCart(pid, qty, variantId, variantLabel);
        window.location.href = '/checkout';
      });
    });

    // Qty stepper on product page: [data-qty-stepper] wraps input#pdp-qty
    document.querySelectorAll('[data-qty-stepper]').forEach(function (wrap) {
      var input = wrap.querySelector('input');
      var dec = wrap.querySelector('[data-step="dec"]');
      var inc = wrap.querySelector('[data-step="inc"]');
      var max = parseInt(input.getAttribute('max') || '99', 10);
      if (dec) dec.addEventListener('click', function () {
        var v = Math.max(1, (parseInt(input.value, 10) || 1) - 1);
        input.value = v;
      });
      if (inc) inc.addEventListener('click', function () {
        var v = Math.min(max, (parseInt(input.value, 10) || 1) + 1);
        input.value = v;
      });
    });

    // Variant selector buttons: [data-variant-btn][data-vid][data-vlabel]
    var variantHolder = document.querySelector('[data-selected-variant]');
    document.querySelectorAll('[data-variant-btn]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        document.querySelectorAll('[data-variant-btn]').forEach(function (b) {
          b.classList.remove('border-ok-green-800', 'bg-ok-green-50', 'text-ok-green-800');
          b.classList.add('border-gray-200');
        });
        btn.classList.add('border-ok-green-800', 'bg-ok-green-50', 'text-ok-green-800');
        btn.classList.remove('border-gray-200');
        if (variantHolder) {
          variantHolder.setAttribute('data-selected-variant', btn.getAttribute('data-vid') || '');
          variantHolder.setAttribute('data-selected-variant-label', btn.getAttribute('data-vlabel') || '');
        }
      });
    });

    initReviewProofManagers();
    initReviewProofViewers();
  }

  // ---------------------------------------------------------------------
  // YouTube facade embeds: click-to-play, no iframe/JS loaded until clicked
  // <div data-yt-facade data-video-id="..." data-video-title="...">
  // Delegated on document so it also works for items rendered later
  // (e.g. merchant review-proof manager adding a new video card).
  // ---------------------------------------------------------------------
  function playYtFacade(facade) {
    var videoId = facade.getAttribute('data-video-id');
    var title = facade.getAttribute('data-video-title') || '';
    var iframe = document.createElement('iframe');
    iframe.src = 'https://www.youtube.com/embed/' + videoId + '?autoplay=1&rel=0';
    iframe.title = title;
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
    iframe.setAttribute('allowfullscreen', 'true');
    iframe.style.position = 'absolute';
    iframe.style.top = '0';
    iframe.style.left = '0';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = '0';
    facade.innerHTML = '';
    facade.style.backgroundImage = 'none';
    facade.style.cursor = 'default';
    facade.removeAttribute('role');
    facade.removeAttribute('tabindex');
    facade.appendChild(iframe);
  }
  document.addEventListener('click', function (e) {
    var facade = e.target.closest ? e.target.closest('[data-yt-facade]') : null;
    if (facade) playYtFacade(facade);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    var facade = e.target.closest ? e.target.closest('[data-yt-facade]') : null;
    if (facade) {
      e.preventDefault();
      playYtFacade(facade);
    }
  });

  // ---------------------------------------------------------------------
  // Merchant/Admin: per-product customer-review proofs manager
  // (image or YouTube video cards). Stored in localStorage, keyed by
  // product id, layered on top of the seed data injected from the server
  // so merchants can add/delete items without a backend.
  // Storage shape: { [productId]: { added: ReviewProof[], removedIds: string[] } }
  // ---------------------------------------------------------------------
  var REVIEW_PROOFS_KEY = 'offerkini_review_proofs_v1';

  function getReviewProofsStore() {
    try {
      var raw = localStorage.getItem(REVIEW_PROOFS_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  }

  function saveReviewProofsStore(store) {
    localStorage.setItem(REVIEW_PROOFS_KEY, JSON.stringify(store));
  }

  function getEffectiveReviewProofs(productId, seedProofs) {
    var store = getReviewProofsStore();
    var entry = store[productId] || { added: [], removedIds: [] };
    var kept = seedProofs.filter(function (p) { return entry.removedIds.indexOf(p.id) === -1; });
    return kept.concat(entry.added);
  }

  function addReviewProof(productId, proof) {
    var store = getReviewProofsStore();
    if (!store[productId]) store[productId] = { added: [], removedIds: [] };
    store[productId].added.push(proof);
    saveReviewProofsStore(store);
  }

  function removeReviewProof(productId, proofId, isSeed) {
    var store = getReviewProofsStore();
    if (!store[productId]) store[productId] = { added: [], removedIds: [] };
    if (isSeed) {
      if (store[productId].removedIds.indexOf(proofId) === -1) {
        store[productId].removedIds.push(proofId);
      }
    } else {
      store[productId].added = store[productId].added.filter(function (p) { return p.id !== proofId; });
    }
    saveReviewProofsStore(store);
  }

  function reviewProofCardHtml(proof, productId, seedIds) {
    var isSeed = seedIds.indexOf(proof.id) !== -1;
    var thumb;
    if (proof.type === 'video') {
      var vid = proof.videoId || extractYouTubeIdClient(proof.url);
      thumb =
        '<div data-yt-facade data-video-id="' + vid + '" data-video-title="কাস্টমার রিভিউ ভিডিও" ' +
        'class="w-full aspect-square rounded-xl overflow-hidden bg-black cursor-pointer relative" ' +
        'style="background-image:url(\'https://i.ytimg.com/vi/' + proof.videoId + '/hqdefault.jpg\');background-size:cover;background-position:center;">' +
        '<span class="absolute inset-0 flex items-center justify-center bg-black/25"><i class="fas fa-play text-white text-xl"></i></span>' +
        '</div>';
    } else {
      thumb = '<img src="' + proof.url + '" class="w-full aspect-square object-cover rounded-xl" />';
    }
    return (
      '<div class="relative w-28 shrink-0" data-review-proof-card data-proof-id="' + proof.id + '" data-is-seed="' + (isSeed ? '1' : '0') + '">' +
      thumb +
      '<button type="button" data-remove-review-proof class="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white shadow border border-gray-200 text-ok-red flex items-center justify-center hover:bg-ok-red hover:text-white transition-colors"><i class="fas fa-xmark text-xs"></i></button>' +
      '</div>'
    );
  }

  function renderReviewProofManager(container) {
    var productId = container.getAttribute('data-product-id');
    var seedProofs = JSON.parse(container.getAttribute('data-seed-proofs') || '[]');
    var seedIds = seedProofs.map(function (p) { return p.id; });
    var list = getEffectiveReviewProofs(productId, seedProofs);
    var track = container.querySelector('[data-review-proof-track]');
    if (!track) return;
    track.innerHTML = list.map(function (p) { return reviewProofCardHtml(p, productId, seedIds); }).join('');

    track.querySelectorAll('[data-remove-review-proof]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var card = btn.closest('[data-review-proof-card]');
        var proofId = card.getAttribute('data-proof-id');
        var isSeed = card.getAttribute('data-is-seed') === '1';
        removeReviewProof(productId, proofId, isSeed);
        renderReviewProofManager(container);
        toast('মুছে ফেলা হয়েছে', 'success');
      });
    });
  }

  function initReviewProofManagers() {
    document.querySelectorAll('[data-review-proof-manager]').forEach(function (container) {
      renderReviewProofManager(container);

      var form = container.querySelector('[data-review-proof-add-form]');
      if (!form) return;
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var typeSel = form.querySelector('[name=proofType]');
        var urlInput = form.querySelector('[name=proofUrl]');
        var type = typeSel ? typeSel.value : 'image';
        var value = (urlInput.value || '').trim();
        if (!value) {
          toast('একটি ছবির URL বা ভিডিও লিংক দিন', 'error');
          return;
        }
        var productId = container.getAttribute('data-product-id');
        var proof = { id: 'rp-' + Date.now() + '-' + Math.floor(Math.random() * 1000) };
        if (type === 'video') {
          var videoId = extractYouTubeIdClient(value);
          if (!videoId) {
            toast('সঠিক YouTube লিংক দিন', 'error');
            return;
          }
          proof.type = 'video';
          proof.videoId = videoId;
          proof.url = value;
        } else {
          proof.type = 'image';
          proof.url = value;
        }
        addReviewProof(productId, proof);
        urlInput.value = '';
        renderReviewProofManager(container);
        toast('যুক্ত করা হয়েছে', 'success');
      });
    });
  }

  // ---------------------------------------------------------------------
  // Customer-facing PDP trust slider: re-render the server-seeded slider
  // merged with any merchant-added/removed items from localStorage.
  // <div data-review-proof-viewer data-product-id data-seed-proofs>
  // ---------------------------------------------------------------------
  function reviewProofViewerCardHtml(proof) {
    if (proof.type === 'video' && proof.videoId) {
      return (
        '<div class="w-40 sm:w-48 shrink-0 snap-start">' +
        '<div data-yt-facade data-video-id="' + proof.videoId + '" data-video-title="কাস্টমার রিভিউ ভিডিও" ' +
        'class="relative w-full rounded-2xl overflow-hidden shadow-ok-card bg-black cursor-pointer" ' +
        'style="aspect-ratio:16/9;background-image:url(\'https://i.ytimg.com/vi/' + proof.videoId + '/hqdefault.jpg\');background-size:cover;background-position:center;" ' +
        'role="button" tabindex="0">' +
        '<span class="absolute inset-0 flex items-center justify-center bg-black/25">' +
        '<span class="w-12 h-12 rounded-full bg-ok-lime-500 text-ok-green-900 flex items-center justify-center shadow"><i class="fas fa-play"></i></span>' +
        '</span></div></div>'
      );
    }
    return (
      '<div class="w-40 sm:w-48 shrink-0 snap-start">' +
      '<img src="' + proof.url + '" alt="কাস্টমার রিভিউ" class="w-full aspect-square object-cover rounded-2xl border border-gray-100 shadow-ok-card" loading="lazy" />' +
      '</div>'
    );
  }

  function initReviewProofViewers() {
    document.querySelectorAll('[data-review-proof-viewer]').forEach(function (viewer) {
      var productId = viewer.getAttribute('data-product-id');
      var seedProofs = JSON.parse(viewer.getAttribute('data-seed-proofs') || '[]');
      var list = getEffectiveReviewProofs(productId, seedProofs);
      if (list.length === 0) return;
      viewer.innerHTML = list.map(reviewProofViewerCardHtml).join('');
    });
  }

  // Minimal client-side mirror of src/utils/youtube.ts's extractYouTubeId,
  // kept in sync by hand since app.js isn't part of the TS build pipeline.
  function extractYouTubeIdClient(input) {
    if (!input) return null;
    var trimmed = input.trim();
    if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed;
    var m = trimmed.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return m ? m[1] : null;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose a small public API for page-specific inline scripts (checkout, etc.)
  window.OK = {
    toast: toast,
    getCart: getCart,
    addToCart: addToCart,
    updateQuantity: updateQuantity,
    removeFromCart: removeFromCart,
    clearCart: clearCart,
    cartTotals: cartTotals,
    formatBDT: formatBDT,
    findCatalogItem: findCatalogItem,
    renderCartDrawer: renderCartDrawer,
    renderCartBadge: renderCartBadge
  };
})();
