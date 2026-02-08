"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { getCart, removeFromCart, updateQuantity, getCartTotal, CartItem as CartItemType } from "@/utils/cart";
import { formatPriceUSD } from "@/utils/helpers";
import CartItem from "@/components/CartItem";

export default function CartPage() {
    const [cart, setCart] = useState<CartItemType[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setCart(getCart());
        setIsLoaded(true);
    }, []);

    const handleUpdateQuantity = (productId: string, selectedSize: string, selectedColor: string, quantity: number) => {
        const updatedCart = updateQuantity(productId, selectedSize, selectedColor, quantity);
        setCart(updatedCart);
        window.dispatchEvent(new Event("cartUpdated"));
    };

    const handleRemove = (productId: string, selectedSize: string, selectedColor: string) => {
        const updatedCart = removeFromCart(productId, selectedSize, selectedColor);
        setCart(updatedCart);
        window.dispatchEvent(new Event("cartUpdated"));
    };

    const subtotal = getCartTotal(cart);
    const shipping = subtotal > 100 ? 0 : 10;
    const total = subtotal + shipping;

    if (!isLoaded) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-pulse">Loading...</div>
            </div>
        );
    }

    if (cart.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                    <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
                    <p className="text-gray-600 mb-8">Looks like you haven&apos;t added anything yet.</p>
                    <Link
                        href="/shop"
                        className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-full font-medium inline-block transition"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-4xl md:text-6xl font-serif font-bold">Shopping Cart</h1>
                </div>
            </section>

            <section className="py-12">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Cart Items */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-lg p-6 shadow-sm">
                                {cart.map((item) => (
                                    <CartItem
                                        key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                                        item={item}
                                        onUpdateQuantity={(qty) =>
                                            handleUpdateQuantity(item.product.id, item.selectedSize, item.selectedColor, qty)
                                        }
                                        onRemove={() => handleRemove(item.product.id, item.selectedSize, item.selectedColor)}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-lg p-6 shadow-sm sticky top-24">
                                <h2 className="text-xl font-bold mb-6">Order Summary</h2>

                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Subtotal</span>
                                        <span>{formatPriceUSD(subtotal)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Shipping</span>
                                        <span>{shipping === 0 ? "FREE" : formatPriceUSD(shipping)}</span>
                                    </div>
                                    {subtotal < 100 && (
                                        <p className="text-sm text-amber-600">
                                            Add {formatPriceUSD(100 - subtotal)} more for free shipping!
                                        </p>
                                    )}
                                </div>

                                <div className="border-t pt-4 mb-6">
                                    <div className="flex justify-between text-lg font-bold">
                                        <span>Total</span>
                                        <span>{formatPriceUSD(total)}</span>
                                    </div>
                                </div>

                                <Link
                                    href="/checkout"
                                    className="w-full bg-amber-600 hover:bg-amber-700 text-white py-4 rounded-full font-medium text-center block transition"
                                >
                                    Proceed to Checkout
                                </Link>

                                <Link href="/shop" className="block text-center mt-4 text-gray-600 hover:underline">
                                    Continue Shopping
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
