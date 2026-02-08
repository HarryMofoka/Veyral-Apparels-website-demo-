import Link from "next/link";
import Image from "next/image";
import { Product } from "@/data/products";
import { formatPriceUSD } from "@/utils/helpers";

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <Link href={`/product/${product.id}`} className="group block fade-up">
            <div className="relative w-full aspect-[4/5] overflow-hidden bg-neutral-900 rounded-md border border-white/5 mb-4">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-opacity duration-500 group-hover:opacity-0 absolute inset-0 z-10"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                {/* Secondary Image (Same for now, could be different) */}
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover absolute inset-0 opacity-80"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />

                {/* Badges */}
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

            <div className="flex justify-between items-start px-1">
                <div>
                    <h3 className="text-white font-medium text-sm tracking-tight group-hover:text-neutral-300 transition-colors">
                        {product.name}
                    </h3>
                    <p className="text-neutral-500 text-xs mt-0.5">
                        {product.category}
                        {product.colors.length > 0 && ` / ${product.colors[0].name}`}
                    </p>
                </div>
                <div className="flex flex-col items-end">
                    <span className="text-white font-medium text-sm">
                        {formatPriceUSD(product.price)}
                    </span>
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
