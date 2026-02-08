"use client";

import Link from "next/link";
import Image from "next/image";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPriceUSD } from "@/utils/helpers";

export default function CartDrawer() {
    const { cart, isCartOpen, closeCart, removeItem, updateItemQuantity, total, itemCount } = useCart();

    if (!isCartOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 z-40 transition-opacity"
                onClick={closeCart}
            />

            {/* Drawer */}
            <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-xl flex flex-col animate-slide-in-right">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <ShoppingBag className="w-5 h-5" />
                        Cart ({itemCount})
                    </h2>
                    <button
                        onClick={closeCart}
                        className="p-2 hover:bg-gray-100 rounded-full transition"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Cart Items */}
                <div className="flex-grow overflow-y-auto p-6">
                    {cart.length === 0 ? (
                        <div className="text-center py-12">
                            <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                            <p className="text-gray-500 mb-4">Your cart is empty</p>
                            <button
                                onClick={closeCart}
                                className="text-amber-600 hover:underline"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {cart.map((item) => (
                                <div
                                    key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                                    className="flex gap-4 pb-4 border-b"
                                >
                                    {/* Product Image */}
                                    <div className="relative w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                        <Image
                                            src={item.product.image}
                                            alt={item.product.name}
                                            fill
                                            className="object-cover"
                                            sizes="80px"
                                        />
                                    </div>

                                    {/* Details */}
                                    <div className="flex-grow">
                                        <div className="flex justify-between">
                                            <div>
                                                <h3 className="font-medium text-sm">{item.product.name}</h3>
                                                <p className="text-xs text-gray-500">
                                                    {item.selectedSize} / {item.selectedColor}
                                                </p>
                                            </div>
                                            <button
                                                onClick={() =>
                                                    removeItem(item.product.id, item.selectedSize, item.selectedColor)
                                                }
                                                className="text-gray-400 hover:text-red-500 transition"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>

                                        <div className="flex items-center justify-between mt-2">
                                            {/* Quantity */}
                                            <div className="flex items-center border rounded-full">
                                                <button
                                                    onClick={() =>
                                                        updateItemQuantity(
                                                            item.product.id,
                                                            item.selectedSize,
                                                            item.selectedColor,
                                                            item.quantity - 1
                                                        )
                                                    }
                                                    disabled={item.quantity <= 1}
                                                    className="p-1 hover:bg-gray-100 rounded-full transition disabled:opacity-50"
                                                >
                                                    <Minus className="w-3 h-3" />
                                                </button>
                                                <span className="px-2 text-sm">{item.quantity}</span>
                                                <button
                                                    onClick={() =>
                                                        updateItemQuantity(
                                                            item.product.id,
                                                            item.selectedSize,
                                                            item.selectedColor,
                                                            item.quantity + 1
                                                        )
                                                    }
                                                    className="p-1 hover:bg-gray-100 rounded-full transition"
                                                >
                                                    <Plus className="w-3 h-3" />
                                                </button>
                                            </div>

                                            <p className="font-bold text-sm">
                                                {formatPriceUSD(item.product.price * item.quantity)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {cart.length > 0 && (
                    <div className="p-6 border-t bg-gray-50">
                        <div className="flex justify-between mb-4">
                            <span className="text-gray-600">Subtotal</span>
                            <span className="font-bold">{formatPriceUSD(total)}</span>
                        </div>
                        <p className="text-xs text-gray-500 mb-4">
                            Shipping and taxes calculated at checkout
                        </p>
                        <Link
                            href="/cart"
                            onClick={closeCart}
                            className="block w-full bg-gray-900 hover:bg-gray-800 text-white py-3 rounded-full text-center font-medium transition mb-2"
                        >
                            View Cart
                        </Link>
                        <Link
                            href="/checkout"
                            onClick={closeCart}
                            className="block w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-full text-center font-medium transition"
                        >
                            Checkout
                        </Link>
                    </div>
                )}
            </div>
        </>
    );
}
