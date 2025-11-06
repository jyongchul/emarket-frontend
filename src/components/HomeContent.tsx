'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import Footer from '@/components/Footer';

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
}

interface HomeContentProps {
  featuredProducts: Product[];
  categories: Category[];
}

export default function HomeContent({ featuredProducts, categories }: HomeContentProps) {
  const { t } = useLanguage();

  return (
    <>
      {/* Clean Hero Section */}
      <section className="relative overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              {t('home.hero.title')}
            </h2>
            <p className="text-xl md:text-2xl text-white mb-8 korean-text drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]" style={{wordBreak: 'keep-all'}}>
              {t('home.hero.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/products"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-black bg-white hover:bg-gray-100 transition"
              >
                {t('home.hero.browse')}
              </Link>
              <Link
                href="/products?category=16"
                className="inline-flex items-center justify-center px-6 py-3 border-2 border-white text-base font-medium rounded-md text-white bg-transparent hover:bg-white hover:text-black transition"
              >
                {t('home.hero.electronics')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Clean Stats Section */}
      <section className="py-16 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-semibold text-gray-900 mb-2">{featuredProducts.length}+</div>
              <div className="text-sm text-gray-600 uppercase tracking-wide">{t('home.stats.products')}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-semibold text-gray-900 mb-2">{categories.length}</div>
              <div className="text-sm text-gray-600 uppercase tracking-wide">{t('home.stats.categories')}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-semibold text-gray-900 mb-2">100%</div>
              <div className="text-sm text-gray-600 uppercase tracking-wide">{t('home.stats.tested')}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-semibold text-gray-900 mb-2">24/7</div>
              <div className="text-sm text-gray-600 uppercase tracking-wide">{t('home.stats.support')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-semibold text-gray-900 mb-3 tracking-tight">{t('home.featured.title')}</h2>
            <p className="text-lg text-gray-600 korean-text" style={{wordBreak: 'keep-all'}}>{t('home.featured.subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.slice(0, 4).map((product: any) => (
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
                    <h3 className="font-medium text-gray-900 mb-3 line-clamp-2 korean-text" style={{wordBreak: 'keep-all'}}>
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

          <div className="mt-12 text-center">
            <Link
              href="/products"
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-900 text-base font-medium rounded-md text-gray-900 bg-white hover:bg-gray-900 hover:text-white transition"
            >
              {t('products.view.all')}
            </Link>
          </div>
        </div>
      </section>

      {/* Clean Categories Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-semibold text-gray-900 mb-3 tracking-tight">{t('home.categories.title')}</h2>
            <p className="text-lg text-gray-600 korean-text" style={{wordBreak: 'keep-all'}}>{t('home.categories.subtitle')}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'home.category.electronics', id: 16 },
              { name: 'home.category.furniture', id: 17 },
              { name: 'home.category.kitchen', id: 18 },
              { name: 'home.category.baby', id: 19 },
            ].map((category) => (
              <Link
                key={category.name}
                href={`/products?category=${category.id}`}
                className="group bg-white p-8 border border-gray-200 hover:border-gray-900 transition text-center"
              >
                <h3 className="text-lg font-medium text-gray-900 mb-2">{t(category.name)}</h3>
                <div className="text-sm text-gray-900 font-medium group-hover:underline">
                  {t('common.browse')} →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-semibold text-gray-900 mb-3 tracking-tight">{t('home.features.title')}</h2>
            <p className="text-lg text-gray-600 korean-text" style={{wordBreak: 'keep-all'}}>{t('home.features.subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12">
            <div className="text-center">
              <div className="mb-4">
                <div className="inline-block p-3 border-2 border-gray-900 rounded">
                  <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">{t('home.feature.quality')}</h3>
              <p className="text-sm text-gray-600 mb-2">{t('home.feature.quality.desc')}</p>
            </div>

            <div className="text-center">
              <div className="mb-4">
                <div className="inline-block p-3 border-2 border-gray-900 rounded">
                  <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">{t('home.feature.delivery')}</h3>
              <p className="text-sm text-gray-600 mb-2">{t('home.feature.delivery.desc')}</p>
            </div>

            <div className="text-center">
              <div className="mb-4">
                <div className="inline-block p-3 border-2 border-gray-900 rounded">
                  <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">{t('home.feature.support')}</h3>
              <p className="text-sm text-gray-600 mb-2">{t('home.feature.support.desc')}</p>
            </div>

            <div className="text-center">
              <div className="mb-4">
                <div className="inline-block p-3 border-2 border-gray-900 rounded">
                  <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">{t('home.feature.pricing')}</h3>
              <p className="text-sm text-gray-600 mb-2">{t('home.feature.pricing.desc')}</p>
            </div>

            <div className="text-center">
              <div className="mb-4">
                <div className="inline-block p-3 border-2 border-gray-900 rounded">
                  <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">{t('home.feature.payment')}</h3>
              <p className="text-sm text-gray-600 mb-2">{t('home.feature.payment.desc')}</p>
            </div>

            <div className="text-center">
              <div className="mb-4">
                <div className="inline-block p-3 border-2 border-gray-900 rounded">
                  <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">{t('home.feature.multilang')}</h3>
              <p className="text-sm text-gray-600 mb-2">{t('home.feature.multilang.desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 bg-gray-50 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-sm font-medium text-gray-900 mb-1">Secure Checkout</div>
              <div className="text-xs text-gray-500">SSL Encrypted</div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-900 mb-1">Quality Guaranteed</div>
              <div className="text-xs text-gray-500">100% Tested</div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-900 mb-1">Free Shipping</div>
              <div className="text-xs text-gray-500">Over ₩100,000</div>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-900 mb-1">Payment Methods</div>
              <div className="text-xs text-gray-500">Card & Transfer</div>
            </div>
          </div>
        </div>
      </section>

      {/* Clean CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-semibold mb-4 tracking-tight">{t('home.cta.title')}</h2>
          <p className="text-lg text-gray-400 mb-2 korean-text" style={{wordBreak: 'keep-all'}}>{t('home.cta.subtitle')}</p>
          <p className="text-base text-gray-400 mb-8">
            {t('home.cta.description')}
          </p>
          <Link
            href="/products"
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-gray-900 bg-white hover:bg-gray-100 transition"
          >
            {t('home.cta.button')}
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
