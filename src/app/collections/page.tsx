import Link from "next/link";
import Image from "next/image";
import { collections, products } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export default function CollectionsPage() {
    return (
        <div className="min-h-screen bg-[#030303] pt-24 pb-12">
            {/* Header */}
            <section className="mb-16">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-white mb-4">
                        Collections
                    </h1>
                    <p className="text-neutral-500 max-w-xl mx-auto text-sm">
                        Curated narratives defining specific environments and use-cases.
                    </p>
                </div>
            </section>

            {/* Collections Grid */}
            <section className="mb-24">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {collections.map((collection) => (
                            <Link
                                key={collection.id}
                                href={`/collections/${collection.id}`}
                                className="group relative h-[400px] rounded-sm overflow-hidden border border-white/5"
                            >
                                <Image
                                    src={collection.image}
                                    alt={collection.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700 grayscale opacity-70 group-hover:opacity-100 group-hover:grayscale-0"
                                />
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                                <div className="absolute bottom-0 left-0 right-0 p-8">
                                    <h2 className="text-2xl font-medium text-white mb-2 tracking-tight">
                                        {collection.title}
                                    </h2>
                                    <p className="text-neutral-300 text-sm mb-4 opacity-80 group-hover:opacity-100 transition-opacity">
                                        {collection.description}
                                    </p>
                                    <span className="inline-flex items-center gap-2 text-white text-xs font-medium uppercase tracking-widest group-hover:gap-4 transition-all">
                                        View Collection
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="py-16 border-t border-white/5">
                <div className="container mx-auto px-6">
                    <h2 className="text-2xl font-medium tracking-tight text-white mb-12 text-center">
                        Season Highlights
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                            className="inline-block border border-white/10 bg-white/5 hover:bg-white hover:text-black text-white px-8 py-3 rounded text-xs font-medium uppercase tracking-widest transition-all"
                        >
                            Access Full Catalog
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
