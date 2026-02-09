/**
 * Admin Orders Page
 * 
 * Order management page with:
 * - Orders list with filtering by status
 * - Order details expansion
 * - Status updates
 * 
 * @page /admin/orders
 */
"use client";

import { useState, useEffect, useMemo } from "react";
import {
    Search,
    ChevronDown,
    ChevronUp,
    Package,
    ShoppingCart,
} from "lucide-react";
import { getOrders, Order } from "@/utils/order";
import { formatPrice } from "@/utils/helpers";

const ORDERS_KEY = "veyral_orders";

const statusOptions = [
    { value: "all", label: "All Orders" },
    { value: "confirmed", label: "Confirmed" },
    { value: "processing", label: "Processing" },
    { value: "shipped", label: "Shipped" },
    { value: "delivered", label: "Delivered" },
];

export default function AdminOrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Load orders
    useEffect(() => {
        setOrders(getOrders());
        setIsLoading(false);
    }, []);

    // Filter orders
    const filteredOrders = useMemo(() => {
        let result = [...orders];

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(
                (o) =>
                    o.id.toLowerCase().includes(query) ||
                    o.shipping.email.toLowerCase().includes(query) ||
                    `${o.shipping.firstName} ${o.shipping.lastName}`
                        .toLowerCase()
                        .includes(query)
            );
        }

        if (statusFilter !== "all") {
            result = result.filter((o) => o.status === statusFilter);
        }

        // Sort by date (newest first)
        result.sort(
            (a, b) =>
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        return result;
    }, [orders, searchQuery, statusFilter]);

    // Update order status
    const updateOrderStatus = (orderId: string, newStatus: Order["status"]) => {
        const updated = orders.map((o) =>
            o.id === orderId ? { ...o, status: newStatus } : o
        );
        setOrders(updated);
        localStorage.setItem(ORDERS_KEY, JSON.stringify(updated));
    };

    // Status badge styling
    const getStatusStyle = (status: string) => {
        switch (status) {
            case "confirmed":
                return "bg-blue-500/10 text-blue-400 border-blue-500/20";
            case "processing":
                return "bg-amber-500/10 text-amber-400 border-amber-500/20";
            case "shipped":
                return "bg-purple-500/10 text-purple-400 border-purple-500/20";
            case "delivered":
                return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
            default:
                return "bg-neutral-500/10 text-neutral-400 border-neutral-500/20";
        }
    };

    if (isLoading) {
        return (
            <div className="p-8 lg:p-12 flex items-center justify-center min-h-screen">
                <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="p-6 lg:p-12 pt-20 lg:pt-12">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-medium text-white tracking-tight mb-2">
                    Orders
                </h1>
                <p className="text-neutral-500 text-sm">
                    {filteredOrders.length} orders
                </p>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                    <input
                        type="text"
                        placeholder="Search by order ID, email, or name..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-neutral-900/50 border border-white/10 rounded-lg pl-11 pr-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-white/30"
                    />
                </div>
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="bg-neutral-900/50 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-white/30"
                >
                    {statusOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            </div>

            {/* Orders List */}
            <div className="space-y-4">
                {filteredOrders.length === 0 ? (
                    <div className="bg-neutral-900/30 rounded-lg border border-white/5 p-12 text-center">
                        <ShoppingCart className="w-10 h-10 text-neutral-600 mx-auto mb-3" />
                        <p className="text-neutral-500 text-sm">No orders found</p>
                    </div>
                ) : (
                    filteredOrders.map((order) => (
                        <div
                            key={order.id}
                            className="bg-neutral-900/30 rounded-lg border border-white/5 overflow-hidden"
                        >
                            {/* Order Header */}
                            <div
                                className="p-4 sm:p-6 cursor-pointer hover:bg-white/5 transition-colors"
                                onClick={() =>
                                    setExpandedOrder(
                                        expandedOrder === order.id ? null : order.id
                                    )
                                }
                            >
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 bg-white/5 rounded-lg">
                                            <Package className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-mono text-white">
                                                {order.id}
                                            </p>
                                            <p className="text-xs text-neutral-500 mt-0.5">
                                                {order.shipping.firstName} {order.shipping.lastName} •{" "}
                                                {new Date(order.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span
                                            className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] uppercase tracking-wider border ${getStatusStyle(
                                                order.status
                                            )}`}
                                        >
                                            <span className="w-1 h-1 rounded-full bg-current" />
                                            {order.status}
                                        </span>
                                        <p className="text-sm font-medium text-white">
                                            {formatPrice(order.total)}
                                        </p>
                                        {expandedOrder === order.id ? (
                                            <ChevronUp className="w-4 h-4 text-neutral-500" />
                                        ) : (
                                            <ChevronDown className="w-4 h-4 text-neutral-500" />
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Order Details (Expanded) */}
                            {expandedOrder === order.id && (
                                <div className="border-t border-white/5 p-4 sm:p-6 space-y-6">
                                    {/* Customer Info */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div>
                                            <h4 className="text-[10px] uppercase tracking-widest text-neutral-500 mb-3">
                                                Customer
                                            </h4>
                                            <p className="text-sm text-white">
                                                {order.shipping.firstName} {order.shipping.lastName}
                                            </p>
                                            <p className="text-sm text-neutral-400">
                                                {order.shipping.email}
                                            </p>
                                            <p className="text-sm text-neutral-400">
                                                {order.shipping.phone}
                                            </p>
                                        </div>
                                        <div>
                                            <h4 className="text-[10px] uppercase tracking-widest text-neutral-500 mb-3">
                                                Shipping Address
                                            </h4>
                                            <p className="text-sm text-neutral-400">
                                                {order.shipping.address}
                                                <br />
                                                {order.shipping.city}, {order.shipping.state}{" "}
                                                {order.shipping.zipCode}
                                                <br />
                                                {order.shipping.country}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Order Items */}
                                    <div>
                                        <h4 className="text-[10px] uppercase tracking-widest text-neutral-500 mb-3">
                                            Items ({order.items.length})
                                        </h4>
                                        <div className="space-y-2">
                                            {order.items.map((item, idx) => (
                                                <div
                                                    key={idx}
                                                    className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
                                                >
                                                    <div>
                                                        <p className="text-sm text-white">
                                                            {item.product?.name || "Unknown Product"}
                                                        </p>
                                                        <p className="text-xs text-neutral-500">
                                                            {item.selectedColor} / {item.selectedSize} ×{" "}
                                                            {item.quantity}
                                                        </p>
                                                    </div>
                                                    <p className="text-sm text-white font-medium">
                                                        {formatPrice(
                                                            (item.product?.price || 0) * item.quantity
                                                        )}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Order Summary */}
                                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pt-4 border-t border-white/5">
                                        <div>
                                            <label className="block text-[10px] uppercase tracking-widest text-neutral-500 mb-2">
                                                Update Status
                                            </label>
                                            <select
                                                value={order.status}
                                                onChange={(e) =>
                                                    updateOrderStatus(
                                                        order.id,
                                                        e.target.value as Order["status"]
                                                    )
                                                }
                                                className="bg-black/50 border border-white/10 rounded px-4 py-2 text-sm text-white focus:outline-none focus:border-white/30"
                                            >
                                                <option value="confirmed">Confirmed</option>
                                                <option value="processing">Processing</option>
                                                <option value="shipped">Shipped</option>
                                                <option value="delivered">Delivered</option>
                                            </select>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs text-neutral-500">
                                                Subtotal: {formatPrice(order.subtotal)}
                                            </p>
                                            <p className="text-xs text-neutral-500">
                                                Shipping: {formatPrice(order.shippingCost)}
                                            </p>
                                            <p className="text-lg font-medium text-white mt-1">
                                                Total: {formatPrice(order.total)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
