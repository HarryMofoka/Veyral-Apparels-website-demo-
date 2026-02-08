/**
 * ProductCard Component
 * 
 * A reusable product display card for the VEYRAL e-commerce site.
 * Features:
 * - Intersection Observer for scroll-triggered fade-up animation
 * - Dual image layering for hover swap effect
 * - Dynamic badge display (New, Featured, Sold Out)
 * - Responsive pricing with optional original price strikethrough
 * 
 * @component
 * @example
 * <ProductCard product={productData} />
 */
import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/data/products";
import { formatPriceUSD } from "@/utils/helpers";

/**
 * Props interface for ProductCard
 * @interface ProductCardProps
 * @property {Product} product - The product data object to display
 */
interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    // Reference to the card element for intersection observer targeting
    const cardRef = useRef<HTMLAnchorElement>(null);

    /**
     * Intersection Observer Setup
     * 
     * Creates an observer that watches when the card enters the viewport.
     * When 10% of the card is visible, it adds the 'visible' class
     * which triggers the fade-up CSS animation defined in globals.css.
     * 
     * The observer is disconnected after first intersection to prevent
     * re-triggering the animation on subsequent scrolls.
     */
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        // Add 'visible' class to trigger fade-up animation
                        entry.target.classList.add("visible");
                        // Stop observing after animation is triggered
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 } // Trigger when 10% of element is visible
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        // Cleanup: remove observer on component unmount
        return () => {
            if (cardRef.current) {
                observer.unobserve(cardRef.current);
            }
        };
    }, []);

    return (
        <Link
            ref={cardRef}
            href={`/product/${product.id}`}
            className="group block fade-up" // 'fade-up' starts invisible, 'visible' class shows it
        >
            {/* 
              * Product Image Container
              * Uses aspect-ratio for consistent sizing across product grid.
              * Contains two overlapping images for hover swap effect.
              */}
            <div className="relative w-full aspect-[4/5] overflow-hidden bg-neutral-900 rounded-md border border-white/5 mb-4">
                {/* 
                  * Primary Image (Front)
                  * Visible by default, fades out on hover to reveal secondary image.
                  * z-10 ensures it sits above the secondary image.
                  */}
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-opacity duration-500 group-hover:opacity-0 absolute inset-0 z-10"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                {/* 
                  * Secondary Image (Back)
                  * Always visible at 80% opacity, revealed when primary fades.
                  * In production, this would be a different product angle/view.
                  */}
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover absolute inset-0 opacity-80"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />

                {/* 
                  * Product Badges
                  * Positioned top-left, stacked vertically.
                  * z-20 ensures badges appear above both images.
                  * Badges: New (white), Featured (amber), Sold Out (red)
                  */}
                <div className="absolute top-3 left-3 flex flex-col gap-2 z-20">
                    {product.isNew && (
                        <span className="bg-white/10 backdrop-blur-md text-white border border-white/10 text-[10px] font-medium px-2 py-1 rounded uppercase">
                            New
                        </span>
                    )}
                    {product.featured && (
                        <span className="bg-amber-600/80 backdrop-blur-md text-white text-[10px] font-medium px-2 py-1 rounded uppercase">
                            Featured
                        </span>
                    )}
                    {!product.inStock && (
                        <span className="bg-red-500/80 backdrop-blur-md text-white text-[10px] font-medium px-2 py-1 rounded uppercase">
                            Sold Out
                        </span>
                    )}
                </div>
            </div>

            {/* 
              * Product Info Section
              * Displays product name, category/color, current price, and optional original price.
              * Layout: left side = name/category, right side = pricing
              */}
            <div className="flex justify-between items-start px-1">
                <div>
                    {/* Product name with hover color transition */}
                    <h3 className="text-white font-medium text-sm tracking-tight group-hover:text-neutral-300 transition-colors">
                        {product.name}
                    </h3>
                    {/* Category and first available color */}
                    <p className="text-neutral-500 text-xs mt-0.5">
                        {product.category}
                        {product.colors.length > 0 && ` / ${product.colors[0].name}`}
                    </p>
                </div>
                {/* Pricing section with optional strikethrough for discounted items */}
                <div className="flex flex-col items-end">
                    <span className="text-white font-medium text-sm">
                        {formatPriceUSD(product.price)}
                    </span>
                    {/* Show original price if item is discounted */}
                    {product.originalPrice && (
                        <span className="text-neutral-600 line-through text-xs">
                            {formatPriceUSD(product.originalPrice)}
                        </span>
                    )}
                </div>
            </div>
        </Link>
    );
}

