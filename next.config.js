/** @type {import('next').NextConfig} */
const nextConfig = {
  // ✅ Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8005',
      },
      {
        protocol: 'http',
        hostname: 'wordpress',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    // 이미지 최적화 설정
    formats: ['image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 3600, // 1시간 캐싱
  },

  // ✅ Environment variables
  env: {
    WORDPRESS_API_URL: process.env.WORDPRESS_API_URL || 'http://wordpress/wp-json/wp/v2',
    WOOCOMMERCE_API_URL: process.env.WOOCOMMERCE_API_URL || 'http://wordpress/wp-json/wc/v3',
  },

  // ✅ Performance optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // ✅ Output standalone for Docker (or 'export' for static)
  output: 'standalone',

  // ✅ Experimental features for better performance
  experimental: {
    optimizePackageImports: ['@/components', '@/lib'],
  },

  // ✅ 정적 생성 강화
  reactStrictMode: true,

  // ✅ 빌드 최적화
  swcMinify: true,

  // ✅ Production optimization
  productionBrowserSourceMaps: false,
}

module.exports = nextConfig
