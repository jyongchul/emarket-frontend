'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { t } = useLanguage();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(`/api/products/${slug}`);
        if (!response.ok) throw new Error('Product not found');
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load product');
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [slug]);

  const handleAddToCart = () => {
    if (!product) return;

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images?.[0]?.src || '',
      slug: product.slug,
    }, quantity);

    alert(t('common.success') + '!');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p className="text-gray-600">{t('common.loading')}</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
            <Link href="/products" className="text-gray-600 hover:text-gray-900">
              ← {t('nav.products')}
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center space-x-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-gray-900">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-gray-900">{t('nav.products')}</Link>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Images Section */}
            <div>
              {/* Main Image */}
              <div className="bg-gray-100 rounded-lg overflow-hidden mb-4">
                {product.images && product.images.length > 0 ? (
                  <img
                    src={product.images[selectedImage].src}
                    alt={product.name}
                    className="w-full h-96 object-contain"
                  />
                ) : (
                  <div className="w-full h-96 flex items-center justify-center text-gray-400">
                    No Image Available
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {product.images && product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.images.map((image: any, index: number) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`border-2 rounded-lg overflow-hidden ${
                        selectedImage === index ? 'border-blue-600' : 'border-gray-200'
                      }`}
                    >
                      <img src={image.src} alt="" className="w-full h-20 object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info Section */}
            <div>
              {/* Product Name */}
              <h1 className="text-3xl font-bold text-gray-900 mb-4 korean-text">
                {product.name}
              </h1>

              {/* Price */}
              <div className="mb-6">
                {product.on_sale && product.sale_price ? (
                  <div className="flex items-center space-x-3">
                    <span className="text-4xl font-bold text-red-600">
                      ₩{Number(product.sale_price).toLocaleString()}
                    </span>
                    <span className="text-2xl text-gray-500 line-through">
                      ₩{Number(product.regular_price).toLocaleString()}
                    </span>
                    <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">
                      {Math.round(((product.regular_price - product.sale_price) / product.regular_price) * 100)}% OFF
                    </span>
                  </div>
                ) : (
                  <span className="text-4xl font-bold text-gray-900">
                    ₩{Number(product.price).toLocaleString()}
                  </span>
                )}
              </div>

              {/* Short Description */}
              {product.short_description && (
                <div
                  className="text-gray-700 mb-6 korean-text"
                  dangerouslySetInnerHTML={{ __html: product.short_description }}
                />
              )}

              {/* Used Product Details */}
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Information</h3>
                <div className="space-y-3">
                  {product.brand && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t('product.brand')}:</span>
                      <span className="font-medium text-gray-900">{product.brand}</span>
                    </div>
                  )}
                  {product.year && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t('product.year')}:</span>
                      <span className="font-medium text-gray-900">{product.year}</span>
                    </div>
                  )}
                  {product.condition && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t('product.condition')}:</span>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          product.condition === 'excellent'
                            ? 'bg-green-100 text-green-800'
                            : product.condition === 'good'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {t(`products.condition.${product.condition}` as any) ||
                         product.condition.charAt(0).toUpperCase() + product.condition.slice(1)}
                      </span>
                    </div>
                  )}
                  {product.tested && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span className="flex items-center text-green-600 font-medium">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {t('products.tested')}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Quantity & Add to Cart */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('product.quantity')}
                </label>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="px-6 py-2 font-medium text-gray-900">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-gray-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition"
                  >
                    {t('product.add.cart')}
                  </button>
                </div>
              </div>

              {/* Buy Now Button */}
              <Link
                href="/checkout"
                className="block w-full bg-gray-900 text-white text-center px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition mb-6"
              >
                {t('product.buy.now')}
              </Link>

              {/* Additional Info */}
              <div className="border-t pt-6 space-y-3 text-sm text-gray-600">
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

          {/* Product Description Tab */}
          <div className="border-t p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
            {product.description ? (
              <div
                className="prose max-w-none text-gray-700 korean-text"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            ) : (
              <p className="text-gray-600">No detailed description available.</p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
