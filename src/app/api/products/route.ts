import { NextRequest, NextResponse } from 'next/server';
import { getProducts } from '@/lib/wordpress';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const per_page = searchParams.get('per_page');
    const category = searchParams.get('category');

    const params: any = {};
    if (per_page) params.per_page = parseInt(per_page);
    if (category) params.category = parseInt(category);

    const products = await getProducts(params);

    return NextResponse.json(products);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
