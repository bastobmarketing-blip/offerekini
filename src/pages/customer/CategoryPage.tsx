import type { FC } from 'hono/jsx'
import { CustomerLayout } from '../../layouts/CustomerLayout'
import { ProductCard } from '../../components/ProductCard'
import { Breadcrumb } from '../../components/customer/Breadcrumb'
import { EmptyState } from '../../components/ui/EmptyState'
import type { Category, Product } from '../../types'

export const CategoryPage: FC<{ category: Category; productList: Product[] }> = ({ category, productList }) => (
  <CustomerLayout title={category.name} activeNav="categories" activeMobileNav="categories">
    <div class="relative bg-ok-green-900 h-32 sm:h-44 overflow-hidden">
      <img src={category.image} alt={category.nameEn} class="w-full h-full object-cover opacity-30" />
      <div class="absolute inset-0 flex items-center">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 w-full">
          <h1 class="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-3">
            <i class={`fas ${category.icon} text-ok-lime-400`}></i> {category.name}
          </h1>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 py-5">
      <Breadcrumb items={[{ label: category.name }]} />
      <p class="text-sm text-ok-gray-500 mt-3 mb-6">{productList.length} টি পণ্য পাওয়া গেছে</p>

      {productList.length === 0 ? (
        <EmptyState icon="fa-box-open" title="এই ক্যাটাগরিতে কোনো পণ্য নেই" description="খুব শীঘ্রই নতুন পণ্য যুক্ত হবে।" actionLabel="সব পণ্য দেখুন" actionHref="/products" />
      ) : (
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {productList.map((p) => (
            <ProductCard product={p} />
          ))}
        </div>
      )}
    </div>
  </CustomerLayout>
)
