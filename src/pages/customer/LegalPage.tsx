import type { FC } from 'hono/jsx'
import { CustomerLayout } from '../../layouts/CustomerLayout'
import { StaticPageHeader } from '../../components/customer/StaticPageHeader'

interface LegalSection {
  heading: string
  body: string
}

interface LegalPageProps {
  title: string
  icon: string
  intro: string
  sections: LegalSection[]
}

export const LegalPage: FC<LegalPageProps> = ({ title, icon, intro, sections }) => (
  <CustomerLayout title={title}>
    <StaticPageHeader title={title} icon={icon} />
    <div class="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
      <p class="text-sm text-ok-gray-600 leading-relaxed mb-8">{intro}</p>
      <div class="space-y-6">
        {sections.map((s, i) => (
          <div>
            <h2 class="font-bold text-base mb-2">{i + 1}. {s.heading}</h2>
            <p class="text-sm text-ok-gray-600 leading-relaxed">{s.body}</p>
          </div>
        ))}
      </div>
    </div>
  </CustomerLayout>
)

export const privacyContent: LegalPageProps = {
  title: 'প্রাইভেসি পলিসি',
  icon: 'fa-lock',
  intro: 'OfferKini আপনার ব্যক্তিগত তথ্যের গোপনীয়তা রক্ষায় প্রতিশ্রুতিবদ্ধ। এই পলিসিতে আমরা কীভাবে আপনার তথ্য সংগ্রহ, ব্যবহার এবং সুরক্ষিত রাখি তা ব্যাখ্যা করা হয়েছে।',
  sections: [
    { heading: 'তথ্য সংগ্রহ', body: 'আমরা অর্ডার প্রসেসিং-এর জন্য নাম, মোবাইল নম্বর, ঠিকানা এবং প্রয়োজনীয় তথ্য সংগ্রহ করি।' },
    { heading: 'তথ্যের ব্যবহার', body: 'সংগ্রহিত তথ্য কেবলমাত্র অর্ডার ডেলিভারি, গ্রাহক সেবা এবং প্ল্যাটফর্ম উন্নয়নের জন্য ব্যবহৃত হয়।' },
    { heading: 'তথ্য সুরক্ষা', body: 'আমরা আপনার তথ্য সুরক্ষিত রাখার জন্য যথাযথ প্রযুক্তিগত ব্যবস্থা গ্রহণ করি।' },
    { heading: 'তৃতীয় পক্ষের সাথে শেয়ারিং', body: 'ডেলিভারি সম্পন্ন করার প্রয়োজনে কুরিয়ার পার্টনারদের সাথে সীমিত তথ্য শেয়ার করা হতে পারে।' }
  ]
}

export const termsContent: LegalPageProps = {
  title: 'শর্তাবলী',
  icon: 'fa-file-contract',
  intro: 'OfferKini প্ল্যাটফর্ম ব্যবহারের মাধ্যমে আপনি নিম্নলিখিত শর্তাবলীতে সম্মত হচ্ছেন।',
  sections: [
    { heading: 'অ্যাকাউন্ট ব্যবহার', body: 'ব্যবহারকারীকে সঠিক ও আপ-টু-ডেট তথ্য প্রদান করতে হবে।' },
    { heading: 'অর্ডার ও পেমেন্ট', body: 'প্রতিটি অর্ডারে ডেলিভারি চার্জ অগ্রিম পরিশোধ করতে হবে এবং বাকি টাকা পণ্য হাতে পাওয়ার সময় পরিশোধ করতে হবে।' },
    { heading: 'মূল্য নির্ধারণ', body: 'OfferKini স্বচ্ছ মূল্য নীতি অনুসরণ করে। কোনো পণ্যের দাম বিভ্রান্তিমূলকভাবে বাড়িয়ে দেখানো হয় না।' },
    { heading: 'দায়বদ্ধতা', body: 'পণ্যের গুণগত মান বজায় রাখার দায়িত্ব সংশ্লিষ্ট মার্চেন্টের, তবে OfferKini মান নিশ্চিতে সহায়তা করে।' }
  ]
}

export const deliveryPolicyContent: LegalPageProps = {
  title: 'ডেলিভারি পলিসি',
  icon: 'fa-truck-fast',
  intro: 'OfferKini সারা বাংলাদেশে পণ্য ডেলিভারি প্রদান করে। ডেলিভারি সম্পর্কিত নীতিমালা নিচে উল্লেখ করা হয়েছে।',
  sections: [
    { heading: 'ডেলিভারি চার্জ', body: 'প্রতিটি পণ্যের জন্য নির্দিষ্ট ডেলিভারি চার্জ প্রযোজ্য, যা অর্ডারের সময় অগ্রিম পরিশোধ করতে হয়।' },
    { heading: 'ডেলিভারি সময়', body: 'সাধারণত ঢাকার মধ্যে ২-৩ কর্মদিবস এবং ঢাকার বাইরে ৩-৫ কর্মদিবস সময় লাগে।' },
    { heading: 'বাকি টাকা পরিশোধ', body: 'পণ্যের সম্পূর্ণ মূল্য পণ্য হাতে পাওয়ার সময় ক্যাশ অন ডেলিভারিতে পরিশোধ করতে হবে।' },
    { heading: 'ডেলিভারি ব্যর্থতা', body: 'গ্রাহক অনুপস্থিত থাকলে বা ঠিকানা ভুল হলে পুনরায় ডেলিভারি চেষ্টা করা হবে, তবে অতিরিক্ত চার্জ প্রযোজ্য হতে পারে।' }
  ]
}

export const returnPolicyContent: LegalPageProps = {
  title: 'রিটার্ন পলিসি',
  icon: 'fa-rotate-left',
  intro: 'OfferKini গ্রাহক সন্তুষ্টিকে সর্বোচ্চ অগ্রাধিকার দেয়। পণ্য ফেরত সম্পর্কিত নীতিমালা নিচে উল্লেখ করা হয়েছে।',
  sections: [
    { heading: 'রিটার্ন যোগ্যতা', body: 'পণ্য ক্ষতিগ্রস্ত বা ভুল পণ্য পাঠানো হলে ডেলিভারির ৭ দিনের মধ্যে রিটার্নের জন্য আবেদন করা যাবে।' },
    { heading: 'রিটার্ন প্রক্রিয়া', body: 'রিটার্নের জন্য কাস্টমার সাপোর্টে যোগাযোগ করতে হবে এবং প্রয়োজনীয় প্রমাণ (ছবি/ভিডিও) সংযুক্ত করতে হবে।' },
    { heading: 'রিফান্ড', body: 'অনুমোদিত রিটার্নের ক্ষেত্রে অগ্রিম পরিশোধিত ডেলিভারি চার্জ ফেরত দেওয়া হয় নির্দিষ্ট নীতিমালা অনুযায়ী।' },
    { heading: 'ব্যতিক্রম', body: 'ব্যবহারের কারণে ক্ষতিগ্রস্ত পণ্য বা গ্রাহকের ভুলের কারণে সমস্যা হলে রিটার্ন প্রযোজ্য নয়।' }
  ]
}
