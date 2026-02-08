"use client";

import Image from "next/image";
import { Trash2, Minus, Plus } from "lucide-react";
import { CartItem as CartItemType } from "@/utils/cart";
import { formatPriceUSD } from "@/utils/helpers";

interface CartItemProps {
    item: CartItemType;
    onUpdateQuantity: (quantity: number) => void;
    onRemove: () => void;
}

export default function CartItem({
    item,
    onUpdateQuantity,
    onRemove,
}: CartItemProps) {
    const { product, quantity, selectedSize, selectedColor } = item;

    return (
        <div className="flex gap-4 py-6 border-b border-white/5 last:border-0 fade-up">
            {/* Product Image */}
            <div className="relative w-24 h-24 bg-neutral-900 rounded-sm overflow-hidden flex-shrink-0 border border-white/5">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="96px"
                />
            </div>

            {/* Product Details */}
            <div className="flex-grow flex flex-col justify-between">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="font-medium text-white text-sm tracking-wide">{product.name}</h3>
                        <p className="text-xs text-neutral-500 mt-1 uppercase tracking-wider">
                            {selectedSize} / {selectedColor}
                        </p>
                    </div>
                    <p className="font-medium text-white text-sm">
                        {formatPriceUSD(product.price * quantity)}
                    </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center border border-white/10 rounded">
                        <button
                            onClick={() => onUpdateQuantity(quantity - 1)}
                            className="p-1.5 hover:bg-white/5 transition text-neutral-400 hover:text-white disabled:opacity-30"
                            disabled={quantity <= 1}
                        >
                            <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 min-w-[32px] text-center text-xs text-white bg-transparent">
                            {quantity}
                        </span>
                        <button
                            onClick={() => onUpdateQuantity(quantity + 1)}
                            className="p-1.5 hover:bg-white/5 transition text-neutral-400 hover:text-white"
                        >
                            <Plus className="w-3.5 h-3.5" />
                        </button>
                    </div>

                    <button
                        onClick={onRemove}
                        className="text-xs text-neutral-600 hover:text-red-500 transition-colors flex items-center gap-1"
                    >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Remove</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
