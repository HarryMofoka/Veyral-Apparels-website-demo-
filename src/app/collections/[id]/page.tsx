"use client";

import { use } from "react";
import Link from "next/link";
import Image from "next/image";
import { collections, products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { ChevronLeft } from "lucide-react";

export default function CollectionDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = use(params);
    const collection = collections.find((c) => c.id === id);

    if (!collection) {
        return (
            <div className="min-h-screen bg-[#030303] flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-medium text-white mb-4">
                        Collection Not Found
                    </h1>
                    <Link
                        href="/collections"
                        className="text-neutral-500 hover:text-white underline text-sm transition-colors"
                    >
                        Return to Collections
                    </Link>
                </div>
            </div>
        );
    }

    const collectionProducts = products.filter((p) =>
        collection.productIds.includes(p.id)
    );

    return (
        <div className="min-h-screen bg-[#030303] pt-20">
            {/* Hero */}
            <section className="relative h-[40vh] min-h-[400px] flex items-center justify-center border-b border-white/5">
                <Image
                    src={collection.image}
                    alt={collection.title}
                    fill
                    className="object-cover grayscale opacity-50"
                    priority
                />
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10 text-center px-6 max-w-4xl">
                    <span className="block text-neutral-400 text-xs uppercase tracking-widest mb-4">Collection Focus</span>
                    <h1 className="text-4xl md:text-6xl font-medium text-white mb-6 tracking-tight">
                        {collection.title}
                    </h1>
                    <p className="text-lg text-neutral-300 max-w-2xl mx-auto font-light leading-relaxed">
                        {collection.description}
                    </p>
                </div>
            </section>

            {/* Breadcrumb */}
            <div className="container mx-auto px-6 py-6 border-b border-white/5">
                <Link
                    href="/collections"
                    className="flex items-center gap-2 text-xs text-neutral-500 hover:text-white transition-colors uppercase tracking-wider w-fit"
                >
                    <ChevronLeft className="w-4 h-4" /> Back to Collections
                </Link>
            </div>

            {/* Products */}
            <section className="py-16">
                <div className="container mx-auto px-6">
                    <p className="text-neutral-500 text-xs uppercase tracking-wide mb-8">
                        Showing {collectionProducts.length} Items
                    </p>

                    {collectionProducts.length === 0 ? (
                        <div className="text-center py-24 border border-white/5 rounded bg-white/5">
                            <p className="text-xl text-white font-light mb-4">
                                No inventory currently in this collection.
                            </p>
                            <Link
                                href="/shop"
                                className="text-neutral-400 hover:text-white underline text-sm"
                            >
                                Browse full catalog
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {collectionProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
