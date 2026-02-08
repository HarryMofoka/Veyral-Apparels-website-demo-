import Link from "next/link";
import Image from "next/image";
import { collections, products } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export default function CollectionsPage() {
    return (
        <div className="min-h-screen">
            {/* Header */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">Collections</h1>
                    <p className="text-gray-600 max-w-xl mx-auto">
                        Explore our curated collections, each telling a unique story of style and sophistication.
                    </p>
                </div>
            </section>

            {/* Collections Grid */}
            <section className="py-12">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                        {collections.map((collection) => (
                            <Link
                                key={collection.id}
                                href={`/collections/${collection.id}`}
                                className="group relative h-96 rounded-lg overflow-hidden"
                            >
                                <Image
                                    src={collection.image}
                                    alt={collection.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                                    <h2 className="text-3xl font-serif font-bold mb-2">{collection.title}</h2>
                                    <p className="text-gray-200 mb-4">{collection.description}</p>
                                    <span className="inline-flex items-center gap-2 text-amber-400 group-hover:gap-4 transition-all">
                                        Shop Collection →
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-serif font-bold mb-8 text-center">Featured This Season</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {products
                            .filter((p) => p.featured)
                            .slice(0, 8)
                            .map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                    </div>
                    <div className="text-center mt-12">
                        <Link
                            href="/shop"
                            className="inline-block bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-full font-medium transition"
                        >
                            View All Products
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
