import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/app/Header";
import CursorTrail from "@/app/components/CursorTrail";
import Footer from "@/app/Footer";
import ClickParticles from "@/app/components/ClickParticles";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className={`antialiased bg-black text-white`}>
        <CursorTrail />
        <ClickParticles />
        <div className="fixed inset-0 opacity-5 pointer-events-none">
          <img
            src="https://images.unsplash.com/photo-1661343320593-127da7a9cc13?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaWxtJTIwcmVlbCUyMHZpbnRhZ2V8ZW58MXx8fHwxNzcwMDI2NjM3fDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <Header />
        <div className="">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
