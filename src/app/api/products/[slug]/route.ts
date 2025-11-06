import { NextRequest, NextResponse } from 'next/server';
import { getProduct } from '@/lib/wordpress';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    console.log('[API] Fetching product:', params.slug);
    const product = await getProduct(params.slug);

    if (!product) {
      console.log('[API] Product not found:', params.slug);
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    console.log('[API] Product found:', product.name);
    return NextResponse.json(product);
  } catch (error) {
    console.error('[API] Error fetching product:', params.slug);
    console.error('[API] Error details:', error);
    console.error('[API] Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    return NextResponse.json({
      error: 'Failed to fetch product',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
