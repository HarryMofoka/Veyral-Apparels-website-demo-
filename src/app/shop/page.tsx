import { Metadata } from "next";
import ShopContent from "@/components/ShopContent";

export const metadata: Metadata = {
    title: "Catalog | VEYRAL",
    description: "Explore the full VEYRAL catalog. Filter by category, price, and tags to find your perfect technical luxury piece.",
};

export default function ShopPage() {
    return <ShopContent />;
}
