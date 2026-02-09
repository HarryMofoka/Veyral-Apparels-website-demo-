import { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, Box, Shield, Zap } from "lucide-react";

export const metadata: Metadata = {
    title: "About VEYRAL | Design Laboratory",
    description: "VEYRAL is an experimental design laboratory focused on the intersection of utility, minimalism, and advanced material science.",
};

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-[#030303] text-white pt-24 pb-12">
            {/* Hero Section */}
            <section className="container mx-auto px-6 mb-24">
                <div className="max-w-4xl">
                    <h1 className="text-4xl md:text-6xl font-medium tracking-tight mb-8">
                        Constructing the Future <br />
                        <span className="text-neutral-500">of Technical Apparel.</span>
                    </h1>
                    <p className="text-lg md:text-xl text-neutral-400 max-w-2xl leading-relaxed">
                        VEYRAL is an experimental design laboratory focused on the intersection of
                        utility, minimalism, and advanced material science. We do not just make clothes;
                        we engineer adaptable systems for the modern urban environment.
                    </p>
                </div>
            </section>

            {/* Visual Manifest */}
            <section className="container mx-auto px-6 mb-24">
                <div className="relative h-[60vh] w-full rounded-sm overflow-hidden border border-white/5">
                    <Image
                        src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop"
                        alt="Veyral Workshop"
                        fill
                        className="object-cover opacity-60"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent"></div>
                    <div className="absolute bottom-12 left-6 md:left-12">
                        <p className="text-xs uppercase tracking-widest text-neutral-400 mb-2">Established 2024</p>
                        <h2 className="text-2xl font-medium">The Veyral Protocol</h2>
                    </div>
                </div>
            </section>

            {/* Core Pillars */}
            <section className="container mx-auto px-6 mb-24">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="space-y-4">
                        <div className="w-12 h-12 bg-white/5 border border-white/10 rounded flex items-center justify-center mb-4">
                            <Box className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-lg font-medium">Modular Systems</h3>
                        <p className="text-neutral-400 text-sm leading-relaxed">
                            Our garments are designed to work together as a cohesive unit.
                            Layering systems that adapt to changing climates and contexts.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <div className="w-12 h-12 bg-white/5 border border-white/10 rounded flex items-center justify-center mb-4">
                            <Shield className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-lg font-medium">Material Resilience</h3>
                        <p className="text-neutral-400 text-sm leading-relaxed">
                            We utilize high-grade technical fabrics tested for durability,
                            weather resistance, and long-term performance.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <div className="w-12 h-12 bg-white/5 border border-white/10 rounded flex items-center justify-center mb-4">
                            <Zap className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-lg font-medium">Aesthetic Precision</h3>
                        <p className="text-neutral-400 text-sm leading-relaxed">
                            Form follows function, but form is never ignored.
                            Minimalist silhouettes that eliminate the unnecessary.
                        </p>
                    </div>
                </div>
            </section>

            {/* Team / Culture */}
            <section className="container mx-auto px-6 border-t border-white/5 pt-24 text-center">
                <h2 className="text-sm font-medium uppercase tracking-widest text-neutral-500 mb-8">
                    Join the Movement
                </h2>
                <div className="max-w-2xl mx-auto">
                    <p className="text-2xl md:text-3xl font-medium mb-8">
                        "We are building for those who demand more from their everyday carry."
                    </p>
                    <a
                        href="/shop"
                        className="inline-flex items-center gap-2 bg-white text-black px-8 py-3 rounded text-xs font-semibold uppercase tracking-widest hover:bg-neutral-200 transition-colors"
                    >
                        Explore the Collection <ArrowRight className="w-4 h-4" />
                    </a>
                </div>
            </section>
        </div>
    );
}
