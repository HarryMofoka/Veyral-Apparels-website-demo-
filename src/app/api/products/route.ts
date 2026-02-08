import { NextResponse } from "next/server";
import { products, Product } from "@/data/products";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");
    const isNew = searchParams.get("new");
    const search = searchParams.get("search");
    const sort = searchParams.get("sort");
    const id = searchParams.get("id");
    const tags = searchParams.get("tags");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");

    // Single product lookup
    if (id) {
        const product = products.find((p: Product) => p.id === id);
        if (product) {
            return NextResponse.json(product);
        }
        return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    let filteredProducts = [...products];

    // Search filter
    if (search) {
        const query = search.toLowerCase();
        filteredProducts = filteredProducts.filter(
            (p: Product) =>
                p.name.toLowerCase().includes(query) ||
                p.description.toLowerCase().includes(query) ||
                p.tags.some((tag) => tag.toLowerCase().includes(query))
        );
    }

    // Category filter
    if (category && category !== "all") {
        filteredProducts = filteredProducts.filter((p: Product) => p.category === category);
    }

    // Tags filter
    if (tags) {
        const tagList = tags.split(",");
        filteredProducts = filteredProducts.filter((p: Product) =>
            tagList.some((tag) => p.tags.includes(tag))
        );
    }

    // Featured filter
    if (featured === "true") {
        filteredProducts = filteredProducts.filter((p: Product) => p.featured);
    }

    // New arrivals filter
    if (isNew === "true") {
        filteredProducts = filteredProducts.filter((p: Product) => p.isNew);
    }

    // Price range filter
    if (minPrice) {
        filteredProducts = filteredProducts.filter((p: Product) => p.price >= Number(minPrice));
    }
    if (maxPrice) {
        filteredProducts = filteredProducts.filter((p: Product) => p.price <= Number(maxPrice));
    }

    // Sorting
    switch (sort) {
        case "price-low":
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case "price-high":
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case "newest":
            filteredProducts.sort(
                (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
            break;
        case "popularity":
        default:
            filteredProducts.sort((a, b) => b.popularity - a.popularity);
            break;
    }

    return NextResponse.json({
        products: filteredProducts,
        total: filteredProducts.length,
    });
}
