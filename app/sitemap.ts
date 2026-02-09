import { MetadataRoute } from 'next';
import { movies } from '@/data/movies';
import { siteConfig } from '@/lib/seo';

// Tạo sitemap động cho website
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  // Static pages
  const staticPages = [
    {
      url: `${baseUrl}/movie/home`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/movie/list-movie`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
  ];

  // Dynamic movie detail pages
  const moviePages = movies.map((movie) => ({
    url: `${baseUrl}/movie/detail?id=${movie.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Combine all pages
  return [...staticPages, ...moviePages];
}
