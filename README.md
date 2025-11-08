# E-MARKET Frontend

Modern e-commerce platform built with Next.js 14 and headless WordPress/WooCommerce.

## 🌐 Live Demo

**Production**: https://emarket-frontend-one.vercel.app

## 🏗️ Architecture

- **Frontend**: Next.js 14 (App Router) hosted on Vercel
- **Backend**: WordPress + WooCommerce via Cloudflare Tunnel
- **CMS**: Headless WordPress (https://wp-emarket.whmarketing.org)
- **Deployment**: Automatic deployment via GitHub + Vercel

## ✨ Features

- 🛒 **E-commerce**: Full shopping cart and checkout flow
- 🌍 **Multilingual**: Support for EN, FR, KO
- 📱 **Responsive**: Mobile-first design with Tailwind CSS
- ⚡ **Performance**: Optimized with Next.js SSR/SSG
- 🖼️ **Image Optimization**: Lazy loading with Next.js Image
- 💳 **Payment**: Bank transfer payment method
- 🔒 **Secure**: HTTPS with proper security headers

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- WordPress backend running (with WooCommerce)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/jyongchul/emarket-frontend.git
   cd emarket-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

4. **Configure environment variables**

   Edit `.env.local`:
   ```bash
   # For local development with Docker
   WORDPRESS_API_URL=http://wordpress/wp-json/wp/v2
   WORDPRESS_IMAGE_URL=http://wordpress
   WOOCOMMERCE_API_URL=http://wordpress/wp-json/wc/v3
   NEXT_PUBLIC_SITE_URL=http://localhost:3000

   # For production (Vercel)
   WORDPRESS_API_URL=https://wp-emarket.whmarketing.org/wp-json/wp/v2
   WORDPRESS_IMAGE_URL=https://wp-emarket.whmarketing.org
   WOOCOMMERCE_API_URL=https://wp-emarket.whmarketing.org/wp-json/wc/v3
   NEXT_PUBLIC_SITE_URL=https://emarket-frontend-one.vercel.app
   ```

5. **Run development server**
   ```bash
   npm run dev
   ```

   Open http://localhost:3000 in your browser.

## 📁 Project Structure

```
emarket-frontend/
├── src/
│   ├── app/                  # Next.js App Router pages
│   │   ├── page.tsx         # Home page
│   │   ├── products/        # Product listing
│   │   ├── cart/            # Shopping cart
│   │   ├── checkout/        # Checkout page
│   │   └── api/             # API routes
│   │       └── image/       # Image proxy
│   ├── components/          # React components
│   ├── lib/                 # Utilities and helpers
│   └── types/               # TypeScript types
├── public/                  # Static assets
├── .env.example             # Environment template
├── vercel.json              # Vercel configuration
├── next.config.js           # Next.js configuration
├── tailwind.config.js       # Tailwind CSS config
└── tsconfig.json            # TypeScript config
```

## 🔧 Configuration

### Vercel Deployment

The project is configured for automatic deployment to Vercel:

1. **Environment Variables** (Set in Vercel Dashboard):
   ```
   WORDPRESS_API_URL=https://wp-emarket.whmarketing.org/wp-json/wp/v2
   WORDPRESS_IMAGE_URL=https://wp-emarket.whmarketing.org
   WOOCOMMERCE_API_URL=https://wp-emarket.whmarketing.org/wp-json/wc/v3
   ```

2. **Build Settings** (automatic via vercel.json):
   - Framework: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Region: Seoul (icn1)

### Image Optimization

Images are proxied through `/api/image/[...path]` to:
- Avoid CORS issues
- Enable caching
- Support Vercel deployment

Example:
```
Original: https://wp-emarket.whmarketing.org/wp-content/uploads/2025/11/product.jpg
Proxied:  /api/image/uploads/2025/11/product.jpg
```

## 🛠️ Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Adding New Pages

1. Create a new directory in `src/app/`
2. Add `page.tsx` file
3. Export default component

Example:
```tsx
// src/app/about/page.tsx
export default function AboutPage() {
  return <div>About Page</div>
}
```

### API Routes

API routes are located in `src/app/api/`:

```tsx
// src/app/api/hello/route.ts
export async function GET() {
  return Response.json({ message: 'Hello' })
}
```

## 🎨 Styling

This project uses **Tailwind CSS** for styling:

```tsx
<div className="flex items-center justify-center p-4">
  <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
    Click me
  </button>
</div>
```

## 🔐 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `WORDPRESS_API_URL` | WordPress REST API endpoint | `https://wp-emarket.whmarketing.org/wp-json/wp/v2` |
| `WORDPRESS_IMAGE_URL` | WordPress base URL for images | `https://wp-emarket.whmarketing.org` |
| `WOOCOMMERCE_API_URL` | WooCommerce REST API endpoint | `https://wp-emarket.whmarketing.org/wp-json/wc/v3` |
| `NEXT_PUBLIC_SITE_URL` | Public site URL | `https://emarket-frontend-one.vercel.app` |
| `WOOCOMMERCE_CONSUMER_KEY` | WooCommerce API key (optional) | - |
| `WOOCOMMERCE_CONSUMER_SECRET` | WooCommerce API secret (optional) | - |

## 📦 Dependencies

### Core
- **Next.js 14.2.21**: React framework with App Router
- **React 18.3.1**: UI library
- **TypeScript 5**: Type safety

### Styling
- **Tailwind CSS 3.4.1**: Utility-first CSS framework
- **PostCSS 8**: CSS processing
- **Autoprefixer 10**: CSS vendor prefixes

### Development
- **ESLint**: Code linting
- **eslint-config-next**: Next.js ESLint config

## 🚢 Deployment

### Vercel (Recommended)

1. **Connect GitHub repository** to Vercel
2. **Configure environment variables** in Vercel dashboard
3. **Deploy** - automatic on git push

### Manual Deployment

```bash
# Build the project
npm run build

# Start production server
npm run start
```

## 🔍 Testing

### Perplexity Comet Testing

Testing tasks are documented in `PERPLEXITY_COMET_TASKS.md`:

1. Order process testing
2. Device compatibility testing
3. SEO and performance verification
4. Security audit
5. UX improvement discovery
6. Competitor benchmarking

## 📝 Git Workflow

```bash
# 1. Make changes
git add .

# 2. Commit with descriptive message
git commit -m "feat: add new feature"

# 3. Push to GitHub
git push origin main

# 4. Vercel automatically deploys
```

### Commit Message Convention

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Test changes
- `chore:` Build/tooling changes

## 🐛 Troubleshooting

### Images not loading

1. Check `WORDPRESS_IMAGE_URL` in environment variables
2. Verify WordPress backend is accessible
3. Check browser console for 404 errors

### API errors

1. Verify `WORDPRESS_API_URL` and `WOOCOMMERCE_API_URL`
2. Check WordPress backend is running
3. Verify CORS settings in WordPress

### Build errors

1. Delete `.next` folder and `node_modules`
2. Run `npm install` again
3. Check for TypeScript errors with `npm run lint`

## 📊 Performance

- **PageSpeed Insights**: 100/100 (Desktop)
- **Core Web Vitals**: All green
- **Loading Time**: 1-2 seconds (first load)

## 🔗 Links

- **Production**: https://emarket-frontend-one.vercel.app
- **Repository**: https://github.com/jyongchul/emarket-frontend
- **Backend**: https://wp-emarket.whmarketing.org
- **Documentation**: See `PERPLEXITY_COMET_TASKS.md`

## 👤 Contact

**Company**: (주)하얀모자마케팅 (Whitehat Marketing)
**Representative**: 이종철
**Email**: jyongchul@naver.com
**Phone**: 010-9333-2028

## 📄 License

Private - All rights reserved

---

**Built with ❤️ using Next.js and WordPress**
