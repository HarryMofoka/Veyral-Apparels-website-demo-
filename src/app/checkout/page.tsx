"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, Lock, CreditCard, Truck, Check } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPriceUSD } from "@/utils/helpers";
import {
    ShippingInfo,
    validateShippingForm,
    generateOrderId,
    generatePaymentId,
    saveOrder,
} from "@/utils/order";

export default function CheckoutPage() {
    const router = useRouter();
    const { cart, total, clearCart } = useCart();
    const [step, setStep] = useState<"shipping" | "payment" | "processing">("shipping");
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isProcessing, setIsProcessing] = useState(false);

    const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        country: "United States",
    });

    const shippingCost = total > 100 ? 0 : 10;
    const orderTotal = total + shippingCost;

    // Redirect if cart is empty
    useEffect(() => {
        if (cart.length === 0 && step !== "processing") {
            router.push("/cart");
        }
    }, [cart, router, step]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setShippingInfo((prev) => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const handleShippingSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const validationErrors = validateShippingForm(shippingInfo);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setStep("payment");
    };

    const handlePayment = async () => {
        setIsProcessing(true);
        setStep("processing");

        // Simulate payment processing
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Create order
        const order = {
            id: generateOrderId(),
            paymentId: generatePaymentId(),
            items: cart,
            shipping: shippingInfo,
            subtotal: total,
            shippingCost,
            total: orderTotal,
            status: "confirmed" as const,
            createdAt: new Date().toISOString(),
        };

        // Save order
        saveOrder(order);

        // Clear cart
        clearCart();

        // Redirect to confirmation
        router.push("/order-confirmation");
    };

    if (cart.length === 0 && step !== "processing") {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <Link href="/cart" className="flex items-center gap-2 text-gray-600 hover:text-black">
                            <ChevronLeft className="w-5 h-5" />
                            Back to Cart
                        </Link>
                        <h1 className="text-xl font-bold font-serif">Checkout</h1>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Lock className="w-4 h-4" />
                            Secure Checkout
                        </div>
                    </div>
                </div>
            </div>

            {/* Progress Steps */}
            <div className="bg-white border-b">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-center gap-4">
                        <div className={`flex items-center gap-2 ${step === "shipping" ? "text-amber-600" : "text-gray-400"}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === "shipping" ? "bg-amber-600 text-white" :
                                    step !== "shipping" ? "bg-green-500 text-white" : "bg-gray-200"
                                }`}>
                                {step !== "shipping" ? <Check className="w-4 h-4" /> : "1"}
                            </div>
                            <span className="hidden sm:inline">Shipping</span>
                        </div>
                        <div className="w-12 h-0.5 bg-gray-200" />
                        <div className={`flex items-center gap-2 ${step === "payment" ? "text-amber-600" : "text-gray-400"}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === "payment" ? "bg-amber-600 text-white" :
                                    step === "processing" ? "bg-green-500 text-white" : "bg-gray-200"
                                }`}>
                                {step === "processing" ? <Check className="w-4 h-4" /> : "2"}
                            </div>
                            <span className="hidden sm:inline">Payment</span>
                        </div>
                        <div className="w-12 h-0.5 bg-gray-200" />
                        <div className={`flex items-center gap-2 ${step === "processing" ? "text-amber-600" : "text-gray-400"}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === "processing" ? "bg-amber-600 text-white" : "bg-gray-200"
                                }`}>
                                3
                            </div>
                            <span className="hidden sm:inline">Confirm</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        {step === "shipping" && (
                            <form onSubmit={handleShippingSubmit} className="bg-white rounded-lg p-6 shadow-sm">
                                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                    <Truck className="w-5 h-5" />
                                    Shipping Information
                                </h2>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">First Name *</label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={shippingInfo.firstName}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 ${errors.firstName ? "border-red-500" : ""
                                                }`}
                                        />
                                        {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Last Name *</label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={shippingInfo.lastName}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 ${errors.lastName ? "border-red-500" : ""
                                                }`}
                                        />
                                        {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Email *</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={shippingInfo.email}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 ${errors.email ? "border-red-500" : ""
                                                }`}
                                        />
                                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Phone *</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={shippingInfo.phone}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 ${errors.phone ? "border-red-500" : ""
                                                }`}
                                        />
                                        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label className="block text-sm font-medium mb-1">Address *</label>
                                        <input
                                            type="text"
                                            name="address"
                                            value={shippingInfo.address}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 ${errors.address ? "border-red-500" : ""
                                                }`}
                                        />
                                        {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">City *</label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={shippingInfo.city}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 ${errors.city ? "border-red-500" : ""
                                                }`}
                                        />
                                        {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">State *</label>
                                        <input
                                            type="text"
                                            name="state"
                                            value={shippingInfo.state}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 ${errors.state ? "border-red-500" : ""
                                                }`}
                                        />
                                        {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">ZIP Code *</label>
                                        <input
                                            type="text"
                                            name="zipCode"
                                            value={shippingInfo.zipCode}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 ${errors.zipCode ? "border-red-500" : ""
                                                }`}
                                        />
                                        {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Country *</label>
                                        <select
                                            name="country"
                                            value={shippingInfo.country}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600"
                                        >
                                            <option value="United States">United States</option>
                                            <option value="Canada">Canada</option>
                                            <option value="United Kingdom">United Kingdom</option>
                                            <option value="Australia">Australia</option>
                                            <option value="Germany">Germany</option>
                                            <option value="France">France</option>
                                        </select>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="mt-6 w-full bg-amber-600 hover:bg-amber-700 text-white py-4 rounded-full font-medium transition"
                                >
                                    Continue to Payment
                                </button>
                            </form>
                        )}

                        {step === "payment" && (
                            <div className="bg-white rounded-lg p-6 shadow-sm">
                                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                                    <CreditCard className="w-5 h-5" />
                                    Payment (Demo)
                                </h2>

                                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                                    <p className="text-amber-800 text-sm">
                                        🔒 This is a demo checkout. No real payment will be processed.
                                    </p>
                                </div>

                                {/* Fake card form */}
                                <div className="space-y-4 mb-6">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Card Number</label>
                                        <input
                                            type="text"
                                            placeholder="4242 4242 4242 4242"
                                            className="w-full px-4 py-3 border rounded-lg bg-gray-50"
                                            disabled
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Expiry</label>
                                            <input
                                                type="text"
                                                placeholder="12/28"
                                                className="w-full px-4 py-3 border rounded-lg bg-gray-50"
                                                disabled
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1">CVC</label>
                                            <input
                                                type="text"
                                                placeholder="123"
                                                className="w-full px-4 py-3 border rounded-lg bg-gray-50"
                                                disabled
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Shipping summary */}
                                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                                    <h3 className="font-medium mb-2">Shipping To:</h3>
                                    <p className="text-sm text-gray-600">
                                        {shippingInfo.firstName} {shippingInfo.lastName}<br />
                                        {shippingInfo.address}<br />
                                        {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}<br />
                                        {shippingInfo.country}
                                    </p>
                                    <button
                                        onClick={() => setStep("shipping")}
                                        className="text-amber-600 text-sm mt-2 hover:underline"
                                    >
                                        Edit
                                    </button>
                                </div>

                                <div className="flex gap-4">
                                    <button
                                        onClick={() => setStep("shipping")}
                                        className="flex-1 border border-gray-300 py-4 rounded-full font-medium hover:bg-gray-50 transition"
                                    >
                                        Back
                                    </button>
                                    <button
                                        onClick={handlePayment}
                                        className="flex-1 bg-amber-600 hover:bg-amber-700 text-white py-4 rounded-full font-medium transition"
                                    >
                                        Pay {formatPriceUSD(orderTotal)}
                                    </button>
                                </div>
                            </div>
                        )}

                        {step === "processing" && (
                            <div className="bg-white rounded-lg p-12 shadow-sm text-center">
                                <div className="animate-spin w-16 h-16 border-4 border-amber-600 border-t-transparent rounded-full mx-auto mb-6" />
                                <h2 className="text-xl font-bold mb-2">Processing Payment...</h2>
                                <p className="text-gray-600">Please wait while we confirm your order.</p>
                            </div>
                        )}
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg p-6 shadow-sm sticky top-24">
                            <h2 className="text-lg font-bold mb-4">Order Summary</h2>

                            <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                                {cart.map((item) => (
                                    <div
                                        key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                                        className="flex gap-3"
                                    >
                                        <div className="relative w-16 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                                            <Image
                                                src={item.product.image}
                                                alt={item.product.name}
                                                fill
                                                className="object-cover"
                                                sizes="64px"
                                            />
                                            <span className="absolute -top-1 -right-1 bg-gray-900 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                                {item.quantity}
                                            </span>
                                        </div>
                                        <div className="flex-grow">
                                            <p className="font-medium text-sm">{item.product.name}</p>
                                            <p className="text-xs text-gray-500">
                                                {item.selectedSize} / {item.selectedColor}
                                            </p>
                                            <p className="text-sm font-medium">
                                                {formatPriceUSD(item.product.price * item.quantity)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t pt-4 space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span>{formatPriceUSD(total)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Shipping</span>
                                    <span>{shippingCost === 0 ? "FREE" : formatPriceUSD(shippingCost)}</span>
                                </div>
                                <div className="flex justify-between font-bold text-lg pt-2 border-t">
                                    <span>Total</span>
                                    <span>{formatPriceUSD(orderTotal)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
