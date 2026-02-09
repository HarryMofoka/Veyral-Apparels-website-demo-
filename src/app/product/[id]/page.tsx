import { Metadata } from "next";
import { use } from "react";
import ProductContent from "@/components/ProductContent";
import { products } from "@/data/products";

type Props = {
    params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const product = products.find((p) => p.id === id);

    if (!product) {
        return {
            title: "Product Not Found | VEYRAL",
        };
    }

    return {
        title: `${product.name} | VEYRAL`,
        description: product.description,
        openGraph: {
            title: `${product.name} | VEYRAL`,
            description: product.description,
            images: [product.image],
        },
    };
}

export default function ProductPage({ params }: Props) {
    const { id } = use(params);
    return <ProductContent id={id} />;
}
