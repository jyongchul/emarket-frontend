// WordPress & WooCommerce Types

export interface WPMedia {
  id: number;
  source_url: string;
  alt_text: string;
  media_details?: {
    width: number;
    height: number;
  };
}

export interface WPProduct {
  id: number;
  name: string;
  slug: string;
  permalink: string;
  date_created: string;
  type: string;
  status: string;
  featured: boolean;
  catalog_visibility: string;
  description: string;
  short_description: string;
  sku: string;
  price: string;
  regular_price: string;
  sale_price: string;
  on_sale: boolean;
  stock_status: string;
  stock_quantity: number | null;
  images: WPMedia[];
  categories: {
    id: number;
    name: string;
    slug: string;
  }[];
  tags: {
    id: number;
    name: string;
    slug: string;
  }[];
  meta_data: {
    id: number;
    key: string;
    value: any;
  }[];
  // Custom fields for used items (중고품 필드)
  brand?: string;
  year?: string;
  tested?: boolean;
  condition?: string;
}

export interface WPCategory {
  id: number;
  count: number;
  description: string;
  name: string;
  slug: string;
  parent: number;
  image?: WPMedia;
}

export interface WPOrder {
  id: number;
  parent_id: number;
  status: string;
  currency: string;
  date_created: string;
  total: string;
  customer_id: number;
  billing: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    address_1: string;
    address_2: string;
    city: string;
    postcode: string;
    country: string;
  };
  shipping: {
    first_name: string;
    last_name: string;
    address_1: string;
    address_2: string;
    city: string;
    postcode: string;
    country: string;
  };
  line_items: {
    id: number;
    name: string;
    product_id: number;
    quantity: number;
    total: string;
  }[];
  shipping_date?: string; // Custom field for delivery date
}

export interface CartItem {
  product: WPProduct;
  quantity: number;
}

export interface Language {
  code: string;
  name: string;
  flag: string;
}
