"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getCart, getCartTotal, clearCart, CartItem } from "@/utils/cart";
import { formatPriceUSD } from "@/utils/helpers";
import { saveOrder, generateOrderId, generatePaymentId } from "@/utils/order";
import { ArrowRight } from "lucide-react";

export default function CheckoutPage() {
    const router = useRouter();
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

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

        // Create and save order
        const order = {
            id: generateOrderId(),
            paymentId: generatePaymentId(),
            items: cart,
            shipping: {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phone: formData.phone,
                address: formData.address,
                city: formData.city,
                state: formData.province,
                zipCode: formData.postalCode,
                country: "United States",
            },
            subtotal,
            shippingCost: shipping,
            total,
            status: "confirmed" as const,
            createdAt: new Date().toISOString(),
        };

        // Save order to localStorage (history + current)
        saveOrder(order);

        // Clear cart
        clearCart();
        window.dispatchEvent(new Event("cartUpdated"));

        // Redirect to confirmation page
        router.push("/order-confirmation");
    };

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
            <div className="min-h-screen bg-[#030303] flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-medium text-white mb-4">Cart Empty</h1>
                    <Link href="/shop" className="text-neutral-400 hover:text-white underline text-sm transition-colors">
                        Return to Catalog
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#030303] pt-24 pb-12">
            <section>
                <div className="container mx-auto px-6">
                    <h1 className="text-3xl font-medium text-white mb-8 tracking-tight">Checkout</h1>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Checkout Form */}
                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="bg-transparent border border-white/5 rounded p-6">
                                <h2 className="text-lg font-medium text-white mb-6 flex items-center gap-2">
                                    <span className="w-6 h-6 rounded-full bg-white text-black text-xs font-bold flex items-center justify-center">1</span>
                                    Contact Information
                                </h2>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email address"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-neutral-900/50 border border-white/10 rounded text-white text-sm focus:outline-none focus:border-white/30 transition-colors placeholder:text-neutral-600"
                                />
                            </div>

                            <div className="bg-transparent border border-white/5 rounded p-6">
                                <h2 className="text-lg font-medium text-white mb-6 flex items-center gap-2">
                                    <span className="w-6 h-6 rounded-full bg-white text-black text-xs font-bold flex items-center justify-center">2</span>
                                    Shipping Details
                                </h2>
                                <div className="grid grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        name="firstName"
                                        placeholder="First name"
                                        required
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        className="px-4 py-3 bg-neutral-900/50 border border-white/10 rounded text-white text-sm focus:outline-none focus:border-white/30 transition-colors placeholder:text-neutral-600"
                                    />
                                    <input
                                        type="text"
                                        name="lastName"
                                        placeholder="Last name"
                                        required
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        className="px-4 py-3 bg-neutral-900/50 border border-white/10 rounded text-white text-sm focus:outline-none focus:border-white/30 transition-colors placeholder:text-neutral-600"
                                    />
                                </div>
                                <input
                                    type="text"
                                    name="address"
                                    placeholder="Address"
                                    required
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="w-full mt-4 px-4 py-3 bg-neutral-900/50 border border-white/10 rounded text-white text-sm focus:outline-none focus:border-white/30 transition-colors placeholder:text-neutral-600"
                                />
                                <div className="grid grid-cols-3 gap-4 mt-4">
                                    <input
                                        type="text"
                                        name="city"
                                        placeholder="City"
                                        required
                                        value={formData.city}
                                        onChange={handleChange}
                                        className="px-4 py-3 bg-neutral-900/50 border border-white/10 rounded text-white text-sm focus:outline-none focus:border-white/30 transition-colors placeholder:text-neutral-600"
                                    />
                                    <input
                                        type="text"
                                        name="province"
                                        placeholder="State/Prov"
                                        required
                                        value={formData.province}
                                        onChange={handleChange}
                                        className="px-4 py-3 bg-neutral-900/50 border border-white/10 rounded text-white text-sm focus:outline-none focus:border-white/30 transition-colors placeholder:text-neutral-600"
                                    />
                                    <input
                                        type="text"
                                        name="postalCode"
                                        placeholder="Zip/Postal"
                                        required
                                        value={formData.postalCode}
                                        onChange={handleChange}
                                        className="px-4 py-3 bg-neutral-900/50 border border-white/10 rounded text-white text-sm focus:outline-none focus:border-white/30 transition-colors placeholder:text-neutral-600"
                                    />
                                </div>
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Phone number"
                                    required
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full mt-4 px-4 py-3 bg-neutral-900/50 border border-white/10 rounded text-white text-sm focus:outline-none focus:border-white/30 transition-colors placeholder:text-neutral-600"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-white text-black hover:bg-neutral-200 disabled:bg-neutral-700 disabled:text-neutral-500 py-4 rounded font-bold uppercase tracking-widest text-sm transition-colors flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? "Processing..." : `Pay ${formatPriceUSD(total)}`} <ArrowRight className="w-4 h-4" />
                            </button>
                        </form>

                        {/* Order Summary */}
                        <div className="bg-neutral-900/30 rounded p-8 border border-white/5 h-fit sticky top-24">
                            <h2 className="text-lg font-medium text-white mb-6">Order Summary</h2>

                            <div className="space-y-4 mb-6">
                                {cart.map((item) => (
                                    <div
                                        key={`${item.product.id}-${item.selectedSize}`}
                                        className="flex justify-between items-start text-sm"
                                    >
                                        <div>
                                            <p className="font-medium text-white">{item.product.name}</p>
                                            <p className="text-xs text-neutral-500 mt-1">
                                                {item.selectedSize} / {item.selectedColor} × {item.quantity}
                                            </p>
                                        </div>
                                        <span className="text-white">{formatPriceUSD(item.product.price * item.quantity)}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-white/10 pt-4 space-y-2 text-sm">
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
                                <div className="flex justify-between text-base font-bold pt-4 border-t border-white/10 text-white mt-2">
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
