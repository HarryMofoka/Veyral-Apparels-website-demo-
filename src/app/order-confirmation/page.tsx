"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle, Package, Printer, Mail } from "lucide-react";
import { getCurrentOrder, Order, clearCurrentOrder } from "@/utils/order";
import { formatPriceUSD } from "@/utils/helpers";

export default function OrderConfirmationPage() {
    const [order, setOrder] = useState<Order | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const currentOrder = getCurrentOrder();
        setOrder(currentOrder);
        setIsLoaded(true);

        // Clear current order after displaying (keep in history)
        return () => {
            clearCurrentOrder();
        };
    }, []);

    if (!isLoaded) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-pulse">Loading...</div>
            </div>
        );
    }

    if (!order) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">No order found</h1>
                    <p className="text-gray-600 mb-8">
                        It looks like you haven&apos;t placed an order yet.
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

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Success Header */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-12">
                <div className="container mx-auto px-6 text-center">
                    <CheckCircle className="w-16 h-16 mx-auto mb-4" />
                    <h1 className="text-3xl md:text-4xl font-bold font-serif mb-2">
                        Order Confirmed!
                    </h1>
                    <p className="text-green-100">
                        Thank you for your purchase. Your order has been received.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Order Details */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Order Info Card */}
                        <div className="bg-white rounded-lg p-6 shadow-sm">
                            <div className="flex flex-wrap gap-6 justify-between mb-6">
                                <div>
                                    <p className="text-sm text-gray-500">Order Number</p>
                                    <p className="font-bold text-lg">{order.id}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Payment ID</p>
                                    <p className="font-mono text-sm">{order.paymentId}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Order Date</p>
                                    <p className="text-sm">{formatDate(order.createdAt)}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Status</p>
                                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                                        <CheckCircle className="w-4 h-4" />
                                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                    </span>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-wrap gap-3 pt-4 border-t">
                                <button
                                    onClick={() => window.print()}
                                    className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 transition"
                                >
                                    <Printer className="w-4 h-4" />
                                    Print Receipt
                                </button>
                                <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 transition">
                                    <Mail className="w-4 h-4" />
                                    Email Receipt
                                </button>
                            </div>
                        </div>

                        {/* Items */}
                        <div className="bg-white rounded-lg p-6 shadow-sm">
                            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                                <Package className="w-5 h-5" />
                                Order Items
                            </h2>
                            <div className="space-y-4">
                                {order.items.map((item) => (
                                    <div
                                        key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                                        className="flex gap-4 pb-4 border-b last:border-0"
                                    >
                                        <div className="relative w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                            <Image
                                                src={item.product.image}
                                                alt={item.product.name}
                                                fill
                                                className="object-cover"
                                                sizes="80px"
                                            />
                                        </div>
                                        <div className="flex-grow">
                                            <h3 className="font-medium">{item.product.name}</h3>
                                            <p className="text-sm text-gray-500">
                                                Size: {item.selectedSize} | Color: {item.selectedColor}
                                            </p>
                                            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold">
                                                {formatPriceUSD(item.product.price * item.quantity)}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                {formatPriceUSD(item.product.price)} each
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Shipping Info */}
                        <div className="bg-white rounded-lg p-6 shadow-sm">
                            <h2 className="text-lg font-bold mb-4">Shipping Address</h2>
                            <div className="text-gray-600">
                                <p className="font-medium text-black">
                                    {order.shipping.firstName} {order.shipping.lastName}
                                </p>
                                <p>{order.shipping.address}</p>
                                <p>
                                    {order.shipping.city}, {order.shipping.state} {order.shipping.zipCode}
                                </p>
                                <p>{order.shipping.country}</p>
                                <p className="mt-2">
                                    <span className="text-gray-500">Email:</span> {order.shipping.email}
                                </p>
                                <p>
                                    <span className="text-gray-500">Phone:</span> {order.shipping.phone}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg p-6 shadow-sm sticky top-24">
                            <h2 className="text-lg font-bold mb-4">Order Summary</h2>
                            <div className="space-y-3 pb-4 border-b">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span>{formatPriceUSD(order.subtotal)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Shipping</span>
                                    <span>
                                        {order.shippingCost === 0 ? "FREE" : formatPriceUSD(order.shippingCost)}
                                    </span>
                                </div>
                            </div>
                            <div className="flex justify-between pt-4 text-lg font-bold">
                                <span>Total</span>
                                <span>{formatPriceUSD(order.total)}</span>
                            </div>

                            <Link
                                href="/shop"
                                className="mt-6 block w-full bg-amber-600 hover:bg-amber-700 text-white py-4 rounded-full font-medium text-center transition"
                            >
                                Continue Shopping
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
