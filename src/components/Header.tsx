'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';

export default function Header() {
  const { language, setLanguage, t } = useLanguage();
  const { getTotalItems } = useCart();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/">
              <h1 className="text-xl font-semibold text-gray-900 tracking-tight">E-MARKET</h1>
            </Link>
          </div>
          <div className="flex space-x-8 items-center">
            <Link href="/products" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition">
              {t('nav.products')}
            </Link>
            <Link href="/cart" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition relative">
              {t('nav.cart')}
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-3 bg-gray-900 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </Link>
            <div className="flex space-x-2 border-l border-gray-200 pl-6">
              <button
                onClick={() => setLanguage('en')}
                className={`text-xs font-medium px-2 py-1 transition ${
                  language === 'en' ? 'text-gray-900 font-bold' : 'text-gray-400 hover:text-gray-900'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('fr')}
                className={`text-xs font-medium px-2 py-1 transition ${
                  language === 'fr' ? 'text-gray-900 font-bold' : 'text-gray-400 hover:text-gray-900'
                }`}
              >
                FR
              </button>
              <button
                onClick={() => setLanguage('ko')}
                className={`text-xs font-medium px-2 py-1 transition ${
                  language === 'ko' ? 'text-gray-900 font-bold' : 'text-gray-400 hover:text-gray-900'
                }`}
              >
                KO
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
