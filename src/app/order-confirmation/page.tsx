"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle, Package, Printer, Mail, ArrowRight } from "lucide-react";
import { getCurrentOrder, Order, clearCurrentOrder } from "@/utils/order";
import { formatPrice } from "@/utils/helpers";

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
            <div className="min-h-screen bg-[#030303] flex items-center justify-center">
                <div className="text-white text-sm tracking-widest animate-pulse">Initializing...</div>
            </div>
        );
    }

    if (!order) {
        return (
            <div className="min-h-screen bg-[#030303] flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-medium text-white mb-4 tracking-tight">System Notification</h1>
                    <p className="text-neutral-500 mb-8 text-sm">
                        No active order session found.
                    </p>
                    <Link
                        href="/shop"
                        className="bg-white text-black px-8 py-3 rounded text-xs font-medium uppercase tracking-widest hover:bg-neutral-200 transition-colors inline-block"
                    >
                        Return to Catalog
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
        <div className="min-h-screen bg-[#030303] pt-20 pb-12">
            {/* Success Header */}
            <div className="border-b border-white/5 pb-12 mb-12">
                <div className="container mx-auto px-6 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 border border-white/10 mb-6 text-white animate-pulse">
                        <CheckCircle className="w-8 h-8" />
                    </div>
                    <h1 className="text-3xl md:text-5xl font-medium tracking-tight text-white mb-4">
                        Order Executed
                    </h1>
                    <p className="text-neutral-400 text-sm max-w-md mx-auto">
                        Your requisition has been processed successfully.
                        Confirmation sent to {order.shipping.email}.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {/* Order Details */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Order Info Card */}
                        <div className="bg-neutral-900/30 rounded-sm border border-white/5 p-8">
                            <div className="flex flex-wrap gap-8 justify-between mb-8">
                                <div>
                                    <p className="text-[10px] uppercase tracking-widest text-neutral-500 mb-1">Order ID</p>
                                    <p className="font-mono text-white text-sm">{order.id}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase tracking-widest text-neutral-500 mb-1">Timestamp</p>
                                    <p className="text-white text-sm">{formatDate(order.createdAt)}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase tracking-widest text-neutral-500 mb-1">Status</p>
                                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-white/5 border border-white/10 text-white rounded text-[10px] uppercase tracking-wider">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                        {order.status}
                                    </span>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-wrap gap-3 pt-6 border-t border-white/5">
                                <button
                                    onClick={() => window.print()}
                                    className="flex items-center gap-2 px-4 py-2 border border-white/10 rounded hover:bg-white/5 transition-colors text-xs text-neutral-300 hover:text-white"
                                >
                                    <Printer className="w-3.5 h-3.5" />
                                    Print Receipt
                                </button>
                                <button className="flex items-center gap-2 px-4 py-2 border border-white/10 rounded hover:bg-white/5 transition-colors text-xs text-neutral-300 hover:text-white">
                                    <Mail className="w-3.5 h-3.5" />
                                    Resend Email
                                </button>
                            </div>
                        </div>

                        {/* Items */}
                        <div className="bg-neutral-900/30 rounded-sm border border-white/5 p-8">
                            <h2 className="text-sm font-medium text-white uppercase tracking-widest mb-6 flex items-center gap-2">
                                <Package className="w-4 h-4 text-neutral-500" />
                                Manifest
                            </h2>
                            <div className="space-y-6">
                                {order.items.map((item) => (
                                    <div
                                        key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                                        className="flex gap-6 pb-6 border-b border-white/5 last:border-0 last:pb-0"
                                    >
                                        <div className="relative w-20 h-24 bg-neutral-900 rounded-sm overflow-hidden flex-shrink-0 border border-white/5">
                                            <Image
                                                src={item.product.image}
                                                alt={item.product.name}
                                                fill
                                                className="object-cover opacity-80"
                                                sizes="80px"
                                            />
                                        </div>
                                        <div className="flex-grow flex flex-col justify-between py-1">
                                            <div>
                                                <h3 className="text-white font-medium text-sm tracking-tight">{item.product.name}</h3>
                                                <p className="text-[10px] text-neutral-500 uppercase tracking-wider mt-1">
                                                    {item.selectedColor} / {item.selectedSize}
                                                </p>
                                            </div>
                                            <p className="text-xs text-neutral-400">Qty: {item.quantity}</p>
                                        </div>
                                        <div className="text-right py-1">
                                            <p className="text-white font-medium text-sm">
                                                {formatPrice(item.product.price * item.quantity)}
                                            </p>
                                            <p className="text-[10px] text-neutral-600 mt-1">
                                                {formatPrice(item.product.price)} ea
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Shipping Info */}
                        <div className="bg-neutral-900/30 rounded-sm border border-white/5 p-8">
                            <h2 className="text-sm font-medium text-white uppercase tracking-widest mb-6">Destination</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
                                <div>
                                    <p className="text-[10px] text-neutral-500 uppercase tracking-widest mb-2">Recipient</p>
                                    <p className="text-white font-medium mb-1">
                                        {order.shipping.firstName} {order.shipping.lastName}
                                    </p>
                                    <p className="text-neutral-400">{order.shipping.email}</p>
                                    <p className="text-neutral-400">{order.shipping.phone}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] text-neutral-500 uppercase tracking-widest mb-2">Address</p>
                                    <p className="text-neutral-300">
                                        {order.shipping.address}
                                        <br />
                                        {order.shipping.city}, {order.shipping.state} {order.shipping.zipCode}
                                        <br />
                                        {order.shipping.country}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-neutral-900/30 rounded-sm border border-white/5 p-8 sticky top-24">
                            <h2 className="text-sm font-medium text-white uppercase tracking-widest mb-6">Summary</h2>
                            <div className="space-y-4 pb-6 border-b border-white/5">
                                <div className="flex justify-between text-sm">
                                    <span className="text-neutral-400">Subtotal</span>
                                    <span className="text-white">{formatPrice(order.subtotal)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-neutral-400">Shipping</span>
                                    <span className="text-white">
                                        {order.shippingCost === 0 ? "Complimentary" : formatPrice(order.shippingCost)}
                                    </span>
                                </div>
                            </div>
                            <div className="flex justify-between pt-6 text-lg font-medium text-white mb-8">
                                <span>Total</span>
                                <span>{formatPrice(order.total)}</span>
                            </div>

                            <Link
                                href="/shop"
                                className="block w-full bg-white text-black py-3 rounded text-xs font-semibold uppercase tracking-widest hover:bg-neutral-200 transition-colors text-center border border-white"
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
