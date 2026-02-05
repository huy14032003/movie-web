# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Development server (starts at http://localhost:3000)
npm run dev

# Production build
npm run build

# Start production server (requires build first)
npm start

# Run ESLint
npm run lint
```

## Tech Stack

- **Next.js 16.1.6** with App Router
- **React 19.2.3** (latest)
- **TypeScript** (strict mode)
- **Tailwind CSS 4** with PostCSS
- **GSAP 3.14.2** for animations
- **Swiper 12.1.0** for carousels
- **Floating UI 0.27.17** for tooltips
- **Lucide React 0.563.0** for icons

## Project Architecture

### Directory Structure

- `/app` - Next.js App Router with pages and layouts
  - `/home` - Homepage with hero banner and movie carousels
  - `/detail` - Movie detail pages with full metadata, cast, comments
  - `/list-movie` - Paginated movie grid (8 items/page)
  - `/view-movie` - Video player/streaming interface
  - `/components` - Shared application components
- `/data` - Static movie data (`movies.ts` with 8 movie entries)
- `/types` - TypeScript interfaces (`movie.ts`)
- `/public` - Static assets

### Key Patterns

**1. Animation Architecture (GSAP)**
- `LazySection.tsx` wraps content with scroll-triggered animations
- Animation types: `fade`, `slideUp`, `slideLeft`, `scale`
- Uses IntersectionObserver + GSAP combo for performance
- All sections lazy load with entrance animations

**2. Carousel System (Swiper)**
- `MovieSwiper.tsx` - Flexible carousel supporting landscape (16:9) and portrait (2:3) orientations
- `MovieSwiperGrid.tsx` - Grid layout carousel with responsive rows
- `Banner.tsx` - Featured movies autoplay carousel (7s interval, fade effect)
- Responsive breakpoints: 640px, 768px, 1024px, 1900px

**3. Interactive Components (Floating UI)**
- `MovieTooltip.tsx` uses Floating UI for hover tooltips (500ms open delay, 100ms close delay)
- Portal-based rendering for proper z-index layering
- Auto-positioning with flip, shift, and offset middleware

**4. Client/Server Components**
- All interactive components use `"use client"` directive
- Heavy use of client-side rendering for animations and interactivity
- Server components limited to basic layouts

### Movie Data Model

```typescript
// types/movie.ts
interface Movie {
  id: string;
  title: string;
  description: string;
  year: number;
  rating: number;
  duration: string;
  genre: string[];
  poster: string;
  backdrop?: string;
  director?: string;
  cast?: string[];
  trailer?: string;
  featured?: boolean;
}
```

Import from: `@/types/movie`
Data source: `@/data/movies` (8 Vietnamese movies with Unsplash images)

### Image Configuration

Next.js configured for Unsplash remote images:
```typescript
// next.config.ts
images: {
  remotePatterns: [{
    protocol: 'https',
    hostname: 'images.unsplash.com'
  }]
}
```

### Path Aliases

TypeScript configured with `@/*` alias pointing to project root:
```typescript
import { Movie } from '@/types/movie';
import { movies } from '@/data/movies';
```

### Responsive Breakpoints

Tailwind breakpoints used throughout:
- `sm:` - 640px
- `md:` - 768px
- `lg:` - 1024px
- `xl:` - 1280px
- `2xl:` - 1536px

Swiper custom breakpoints: 640, 768, 1024, 1900

### Localization

Application is in **Vietnamese (Tiếng Việt)**. All UI text, navigation labels, and content use Vietnamese:
- Navigation: "Trang Chủ", "Phim Lẻ", "Phim Bộ", "Rạp Chiếu Phim"
- Buttons: "Xem Ngay", "Tải Xuống", "Chia Sẻ"
- Genres: "Hành Động", "Kinh Dị", "Khoa Học Viễn Tưởng", "Tình Cảm"

### Styling Conventions

- Dark theme first (black background, white text)
- Primary accent colors: red (#ef4444), orange gradients
- Consistent spacing: Tailwind utility classes
- Hover effects: scale, opacity, image zoom transforms
- Text gradients: `bg-gradient-to-r bg-clip-text text-transparent`

### Component Patterns

**Animation Wrapper:**
```tsx
<LazySection animationType="fade" delay={0.2}>
  <YourContent />
</LazySection>
```

**Carousel Usage:**
```tsx
// Landscape 16:9
<MovieSwiper movies={movies} orientation="landscape" />

// Portrait 2:3
<MovieSwiper movies={movies} orientation="portrait" />

// Grid layout
<MovieSwiperGrid movies={movies} />
```

**Movie Tooltip:**
```tsx
<MovieTooltip movie={movie}>
  <div>Trigger element</div>
</MovieTooltip>
```

### Performance Considerations

- Lazy loading sections with IntersectionObserver
- Portal-based tooltips prevent layout thrashing
- No global state management (local component state only)
- Static data (no API calls in current implementation)

### Future Integration Points

- Movie data currently static in `/data/movies.ts`
- Replace with API integration when backend ready
- Movie interface already structured for API responses
- Video player (`/view-movie`) ready for streaming URLs

### ESLint Configuration

Using Next.js recommended config with TypeScript support:
- `eslint-config-next/core-web-vitals`
- `eslint-config-next/typescript`

Ignores: `.next/**`, `out/**`, `build/**`, `next-env.d.ts`
