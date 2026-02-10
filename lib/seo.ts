import { Metadata } from 'next';
import { Movie } from '@/types/movie';

// Cấu hình SEO chung cho toàn bộ website
export const siteConfig = {
  name: 'MovieHub - Xem Phim Online Miễn Phí',
  shortName: 'MovieHub',
  description: 'Xem phim online miễn phí chất lượng cao. Phim lẻ, phim bộ, phim chiếu rạp mới nhất 2024-2025. Hàng ngàn bộ phim Việt Nam, Hàn Quốc, Trung Quốc, Thái Lan cập nhật liên tục.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://moviehub.vn',
  ogImage: '/og-image.jpg',
  keywords: [
    'xem phim online',
    'phim mới',
    'phim hay',
    'phim chiếu rạp',
    'phim lẻ',
    'phim bộ',
    'phim Việt Nam',
    'phim Hàn Quốc',
    'phim Trung Quốc',
    'phim Thái Lan',
    'xem phim miễn phí',
    'phim HD',
    'phim full HD',
    'phim 2024',
    'phim 2025',
  ],
  author: 'MovieHub Team',
  creator: '@moviehub',
  publisher: 'MovieHub',
  category: 'Entertainment',
  locale: 'vi_VN',
  alternateLocale: ['en_US'],
};

// Tạo metadata chung
export function createMetadata({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  publishedTime,
  modifiedTime,
  noIndex = false,
}: {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'video.movie';
  publishedTime?: string;
  modifiedTime?: string;
  noIndex?: boolean;
}): Metadata {
  const metaTitle = title ? `${title} | ${siteConfig.shortName}` : siteConfig.name;
  const metaDescription = description || siteConfig.description;
  const metaImage = image || siteConfig.ogImage;
  const metaUrl = url ? `${siteConfig.url}${url}` : siteConfig.url;
  const metaKeywords = keywords?.length
    ? [...keywords, ...siteConfig.keywords].slice(0, 20)
    : siteConfig.keywords;

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: metaKeywords,
    authors: [{ name: siteConfig.author }],
    creator: siteConfig.creator,
    publisher: siteConfig.publisher,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: metaUrl,
    },
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: metaUrl,
      siteName: siteConfig.name,
      images: [
        {
          url: metaImage,
          width: 1200,
          height: 630,
          alt: metaTitle,
        },
      ],
      locale: siteConfig.locale,
      type: type,
      ...(type === 'article' && publishedTime && {
        publishedTime,
        modifiedTime: modifiedTime || publishedTime,
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      images: [metaImage],
      creator: siteConfig.creator,
      site: siteConfig.creator,
    },
    category: siteConfig.category,
    verification: {
      // Thêm verification codes khi có
      // google: 'your-google-verification-code',
      // yandex: 'your-yandex-verification-code',
      // bing: 'your-bing-verification-code',
    },
  };
}

// Tạo metadata cho trang phim (detail)
export function createMovieMetadata(movie: Movie): Metadata {
  const title = `${movie.title} (${movie.year})`;
  const description = `${movie.description} - Đạo diễn: ${movie.director || 'Đang cập nhật'}. Thể loại: ${movie.genres?.join(', ') || 'Đang cập nhật'}. Rating: ${movie.rating}/10. Thời lượng: ${movie.duration}.`;

  const keywords = [
    movie.title,
    `xem ${movie.title}`,
    `phim ${movie.title}`,
    ...(movie.genres?.map(g => g.name) || []),
    movie.director || '',
    `phim ${movie.year}`,
    ...(movie.cast || []),
  ].filter(Boolean);

  return createMetadata({
    title,
    description,
    keywords,
    image: movie.backdrop || movie.poster,
    url: `/movie/detail?id=${movie.id}`,
    type: 'video.movie',
    publishedTime: new Date(movie.year, 0, 1).toISOString(),
  });
}

// Tạo JSON-LD structured data cho phim
export function createMovieStructuredData(movie: Movie) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Movie',
    name: movie.title,
    description: movie.description,
    image: movie.poster,
    dateCreated: `${movie.year}-01-01`,
    genre: movie.genres,
    director: {
      '@type': 'Person',
      name: movie.director || 'Unknown',
    },
    actor: movie.cast?.map((actor) => ({
      '@type': 'Person',
      name: actor,
    })) || [],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: movie.rating,
      bestRating: 10,
      worstRating: 0,
      ratingCount: Math.floor(Math.random() * 10000) + 1000, // Mock data
    },
    duration: movie.duration,
    contentRating: 'PG-13',
    inLanguage: 'vi',
  };
}

// Tạo JSON-LD structured data cho website
export function createWebsiteStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: 'vi',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

// Tạo JSON-LD structured data cho breadcrumb
export function createBreadcrumbStructuredData(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.url}`,
    })),
  };
}

// Tạo JSON-LD structured data cho ItemList (danh sách phim)
export function createMovieListStructuredData(movies: Movie[], listName: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: listName,
    itemListElement: movies.map((movie, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Movie',
        name: movie.title,
        url: `${siteConfig.url}/movie/detail?id=${movie.id}`,
        image: movie.poster,
        dateCreated: `${movie.year}-01-01`,
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: movie.rating,
          bestRating: 10,
        },
      },
    })),
  };
}

// Tạo Organization structured data
export function createOrganizationStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    description: siteConfig.description,
    sameAs: [
      // Thêm các social media links
      // 'https://www.facebook.com/moviehub',
      // 'https://twitter.com/moviehub',
      // 'https://www.instagram.com/moviehub',
    ],
  };
}
