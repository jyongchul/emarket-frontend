// WordPress & WooCommerce API Client

import { WPProduct, WPCategory, WPOrder } from '@/types/wordpress';

// Use internal Docker network for server-side requests
const WP_API_URL = process.env.WORDPRESS_API_URL || 'http://wordpress/wp-json/wp/v2';
const WC_API_URL = process.env.WOOCOMMERCE_API_URL || 'http://wordpress/wp-json/wc/v3';

// In-memory cache for ultra-fast repeated requests
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 300000; // 5 minutes in milliseconds

// Helper function to transform WordPress image URLs
function transformImageUrls(data: any): any {
  if (!data) return data;

  const transform = (obj: any): any => {
    if (typeof obj === 'string') {
      // Replace WordPress URLs with Next.js API proxy
      if (obj.includes('/wp-content/uploads/')) {
        const match = obj.match(/\/wp-content\/uploads\/(.+)/);
        if (match) {
          return `/api/image/uploads/${match[1]}`;
        }
      }
      // Fallback: replace any localhost:8005/wp-content with API proxy
      return obj.replace(/https?:\/\/[^\/]+\/wp-content\/uploads\/(.+)/, '/api/image/uploads/$1');
    }

    if (Array.isArray(obj)) {
      return obj.map(transform);
    }

    if (typeof obj === 'object' && obj !== null) {
      const transformed: any = {};
      for (const key in obj) {
        transformed[key] = transform(obj[key]);
      }
      return transformed;
    }

    return obj;
  };

  return transform(data);
}

// Helper function for API calls with aggressive caching
async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  // Check in-memory cache first
  const cached = cache.get(endpoint);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  const response = await fetch(endpoint, {
    ...options,
    // ✅ Next.js 캐싱: 5분마다 재검증 (더 적극적인 캐싱)
    next: { revalidate: 300 },
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();

  // Transform image URLs
  const transformedData = transformImageUrls(data);

  // Store in memory cache
  cache.set(endpoint, { data: transformedData, timestamp: Date.now() });

  return transformedData;
}

// WooCommerce authenticated API call (or public if no keys)
async function fetchWC(endpoint: string, options: RequestInit = {}) {
  const consumerKey = process.env.WOOCOMMERCE_CONSUMER_KEY;
  const consumerSecret = process.env.WOOCOMMERCE_CONSUMER_SECRET;

  // Use authentication only if keys are provided
  if (consumerKey && consumerSecret && consumerKey !== 'your_consumer_key_here') {
    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
    return fetchAPI(`${WC_API_URL}${endpoint}`, {
      ...options,
      headers: {
        Authorization: `Basic ${auth}`,
        ...options.headers,
      },
    });
  }

  // Public API access (no authentication)
  return fetchAPI(`${WC_API_URL}${endpoint}`, options);
}

// ===== PRODUCTS =====

export async function getProducts(params?: {
  per_page?: number;
  page?: number;
  category?: number;
  lang?: string;
  search?: string;
  on_sale?: boolean;
  featured?: boolean;
}): Promise<WPProduct[]> {
  const queryParams = new URLSearchParams();

  if (params?.per_page) queryParams.append('per_page', params.per_page.toString());
  if (params?.page) queryParams.append('page', params.page.toString());
  if (params?.category) queryParams.append('category', params.category.toString());
  if (params?.search) queryParams.append('search', params.search);
  if (params?.on_sale) queryParams.append('on_sale', 'true');
  if (params?.featured) queryParams.append('featured', 'true');
  if (params?.lang) queryParams.append('lang', params.lang);

  return fetchWC(`/products?${queryParams.toString()}`);
}

export async function getProduct(slug: string, lang?: string): Promise<WPProduct> {
  const queryParams = new URLSearchParams({ slug });
  if (lang) queryParams.append('lang', lang);

  const products = await fetchWC(`/products?${queryParams.toString()}`);

  if (!products || products.length === 0) {
    throw new Error('Product not found');
  }

  return products[0];
}

export async function getProductById(id: number, lang?: string): Promise<WPProduct> {
  const queryParams = lang ? `?lang=${lang}` : '';
  return fetchWC(`/products/${id}${queryParams}`);
}

// ===== CATEGORIES =====

export async function getCategories(params?: {
  per_page?: number;
  parent?: number;
  lang?: string;
}): Promise<WPCategory[]> {
  const queryParams = new URLSearchParams();

  if (params?.per_page) queryParams.append('per_page', params.per_page.toString());
  if (params?.parent !== undefined) queryParams.append('parent', params.parent.toString());
  if (params?.lang) queryParams.append('lang', params.lang);

  return fetchWC(`/products/categories?${queryParams.toString()}`);
}

export async function getCategory(id: number, lang?: string): Promise<WPCategory> {
  const queryParams = lang ? `?lang=${lang}` : '';
  return fetchWC(`/products/categories/${id}${queryParams}`);
}

// ===== ORDERS =====

export async function createOrder(orderData: {
  billing: WPOrder['billing'];
  shipping: WPOrder['shipping'];
  line_items: { product_id: number; quantity: number }[];
  payment_method: string;
  shipping_date?: string;
}): Promise<WPOrder> {
  return fetchWC('/orders', {
    method: 'POST',
    body: JSON.stringify(orderData),
  });
}

export async function getOrder(id: number): Promise<WPOrder> {
  return fetchWC(`/orders/${id}`);
}

// ===== SEARCH =====

export async function searchProducts(query: string, lang?: string): Promise<WPProduct[]> {
  return getProducts({ search: query, lang });
}
