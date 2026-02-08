"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getCart, getCartTotal, clearCart, CartItem } from "@/utils/cart";
import { formatPriceUSD, generateOrderId } from "@/utils/helpers";

export default function CheckoutPage() {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [orderComplete, setOrderComplete] = useState(false);
    const [orderId, setOrderId] = useState("");

    const [formData, setFormData] = useState({
        email: "",
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        province: "",
        postalCode: "",
        phone: "",
    });

    useEffect(() => {
        setCart(getCart());
        setIsLoaded(true);
    }, []);

    const subtotal = getCartTotal(cart);
    const shipping = subtotal > 100 ? 0 : 10;
    const total = subtotal + shipping;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate order processing
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const newOrderId = generateOrderId();
        setOrderId(newOrderId);
        clearCart();
        setOrderComplete(true);
        window.dispatchEvent(new Event("cartUpdated"));
    };

    if (!isLoaded) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-pulse">Loading...</div>
            </div>
        );
    }

    if (orderComplete) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center max-w-md mx-auto px-6">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-serif font-bold mb-4">Order Confirmed!</h1>
                    <p className="text-gray-600 mb-2">Thank you for your order.</p>
                    <p className="text-gray-600 mb-6">
                        Your order number is: <strong>{orderId}</strong>
                    </p>
                    <p className="text-gray-500 text-sm mb-8">
                        A confirmation email will be sent to {formData.email}
                    </p>
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

    if (cart.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
                    <Link href="/shop" className="text-amber-600 hover:underline">
                        Continue Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <section className="py-12">
                <div className="container mx-auto px-6">
                    <h1 className="text-3xl font-serif font-bold mb-8">Checkout</h1>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Checkout Form */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="bg-white rounded-lg p-6 shadow-sm">
                                <h2 className="text-xl font-bold mb-4">Contact Information</h2>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email address"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
                                />
                            </div>

                            <div className="bg-white rounded-lg p-6 shadow-sm">
                                <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
                                <div className="grid grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        name="firstName"
                                        placeholder="First name"
                                        required
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
                                    />
                                    <input
                                        type="text"
                                        name="lastName"
                                        placeholder="Last name"
                                        required
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
                                    />
                                </div>
                                <input
                                    type="text"
                                    name="address"
                                    placeholder="Address"
                                    required
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="w-full mt-4 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
                                />
                                <div className="grid grid-cols-3 gap-4 mt-4">
                                    <input
                                        type="text"
                                        name="city"
                                        placeholder="City"
                                        required
                                        value={formData.city}
                                        onChange={handleChange}
                                        className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
                                    />
                                    <input
                                        type="text"
                                        name="province"
                                        placeholder="Province"
                                        required
                                        value={formData.province}
                                        onChange={handleChange}
                                        className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
                                    />
                                    <input
                                        type="text"
                                        name="postalCode"
                                        placeholder="Postal code"
                                        required
                                        value={formData.postalCode}
                                        onChange={handleChange}
                                        className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
                                    />
                                </div>
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Phone number"
                                    required
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full mt-4 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-amber-600 hover:bg-amber-700 disabled:bg-gray-400 text-white py-4 rounded-full font-medium transition"
                            >
                                {isSubmitting ? "Processing..." : `Pay ${formatPriceUSD(total)}`}
                            </button>
                        </form>

                        {/* Order Summary */}
                        <div className="bg-white rounded-lg p-6 shadow-sm h-fit sticky top-24">
                            <h2 className="text-xl font-bold mb-6">Order Summary</h2>

                            <div className="space-y-4 mb-6">
                                {cart.map((item) => (
                                    <div key={`${item.product.id}-${item.selectedSize}`} className="flex justify-between">
                                        <div>
                                            <p className="font-medium">{item.product.name}</p>
                                            <p className="text-sm text-gray-500">
                                                {item.selectedSize} / {item.selectedColor} × {item.quantity}
                                            </p>
                                        </div>
                                        <span>{formatPriceUSD(item.product.price * item.quantity)}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t pt-4 space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span>{formatPriceUSD(subtotal)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Shipping</span>
                                    <span>{shipping === 0 ? "FREE" : formatPriceUSD(shipping)}</span>
                                </div>
                                <div className="flex justify-between text-lg font-bold pt-2 border-t">
                                    <span>Total</span>
                                    <span>{formatPriceUSD(total)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
