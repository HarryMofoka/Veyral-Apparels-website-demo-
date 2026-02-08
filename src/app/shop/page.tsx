"use client";

import { useState } from "react";
import { products, categories } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export default function ShopPage() {
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [sortBy, setSortBy] = useState("featured");

    const filteredProducts = products.filter((product) => {
        if (selectedCategory === "all") return true;
        return product.category === selectedCategory;
    });

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sortBy) {
            case "price-low":
                return a.price - b.price;
            case "price-high":
                return b.price - a.price;
            case "newest":
                return b.isNew ? 1 : -1;
            default:
                return b.featured ? 1 : -1;
        }
    });

    return (
        <div className="min-h-screen">
            {/* Header */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">Shop</h1>
                    <p className="text-gray-600 max-w-xl mx-auto">
                        Discover our curated collection of premium clothing designed for everyday elegance.
                    </p>
                </div>
            </section>

            {/* Filters */}
            <section className="py-8 border-b">
                <div className="container mx-auto px-6">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        {/* Category Filter */}
                        <div className="flex flex-wrap gap-2">
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => setSelectedCategory(category.id)}
                                    className={`px-4 py-2 rounded-full border transition ${selectedCategory === category.id
                                            ? "bg-gray-900 text-white border-gray-900"
                                            : "bg-white text-gray-700 border-gray-300 hover:border-gray-900"
                                        }`}
                                >
                                    {category.name} ({category.count})
                                </button>
                            ))}
                        </div>

                        {/* Sort */}
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
                        >
                            <option value="featured">Featured</option>
                            <option value="newest">Newest</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                        </select>
                    </div>
                </div>
            </section>

            {/* Products Grid */}
            <section className="py-12">
                <div className="container mx-auto px-6">
                    <p className="text-gray-500 mb-8">{sortedProducts.length} products</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {sortedProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
