import { Metadata } from "next";
import HomeContent from "@/components/HomeContent";

export const metadata: Metadata = {
  title: "VEYRAL | Technical Luxury E-Commerce",
  description: "Discover VEYRAL's collection of technical luxury clothing. Engineered for the modern aesthetic with premium fabrics and modular design.",
  openGraph: {
    title: "VEYRAL | Technical Luxury",
    description: "Engineered for the modern aesthetic.",
    type: "website",
    images: [{ url: "https://images.unsplash.com/photo-1505022610485-0249ba5b3675?q=80&w=2574&auto=format&fit=crop" }],
  },
};

export default function Home() {
  return <HomeContent />;
}
