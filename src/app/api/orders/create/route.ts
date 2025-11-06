import { NextRequest, NextResponse } from 'next/server';
import { createOrder } from '@/lib/wordpress';

export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json();

    // Create order via WooCommerce API
    const order = await createOrder(orderData);

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}
