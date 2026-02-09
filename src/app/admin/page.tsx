/**
 * Admin Dashboard Page
 * 
 * Main admin dashboard showing:
 * - Summary stats (orders, sales, products, low stock)
 * - Orders chart (last 7 days)
 * - Low stock alerts
 * - Recent orders table
 * 
 * @page /admin
 */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
    Package,
    DollarSign,
    ShoppingCart,
    AlertTriangle,
    TrendingUp,
    Eye,
} from "lucide-react";
import { products } from "@/data/products";
import { getOrders, Order } from "@/utils/order";
import { formatPrice } from "@/utils/helpers";
import StatCard from "@/components/admin/StatCard";
import SimpleChart from "@/components/admin/SimpleChart";

export default function AdminDashboard() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Load orders from localStorage on mount
    useEffect(() => {
        setOrders(getOrders());
        setIsLoading(false);
    }, []);

    // Calculate stats
    const totalProducts = products.length;
    const totalOrders = orders.length;
    const totalSales = orders.reduce((sum, order) => sum + order.total, 0);
    const lowStockProducts = products.filter((p) => p.stock < 10 && p.stock > 0);
    const outOfStockProducts = products.filter((p) => p.stock === 0);
    const pendingOrders = orders.filter((o) => o.status === "confirmed" || o.status === "processing");

    // Generate chart data for last 7 days
    const getChartData = () => {
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const today = new Date();
        const data = [];

        for (let i = 6; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            const dayName = days[date.getDay()];

            // Count orders for this day
            const dayOrders = orders.filter((order) => {
                const orderDate = new Date(order.createdAt);
                return (
                    orderDate.getDate() === date.getDate() &&
                    orderDate.getMonth() === date.getMonth() &&
                    orderDate.getFullYear() === date.getFullYear()
                );
            });

            data.push({
                label: dayName,
                value: dayOrders.length,
            });
        }

        return data;
    };

    // Get recent orders (last 5)
    const recentOrders = [...orders]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5);

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
            <div className="mb-10">
                <h1 className="text-3xl font-medium text-white tracking-tight mb-2">
                    Dashboard
                </h1>
                <p className="text-neutral-500 text-sm">
                    Overview of your store performance
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <StatCard
                    icon={<ShoppingCart className="w-4 h-4" />}
                    label="Total Orders"
                    value={totalOrders}
                />
                <StatCard
                    icon={<DollarSign className="w-4 h-4" />}
                    label="Total Sales"
                    value={formatPrice(totalSales)}
                />
                <StatCard
                    icon={<Package className="w-4 h-4" />}
                    label="Products"
                    value={totalProducts}
                />
                <StatCard
                    icon={<AlertTriangle className="w-4 h-4" />}
                    label="Low Stock"
                    value={lowStockProducts.length + outOfStockProducts.length}
                />
            </div>

            {/* Charts and Tables Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Orders Chart */}
                <SimpleChart
                    data={getChartData()}
                    title="Orders (Last 7 Days)"
                    height={220}
                />

                {/* Low Stock Alerts */}
                <div className="bg-neutral-900/30 rounded-lg border border-white/5 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-sm font-medium text-white uppercase tracking-widest">
                            Low Stock Alerts
                        </h3>
                        <Link
                            href="/admin/products"
                            className="text-xs text-neutral-500 hover:text-white transition-colors"
                        >
                            View All →
                        </Link>
                    </div>
                    {lowStockProducts.length === 0 && outOfStockProducts.length === 0 ? (
                        <div className="text-center py-8 text-neutral-500 text-sm">
                            <TrendingUp className="w-8 h-8 mx-auto mb-3 opacity-50" />
                            All products are well stocked
                        </div>
                    ) : (
                        <div className="space-y-3 max-h-[180px] overflow-y-auto">
                            {outOfStockProducts.slice(0, 3).map((product) => (
                                <div
                                    key={product.id}
                                    className="flex items-center justify-between p-3 bg-red-500/5 border border-red-500/10 rounded-lg"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-10 bg-neutral-800 rounded overflow-hidden">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-full h-full object-cover opacity-80"
                                            />
                                        </div>
                                        <div>
                                            <p className="text-sm text-white font-medium">
                                                {product.name}
                                            </p>
                                            <p className="text-xs text-red-400">Out of Stock</p>
                                        </div>
                                    </div>
                                    <span className="text-xs text-red-400 font-mono">0</span>
                                </div>
                            ))}
                            {lowStockProducts.slice(0, 3).map((product) => (
                                <div
                                    key={product.id}
                                    className="flex items-center justify-between p-3 bg-amber-500/5 border border-amber-500/10 rounded-lg"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-10 bg-neutral-800 rounded overflow-hidden">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-full h-full object-cover opacity-80"
                                            />
                                        </div>
                                        <div>
                                            <p className="text-sm text-white font-medium">
                                                {product.name}
                                            </p>
                                            <p className="text-xs text-amber-400">Low Stock</p>
                                        </div>
                                    </div>
                                    <span className="text-xs text-amber-400 font-mono">
                                        {product.stock}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-neutral-900/30 rounded-lg border border-white/5 overflow-hidden">
                <div className="p-6 border-b border-white/5 flex justify-between items-center">
                    <h3 className="text-sm font-medium text-white uppercase tracking-widest">
                        Recent Orders
                    </h3>
                    <Link
                        href="/admin/orders"
                        className="text-xs text-neutral-500 hover:text-white transition-colors"
                    >
                        View All →
                    </Link>
                </div>
                {recentOrders.length === 0 ? (
                    <div className="p-12 text-center text-neutral-500 text-sm">
                        <ShoppingCart className="w-10 h-10 mx-auto mb-3 opacity-30" />
                        No orders yet
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-white/5">
                                <tr>
                                    <th className="px-6 py-4 text-left text-[10px] uppercase tracking-widest font-medium text-neutral-400">
                                        Order ID
                                    </th>
                                    <th className="px-6 py-4 text-left text-[10px] uppercase tracking-widest font-medium text-neutral-400">
                                        Customer
                                    </th>
                                    <th className="px-6 py-4 text-left text-[10px] uppercase tracking-widest font-medium text-neutral-400">
                                        Total
                                    </th>
                                    <th className="px-6 py-4 text-left text-[10px] uppercase tracking-widest font-medium text-neutral-400">
                                        Status
                                    </th>
                                    <th className="px-6 py-4 text-left text-[10px] uppercase tracking-widest font-medium text-neutral-400">
                                        Date
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {recentOrders.map((order) => (
                                    <tr key={order.id} className="hover:bg-white/5 transition-colors">
                                        <td className="px-6 py-4">
                                            <span className="text-sm font-mono text-white">
                                                {order.id}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-sm text-white">
                                                {order.shipping.firstName} {order.shipping.lastName}
                                            </p>
                                            <p className="text-xs text-neutral-500">
                                                {order.shipping.email}
                                            </p>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-white">
                                            {formatPrice(order.total)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] uppercase tracking-wider border ${getStatusStyle(
                                                    order.status
                                                )}`}
                                            >
                                                <span className="w-1 h-1 rounded-full bg-current" />
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-neutral-400">
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
