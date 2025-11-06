import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const metadata = {
  title: 'Terms of Service - E-Market',
  description: 'Terms and conditions for using E-Market platform',
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>

        <div className="prose prose-gray max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
            <p className="text-gray-600 mb-4">
              Welcome to E-Market. These Terms of Service ("Terms") govern your use of our website and services. By accessing or using E-Market, you agree to be bound by these Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Use of Service</h2>
            <p className="text-gray-600 mb-4">
              E-Market is a platform for buying and selling used electronics and furniture. You agree to use the service only for lawful purposes and in accordance with these Terms.
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
              <li>You must be at least 18 years old to use this service</li>
              <li>You are responsible for maintaining the security of your account</li>
              <li>You must provide accurate and complete information</li>
              <li>You agree not to engage in fraudulent or illegal activities</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Product Listings</h2>
            <p className="text-gray-600 mb-4">
              All products listed on E-Market are used items that have been tested for functionality. However:
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
              <li>Product descriptions are provided by sellers and E-Market strives to ensure accuracy</li>
              <li>All items are sold "as-is" with the condition clearly stated</li>
              <li>E-Market tests products but cannot guarantee perfect condition</li>
              <li>Photos are representative and actual items may vary slightly</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Purchases and Payments</h2>
            <p className="text-gray-600 mb-4">
              When you place an order on E-Market:
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
              <li>You agree to pay the stated price plus any applicable shipping fees</li>
              <li>Payment methods include bank transfer and cash on delivery</li>
              <li>Orders are confirmed upon payment verification</li>
              <li>Prices are in Korean Won (₩)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Shipping and Delivery</h2>
            <p className="text-gray-600 mb-4">
              E-Market offers the following shipping policies:
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
              <li>Free shipping on orders over ₩100,000</li>
              <li>Standard shipping fee applies to orders under ₩100,000</li>
              <li>Delivery dates can be selected at checkout</li>
              <li>Delivery times are estimates and may vary</li>
              <li>You will receive tracking information once shipped</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Returns and Refunds</h2>
            <p className="text-gray-600 mb-4">
              E-Market offers a 7-day return policy:
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
              <li>Returns accepted within 7 days of delivery</li>
              <li>Items must be returned in original condition</li>
              <li>Refunds processed within 5-7 business days</li>
              <li>Return shipping costs may apply</li>
              <li>Items must not show signs of use or damage</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Limitation of Liability</h2>
            <p className="text-gray-600 mb-4">
              E-Market is not liable for:
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
              <li>Indirect, incidental, or consequential damages</li>
              <li>Loss of profits or data</li>
              <li>Service interruptions or technical issues</li>
              <li>Third-party product defects beyond stated condition</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Changes to Terms</h2>
            <p className="text-gray-600 mb-4">
              E-Market reserves the right to modify these Terms at any time. Changes will be effective immediately upon posting. Your continued use of the service constitutes acceptance of modified Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Contact Information</h2>
            <p className="text-gray-600 mb-4">
              For questions about these Terms, please contact us at:
            </p>
            <p className="text-gray-600">
              Email: support@emarket.com<br />
              Phone: +82-10-XXXX-XXXX<br />
              Hours: Monday-Friday, 9AM-6PM KST
            </p>
          </section>

          <p className="text-sm text-gray-500 mt-12">
            Last updated: November 4, 2025
          </p>
        </div>

        <div className="mt-12">
          <Link href="/" className="text-sm text-gray-600 hover:text-gray-900">
            ← Back to Home
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  );
}
