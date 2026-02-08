import { NextResponse } from "next/server";
import { products, Product } from "@/data/products";

// In-memory stock management (resets on server restart)
const stockUpdates: Map<string, number> = new Map();

// Get current stock for a product (with any updates applied)
export function getProductStock(productId: string): number {
    const product = products.find((p) => p.id === productId);
    if (!product) return 0;

    // Check if there's an update, otherwise return original stock
    if (stockUpdates.has(productId)) {
        return stockUpdates.get(productId)!;
    }
    return product.stock;
}

// Update stock for a product
export function updateProductStock(productId: string, quantity: number): boolean {
    const currentStock = getProductStock(productId);
    const newStock = currentStock - quantity;

    if (newStock < 0) return false;

    stockUpdates.set(productId, newStock);
    return true;
}

// Reset stock for a product
export function resetProductStock(productId: string): void {
    stockUpdates.delete(productId);
}

// Get product with current stock
export function getProductWithStock(product: Product): Product {
    return {
        ...product,
        stock: getProductStock(product.id),
        inStock: getProductStock(product.id) > 0,
    };
}

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
    const limit = searchParams.get("limit");
    const offset = searchParams.get("offset");

    // Single product lookup by ID
    if (id) {
        const product = products.find((p) => p.id === id);
        if (product) {
            return NextResponse.json({
                success: true,
                product: getProductWithStock(product),
            });
        }
        return NextResponse.json(
            { success: false, error: "Product not found" },
            { status: 404 }
        );
    }

    let filteredProducts = [...products];

    // Search filter
    if (search) {
        const searchLower = search.toLowerCase();
        filteredProducts = filteredProducts.filter(
            (p) =>
                p.name.toLowerCase().includes(searchLower) ||
                p.description.toLowerCase().includes(searchLower) ||
                p.tags.some((tag) => tag.toLowerCase().includes(searchLower))
        );
    }

    // Category filter
    if (category && category !== "all") {
        filteredProducts = filteredProducts.filter(
            (p) => p.category.toLowerCase() === category.toLowerCase()
        );
    }

    // Tags filter
    if (tags) {
        const tagList = tags.split(",").map((t) => t.toLowerCase());
        filteredProducts = filteredProducts.filter((p) =>
            p.tags.some((tag) => tagList.includes(tag.toLowerCase()))
        );
    }

    // Featured filter
    if (featured === "true") {
        filteredProducts = filteredProducts.filter((p) => p.featured);
    }

    // New arrivals filter
    if (isNew === "true") {
        filteredProducts = filteredProducts.filter((p) => p.isNew);
    }

    // Price range filter
    if (minPrice) {
        const min = parseFloat(minPrice);
        filteredProducts = filteredProducts.filter((p) => p.price >= min);
    }
    if (maxPrice) {
        const max = parseFloat(maxPrice);
        filteredProducts = filteredProducts.filter((p) => p.price <= max);
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
                (a, b) =>
                    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
            break;
        case "popularity":
        default:
            filteredProducts.sort((a, b) => b.popularity - a.popularity);
            break;
    }

    // Pagination
    const total = filteredProducts.length;
    const limitNum = limit ? parseInt(limit) : undefined;
    const offsetNum = offset ? parseInt(offset) : 0;

    if (limitNum) {
        filteredProducts = filteredProducts.slice(offsetNum, offsetNum + limitNum);
    }

    // Apply stock updates to all products
    const productsWithStock = filteredProducts.map(getProductWithStock);

    return NextResponse.json({
        success: true,
        products: productsWithStock,
        total,
        limit: limitNum,
        offset: offsetNum,
    });
}
