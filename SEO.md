# SEO Implementation Guide - MovieHub

Tài liệu hướng dẫn SEO cho ứng dụng web phim MovieHub.

## 📋 Tổng Quan

Hệ thống SEO đã được triển khai đầy đủ bao gồm:

- ✅ **Metadata động** cho tất cả các trang
- ✅ **Open Graph** tags cho social media
- ✅ **Twitter Card** tags
- ✅ **Structured Data (JSON-LD)** cho phim, danh sách, breadcrumb
- ✅ **Sitemap.xml** tự động
- ✅ **Robots.txt** tối ưu
- ✅ **Web App Manifest** cho PWA
- ✅ **Canonical URLs**
- ✅ **Alt text** cho images

## 🗂️ Cấu Trúc File

```
/lib
  └── seo.ts                    # SEO config & helper functions
/app
  ├── layout.tsx                # Root layout với metadata chung
  ├── sitemap.ts                # Dynamic sitemap generator
  ├── robots.ts                 # Robots.txt generator
  ├── manifest.ts               # PWA manifest
  └── /movie
      ├── layout.tsx            # Movie section metadata
      ├── /home
      │   └── page.tsx          # Homepage với metadata
      ├── /detail
      │   └── page.tsx          # Detail page với dynamic metadata
      └── /list-movie
          └── page.tsx          # List page với metadata
```

## 🔧 Cấu Hình

### 1. Cấu hình Site Config

File: `/lib/seo.ts`

```typescript
export const siteConfig = {
  name: 'MovieHub - Xem Phim Online Miễn Phí',
  shortName: 'MovieHub',
  description: '...',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://moviehub.vn',
  ogImage: '/og-image.jpg',
  keywords: [...],
  // ...
};
```

**⚠️ Cần cập nhật:**
- `NEXT_PUBLIC_SITE_URL` trong `.env.local` và `.env.production`
- Domain thực tế của bạn

### 2. Environment Variables

Tạo file `.env.local`:

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

Tạo file `.env.production`:

```env
NEXT_PUBLIC_SITE_URL=https://moviehub.vn
```

## 📝 Sử Dụng

### Tạo Metadata Cho Trang Mới

```typescript
import { createMetadata } from '@/lib/seo';

export const metadata = createMetadata({
  title: 'Tiêu đề trang',
  description: 'Mô tả trang',
  keywords: ['keyword1', 'keyword2'],
  url: '/duong-dan-trang',
});
```

### Tạo Structured Data Cho Phim

```typescript
import { createMovieStructuredData } from '@/lib/seo';
import Script from 'next/script';

const movie = {...}; // Movie object
const structuredData = createMovieStructuredData(movie);

<Script
  id="movie-structured-data"
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(structuredData),
  }}
/>
```

### Tạo Breadcrumb

```typescript
import { createBreadcrumbStructuredData } from '@/lib/seo';

const breadcrumbData = createBreadcrumbStructuredData([
  { name: 'Trang Chủ', url: '/movie/home' },
  { name: 'Phim', url: '/movie/list-movie' },
  { name: movie.title, url: `/movie/detail?id=${movie.id}` },
]);
```

## 🎯 Các Trang Đã Tối Ưu

### 1. Homepage (`/movie/home`)
- ✅ Metadata: Trang chủ với keywords chính
- ✅ Structured Data: ItemList cho phim nổi bật
- ✅ H1, H2 tags hợp lý
- ✅ Internal links

### 2. List Movie (`/movie/list-movie`)
- ✅ Metadata: Danh sách phim
- ✅ Structured Data: ItemList cho tất cả phim
- ✅ Breadcrumb structured data
- ✅ Pagination ready

### 3. Movie Detail (`/movie/detail`)
- ✅ Dynamic metadata theo từng phim
- ✅ Movie structured data (Schema.org/Movie)
- ✅ Breadcrumb
- ✅ Rich snippets ready

## 🚀 URLs Quan Trọng

Sau khi deploy, các URLs này sẽ tự động available:

- **Sitemap:** `https://your-domain.com/sitemap.xml`
- **Robots:** `https://your-domain.com/robots.txt`
- **Manifest:** `https://your-domain.com/manifest.json`

## ✅ Checklist Trước Deploy

### Bắt buộc:
- [ ] Cập nhật `NEXT_PUBLIC_SITE_URL` trong production env
- [ ] Tạo `/public/og-image.jpg` (1200x630px)
- [ ] Tạo `/public/logo.png`
- [ ] Tạo PWA icons (`/public/icon-192x192.png`, `/public/icon-512x512.png`)
- [ ] Verify tất cả internal links hoạt động
- [ ] Test metadata trên tất cả pages

### Khuyến nghị:
- [ ] Submit sitemap lên Google Search Console
- [ ] Submit sitemap lên Bing Webmaster Tools
- [ ] Cài đặt Google Analytics
- [ ] Cài đặt Google Tag Manager
- [ ] Add verification meta tags (Google, Bing)
- [ ] Test structured data với [Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Test social sharing preview với [Open Graph Debugger](https://www.opengraph.xyz/)

## 🔍 Testing SEO

### 1. Kiểm tra Metadata

```bash
# Dev mode
npm run dev

# Visit các trang và view page source:
# - http://localhost:3000/movie/home
# - http://localhost:3000/movie/list-movie
# - http://localhost:3000/movie/detail?id=1
```

### 2. Kiểm tra Sitemap

```
http://localhost:3000/sitemap.xml
```

### 3. Kiểm tra Robots

```
http://localhost:3000/robots.txt
```

### 4. Kiểm tra Structured Data

Sử dụng các tools:
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Schema.org Validator](https://validator.schema.org/)
- Chrome DevTools > Lighthouse > SEO

### 5. Kiểm tra Open Graph

- [Open Graph Debugger](https://www.opengraph.xyz/)
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)

## 📊 SEO Performance Tips

### Images
```typescript
import Image from 'next/image';

<Image
  src={movie.poster}
  alt={`Poster phim ${movie.title}`}  // Always add descriptive alt
  width={300}
  height={450}
  loading="lazy"
/>
```

### Links
```typescript
import Link from 'next/link';

<Link href={`/movie/detail?id=${movie.id}`}>
  {movie.title}  // Use descriptive link text
</Link>
```

### Headers
- Mỗi trang chỉ có 1 `<h1>`
- Sử dụng hierarchy: h1 > h2 > h3
- Include keywords trong headers

## 🎨 Social Media Preview

### Facebook/LinkedIn
- Image size: 1200x630px
- Format: JPG hoặc PNG
- File: `/public/og-image.jpg`

### Twitter
- Card type: summary_large_image
- Same image với Facebook

## 📱 Mobile SEO

- ✅ Responsive design (Tailwind breakpoints)
- ✅ Mobile-friendly meta viewport
- ✅ Touch-friendly buttons (min 44x44px)
- ✅ Fast loading với lazy loading
- ✅ PWA ready với manifest

## 🔗 Internal Linking Strategy

Đảm bảo các links này tồn tại:
- Homepage → List Movie
- Homepage → Featured Movies → Movie Detail
- List Movie → Movie Detail
- Movie Detail → Related Movies (future)
- Footer links → All major pages

## 📈 Analytics Setup (Optional)

### Google Analytics 4

1. Tạo GA4 property
2. Thêm vào `app/layout.tsx`:

```typescript
import Script from 'next/script';

// In <body>
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`}
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  `}
</Script>
```

## 🛠️ Maintenance

### Cập nhật Sitemap
- Sitemap tự động rebuild mỗi khi deploy
- Thêm movies mới vào `/data/movies.ts` → sitemap tự cập nhật

### Cập nhật Keywords
- Edit `/lib/seo.ts` → `siteConfig.keywords`

### Cập nhật Metadata
- Global: `/app/layout.tsx`
- Per page: trong từng `page.tsx`

## 🆘 Troubleshooting

### Sitemap không hiển thị
```bash
# Build lại
npm run build
npm start

# Check http://localhost:3000/sitemap.xml
```

### Structured Data lỗi
- Validate với Schema.org validator
- Check JSON syntax
- Ensure all required fields exist

### OG Image không hiển thị
- Check file path `/public/og-image.jpg`
- Verify image size 1200x630px
- Clear social media cache

## 📚 Resources

- [Next.js Metadata API](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- [Schema.org Movie Type](https://schema.org/Movie)
- [Google Search Central](https://developers.google.com/search)
- [Open Graph Protocol](https://ogp.me/)

---

**Lưu ý:** File này chứa hướng dẫn chi tiết về SEO implementation. Đọc kỹ trước khi deploy production.
