import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/seo';

// Tạo Web App Manifest cho PWA
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: '/movie/home',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#ef4444',
    orientation: 'portrait-primary',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
    categories: ['entertainment', 'movies', 'video'],
    lang: 'vi',
  };
}
