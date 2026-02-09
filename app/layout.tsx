import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/app/Header";
import CursorTrail from "@/app/components/CursorTrail";
import Footer from "@/app/Footer";
import ClickParticles from "@/app/components/ClickParticles";
import { createMetadata } from "@/lib/seo";

// Metadata chính cho toàn bộ website
export const metadata: Metadata = createMetadata({
  title: undefined, // Sử dụng title mặc định từ siteConfig
  description: undefined, // Sử dụng description mặc định từ siteConfig
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="vi">
      <body className={`antialiased bg-black text-white`}>
        {/* Structured Data - Schema.org */}
        <Script
          id="website-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'MovieHub - Xem Phim Online Miễn Phí',
              url: 'https://moviehub.vn',
              description: 'Xem phim online miễn phí chất lượng cao. Phim lẻ, phim bộ, phim chiếu rạp mới nhất 2024-2025.',
              inLanguage: 'vi',
              potentialAction: {
                '@type': 'SearchAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate: 'https://moviehub.vn/search?q={search_term_string}',
                },
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
        <Script
          id="organization-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'MovieHub - Xem Phim Online Miễn Phí',
              url: 'https://moviehub.vn',
              logo: 'https://moviehub.vn/logo.png',
              description: 'Xem phim online miễn phí chất lượng cao. Phim lẻ, phim bộ, phim chiếu rạp mới nhất 2024-2025.',
            }),
          }}
        />
        {/* <CursorTrail /> */}
        <ClickParticles />
        <div className="fixed inset-0 opacity-5 pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1661343320593-127da7a9cc13?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaWxtJTIwcmVlbCUyMHZpbnRhZ2V8ZW58MXx8fHwxNzcwMDI2NjM3fDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        {/* <Header /> */}
        <div className="">
          {children}
        </div>
      </body>
    </html>
  );
}
