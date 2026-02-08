import Link from "next/link";
import Image from "next/image";
import { Product } from "@/data/products";
import { formatPriceUSD } from "@/utils/helpers";

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <Link href={`/product/${product.id}`} className="group">
            <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="relative h-64 overflow-hidden bg-gray-100">
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                    {product.isNew && (
                        <span className="absolute top-3 left-3 bg-black text-white text-xs px-2 py-1 rounded">
                            NEW
                        </span>
                    )}
                    {product.featured && (
                        <span className="absolute top-3 right-3 bg-amber-600 text-white text-xs px-2 py-1 rounded">
                            FEATURED
                        </span>
                    )}
                </div>
                <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-amber-600 transition-colors">
                        {product.name}
                    </h3>
                    <p className="text-gray-500 text-sm mb-2 line-clamp-1">
                        {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                        <p className="font-bold text-lg">{formatPriceUSD(product.price)}</p>
                        {product.originalPrice && (
                            <p className="text-gray-400 line-through text-sm">
                                {formatPriceUSD(product.originalPrice)}
                            </p>
                        )}
                    </div>
                    <div className="mt-2 flex gap-1">
                        {product.colors.slice(0, 4).map((color) => (
                            <span
                                key={color.name}
                                className="w-4 h-4 rounded-full border border-gray-200"
                                style={{ backgroundColor: color.hex }}
                                title={color.name}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </Link>
    );
}
