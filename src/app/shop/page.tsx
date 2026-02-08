"use client";

import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { products, categories, allTags } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export default function ShopPage() {
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [sortBy, setSortBy] = useState("popularity");
    const [searchQuery, setSearchQuery] = useState("");
    const [showFilters, setShowFilters] = useState(false);
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);

    // Filter and sort products
    const filteredProducts = useMemo(() => {
        let result = [...products];

        // Filter by search query
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            result = result.filter(
                (p) =>
                    p.name.toLowerCase().includes(query) ||
                    p.description.toLowerCase().includes(query) ||
                    p.tags.some((tag) => tag.toLowerCase().includes(query))
            );
        }

        // Filter by category
        if (selectedCategory !== "all") {
            result = result.filter((p) => p.category === selectedCategory);
        }

        // Filter by tags
        if (selectedTags.length > 0) {
            result = result.filter((p) =>
                selectedTags.some((tag) => p.tags.includes(tag))
            );
        }

        // Filter by price range
        result = result.filter(
            (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
        );

        // Sort
        switch (sortBy) {
            case "price-low":
                result.sort((a, b) => a.price - b.price);
                break;
            case "price-high":
                result.sort((a, b) => b.price - a.price);
                break;
            case "newest":
                result.sort(
                    (a, b) =>
                        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                );
                break;
            case "popularity":
            default:
                result.sort((a, b) => b.popularity - a.popularity);
                break;
        }

        return result;
    }, [selectedCategory, selectedTags, sortBy, searchQuery, priceRange]);

    const toggleTag = (tag: string) => {
        setSelectedTags((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
        );
    };

    const clearFilters = () => {
        setSelectedCategory("all");
        setSelectedTags([]);
        setSearchQuery("");
        setPriceRange([0, 1000]);
    };

    const hasActiveFilters =
        selectedCategory !== "all" ||
        selectedTags.length > 0 ||
        searchQuery.trim() ||
        priceRange[0] > 0 ||
        priceRange[1] < 1000;

    return (
        <div className="min-h-screen">
            {/* Header */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">Shop</h1>
                    <p className="text-gray-600 max-w-xl mx-auto">
                        Discover our curated collection of {products.length}+ premium pieces
                        designed for everyday elegance.
                    </p>
                </div>
            </section>

            {/* Search Bar */}
            <section className="py-6 border-b">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        {/* Search */}
                        <div className="relative w-full md:w-96">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-amber-600"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery("")}
                                    className="absolute right-4 top-1/2 -translate-y-1/2"
                                >
                                    <X className="w-4 h-4 text-gray-400" />
                                </button>
                            )}
                        </div>

                        {/* Sort & Filter Toggle */}
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full border transition ${showFilters ? "bg-gray-900 text-white" : "bg-white hover:bg-gray-50"
                                    }`}
                            >
                                <SlidersHorizontal className="w-4 h-4" />
                                Filters
                                {hasActiveFilters && (
                                    <span className="w-2 h-2 bg-amber-600 rounded-full" />
                                )}
                            </button>

                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
                            >
                                <option value="popularity">Most Popular</option>
                                <option value="newest">Newest First</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                            </select>
                        </div>
                    </div>
                </div>
            </section>

            {/* Filters Panel */}
            {showFilters && (
                <section className="py-6 bg-gray-50 border-b">
                    <div className="container mx-auto px-6">
                        <div className="flex flex-wrap gap-8">
                            {/* Categories */}
                            <div>
                                <h3 className="font-bold mb-3">Category</h3>
                                <div className="flex flex-wrap gap-2">
                                    {categories.map((cat) => (
                                        <button
                                            key={cat.id}
                                            onClick={() => setSelectedCategory(cat.id)}
                                            className={`px-3 py-1 rounded-full text-sm border transition ${selectedCategory === cat.id
                                                    ? "bg-gray-900 text-white border-gray-900"
                                                    : "bg-white border-gray-300 hover:border-gray-900"
                                                }`}
                                        >
                                            {cat.name} ({cat.count})
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Price Range */}
                            <div>
                                <h3 className="font-bold mb-3">Price Range</h3>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="number"
                                        value={priceRange[0]}
                                        onChange={(e) =>
                                            setPriceRange([Number(e.target.value), priceRange[1]])
                                        }
                                        className="w-20 px-2 py-1 border rounded"
                                        min="0"
                                    />
                                    <span>-</span>
                                    <input
                                        type="number"
                                        value={priceRange[1]}
                                        onChange={(e) =>
                                            setPriceRange([priceRange[0], Number(e.target.value)])
                                        }
                                        className="w-20 px-2 py-1 border rounded"
                                        min="0"
                                    />
                                </div>
                            </div>

                            {/* Tags */}
                            <div className="flex-grow">
                                <h3 className="font-bold mb-3">Tags</h3>
                                <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto">
                                    {allTags.slice(0, 20).map((tag) => (
                                        <button
                                            key={tag}
                                            onClick={() => toggleTag(tag)}
                                            className={`px-3 py-1 rounded-full text-sm border transition ${selectedTags.includes(tag)
                                                    ? "bg-amber-600 text-white border-amber-600"
                                                    : "bg-white border-gray-300 hover:border-amber-600"
                                                }`}
                                        >
                                            {tag}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Clear Filters */}
                        {hasActiveFilters && (
                            <button
                                onClick={clearFilters}
                                className="mt-4 text-sm text-amber-600 hover:underline"
                            >
                                Clear all filters
                            </button>
                        )}
                    </div>
                </section>
            )}

            {/* Active Filters Display */}
            {hasActiveFilters && !showFilters && (
                <section className="py-4 border-b">
                    <div className="container mx-auto px-6">
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="text-sm text-gray-500">Active filters:</span>
                            {selectedCategory !== "all" && (
                                <span className="px-3 py-1 bg-gray-100 rounded-full text-sm flex items-center gap-1">
                                    {selectedCategory}
                                    <button onClick={() => setSelectedCategory("all")}>
                                        <X className="w-3 h-3" />
                                    </button>
                                </span>
                            )}
                            {selectedTags.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-3 py-1 bg-amber-100 rounded-full text-sm flex items-center gap-1"
                                >
                                    {tag}
                                    <button onClick={() => toggleTag(tag)}>
                                        <X className="w-3 h-3" />
                                    </button>
                                </span>
                            ))}
                            <button
                                onClick={clearFilters}
                                className="text-sm text-amber-600 hover:underline ml-2"
                            >
                                Clear all
                            </button>
                        </div>
                    </div>
                </section>
            )}

            {/* Products Grid */}
            <section className="py-12">
                <div className="container mx-auto px-6">
                    <p className="text-gray-500 mb-8">
                        {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
                    </p>

                    {filteredProducts.length === 0 ? (
                        <div className="text-center py-16">
                            <p className="text-xl text-gray-500 mb-4">No products found</p>
                            <button
                                onClick={clearFilters}
                                className="text-amber-600 hover:underline"
                            >
                                Clear filters and try again
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {filteredProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
