'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import Link from 'next/link';

interface Order {
  id: number;
  date: string;
  status: 'processing' | 'shipping' | 'delivered' | 'cancelled';
  total: number;
  items: {
    id: number;
    name: string;
    quantity: number;
    price: string;
    image: string;
  }[];
  tracking?: string;
  deliveryDate?: string;
}

export default function MyAccountPage() {
  const { t } = useLanguage();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'processing' | 'shipping' | 'delivered'>('all');

  // Mock data for demonstration - replace with actual API call
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockOrders: Order[] = [
        {
          id: 1001,
          date: '2025-11-01',
          status: 'delivered',
          total: 450000,
          deliveryDate: '2025-11-05',
          tracking: 'KR1234567890',
          items: [
            {
              id: 1,
              name: 'Samsung Refrigerator 2020',
              quantity: 1,
              price: '450000',
              image: '/placeholder-product.jpg'
            }
          ]
        },
        {
          id: 1002,
          date: '2025-11-03',
          status: 'shipping',
          total: 250000,
          deliveryDate: '2025-11-08',
          tracking: 'KR0987654321',
          items: [
            {
              id: 2,
              name: 'LG Washing Machine',
              quantity: 1,
              price: '250000',
              image: '/placeholder-product.jpg'
            }
          ]
        },
        {
          id: 1003,
          date: '2025-11-04',
          status: 'processing',
          total: 85000,
          deliveryDate: '2025-11-10',
          items: [
            {
              id: 3,
              name: 'Microwave Oven',
              quantity: 1,
              price: '85000',
              image: '/placeholder-product.jpg'
            }
          ]
        }
      ];
      setOrders(mockOrders);
      setLoading(false);
    }, 500);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'shipping':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'processing':
        return '배송준비중';
      case 'shipping':
        return '배송중';
      case 'delivered':
        return '배송완료';
      case 'cancelled':
        return '취소됨';
      default:
        return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'processing':
        return '📦';
      case 'shipping':
        return '🚚';
      case 'delivered':
        return '✅';
      case 'cancelled':
        return '❌';
      default:
        return '📋';
    }
  };

  const filteredOrders = activeTab === 'all'
    ? orders
    : orders.filter(order => order.status === activeTab);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4 text-gray-600">{t('common.loading')}</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center space-x-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-gray-900 transition">Home</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">My Account</span>
        </nav>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Account</h1>
          <p className="text-gray-600">View your order history and shipping status</p>
        </div>

        {/* Tabs */}
        <div className="mb-8 border-b border-gray-200">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('all')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm transition ${
                activeTab === 'all'
                  ? 'border-gray-900 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              All Orders ({orders.length})
            </button>
            <button
              onClick={() => setActiveTab('processing')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm transition ${
                activeTab === 'processing'
                  ? 'border-gray-900 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Processing ({orders.filter(o => o.status === 'processing').length})
            </button>
            <button
              onClick={() => setActiveTab('shipping')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm transition ${
                activeTab === 'shipping'
                  ? 'border-gray-900 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Shipping ({orders.filter(o => o.status === 'shipping').length})
            </button>
            <button
              onClick={() => setActiveTab('delivered')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm transition ${
                activeTab === 'delivered'
                  ? 'border-gray-900 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Delivered ({orders.filter(o => o.status === 'delivered').length})
            </button>
          </nav>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <svg className="mx-auto h-24 w-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-4 text-xl font-medium text-gray-900">No orders found</h3>
            <p className="mt-2 text-gray-600">You haven't placed any orders yet</p>
            <div className="mt-6">
              <Link href="/products" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 transition">
                Start Shopping
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                {/* Order Header */}
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center space-x-6">
                      <div>
                        <p className="text-sm text-gray-600">Order #</p>
                        <p className="font-semibold text-gray-900">{order.id}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Order Date</p>
                        <p className="font-medium text-gray-900">{new Date(order.date).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Total</p>
                        <p className="font-bold text-gray-900">₩{order.total.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                        <span className="mr-1">{getStatusIcon(order.status)}</span>
                        {getStatusText(order.status)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="px-6 py-4">
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          {item.image ? (
                            <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                          ) : (
                            <div className="w-20 h-20 bg-gray-200 rounded" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-base font-medium text-gray-900 korean-text" style={{ wordBreak: 'keep-all' }}>
                            {item.name}
                          </p>
                          <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                        </div>
                        <div className="text-base font-medium text-gray-900">
                          ₩{Number(item.price).toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Shipping Info */}
                  {(order.deliveryDate || order.tracking) && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {order.deliveryDate && (
                          <div>
                            <p className="text-sm font-medium text-gray-700 mb-1">Expected Delivery</p>
                            <p className="text-base text-gray-900">📅 {new Date(order.deliveryDate).toLocaleDateString()}</p>
                          </div>
                        )}
                        {order.tracking && (
                          <div>
                            <p className="text-sm font-medium text-gray-700 mb-1">Tracking Number</p>
                            <p className="text-base text-gray-900 font-mono">{order.tracking}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Order Actions */}
                  <div className="mt-6 pt-6 border-t border-gray-200 flex justify-end space-x-4">
                    {order.status === 'delivered' && (
                      <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition">
                        Write Review
                      </button>
                    )}
                    {order.status === 'shipping' && order.tracking && (
                      <button className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition">
                        Track Shipment
                      </button>
                    )}
                    {order.status === 'processing' && (
                      <button className="px-4 py-2 border border-red-300 rounded-lg text-sm font-medium text-red-700 hover:bg-red-50 transition">
                        Cancel Order
                      </button>
                    )}
                    <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Shipping Status Legend */}
        <div className="mt-12 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Shipping Status Guide</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start space-x-3">
              <span className="text-2xl">📦</span>
              <div>
                <h4 className="font-medium text-gray-900">배송준비중 (Processing)</h4>
                <p className="text-sm text-gray-600">Your order is being prepared for shipment</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-2xl">🚚</span>
              <div>
                <h4 className="font-medium text-gray-900">배송중 (Shipping)</h4>
                <p className="text-sm text-gray-600">Your order is on its way to you</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-2xl">✅</span>
              <div>
                <h4 className="font-medium text-gray-900">배송완료 (Delivered)</h4>
                <p className="text-sm text-gray-600">Your order has been delivered</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
