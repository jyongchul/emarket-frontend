import { NextRequest, NextResponse } from 'next/server';

// Use Cloudflare Tunnel URL for public access
const WORDPRESS_BASE_URL = process.env.WORDPRESS_IMAGE_URL || 'https://wp-emarket.whmarketing.org';

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const imagePath = params.path.join('/');
    const wordpressUrl = `${WORDPRESS_BASE_URL}/wp-content/${imagePath}`;

    console.log('Fetching image from:', wordpressUrl);

    const response = await fetch(wordpressUrl, {
      // Add headers to avoid CORS issues
      headers: {
        'User-Agent': 'E-MARKET/1.0',
      },
    });

    if (!response.ok) {
      console.error('Image fetch failed:', response.status, response.statusText);
      return new NextResponse('Image not found', { status: 404 });
    }

    const imageBuffer = await response.arrayBuffer();
    const contentType = response.headers.get('content-type') || 'image/jpeg';

    return new NextResponse(imageBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    console.error('Image proxy error:', error);
    return new NextResponse('Error fetching image', { status: 500 });
  }
}
