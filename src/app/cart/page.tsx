'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';

// Helper function to convert WordPress image URLs to API proxy URLs
function transformImageUrl(url: string): string {
  if (!url) return '/placeholder-product.jpg';

  // Convert localhost or wordpress domain URLs to API proxy
  const match = url.match(/\/wp-content\/uploads\/(.+)/);
  if (match) {
    return `/api/image/uploads/${match[1]}`;
  }

  return url;
}

export default function CartPage() {
  const router = useRouter();
  const { t } = useLanguage();
  const { cart, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert(t('cart.empty.message') || 'Your cart is empty!');
      return;
    }
    router.push('/checkout');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <svg className="mx-auto h-24 w-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <h2 className="mt-6 text-3xl font-bold text-gray-900">{t('cart.empty')}</h2>
            <p className="mt-2 text-lg text-gray-600">{t('cart.empty.message')}</p>
            <div className="mt-8">
              <Link
                href="/products"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 transition"
              >
                {t('cart.continue.shopping')}
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center space-x-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-gray-900">Home</Link>
          <span>/</span>
          <span className="text-gray-900">{t('nav.cart')}</span>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">{t('cart.title')}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
                <div className="flex gap-6">
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    <img
                      src={transformImageUrl(item.image)}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/products/${item.slug}`}
                      className="text-lg font-semibold text-gray-900 hover:text-gray-700 line-clamp-2 korean-text"
                      style={{ wordBreak: 'keep-all' }}
                    >
                      {item.name}
                    </Link>
                    <p className="mt-2 text-2xl font-bold text-gray-900">
                      ₩{Number(item.price).toLocaleString()}
                    </p>

                    {/* Quantity Controls */}
                    <div className="mt-4 flex items-center gap-4">
                      <div className="flex items-center border border-gray-300 rounded-lg bg-white">
                        <button
                          onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                          className="px-3 py-2 text-gray-900 hover:bg-gray-100 transition font-semibold"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="px-4 py-2 font-semibold text-gray-900 min-w-[50px] text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-2 text-gray-900 hover:bg-gray-100 transition font-semibold"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      {/* Subtotal */}
                      <div className="text-lg font-bold text-gray-900">
                        ₩{(Number(item.price) * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <div className="flex-shrink-0">
                    <button
                      onClick={() => {
                        if (confirm(t('cart.remove.confirm') || 'Remove this item?')) {
                          removeFromCart(item.id);
                        }
                      }}
                      className="text-gray-400 hover:text-red-600 transition"
                      aria-label="Remove item"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Clear All Button */}
            <button
              onClick={() => {
                if (confirm(t('cart.clear.confirm') || 'Clear all items?')) {
                  clearCart();
                }
              }}
              className="w-full text-center py-3 text-sm text-red-600 hover:text-red-800 transition border border-red-200 rounded-lg hover:bg-red-50"
            >
              {t('cart.clear.all')}
            </button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6">{t('cart.summary')}</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>{t('cart.subtotal')}</span>
                  <span className="font-medium">₩{getTotalPrice().toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>{t('cart.shipping')}</span>
                  <span className="font-medium">{t('cart.calculated.checkout')}</span>
                </div>
                {getTotalPrice() < 100000 && (
                  <p className="text-sm text-gray-500">
                    Add ₩{(100000 - getTotalPrice()).toLocaleString()} more for free shipping
                  </p>
                )}
                <div className="border-t border-gray-300 pt-4">
                  <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>{t('cart.total')}</span>
                    <span>₩{getTotalPrice().toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition mb-4"
              >
                {t('cart.proceed.checkout')}
              </button>

              <Link
                href="/products"
                className="block w-full text-center px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition"
              >
                {t('cart.continue.shopping')}
              </Link>

              {/* Additional Info */}
              <div className="mt-6 pt-6 border-t space-y-3 text-sm text-gray-600">
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{t('product.shipping')}</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{t('product.return')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
