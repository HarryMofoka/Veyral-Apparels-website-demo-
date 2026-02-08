"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingBag, ArrowRight } from "lucide-react";
import {
    getCart,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    CartItem as CartItemType,
} from "@/utils/cart";
import { formatPriceUSD } from "@/utils/helpers";
import CartItem from "@/components/CartItem";

export default function CartPage() {
    const [cart, setCart] = useState<CartItemType[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setCart(getCart());
        setIsLoaded(true);

        const handleStorage = () => setCart(getCart());
        window.addEventListener("cartUpdated", handleStorage);
        return () => window.removeEventListener("cartUpdated", handleStorage);
    }, []);

    const handleUpdateQuantity = (
        productId: string,
        selectedSize: string,
        selectedColor: string,
        quantity: number
    ) => {
        const updatedCart = updateQuantity(
            productId,
            selectedSize,
            selectedColor,
            quantity
        );
        setCart(updatedCart);
        window.dispatchEvent(new Event("cartUpdated"));
    };

    const handleRemove = (
        productId: string,
        selectedSize: string,
        selectedColor: string
    ) => {
        const updatedCart = removeFromCart(productId, selectedSize, selectedColor);
        setCart(updatedCart);
        window.dispatchEvent(new Event("cartUpdated"));
    };

    const subtotal = getCartTotal(cart);
    const shipping = subtotal > 100 ? 0 : 10;
    const total = subtotal + shipping;

    if (!isLoaded) {
        return (
            <div className="min-h-screen bg-[#030303] flex items-center justify-center">
                <div className="text-white animate-pulse text-sm tracking-widest uppercase">
                    Loading System...
                </div>
            </div>
        );
    }

    if (cart.length === 0) {
        return (
            <div className="min-h-screen bg-[#030303] flex items-center justify-center pt-20">
                <div className="text-center">
                    <ShoppingBag className="w-12 h-12 mx-auto mb-6 text-neutral-700" />
                    <h1 className="text-2xl font-medium text-white mb-4 tracking-tight">
                        Cart Empty
                    </h1>
                    <p className="text-neutral-500 mb-8 text-sm">
                        No items currently in your selection.
                    </p>
                    <Link
                        href="/shop"
                        className="border border-white/10 bg-white/5 hover:bg-white hover:text-black text-white px-8 py-3 rounded text-xs font-medium uppercase tracking-widest transition-all inline-block"
                    >
                        Access Catalog
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#030303] pt-24 pb-12">
            <section className="mb-12">
                <div className="container mx-auto px-6">
                    <h1 className="text-3xl md:text-4xl font-medium text-white tracking-tight mb-2">
                        Cart Review
                    </h1>
                    <p className="text-neutral-500 text-sm">
                        {cart.reduce((acc, item) => acc + item.quantity, 0)} items in your
                        selection
                    </p>
                </div>
            </section>

            <section>
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Cart Items */}
                        <div className="lg:col-span-2">
                            <div className="bg-transparent rounded-sm border-t border-white/5">
                                {cart.map((item) => (
                                    <CartItem
                                        key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                                        item={item}
                                        onUpdateQuantity={(qty) =>
                                            handleUpdateQuantity(
                                                item.product.id,
                                                item.selectedSize,
                                                item.selectedColor,
                                                qty
                                            )
                                        }
                                        onRemove={() =>
                                            handleRemove(
                                                item.product.id,
                                                item.selectedSize,
                                                item.selectedColor
                                            )
                                        }
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-neutral-900/30 rounded-sm p-8 border border-white/5 sticky top-24 backdrop-blur-sm">
                                <h2 className="text-lg font-medium text-white mb-6 tracking-tight">
                                    Summary
                                </h2>

                                <div className="space-y-4 mb-6 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-neutral-400">Subtotal</span>
                                        <span className="text-white">{formatPriceUSD(subtotal)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-neutral-400">Shipping</span>
                                        <span className="text-white">
                                            {shipping === 0 ? "Included" : formatPriceUSD(shipping)}
                                        </span>
                                    </div>
                                    {shipping > 0 && (
                                        <p className="text-xs text-neutral-500 pt-2 border-t border-white/5 mt-2">
                                            Add {formatPriceUSD(100 - subtotal)} for standard shipping.
                                        </p>
                                    )}
                                </div>

                                <div className="border-t border-white/10 pt-4 mb-8">
                                    <div className="flex justify-between text-base font-medium text-white">
                                        <span>Total</span>
                                        <span>{formatPriceUSD(total)}</span>
                                    </div>
                                    <p className="text-[10px] text-neutral-500 mt-2 uppercase tracking-wide">
                                        Taxes calculated at checkout
                                    </p>
                                </div>

                                <Link
                                    href="/checkout"
                                    className="w-full bg-white text-black hover:bg-neutral-200 py-3.5 rounded text-xs font-bold uppercase tracking-widest text-center block transition-colors flex items-center justify-center gap-2"
                                >
                                    Proceed to Checkout <ArrowRight className="w-4 h-4" />
                                </Link>

                                <div className="mt-6 text-center">
                                    <Link
                                        href="/shop"
                                        className="text-xs text-neutral-500 hover:text-white underline transition-colors"
                                    >
                                        Continue Shopping
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
