'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DatePicker from '@/components/DatePicker';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/contexts/CartContext';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, getTotalPrice, clearCart } = useCart();
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'South Korea',
    deliveryDate: '',
    paymentMethod: 'bank_transfer',
    notes: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDateSelect = (date: string) => {
    setFormData({
      ...formData,
      deliveryDate: date,
    });
  };

  const subtotal = getTotalPrice();
  const shipping = subtotal >= 100000 ? 0 : 5000;
  const total = subtotal + shipping;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Prepare order data
      const orderData = {
        billing: {
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          address_1: formData.address,
          city: formData.city,
          postcode: formData.postalCode,
          country: 'KR',
        },
        shipping: {
          first_name: formData.firstName,
          last_name: formData.lastName,
          address_1: formData.address,
          city: formData.city,
          postcode: formData.postalCode,
          country: 'KR',
        },
        line_items: cart.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
        })),
        payment_method: formData.paymentMethod,
        payment_method_title: formData.paymentMethod === 'bank_transfer' ? t('checkout.payment.transfer') : t('checkout.payment.cod'),
        customer_note: `${t('checkout.delivery.date')}: ${formData.deliveryDate}\n${formData.notes}`,
      };

      // Create order via API
      const response = await fetch('/api/orders/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      const order = await response.json();

      // Clear cart
      clearCart();

      // Show success message
      alert(`${t('checkout.success')} ${order.id}`);
      router.push('/');
    } catch (error) {
      console.error('Order error:', error);
      alert(t('checkout.error'));
    } finally {
      setLoading(false);
    }
  };

  // Empty cart redirect
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
              <Link href="/products" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 transition">
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
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center space-x-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-gray-900 transition">Home</Link>
          <span>/</span>
          <Link href="/cart" className="hover:text-gray-900 transition">{t('cart.title')}</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">{t('checkout.title')}</span>
        </nav>

        <h1 className="text-4xl font-bold text-gray-900 mb-8">{t('checkout.title')}</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Forms */}
            <div className="lg:col-span-2 space-y-6">
              {/* Shipping Information */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">{t('checkout.shipping.info')}</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('checkout.name')} (First) *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('checkout.name')} (Last) *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('checkout.email')} *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('checkout.phone')} *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t('checkout.address')} *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Postal Code *
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Date - CRITICAL FEATURE */}
              <div className="bg-white rounded-lg shadow-md p-6 border-2 border-gray-900">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">{t('checkout.delivery.date')} *</h2>
                <p className="text-sm text-gray-600 mb-6">
                  Select your preferred delivery date from the calendar below
                </p>
                <DatePicker
                  selectedDate={formData.deliveryDate}
                  onDateSelect={handleDateSelect}
                />
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">{t('checkout.payment.method')}</h2>

                <div className="space-y-3">
                  <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-gray-900 transition">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bank_transfer"
                      checked={formData.paymentMethod === 'bank_transfer'}
                      onChange={handleInputChange}
                      className="mr-3"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{t('checkout.payment.transfer')}</div>
                      <div className="text-sm text-gray-600">Pay directly into our bank account</div>
                    </div>
                  </label>

                  {/* Bank Account Information - Show when bank transfer is selected */}
                  {formData.paymentMethod === 'bank_transfer' && (
                    <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 space-y-3">
                      <div className="flex items-start">
                        <span className="text-2xl mr-3">🏦</span>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-4 text-lg">계좌 정보 / Bank Account Information</h3>
                          <div className="space-y-2 text-sm">
                            <div className="flex">
                              <span className="font-medium text-gray-700 w-32">은행 / Bank:</span>
                              <span className="text-gray-900 font-semibold">국민은행 (Kookmin Bank)</span>
                            </div>
                            <div className="flex">
                              <span className="font-medium text-gray-700 w-32">계좌번호 / Account:</span>
                              <span className="text-gray-900 font-semibold text-lg">805901-04-314273</span>
                            </div>
                            <div className="flex">
                              <span className="font-medium text-gray-700 w-32">예금주 / Name:</span>
                              <span className="text-gray-900 font-semibold">(주)하얀모자마케팅</span>
                            </div>
                          </div>
                          <p className="mt-4 text-xs text-gray-600 bg-white p-3 rounded border border-blue-200">
                            💡 Please transfer the total amount to the account above and your order will be processed after payment confirmation.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <label className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-gray-900 transition">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={handleInputChange}
                      className="mr-3"
                    />
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{t('checkout.payment.cod')}</div>
                      <div className="text-sm text-gray-600">Pay when you receive the products</div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Order Notes */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">{t('checkout.order.notes')}</h2>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Any special instructions for delivery?"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent text-gray-900"
                />
              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">{t('checkout.order.summary')}</h2>

                {/* Cart Items */}
                <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        {item.image ? (
                          <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                        ) : (
                          <div className="w-16 h-16 bg-gray-200 rounded" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate korean-text" style={{ wordBreak: 'keep-all' }}>{item.name}</p>
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        ₩{(Number(item.price) * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="border-t pt-4 space-y-3 mb-6">
                  <div className="flex justify-between text-gray-700">
                    <span>{t('cart.subtotal')}</span>
                    <span>₩{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>{t('cart.shipping')}</span>
                    <span>{shipping === 0 ? t('cart.shipping.free') : `₩${shipping.toLocaleString()}`}</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold text-gray-900 pt-3 border-t">
                    <span>{t('cart.total')}</span>
                    <span>₩{total.toLocaleString()}</span>
                  </div>
                </div>

                {/* Place Order Button */}
                <button
                  type="submit"
                  disabled={loading || !formData.deliveryDate}
                  className="w-full bg-gray-900 text-white px-6 py-4 rounded-lg font-semibold hover:bg-gray-800 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {loading ? t('checkout.processing') : t('checkout.place.order')}
                </button>

                {!formData.deliveryDate && (
                  <p className="mt-3 text-sm text-red-600 text-center">
                    Please select a delivery date
                  </p>
                )}

                {/* Security Info */}
                <div className="mt-6 pt-6 border-t space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <span className="mr-2">🔒</span>
                    <span>Secure checkout</span>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">✅</span>
                    <span>All products tested</span>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">🚚</span>
                    <span>Free shipping over ₩100,000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
}
