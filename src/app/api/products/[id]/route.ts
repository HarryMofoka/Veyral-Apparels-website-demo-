import { NextResponse } from "next/server";
import { products } from "@/data/products";
import { getProductWithStock } from "../route";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    const product = products.find((p) => p.id === id);

    if (!product) {
        return NextResponse.json(
            { success: false, error: "Product not found" },
            { status: 404 }
        );
    }

    // Get related products (same category, excluding current)
    const relatedProducts = products
        .filter((p) => p.category === product.category && p.id !== product.id)
        .slice(0, 4)
        .map(getProductWithStock);

    return NextResponse.json({
        success: true,
        product: getProductWithStock(product),
        relatedProducts,
    });
}
