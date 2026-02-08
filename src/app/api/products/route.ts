import { NextResponse } from "next/server";
import { products } from "@/data/products";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");
    const id = searchParams.get("id");

    let filteredProducts = [...products];

    if (id) {
        const product = products.find((p) => p.id === id);
        if (product) {
            return NextResponse.json(product);
        }
        return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    if (category && category !== "all") {
        filteredProducts = filteredProducts.filter((p) => p.category === category);
    }

    if (featured === "true") {
        filteredProducts = filteredProducts.filter((p) => p.featured);
    }

    return NextResponse.json({
        products: filteredProducts,
        total: filteredProducts.length,
    });
}
