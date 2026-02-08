import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { products, collections } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export default function Home() {
  const featuredProducts = products.filter((p) => p.featured).slice(0, 4);

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="absolute inset-0 bg-black/30" />
        <Image
          src="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=1920"
          alt="Hero"
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="relative z-10 text-center text-white px-6">
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 animate-fade-in">
            Timeless Elegance
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Premium clothing designed for everyday elegance and lasting quality
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/shop"
              className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-full font-medium transition-all hover:-translate-y-1"
            >
              Shop Collection
            </Link>
            <Link
              href="/about"
              className="border-2 border-white hover:bg-white hover:text-black text-white px-8 py-4 rounded-full font-medium transition-all"
            >
              Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold">Featured Products</h2>
            <Link href="/shop" className="flex items-center gap-2 text-amber-600 hover:text-amber-700">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Collections */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center mb-12">
            Our Collections
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-serif font-bold mb-2">{collection.title}</h3>
                  <p className="text-gray-200">{collection.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Join Our Newsletter</h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Subscribe to receive updates on new arrivals, exclusive offers, and style inspiration.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-6 py-4 rounded-full text-black focus:outline-none focus:ring-2 focus:ring-amber-600"
            />
            <button
              type="submit"
              className="bg-amber-600 hover:bg-amber-700 px-8 py-4 rounded-full font-medium transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
