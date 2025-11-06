'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

interface Product {
  id: number;
  slug: string;
  name: string;
  price: string;
  images: any[];
  brand?: string;
  year?: string;
  tested?: boolean;
  condition?: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface ProductsContentProps {
  products: Product[];
  categories: Category[];
  selectedCategory?: string;
}

export default function ProductsContent({ products, categories, selectedCategory }: ProductsContentProps) {
  const { t } = useLanguage();

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">{t('nav.products')}</h1>
        <p className="text-lg text-gray-600 korean-text" style={{ wordBreak: 'keep-all' }}>
          {t('products.description')}
        </p>
      </div>

      {/* Category Filter */}
      <div className="mb-8 flex flex-wrap gap-3">
        <Link
          href="/products"
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            !selectedCategory
              ? 'bg-gray-900 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {t('products.all')}
        </Link>
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/products?category=${category.id}`}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              selectedCategory === String(category.id)
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category.name}
          </Link>
        ))}
      </div>

      {/* Products Grid */}
      {products.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">{t('products.no.results')}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className="group"
            >
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-gray-900 transition">
                <div className="aspect-square bg-gray-50 flex items-center justify-center relative overflow-hidden">
                  {product.images && product.images[0] ? (
                    <img
                      src={product.images[0].src}
                      alt={product.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-102 transition"
                    />
                  ) : (
                    <div className="text-gray-300 text-4xl">—</div>
                  )}
                  {product.tested && (
                    <div className="absolute top-3 right-3 bg-gray-900 text-white px-2 py-1 text-xs font-medium">
                      {t('products.tested')}
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-medium text-gray-900 mb-3 line-clamp-2 korean-text" style={{ wordBreak: 'keep-all' }}>
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between mb-3 text-xs text-gray-500">
                    <span>{product.brand || 'Brand'}</span>
                    <span>{product.year || '2023'}</span>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-2xl font-semibold text-gray-900">
                      ₩{Number(product.price).toLocaleString()}
                    </span>
                    <span className="text-xs text-gray-500 uppercase">
                      {product.condition || 'Good'}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
