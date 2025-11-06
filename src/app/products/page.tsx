import Link from 'next/link';
import { getProducts, getCategories } from '@/lib/wordpress';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductsContent from '@/components/ProductsContent';

// Force dynamic rendering (no static generation at build time)
export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface SearchParams {
  category?: string;
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  // Server-side data fetching - VERY FAST!
  const category = searchParams.category;

  const [products, categories] = await Promise.all([
    getProducts({
      per_page: 20,
      category: category ? parseInt(category) : undefined,
    }),
    getCategories()
  ]);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <ProductsContent
        products={products}
        categories={categories}
        selectedCategory={category}
      />
      <Footer />
    </div>
  );
}
