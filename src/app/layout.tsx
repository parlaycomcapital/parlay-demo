import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { SessionProvider } from "@/components/SessionProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Parlay — Smart Sports. Smarter Minds.",
  description: "Join the Parlay community where insight meets adrenaline.",
  openGraph: {
    title: "Parlay — Smart Sports. Smarter Minds.",
    description: "Join the Parlay community where insight meets adrenaline.",
    images: ["/assets/brand/hero-banner.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Parlay — Smart Sports. Smarter Minds.",
    description: "Join the Parlay community where insight meets adrenaline.",
    images: ["/assets/brand/hero-banner.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-body antialiased bg-navy text-white`} suppressHydrationWarning={true}>
        <SessionProvider>
          <NavBar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
