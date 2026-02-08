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

export default function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
    const { product, quantity, selectedSize, selectedColor } = item;

    return (
        <div className="flex gap-4 py-6 border-b border-gray-200">
            {/* Product Image */}
            <div className="relative w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="96px"
                />
            </div>

            {/* Product Details */}
            <div className="flex-grow">
                <div className="flex justify-between">
                    <div>
                        <h3 className="font-semibold text-gray-900">{product.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">
                            Size: {selectedSize} | Color: {selectedColor}
                        </p>
                    </div>
                    <p className="font-bold text-lg">{formatPriceUSD(product.price * quantity)}</p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center border rounded-full">
                        <button
                            onClick={() => onUpdateQuantity(quantity - 1)}
                            className="p-2 hover:bg-gray-100 rounded-full transition"
                            disabled={quantity <= 1}
                        >
                            <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-4 min-w-[40px] text-center">{quantity}</span>
                        <button
                            onClick={() => onUpdateQuantity(quantity + 1)}
                            className="p-2 hover:bg-gray-100 rounded-full transition"
                        >
                            <Plus className="w-4 h-4" />
                        </button>
                    </div>

                    <button
                        onClick={onRemove}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-full transition"
                    >
                        <Trash2 className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
