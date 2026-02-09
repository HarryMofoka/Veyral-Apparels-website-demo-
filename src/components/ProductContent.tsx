"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Minus, Plus, Heart } from "lucide-react";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/utils/helpers";
import ProductCard from "@/components/ProductCard";

export default function ProductContent({ id }: { id: string }) {
    const { addItem, openCart } = useCart();
    const product = products.find((p) => p.id === id);

    const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || "");
    const [selectedColor, setSelectedColor] = useState(product?.colors?.[0]?.name || "");
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState("details");

    if (!product) {
        return (
            <div className="min-h-screen bg-[#030303] flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-medium text-white mb-4">System Error: Product Not Found</h1>
                    <Link href="/shop" className="text-neutral-500 hover:text-white transition-colors underline">
                        Return to Catalog
                    </Link>
                </div>
            </div>
        );
    }

    const handleAddToCart = () => {
        if (!product) return;
        addItem({
            product,
            quantity,
            selectedSize,
            selectedColor,
        });
        openCart();
    };

    const relatedProducts = products
        .filter((p) => p.category === product.category && p.id !== product.id)
        .slice(0, 4);

    return (
        <div className="min-h-screen bg-[#030303] pt-20">
            {/* Breadcrumb */}
            <div className="container mx-auto px-6 py-4">
                <Link
                    href="/shop"
                    className="flex items-center gap-2 text-xs text-neutral-500 hover:text-white transition-colors uppercase tracking-wider"
                >
                    <ChevronLeft className="w-4 h-4" /> Back to Catalog
                </Link>
            </div>

            {/* Product Section */}
            <section className="container mx-auto px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
                    {/* Images */}
                    <div>
                        <div className="relative aspect-[4/5] bg-neutral-900 rounded-sm overflow-hidden border border-white/5">
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                        {/* Thumbnails could go here */}
                    </div>

                    {/* Details */}
                    <div className="flex flex-col justify-center">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="px-2 py-0.5 border border-white/10 rounded text-[10px] uppercase tracking-widest text-neutral-400">
                                {product.category}
                            </span>
                            {product.isNew && (
                                <span className="px-2 py-0.5 bg-white text-black rounded text-[10px] uppercase tracking-widest font-medium">
                                    New Arrival
                                </span>
                            )}
                        </div>

                        <h1 className="text-4xl lg:text-5xl font-medium tracking-tight text-white mb-4">
                            {product.name}
                        </h1>

                        <p className="text-2xl font-light text-white mb-8">
                            {formatPrice(product.price)}
                        </p>

                        <p className="text-neutral-400 text-sm leading-relaxed mb-10 border-l-2 border-white/10 pl-4">
                            {product.description}
                        </p>

                        {/* Color Selection */}
                        {product.colors && product.colors.length > 0 && (
                            <div className="mb-8">
                                <h3 className="text-white text-xs font-medium uppercase tracking-widest mb-3">
                                    Color: <span className="text-neutral-500">{selectedColor}</span>
                                </h3>
                                <div className="flex gap-3">
                                    {product.colors.map((color) => (
                                        <button
                                            key={color.name}
                                            onClick={() => setSelectedColor(color.name)}
                                            className={`w-8 h-8 rounded-full border-2 transition-all ${selectedColor === color.name
                                                ? "border-white ring-2 ring-offset-2 ring-offset-[#030303] ring-white scale-110"
                                                : "border-white/20 hover:border-white/50"
                                                }`}
                                            style={{ backgroundColor: color.hex }}
                                            title={color.name}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Size Selection */}
                        {product.sizes && product.sizes.length > 0 && (
                            <div className="mb-10">
                                <div className="flex justify-between items-center mb-3">
                                    <h3 className="text-white text-xs font-medium uppercase tracking-widest">
                                        Size: <span className="text-neutral-500">{selectedSize}</span>
                                    </h3>
                                    <button className="text-xs text-neutral-500 underline hover:text-white transition-colors">
                                        Sizing Guide
                                    </button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {product.sizes.map((size) => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`min-w-[48px] h-10 px-3 rounded text-xs transition-colors border ${selectedSize === size
                                                ? "bg-white text-black border-white"
                                                : "bg-transparent text-neutral-400 border-white/10 hover:border-white/30 hover:text-white"
                                                }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-10">
                            <div className="flex items-center border border-white/10 rounded h-12 w-32">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="h-full px-3 text-neutral-400 hover:text-white transition-colors flex items-center justify-center flex-1"
                                >
                                    <Minus className="w-4 h-4" />
                                </button>
                                <span className="text-white text-sm font-medium w-8 text-center">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="h-full px-3 text-neutral-400 hover:text-white transition-colors flex items-center justify-center flex-1"
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>

                            <button
                                onClick={handleAddToCart}
                                className="flex-grow h-12 bg-white text-black rounded font-medium text-sm tracking-wide hover:bg-neutral-200 transition-colors uppercase"
                            >
                                Add to Cart
                            </button>

                            <button className="h-12 w-12 border border-white/10 rounded flex items-center justify-center text-neutral-400 hover:text-white hover:border-white/30 transition-colors">
                                <Heart className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Tabs */}
                        <div className="border-t border-white/5 pt-6">
                            <div className="flex gap-8 mb-6 border-b border-white/5">
                                <button
                                    onClick={() => setActiveTab("details")}
                                    className={`pb-4 text-xs font-medium uppercase tracking-widest transition-colors relative ${activeTab === "details" ? "text-white" : "text-neutral-500 hover:text-neutral-300"
                                        }`}
                                >
                                    Specs
                                    {activeTab === "details" && <span className="absolute bottom-0 left-0 w-full h-px bg-white"></span>}
                                </button>
                                <button
                                    onClick={() => setActiveTab("shipping")}
                                    className={`pb-4 text-xs font-medium uppercase tracking-widest transition-colors relative ${activeTab === "shipping" ? "text-white" : "text-neutral-500 hover:text-neutral-300"
                                        }`}
                                >
                                    Delivery
                                    {activeTab === "shipping" && <span className="absolute bottom-0 left-0 w-full h-px bg-white"></span>}
                                </button>
                            </div>

                            <div className="min-h-[100px]">
                                {activeTab === "details" && (
                                    <ul className="list-disc pl-4 space-y-2 text-neutral-400 text-sm leading-relaxed marker:text-neutral-600">
                                        <li>Premium technical fabric blend (Nylon/Polyester)</li>
                                        <li>Water-resistant coating via DWR protocols</li>
                                        <li>Articulated joints for improved mobility</li>
                                        <li>Reinforced stitching at stress points</li>
                                        <li>Manufactured in zero-waste facility</li>
                                    </ul>
                                )}
                                {activeTab === "shipping" && (
                                    <div className="text-neutral-400 text-sm leading-relaxed space-y-2">
                                        <p>Free global shipping on orders over $300.</p>
                                        <p>Standard delivery: 3-5 business days.</p>
                                        <p>Express delivery: 1-2 business days.</p>
                                        <p>Returns accepted within 14 days of receipt in original condition.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
                <section className="py-24 border-t border-white/5">
                    <div className="container mx-auto px-6">
                        <h2 className="text-2xl font-medium tracking-tight text-white mb-12">
                            Compatible Systems
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {relatedProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}
