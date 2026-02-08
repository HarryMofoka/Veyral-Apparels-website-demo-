"use client";

import { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Heart, Share2, Minus, Plus } from "lucide-react";
import { products } from "@/data/products";
import { addToCart } from "@/utils/cart";
import { formatPriceUSD } from "@/utils/helpers";
import ProductCard from "@/components/ProductCard";

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const product = products.find((p) => p.id === id);

    const [selectedSize, setSelectedSize] = useState(product?.sizes[2] || "");
    const [selectedColor, setSelectedColor] = useState(product?.colors[0]?.name || "");
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState("details");

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Product not found</h1>
                    <Link href="/shop" className="text-amber-600 hover:underline">
                        Back to Shop
                    </Link>
                </div>
            </div>
        );
    }

    const handleAddToCart = () => {
        addToCart(product, quantity, selectedSize, selectedColor);
        window.dispatchEvent(new Event("cartUpdated"));
        alert(`Added ${quantity} ${product.name} to cart!`);
    };

    const relatedProducts = products
        .filter((p) => p.category === product.category && p.id !== product.id)
        .slice(0, 4);

    return (
        <div className="min-h-screen">
            {/* Breadcrumb */}
            <div className="container mx-auto px-6 py-4">
                <Link href="/shop" className="flex items-center gap-2 text-gray-600 hover:text-black transition">
                    <ChevronLeft className="w-4 h-4" /> Back to Shop
                </Link>
            </div>

            {/* Product Section */}
            <section className="container mx-auto px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Images */}
                    <div>
                        <div className="relative h-[500px] bg-gray-100 rounded-lg overflow-hidden mb-4">
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>

                    {/* Details */}
                    <div>
                        <p className="text-gray-500 mb-2">{product.category}</p>
                        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">{product.name}</h1>
                        <p className="text-3xl font-bold mb-6">{formatPriceUSD(product.price)}</p>
                        <p className="text-gray-600 mb-8">{product.description}</p>

                        {/* Color Selection */}
                        <div className="mb-6">
                            <h3 className="font-bold mb-3">Color</h3>
                            <div className="flex gap-3">
                                {product.colors.map((color) => (
                                    <button
                                        key={color.name}
                                        onClick={() => setSelectedColor(color.name)}
                                        className={`w-10 h-10 rounded-full border-2 transition ${selectedColor === color.name ? "border-gray-900 ring-2 ring-offset-2 ring-gray-900" : "border-gray-300"
                                            }`}
                                        style={{ backgroundColor: color.hex }}
                                        title={color.name}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Size Selection */}
                        <div className="mb-8">
                            <div className="flex justify-between items-center mb-3">
                                <h3 className="font-bold">Size</h3>
                                <button className="text-sm underline text-gray-600">Size Guide</button>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                {product.sizes.map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`px-6 py-3 rounded-full border transition ${selectedSize === size
                                                ? "bg-gray-900 text-white border-gray-900"
                                                : "bg-white border-gray-300 hover:border-gray-900"
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quantity & Add to Cart */}
                        <div className="flex gap-4 mb-8">
                            <div className="flex items-center border rounded-full">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="p-3 hover:bg-gray-100 transition"
                                >
                                    <Minus className="w-5 h-5" />
                                </button>
                                <span className="px-6 font-medium">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="p-3 hover:bg-gray-100 transition"
                                >
                                    <Plus className="w-5 h-5" />
                                </button>
                            </div>
                            <button
                                onClick={handleAddToCart}
                                className="flex-grow bg-amber-600 hover:bg-amber-700 text-white py-4 rounded-full font-medium transition"
                            >
                                Add to Cart
                            </button>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-6 mb-8">
                            <button className="flex items-center gap-2 text-gray-600 hover:text-black transition">
                                <Heart className="w-5 h-5" /> Save for later
                            </button>
                            <button className="flex items-center gap-2 text-gray-600 hover:text-black transition">
                                <Share2 className="w-5 h-5" /> Share
                            </button>
                        </div>

                        {/* Tabs */}
                        <div className="border-t pt-6">
                            <div className="flex gap-8 mb-4">
                                <button
                                    onClick={() => setActiveTab("details")}
                                    className={`pb-2 font-medium ${activeTab === "details" ? "border-b-2 border-black" : "text-gray-500"}`}
                                >
                                    Product Details
                                </button>
                                <button
                                    onClick={() => setActiveTab("shipping")}
                                    className={`pb-2 font-medium ${activeTab === "shipping" ? "border-b-2 border-black" : "text-gray-500"}`}
                                >
                                    Shipping & Returns
                                </button>
                            </div>
                            {activeTab === "details" && (
                                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                                    <li>Premium quality fabric</li>
                                    <li>Sustainable and ethically sourced materials</li>
                                    <li>Designed for comfort and style</li>
                                    <li>Machine washable</li>
                                </ul>
                            )}
                            {activeTab === "shipping" && (
                                <div className="text-gray-600 space-y-2">
                                    <p>Free standard shipping on all orders.</p>
                                    <p>Easy returns within 30 days of purchase.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
                <section className="py-16 bg-gray-50">
                    <div className="container mx-auto px-6">
                        <h2 className="text-3xl font-serif font-bold mb-10 text-center">You May Also Like</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
