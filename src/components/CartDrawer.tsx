"use client";

import { X, Plus, Minus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPriceUSD } from "@/utils/helpers";

export default function CartDrawer() {
    const {
        cart,
        isCartOpen,
        closeCart,
        removeItem,
        updateItemQuantity,
        total,
    } = useCart();

    if (!isCartOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 z-[55] transition-opacity"
                onClick={closeCart}
            />

            {/* Drawer */}
            <div className="fixed inset-y-0 right-0 w-full md:w-[400px] bg-[#050505] z-[60] shadow-2xl border-l border-white/5 flex flex-col animate-slide-in-right">
                {/* Header */}
                <div className="h-16 border-b border-white/5 flex items-center justify-between px-6">
                    <h2 className="text-sm font-medium tracking-wide text-white">
                        Cart ({cart.reduce((acc, item) => acc + item.quantity, 0)})
                    </h2>
                    <button
                        onClick={closeCart}
                        className="text-neutral-500 hover:text-white transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {cart.length === 0 ? (
                        <div className="text-center text-neutral-500 py-10 text-sm">
                            Your cart is empty.
                        </div>
                    ) : (
                        cart.map((item) => (
                            <div
                                key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                                className="flex gap-4 group"
                            >
                                <div className="w-20 h-24 bg-neutral-900 overflow-hidden rounded-sm border border-white/5 relative flex-shrink-0">
                                    <Image
                                        src={item.product.image}
                                        alt={item.product.name}
                                        fill
                                        className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                        sizes="80px"
                                    />
                                </div>
                                <div className="flex-1 flex flex-col justify-between py-1">
                                    <div>
                                        <h3 className="text-white font-medium text-xs tracking-wide">
                                            {item.product.name}
                                        </h3>
                                        <p className="text-neutral-500 text-[10px] mt-1 uppercase tracking-wider">
                                            {item.selectedColor} / {item.selectedSize}
                                        </p>
                                    </div>
                                    <div className="flex justify-between items-center text-xs">
                                        <div className="flex items-center gap-2 border border-white/10 rounded px-1">
                                            <button
                                                onClick={() =>
                                                    updateItemQuantity(
                                                        item.product.id,
                                                        item.selectedSize,
                                                        item.selectedColor,
                                                        item.quantity - 1
                                                    )
                                                }
                                                className="p-1 text-neutral-500 hover:text-white"
                                            >
                                                <Minus className="w-3 h-3" />
                                            </button>
                                            <span className="text-neutral-300 w-4 text-center">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() =>
                                                    updateItemQuantity(
                                                        item.product.id,
                                                        item.selectedSize,
                                                        item.selectedColor,
                                                        item.quantity + 1
                                                    )
                                                }
                                                disabled={item.quantity >= item.product.stock}
                                                className="p-1 text-neutral-500 hover:text-white disabled:opacity-30"
                                            >
                                                <Plus className="w-3 h-3" />
                                            </button>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-white font-medium block">
                                                {formatPriceUSD(item.product.price * item.quantity)}
                                            </span>
                                            <button
                                                onClick={() =>
                                                    removeItem(
                                                        item.product.id,
                                                        item.selectedSize,
                                                        item.selectedColor
                                                    )
                                                }
                                                className="text-[10px] text-neutral-600 hover:text-red-500 mt-1"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                {cart.length > 0 && (
                    <div className="p-6 border-t border-white/5 bg-[#050505]">
                        <div className="flex justify-between text-xs mb-6">
                            <span className="text-neutral-400">Total</span>
                            <span className="text-white font-medium">
                                {formatPriceUSD(total)}
                            </span>
                        </div>
                        <Link
                            href="/checkout"
                            onClick={closeCart}
                            className="block w-full bg-white text-black py-3 rounded text-xs font-semibold tracking-wide hover:bg-neutral-200 transition-colors text-center"
                        >
                            Checkout
                        </Link>
                    </div>
                )}
            </div>
        </>
    );
}
