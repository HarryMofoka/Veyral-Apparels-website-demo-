import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { CartProvider } from "@/context/CartContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "VEYRAL | Technical Luxury",
  description: "Engineered for the modern aesthetic. Technical utility meets refined luxury.",
  openGraph: {
    title: "VEYRAL | Technical Luxury",
    description: "Engineered for the modern aesthetic.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased bg-[#030303] text-[#EDEDED]`}>
        <CartProvider>
          {/* Loader will be handled in a client component or page if needed, 
              but for now passing basic layout elements */}

          {/* We'll update Navbar to be transparent and fixed */}
          <Navbar />

          <CartDrawer />

          {/* Removed pt-20 to allow hero to bleed to top */}
          <main className="min-h-screen">{children}</main>

          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
