"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShoppingCart, Archive, Mail } from "lucide-react";
import { products } from "@/data/products";
import { formatPrice } from "@/utils/helpers";
import { useCart } from "@/context/CartContext";

export default function HomeContent() {
    const [isLoading, setIsLoading] = useState(true);
    const { addItem, openCart } = useCart();
    const observerRef = useRef<IntersectionObserver | null>(null);

    // Loading animation
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    // Scroll animations
    useEffect(() => {
        if (isLoading) return;

        observerRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observerRef.current?.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
        );

        const fadeElements = document.querySelectorAll(".fade-up");
        fadeElements.forEach((el) => observerRef.current?.observe(el));

        // Trigger reveal text animation
        const revealElements = document.querySelectorAll(".reveal-text");
        revealElements.forEach((el) => el.classList.add("active"));

        return () => observerRef.current?.disconnect();
    }, [isLoading]);

    // Handle Quick Add
    const handleQuickAdd = (e: React.MouseEvent, productId: string) => {
        e.preventDefault();
        e.stopPropagation();
        const product = products.find((p) => p.id === productId);
        if (product) {
            // Default to first variant if available, or generic
            const defaultSize = product.sizes ? product.sizes[0] : "One Size";
            const defaultColor = product.colors && product.colors[0] ? product.colors[0].name : "Standard";
            addItem({
                product,
                quantity: 1,
                selectedSize: defaultSize,
                selectedColor: defaultColor,
            });
            openCart();
        }
    };

    if (isLoading) {
        return (
            <div className="fixed inset-0 bg-[#030303] z-[9999] flex flex-col items-center justify-center gap-2">
                <div className="text-white text-3xl font-normal tracking-tight">
                    VEYRAL
                </div>
                <div className="h-px w-24 bg-neutral-800 overflow-hidden relative">
                    <div className="absolute inset-0 bg-white w-full -translate-x-full animate-shimmer"></div>
                </div>
            </div>
        );
    }

    // Filter products for "Best Sellers" (just taking first 4 for demo)
    const featuredProducts = products.slice(0, 4);

    return (
        <div className="bg-[#030303] min-h-screen">
            {/* Hero Section */}
            <header className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-grid-pattern">
                {/* Background Overlay */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-[#030303]/80 via-[#030303]/40 to-[#030303] z-10"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#030303_100%)] z-10 opacity-80"></div>
                    <Image
                        src="https://images.unsplash.com/photo-1505022610485-0249ba5b3675?q=80&w=2574&auto=format&fit=crop"
                        alt="Hero"
                        fill
                        className="object-cover opacity-60 grayscale scale-105"
                        priority
                    />
                </div>

                <div className="relative z-20 text-center px-6 max-w-5xl mx-auto pt-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8 reveal-text">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
                        <span className="text-[10px] uppercase tracking-widest text-neutral-300">
                            New Collection Available
                        </span>
                    </div>

                    <h1
                        className="text-5xl md:text-8xl font-medium text-white tracking-tight mb-6 leading-none reveal-text"
                        style={{ transitionDelay: "100ms" }}
                    >
                        SYSTEM
                        <br />
                        <span className="text-neutral-500">UPDATE_24</span>
                    </h1>

                    <p
                        className="text-neutral-400 text-sm max-w-md mx-auto mb-10 leading-relaxed reveal-text"
                        style={{ transitionDelay: "200ms" }}
                    >
                        Engineered for the modern aesthetic. VEYRAL bridges the gap between
                        technical utility and refined luxury.
                    </p>

                    <div
                        className="reveal-text flex justify-center gap-4"
                        style={{ transitionDelay: "300ms" }}
                    >
                        <Link
                            href="/shop"
                            className="group flex items-center gap-2 px-6 py-2.5 bg-white text-black rounded text-xs font-medium hover:bg-neutral-200 transition-all"
                        >
                            Start Browsing
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                        <Link
                            href="/#collections"
                            className="group flex items-center gap-2 px-6 py-2.5 border border-white/10 text-neutral-300 rounded text-xs font-medium hover:bg-white/5 transition-all"
                        >
                            View Lookbook
                        </Link>
                    </div>
                </div>

                <div className="absolute bottom-8 w-full flex justify-between px-8 text-[10px] text-neutral-500 uppercase tracking-widest z-20 border-t border-white/5 pt-4">
                    <span>Ver. 2.0.4</span>
                    <span className="animate-bounce">Scroll to Explore</span>
                    <span>Based in Tokyo</span>
                </div>
            </header>

            {/* Marquee Section */}
            <section className="border-y border-white/5 bg-[#030303] py-5 overflow-hidden relative z-10">
                <div className="whitespace-nowrap flex animate-marquee opacity-60 hover:opacity-100 transition-opacity duration-500">
                    <span className="text-3xl md:text-4xl font-light tracking-tighter text-neutral-700 mx-6">
                        MODULAR DESIGN
                    </span>
                    <span className="text-3xl md:text-4xl font-light tracking-tighter text-white mx-6">
                        TECHNICAL FABRICS
                    </span>
                    <span className="text-3xl md:text-4xl font-light tracking-tighter text-neutral-700 mx-6">
                        PRECISION CUT
                    </span>
                    <span className="text-3xl md:text-4xl font-light tracking-tighter text-white mx-6">
                        VEYRAL SYSTEMS
                    </span>
                    <span className="text-3xl md:text-4xl font-light tracking-tighter text-neutral-700 mx-6">
                        MODULAR DESIGN
                    </span>
                    <span className="text-3xl md:text-4xl font-light tracking-tighter text-white mx-6">
                        TECHNICAL FABRICS
                    </span>
                    <span className="text-3xl md:text-4xl font-light tracking-tighter text-neutral-700 mx-6">
                        PRECISION CUT
                    </span>
                    <span className="text-3xl md:text-4xl font-light tracking-tighter text-white mx-6">
                        VEYRAL SYSTEMS
                    </span>
                </div>
            </section>

            {/* Featured Collections */}
            <section className="py-24 px-6 max-w-[1920px] mx-auto" id="collections">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 fade-up border-b border-white/5 pb-8">
                    <div>
                        <h2 className="text-2xl font-medium tracking-tight text-white mb-2">
                            Curated Systems
                        </h2>
                        <p className="text-neutral-500 text-sm">
                            Categorized specifically for your environment.
                        </p>
                    </div>
                    <Link
                        href="/shop"
                        className="hidden md:flex items-center gap-2 text-xs text-neutral-400 hover:text-white transition-colors mt-6 md:mt-0"
                    >
                        View All Categories <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-neutral-900 border border-neutral-900 rounded-lg overflow-hidden">
                    {/* Collection 1 */}
                    <Link
                        href="/shop?category=outerwear"
                        className="group relative h-[500px] overflow-hidden bg-[#050505] cursor-pointer"
                    >
                        <div className="img-zoom-container h-full w-full relative">
                            <Image
                                src="https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=1000&auto=format&fit=crop"
                                alt="Outerwear"
                                fill
                                className="object-cover img-zoom opacity-60 group-hover:opacity-90 transition-opacity grayscale group-hover:grayscale-0"
                            />
                        </div>
                        <div className="absolute inset-0 flex flex-col justify-between p-8">
                            <div className="text-[10px] text-neutral-400 border border-white/10 self-start px-2 py-1 rounded bg-black/50 backdrop-blur-md">
                                01
                            </div>
                            <div>
                                <h3 className="text-xl font-medium text-white tracking-tight">
                                    Outerwear
                                </h3>
                                <p className="text-neutral-400 text-xs mt-1 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                    Technical Protection
                                </p>
                            </div>
                        </div>
                    </Link>
                    {/* Collection 2 */}
                    <Link
                        href="/shop?category=clothing"
                        className="group relative h-[500px] overflow-hidden bg-[#050505] cursor-pointer"
                    >
                        <div className="img-zoom-container h-full w-full relative">
                            <Image
                                src="https://images.unsplash.com/photo-1534567990186-b4b9b7754b51?q=80&w=1000&auto=format&fit=crop"
                                alt="Base Layers"
                                fill
                                className="object-cover img-zoom opacity-60 group-hover:opacity-90 transition-opacity grayscale group-hover:grayscale-0"
                            />
                        </div>
                        <div className="absolute inset-0 flex flex-col justify-between p-8">
                            <div className="text-[10px] text-neutral-400 border border-white/10 self-start px-2 py-1 rounded bg-black/50 backdrop-blur-md">
                                02
                            </div>
                            <div>
                                <h3 className="text-xl font-medium text-white tracking-tight">
                                    Base Layers
                                </h3>
                                <p className="text-neutral-400 text-xs mt-1 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                    Everyday Uniform
                                </p>
                            </div>
                        </div>
                    </Link>
                    {/* Collection 3 */}
                    <Link
                        href="/shop?category=accessories"
                        className="group relative h-[500px] overflow-hidden bg-[#050505] cursor-pointer"
                    >
                        <div className="img-zoom-container h-full w-full relative">
                            <Image
                                src="https://images.unsplash.com/photo-1605763240004-7e93b172d754?q=80&w=1000&auto=format&fit=crop"
                                alt="Accessories"
                                fill
                                className="object-cover img-zoom opacity-60 group-hover:opacity-90 transition-opacity grayscale group-hover:grayscale-0"
                            />
                        </div>
                        <div className="absolute inset-0 flex flex-col justify-between p-8">
                            <div className="text-[10px] text-neutral-400 border border-white/10 self-start px-2 py-1 rounded bg-black/50 backdrop-blur-md">
                                03
                            </div>
                            <div>
                                <h3 className="text-xl font-medium text-white tracking-tight">
                                    Components
                                </h3>
                                <p className="text-neutral-400 text-xs mt-1 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                    Essential Add-ons
                                </p>
                            </div>
                        </div>
                    </Link>
                </div>
            </section>

            {/* Best Sellers / Shop Section */}
            <section
                id="shop"
                className="py-24 px-6 max-w-[1920px] mx-auto border-t border-white/5 bg-[#030303]"
            >
                <div className="mb-12 fade-up">
                    <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-white">
                        Core Inventory
                    </h2>
                    <p className="text-neutral-500 text-sm mt-2">
                        High demand items from the current season.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
                    {featuredProducts.map((product, index) => (
                        <Link
                            href={`/product/${product.id}`}
                            key={product.id}
                            className="group fade-up"
                            style={{ transitionDelay: `${index * 100}ms` }}
                        >
                            <div className="relative w-full aspect-[4/5] overflow-hidden bg-neutral-900 rounded-md border border-white/5 mb-4">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-cover transition-opacity duration-500 group-hover:opacity-0 absolute inset-0 z-10"
                                />
                                <Image
                                    src={product.image} // In real app, this would be a secondary image
                                    alt={product.name}
                                    fill
                                    className="object-cover absolute inset-0 opacity-80"
                                />

                                <button
                                    onClick={(e) => handleQuickAdd(e, product.id)}
                                    className="absolute bottom-3 right-3 bg-white text-black p-2 rounded-full opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-20 hover:scale-110"
                                >
                                    <ShoppingCart className="w-4 h-4" />
                                </button>

                                {product.isNew && (
                                    <div className="absolute top-3 left-3 bg-white/10 backdrop-blur-md text-white border border-white/10 text-[10px] font-medium px-2 py-1 rounded uppercase z-20">
                                        New
                                    </div>
                                )}
                            </div>
                            <div className="flex justify-between items-start px-1">
                                <div>
                                    <h3 className="text-white font-medium text-sm tracking-tight group-hover:text-neutral-300 transition-colors">
                                        {product.name}
                                    </h3>
                                    <p className="text-neutral-500 text-xs mt-0.5">
                                        {product.category} / {product.colors && product.colors[0] ? product.colors[0].name : "Standard"}
                                    </p>
                                </div>
                                <span className="text-white font-medium text-sm">
                                    {formatPrice(product.price)}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <Link
                        href="/shop"
                        className="inline-block px-8 py-3 rounded border border-white/10 bg-white/5 text-white text-xs font-medium hover:bg-white hover:text-black transition-all duration-300"
                    >
                        Browse Full Catalog
                    </Link>
                </div>
            </section>

            {/* NEW SECTION: Collection Focus */}
            <section className="grid grid-cols-1 lg:grid-cols-2 border-y border-white/5 overflow-hidden">
                <div className="relative h-[600px] lg:h-auto overflow-hidden group border-b lg:border-b-0 lg:border-r border-white/5">
                    <div className="img-zoom-container h-full w-full relative">
                        <Image
                            src="https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?q=80&w=2000&auto=format&fit=crop"
                            alt="Collection Focus"
                            fill
                            className="object-cover img-zoom grayscale opacity-80"
                        />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                </div>
                <div className="bg-[#040404] p-12 lg:p-24 flex flex-col justify-center relative">
                    {/* Decorative background element */}
                    <div className="absolute top-10 right-10 w-32 h-32 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>

                    <div className="flex items-center gap-2 mb-6 fade-up">
                        <span className="w-2 h-2 bg-neutral-700 rounded-full"></span>
                        <span className="text-xs text-neutral-400 uppercase tracking-widest">
                            Focus Series
                        </span>
                    </div>

                    <h2 className="text-4xl lg:text-5xl font-medium text-white tracking-tight mb-6 fade-up">
                        The Monochrome
                        <br />
                        Algorithm
                    </h2>
                    <p className="text-neutral-400 text-sm leading-relaxed mb-10 max-w-md fade-up">
                        Simplifying the wardrobe equation. Our latest drop removes the
                        noise, focusing purely on silhouette, texture, and adaptability.
                    </p>

                    <div className="grid grid-cols-2 gap-4 mb-10 fade-up">
                        <div className="border border-white/5 rounded overflow-hidden relative h-24">
                            <Image
                                src="https://images.unsplash.com/photo-1515347619252-60a6bf4fffce?q=80&w=400&auto=format&fit=crop"
                                alt="Detail 1"
                                fill
                                className="object-cover grayscale opacity-70 hover:opacity-100 transition-opacity"
                            />
                        </div>
                        <div className="border border-white/5 rounded overflow-hidden relative h-24">
                            <Image
                                src="https://images.unsplash.com/photo-1504198458649-3128b932f49e?q=80&w=400&auto=format&fit=crop"
                                alt="Detail 2"
                                fill
                                className="object-cover grayscale opacity-70 hover:opacity-100 transition-opacity"
                            />
                        </div>
                    </div>

                    <div className="fade-up">
                        <Link
                            href="/shop"
                            className="text-white text-xs font-medium border-b border-white/30 pb-0.5 hover:border-white transition-all inline-flex items-center gap-2"
                        >
                            Execute <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Editorial / Brand Section */}
            <section className="py-32 bg-[#030303] relative overflow-hidden border-b border-white/5">
                <div className="absolute inset-0 opacity-10">
                    <Image
                        src="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop"
                        alt="Texture"
                        fill
                        className="object-cover grayscale"
                    />
                </div>
                <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-5xl font-normal tracking-tight text-white mb-8 leading-tight fade-up">
                        &quot;DESIGN IS INTELLIGENCE MADE VISIBLE.&quot;
                    </h2>
                    <p className="text-neutral-500 text-sm tracking-wide max-w-lg mx-auto mb-10 fade-up">
                        We don&apos;t just make clothes; we engineer personal environments.
                        Sustainable materials meet precision manufacturing in a zero-waste
                        facility.
                    </p>
                    <button className="px-6 py-2.5 rounded border border-white/10 text-white text-xs font-medium hover:bg-white hover:text-black transition-colors fade-up bg-black/50 backdrop-blur">
                        Read The Manifesto
                    </button>
                </div>
            </section>

            {/* NEW SECTION: Blog / Journal */}
            <section id="journal" className="py-24 px-6 max-w-[1920px] mx-auto bg-[#030303]">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 fade-up">
                    <div>
                        <h2 className="text-2xl font-medium tracking-tight text-white mb-2">
                            System Logs
                        </h2>
                        <p className="text-neutral-500 text-sm">
                            Updates from the design laboratory.
                        </p>
                    </div>
                    <Link
                        href="#"
                        className="hidden md:flex items-center gap-2 text-xs text-neutral-400 hover:text-white transition-colors mt-6 md:mt-0"
                    >
                        Archive <Archive className="w-4 h-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Blog Post 1 */}
                    <article className="group cursor-pointer fade-up">
                        <div className="overflow-hidden mb-5 h-56 w-full bg-neutral-900 rounded-md border border-white/5 relative">
                            <Image
                                src="https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?q=80&w=800&auto=format&fit=crop"
                                alt="Blog 1"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100 grayscale"
                            />
                        </div>
                        <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest text-neutral-500 mb-2">
                            <span>10.12.24</span>
                            <span className="w-px h-3 bg-neutral-800"></span>
                            <span>Analysis</span>
                        </div>
                        <h3 className="text-lg text-white font-medium tracking-tight mb-2 group-hover:text-neutral-300 transition-colors">
                            The Geometry of Comfort
                        </h3>
                        <p className="text-neutral-500 text-xs line-clamp-2 mb-4 leading-relaxed">
                            Analyzing how angular cuts and fluid drapes coexist in our
                            upcoming winter shell collection.
                        </p>
                        <span className="text-white text-xs font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                            Read <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                    </article>

                    {/* Blog Post 2 */}
                    <article
                        className="group cursor-pointer fade-up"
                        style={{ transitionDelay: "100ms" }}
                    >
                        <div className="overflow-hidden mb-5 h-56 w-full bg-neutral-900 rounded-md border border-white/5 relative">
                            <Image
                                src="https://images.unsplash.com/photo-1516762689617-e1cffcef479d?q=80&w=800&auto=format&fit=crop"
                                alt="Blog 2"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100 grayscale"
                            />
                        </div>
                        <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest text-neutral-500 mb-2">
                            <span>09.28.24</span>
                            <span className="w-px h-3 bg-neutral-800"></span>
                            <span>Fabrication</span>
                        </div>
                        <h3 className="text-lg text-white font-medium tracking-tight mb-2 group-hover:text-neutral-300 transition-colors">
                            Synthetic vs Organic
                        </h3>
                        <p className="text-neutral-500 text-xs line-clamp-2 mb-4 leading-relaxed">
                            Why we blend recycled polymers with organic cotton to create
                            fabrics that last a lifetime.
                        </p>
                        <span className="text-white text-xs font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                            Read <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                    </article>

                    {/* Blog Post 3 */}
                    <article
                        className="group cursor-pointer fade-up"
                        style={{ transitionDelay: "200ms" }}
                    >
                        <div className="overflow-hidden mb-5 h-56 w-full bg-neutral-900 rounded-md border border-white/5 relative">
                            <Image
                                src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=800&auto=format&fit=crop"
                                alt="Blog 3"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100 grayscale"
                            />
                        </div>
                        <div className="flex items-center gap-3 text-[10px] uppercase tracking-widest text-neutral-500 mb-2">
                            <span>09.15.24</span>
                            <span className="w-px h-3 bg-neutral-800"></span>
                            <span>Future</span>
                        </div>
                        <h3 className="text-lg text-white font-medium tracking-tight mb-2 group-hover:text-neutral-300 transition-colors">
                            Zero Waste Protocols
                        </h3>
                        <p className="text-neutral-500 text-xs line-clamp-2 mb-4 leading-relaxed">
                            Implementing our new cutting algorithm to reduce fabric waste by
                            94% across all lines.
                        </p>
                        <span className="text-white text-xs font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                            Read <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                    </article>
                </div>
            </section>

            {/* Newsletter */}
            <section className="py-24 border-t border-white/5 bg-[#030303] bg-grid-pattern relative">
                <div className="max-w-xl mx-auto px-6 text-center relative z-10">
                    <h3 className="text-xl font-medium text-white tracking-tight mb-2">
                        Initialize Subscription
                    </h3>
                    <p className="text-neutral-500 text-xs mb-8">
                        Data on new releases and private sales. No spam.
                    </p>
                    <form className="flex flex-col sm:flex-row gap-3">
                        <div className="relative flex-1">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-500">
                                <Mail className="w-4 h-4" />
                            </div>
                            <input
                                type="email"
                                placeholder="email@address.com"
                                className="w-full bg-white/5 border border-white/10 rounded-md text-white px-4 pl-9 py-2.5 text-xs focus:outline-none focus:border-white/30 focus:bg-white/10 transition-colors placeholder:text-neutral-600"
                            />
                        </div>
                        <button
                            type="button"
                            className="bg-white text-black px-6 py-2.5 rounded-md text-xs font-semibold hover:bg-neutral-200 transition-colors border border-white"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
}
