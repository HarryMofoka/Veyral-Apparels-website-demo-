/**
 * Account Page
 * 
 * User account section featuring:
 * - Login/Register form when not authenticated
 * - User profile with editable info when logged in
 * - Order history from LocalStorage
 * - Reorder functionality to add previous items to cart
 * - Admin dashboard access link
 * 
 * Demo Credentials:
 * - Email: demo@veyral.com
 * - Password: demo123
 * 
 * @page /account
 */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
    Package,
    ShoppingBag,
    DollarSign,
    ChevronDown,
    ChevronUp,
    Settings,
    ArrowRight,
    LogOut,
    User,
    Mail,
    Phone,
    MapPin,
    RefreshCw,
    Check,
} from "lucide-react";
import { getOrders, Order } from "@/utils/order";
import { formatPrice } from "@/utils/helpers";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

export default function AccountPage() {
    const { user, isAuthenticated, isLoading: authLoading, login, logout } = useAuth();
    const { addItem, openCart } = useCart();

    const [orders, setOrders] = useState<Order[]>([]);
    const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Login form state
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState("");

    // Reorder feedback
    const [reorderingId, setReorderingId] = useState<string | null>(null);
    const [reorderedId, setReorderedId] = useState<string | null>(null);

    // Load orders from LocalStorage
    useEffect(() => {
        const userOrders = getOrders();
        userOrders.sort(
            (a, b) =>
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setOrders(userOrders);
        setIsLoading(false);
    }, []);

    // Handle login
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setLoginError("");

        const result = login(email, password);
        if (!result.success) {
            setLoginError(result.error || "Login failed");
        }
    };

    // Handle reorder - add all items from an order to cart
    const handleReorder = async (order: Order) => {
        setReorderingId(order.id);

        // Add each item to cart using addItem
        for (const item of order.items) {
            if (item.product) {
                addItem({
                    product: item.product,
                    quantity: item.quantity,
                    selectedSize: item.selectedSize,
                    selectedColor: item.selectedColor,
                });
            }
        }

        // Show success feedback
        setTimeout(() => {
            setReorderingId(null);
            setReorderedId(order.id);
            openCart(); // Open cart after adding items
            setTimeout(() => setReorderedId(null), 2000);
        }, 500);
    };

    // Calculate stats
    const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);
    const totalItems = orders.reduce(
        (sum, order) => sum + order.items.reduce((s, item) => s + item.quantity, 0),
        0
    );

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

    if (isLoading || authLoading) {
        return (
            <div className="min-h-screen bg-[#030303] pt-24 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            </div>
        );
    }

    // Login Screen
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-[#030303] pt-24 pb-16 flex items-center justify-center">
                <div className="w-full max-w-md px-6">
                    <div className="bg-neutral-900/50 border border-white/10 rounded-lg p-8">
                        <div className="flex justify-center mb-6">
                            <div className="p-4 bg-white/5 rounded-full">
                                <User className="w-8 h-8 text-white" />
                            </div>
                        </div>
                        <h1 className="text-2xl font-medium text-white text-center mb-2">
                            Welcome Back
                        </h1>
                        <p className="text-neutral-500 text-sm text-center mb-8">
                            Sign in to view your orders and profile
                        </p>

                        <form onSubmit={handleLogin} className="space-y-4">
                            <div>
                                <label className="block text-xs text-neutral-500 uppercase tracking-wider mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="demo@veyral.com"
                                    required
                                    className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white text-sm placeholder-neutral-600 focus:outline-none focus:border-white/30"
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-neutral-500 uppercase tracking-wider mb-2">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="demo123"
                                    required
                                    className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white text-sm placeholder-neutral-600 focus:outline-none focus:border-white/30"
                                />
                            </div>

                            {loginError && (
                                <p className="text-red-400 text-xs">{loginError}</p>
                            )}

                            <button
                                type="submit"
                                className="w-full bg-white text-black py-3 rounded text-sm font-semibold hover:bg-neutral-200 transition-colors"
                            >
                                Sign In
                            </button>
                        </form>

                        <div className="mt-6 p-4 bg-white/5 rounded-lg">
                            <p className="text-[10px] uppercase tracking-widest text-neutral-500 mb-2">
                                Demo Credentials
                            </p>
                            <p className="text-xs text-neutral-400">
                                Email: <span className="text-white font-mono">demo@veyral.com</span>
                            </p>
                            <p className="text-xs text-neutral-400">
                                Password: <span className="text-white font-mono">demo123</span>
                            </p>
                        </div>

                        <Link
                            href="/"
                            className="block text-center text-neutral-500 text-xs mt-6 hover:text-white transition-colors"
                        >
                            ← Back to Store
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    // Authenticated Account Page
    return (
        <div className="min-h-screen bg-[#030303] pt-24 pb-16">
            <div className="container mx-auto px-6 max-w-4xl">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 border-b border-white/5 pb-8">
                    <div>
                        <h1 className="text-3xl font-medium text-white tracking-tight mb-2">
                            Welcome, {user?.firstName}
                        </h1>
                        <p className="text-neutral-500 text-sm">
                            Manage your account and view order history
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link
                            href="/admin"
                            className="flex items-center gap-2 text-neutral-500 hover:text-white transition-colors text-sm group"
                        >
                            <Settings className="w-4 h-4" />
                            Admin
                        </Link>
                        <button
                            onClick={logout}
                            className="flex items-center gap-2 text-neutral-500 hover:text-red-400 transition-colors text-sm"
                        >
                            <LogOut className="w-4 h-4" />
                            Logout
                        </button>
                    </div>
                </div>

                {/* Profile Card */}
                <div className="bg-neutral-900/30 rounded-lg border border-white/5 p-6 mb-8">
                    <h2 className="text-sm font-medium text-white uppercase tracking-widest mb-6">
                        Profile
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-white/5 rounded-lg">
                                <User className="w-4 h-4 text-neutral-500" />
                            </div>
                            <div>
                                <p className="text-xs text-neutral-500">Name</p>
                                <p className="text-sm text-white">
                                    {user?.firstName} {user?.lastName}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-white/5 rounded-lg">
                                <Mail className="w-4 h-4 text-neutral-500" />
                            </div>
                            <div>
                                <p className="text-xs text-neutral-500">Email</p>
                                <p className="text-sm text-white">{user?.email}</p>
                            </div>
                        </div>
                        {user?.phone && (
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white/5 rounded-lg">
                                    <Phone className="w-4 h-4 text-neutral-500" />
                                </div>
                                <div>
                                    <p className="text-xs text-neutral-500">Phone</p>
                                    <p className="text-sm text-white">{user.phone}</p>
                                </div>
                            </div>
                        )}
                        {user?.address && (
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white/5 rounded-lg">
                                    <MapPin className="w-4 h-4 text-neutral-500" />
                                </div>
                                <div>
                                    <p className="text-xs text-neutral-500">Address</p>
                                    <p className="text-sm text-white">
                                        {user.address.city}, {user.address.state}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
                    <div className="bg-neutral-900/30 rounded-lg border border-white/5 p-6">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-white/5 rounded-lg">
                                <ShoppingBag className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-[10px] uppercase tracking-widest text-neutral-500">
                                Total Orders
                            </span>
                        </div>
                        <p className="text-2xl font-medium text-white">{orders.length}</p>
                    </div>
                    <div className="bg-neutral-900/30 rounded-lg border border-white/5 p-6">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-white/5 rounded-lg">
                                <Package className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-[10px] uppercase tracking-widest text-neutral-500">
                                Items Purchased
                            </span>
                        </div>
                        <p className="text-2xl font-medium text-white">{totalItems}</p>
                    </div>
                    <div className="bg-neutral-900/30 rounded-lg border border-white/5 p-6">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-white/5 rounded-lg">
                                <DollarSign className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-[10px] uppercase tracking-widest text-neutral-500">
                                Total Spent
                            </span>
                        </div>
                        <p className="text-2xl font-medium text-white">
                            {formatPrice(totalSpent)}
                        </p>
                    </div>
                </div>

                {/* Order History */}
                <div className="mb-8">
                    <h2 className="text-sm font-medium text-white uppercase tracking-widest mb-6">
                        Order History
                    </h2>

                    {orders.length === 0 ? (
                        <div className="bg-neutral-900/30 rounded-lg border border-white/5 p-12 text-center">
                            <ShoppingBag className="w-12 h-12 text-neutral-700 mx-auto mb-4" />
                            <p className="text-neutral-400 mb-2">No orders yet</p>
                            <p className="text-neutral-600 text-sm mb-6">
                                Start shopping to see your order history here
                            </p>
                            <Link
                                href="/shop"
                                className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded text-sm font-semibold hover:bg-neutral-200 transition-colors"
                            >
                                Browse Products
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {orders.map((order) => (
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
                                                        {new Date(order.createdAt).toLocaleDateString(
                                                            "en-US",
                                                            {
                                                                year: "numeric",
                                                                month: "long",
                                                                day: "numeric",
                                                            }
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                {/* Reorder Button */}
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleReorder(order);
                                                    }}
                                                    disabled={reorderingId === order.id}
                                                    className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs font-medium transition-all ${reorderedId === order.id
                                                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                                        : "bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10"
                                                        }`}
                                                >
                                                    {reorderingId === order.id ? (
                                                        <RefreshCw className="w-3 h-3 animate-spin" />
                                                    ) : reorderedId === order.id ? (
                                                        <>
                                                            <Check className="w-3 h-3" />
                                                            Added!
                                                        </>
                                                    ) : (
                                                        <>
                                                            <RefreshCw className="w-3 h-3" />
                                                            Reorder
                                                        </>
                                                    )}
                                                </button>
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
                                                            <div className="flex items-center gap-3">
                                                                {item.product?.image && (
                                                                    <div className="w-10 h-12 bg-neutral-800 rounded overflow-hidden">
                                                                        <img
                                                                            src={item.product.image}
                                                                            alt={item.product.name}
                                                                            className="w-full h-full object-cover opacity-80"
                                                                        />
                                                                    </div>
                                                                )}
                                                                <div>
                                                                    <p className="text-sm text-white">
                                                                        {item.product?.name || "Product"}
                                                                    </p>
                                                                    <p className="text-xs text-neutral-500">
                                                                        {item.selectedColor} / {item.selectedSize} ×{" "}
                                                                        {item.quantity}
                                                                    </p>
                                                                </div>
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

                                            {/* Shipping Info */}
                                            <div>
                                                <h4 className="text-[10px] uppercase tracking-widest text-neutral-500 mb-3">
                                                    Shipping Address
                                                </h4>
                                                <p className="text-sm text-neutral-400">
                                                    {order.shipping.firstName} {order.shipping.lastName}
                                                    <br />
                                                    {order.shipping.address}
                                                    <br />
                                                    {order.shipping.city}, {order.shipping.state}{" "}
                                                    {order.shipping.zipCode}
                                                </p>
                                            </div>

                                            {/* Order Summary */}
                                            <div className="pt-4 border-t border-white/5">
                                                <div className="flex justify-between text-sm mb-2">
                                                    <span className="text-neutral-500">Subtotal</span>
                                                    <span className="text-white">
                                                        {formatPrice(order.subtotal)}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between text-sm mb-2">
                                                    <span className="text-neutral-500">Shipping</span>
                                                    <span className="text-white">
                                                        {order.shippingCost === 0
                                                            ? "Free"
                                                            : formatPrice(order.shippingCost)}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between text-base font-medium pt-2 border-t border-white/5">
                                                    <span className="text-white">Total</span>
                                                    <span className="text-white">
                                                        {formatPrice(order.total)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Quick Links */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Link
                        href="/shop"
                        className="flex items-center justify-between p-5 bg-neutral-900/30 rounded-lg border border-white/5 hover:border-white/10 transition-colors group"
                    >
                        <div className="flex items-center gap-3">
                            <ShoppingBag className="w-5 h-5 text-neutral-500" />
                            <span className="text-sm text-white">Continue Shopping</span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-neutral-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
                    </Link>
                    <Link
                        href="/contact"
                        className="flex items-center justify-between p-5 bg-neutral-900/30 rounded-lg border border-white/5 hover:border-white/10 transition-colors group"
                    >
                        <div className="flex items-center gap-3">
                            <Package className="w-5 h-5 text-neutral-500" />
                            <span className="text-sm text-white">Need Help?</span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-neutral-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
