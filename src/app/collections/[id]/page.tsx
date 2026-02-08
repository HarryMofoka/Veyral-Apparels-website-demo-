"use client";

import { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { collections, products } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export default function CollectionDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = use(params);
    const collection = collections.find((c) => c.id === id);

    if (!collection) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Collection not found</h1>
                    <Link href="/collections" className="text-amber-600 hover:underline">
                        Back to Collections
                    </Link>
                </div>
            </div>
        );
    }

    const collectionProducts = products.filter((p) =>
        collection.productIds.includes(p.id)
    );

    return (
        <div className="min-h-screen">
            {/* Hero */}
            <section className="relative h-[50vh] flex items-center justify-center">
                <Image
                    src={collection.image}
                    alt={collection.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="relative z-10 text-center text-white px-6">
                    <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">
                        {collection.title}
                    </h1>
                    <p className="text-xl text-gray-200">{collection.description}</p>
                </div>
            </section>

            {/* Products */}
            <section className="py-16">
                <div className="container mx-auto px-6">
                    <p className="text-gray-500 mb-8">
                        {collectionProducts.length} products in this collection
                    </p>

                    {collectionProducts.length === 0 ? (
                        <div className="text-center py-16">
                            <p className="text-xl text-gray-500 mb-4">
                                No products in this collection yet
                            </p>
                            <Link href="/shop" className="text-amber-600 hover:underline">
                                Browse all products
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {collectionProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Back Link */}
            <section className="pb-16">
                <div className="container mx-auto px-6 text-center">
                    <Link
                        href="/collections"
                        className="text-gray-600 hover:text-black transition"
                    >
                        ← Back to All Collections
                    </Link>
                </div>
            </section>
        </div>
    );
}
