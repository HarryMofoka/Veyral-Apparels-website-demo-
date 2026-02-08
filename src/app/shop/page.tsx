/**
 * ShopPage Component
 * 
 * The main catalog/shop page for the VEYRAL e-commerce site.
 * Features:
 * - Search functionality (by name, description, tags)
 * - Category filtering with count badges
 * - Tag-based filtering with multi-select
 * - Price range filtering
 * - Multiple sort options (popularity, newest, price)
 * - Responsive grid layout with ProductCard components
 * 
 * @page /shop
 */
"use client";

import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { products, categories, allTags } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export default function ShopPage() {
    /* ================================
       STATE MANAGEMENT
       ================================ */

    // Current category filter - "all" or category ID
    const [selectedCategory, setSelectedCategory] = useState("all");

    // Array of selected tag strings for multi-tag filtering
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    // Current sort method - popularity (default), newest, price-low, price-high
    const [sortBy, setSortBy] = useState("popularity");

    // Search query for filtering by name/description/tags
    const [searchQuery, setSearchQuery] = useState("");

    // Toggle for filter panel visibility on mobile/desktop
    const [showFilters, setShowFilters] = useState(false);

    // Price range tuple [min, max] for price filtering
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);

    /* ================================
       FILTER & SORT LOGIC
       
       Uses useMemo for performance optimization.
       Recalculates only when filter dependencies change.
       Filter order: search → category → tags → price → sort
       ================================ */
    const filteredProducts = useMemo(() => {
        let result = [...products];

        // Step 1: Search filter - matches name, description, or tags
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            result = result.filter(
                (p) =>
                    p.name.toLowerCase().includes(query) ||
                    p.description.toLowerCase().includes(query) ||
                    p.tags.some((tag) => tag.toLowerCase().includes(query))
            );
        }

        // Step 2: Category filter
        if (selectedCategory !== "all") {
            result = result.filter((p) => p.category === selectedCategory);
        }

        // Step 3: Tags filter - product must have at least one selected tag
        if (selectedTags.length > 0) {
            result = result.filter((p) =>
                selectedTags.some((tag) => p.tags.includes(tag))
            );
        }

        // Step 4: Price range filter
        result = result.filter(
            (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
        );

        // Step 5: Sort products by selected method
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
        <div className="min-h-screen bg-[#030303] pt-24 pb-12">
            {/* Header */}
            <section className="mb-12">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-white mb-4">
                        Catalog
                    </h1>
                    <p className="text-neutral-500 max-w-xl mx-auto text-sm">
                        Discover our curated collection of {products.length}+ premium pieces
                        designed for your environment.
                    </p>
                </div>
            </section>

            {/* Search & Toolbar */}
            <section className="border-y border-white/5 bg-[#030303] sticky top-16 z-30 backdrop-blur-md bg-opacity-90">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        {/* Search */}
                        <div className="relative w-full md:w-96">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-10 py-2 bg-neutral-900/50 border border-white/10 rounded-md text-white text-sm focus:outline-none focus:border-white/30 transition-colors placeholder:text-neutral-600"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery("")}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </div>

                        {/* Sort & Filter Toggle */}
                        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-md border text-sm transition-colors ${showFilters
                                    ? "bg-white text-black border-white"
                                    : "bg-transparent text-neutral-400 border-white/10 hover:text-white hover:border-white/30"
                                    }`}
                            >
                                <SlidersHorizontal className="w-4 h-4" />
                                Filters
                                {hasActiveFilters && (
                                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                                )}
                            </button>

                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="px-4 py-2 bg-transparent text-neutral-400 border border-white/10 rounded-md text-sm focus:outline-none focus:border-white/30 hover:text-white cursor-pointer"
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
                <section className="bg-neutral-900/30 border-b border-white/5 py-8">
                    <div className="container mx-auto px-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Categories */}
                            <div>
                                <h3 className="text-white text-xs font-medium uppercase tracking-widest mb-4">
                                    Category
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {categories.map((cat) => (
                                        <button
                                            key={cat.id}
                                            onClick={() => setSelectedCategory(cat.id)}
                                            className={`px-3 py-1.5 rounded text-xs transition-colors border ${selectedCategory === cat.id
                                                ? "bg-white text-black border-white"
                                                : "bg-transparent text-neutral-400 border-white/10 hover:border-white/30 hover:text-white"
                                                }`}
                                        >
                                            {cat.name} <span className="opacity-50 ml-1">{cat.count}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Price Range */}
                            <div>
                                <h3 className="text-white text-xs font-medium uppercase tracking-widest mb-4">
                                    Price Range
                                </h3>
                                <div className="flex items-center gap-2 text-white">
                                    <span className="text-neutral-500">$</span>
                                    <input
                                        type="number"
                                        value={priceRange[0]}
                                        onChange={(e) =>
                                            setPriceRange([Number(e.target.value), priceRange[1]])
                                        }
                                        className="w-20 px-2 py-1 bg-neutral-900 border border-white/10 rounded text-sm focus:outline-none focus:border-white/30"
                                        min="0"
                                    />
                                    <span className="text-neutral-500">-</span>
                                    <span className="text-neutral-500">$</span>
                                    <input
                                        type="number"
                                        value={priceRange[1]}
                                        onChange={(e) =>
                                            setPriceRange([priceRange[0], Number(e.target.value)])
                                        }
                                        className="w-20 px-2 py-1 bg-neutral-900 border border-white/10 rounded text-sm focus:outline-none focus:border-white/30"
                                        min="0"
                                    />
                                </div>
                            </div>

                            {/* Tags */}
                            <div className="md:col-span-1">
                                <h3 className="text-white text-xs font-medium uppercase tracking-widest mb-4">
                                    Tags
                                </h3>
                                <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto pr-2 custom-scrollbar">
                                    {allTags.slice(0, 20).map((tag) => (
                                        <button
                                            key={tag}
                                            onClick={() => toggleTag(tag)}
                                            className={`px-3 py-1.5 rounded text-xs transition-colors border ${selectedTags.includes(tag)
                                                ? "bg-white text-black border-white"
                                                : "bg-transparent text-neutral-400 border-white/10 hover:border-white/30 hover:text-white"
                                                }`}
                                        >
                                            {tag}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Clear Filters */}
                        <div className="mt-8 flex justify-end border-t border-white/5 pt-4">
                            <button
                                onClick={clearFilters}
                                className="text-xs text-neutral-500 hover:text-white transition-colors"
                            >
                                Reset All Filters
                            </button>
                        </div>
                    </div>
                </section>
            )}

            {/* Active Filters Display */}
            {hasActiveFilters && !showFilters && (
                <section className="py-4 border-b border-white/5">
                    <div className="container mx-auto px-6">
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="text-xs text-neutral-500 uppercase tracking-wide mr-2">
                                Active:
                            </span>
                            {selectedCategory !== "all" && (
                                <span className="px-2 py-1 bg-white/10 rounded text-xs text-white flex items-center gap-1 hover:bg-white/20 transition-colors cursor-pointer" onClick={() => setSelectedCategory("all")}>
                                    {selectedCategory}
                                    <X className="w-3 h-3 opacity-70" />
                                </span>
                            )}
                            {selectedTags.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-2 py-1 bg-white/10 rounded text-xs text-white flex items-center gap-1 hover:bg-white/20 transition-colors cursor-pointer"
                                    onClick={() => toggleTag(tag)}
                                >
                                    {tag}
                                    <X className="w-3 h-3 opacity-70" />
                                </span>
                            ))}
                            <button
                                onClick={clearFilters}
                                className="text-xs text-amber-500 hover:text-amber-400 ml-2"
                            >
                                Clear All
                            </button>
                        </div>
                    </div>
                </section>
            )}

            {/* Products Grid */}
            <section className="py-12">
                <div className="container mx-auto px-6">
                    <p className="text-neutral-500 text-xs uppercase tracking-wide mb-8">
                        Showing {filteredProducts.length} Result{filteredProducts.length !== 1 ? "s" : ""}
                    </p>

                    {filteredProducts.length === 0 ? (
                        <div className="text-center py-24 border border-white/5 rounded-lg bg-white/5">
                            <p className="text-xl text-white font-light mb-4">
                                No systems found matching your parameters.
                            </p>
                            <button
                                onClick={clearFilters}
                                className="text-neutral-400 hover:text-white underline text-sm"
                            >
                                Reset filters
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
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
