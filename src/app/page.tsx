import Header from '@/components/Header';
import HomeContent from '@/components/HomeContent';
import { getProducts, getCategories } from '@/lib/wordpress';

// Force dynamic rendering (no static generation at build time)
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Home() {
  // Fetch data on the server (very fast!)
  const [products, categories] = await Promise.all([
    getProducts({ per_page: 4 }),
    getCategories()
  ]);

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <HomeContent featuredProducts={products} categories={categories} />
    </main>
  );
}
