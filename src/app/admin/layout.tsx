/**
 * Admin Layout Component
 * 
 * Provides a shared layout for all admin pages with:
 * - Simple password authentication (stored in sessionStorage)
 * - Sidebar navigation with links to Dashboard, Products, Orders
 * - Responsive design with collapsible sidebar on mobile
 * 
 * @layout /admin/*
 */
"use client";

import { useState, useEffect, ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    LogOut,
    Menu,
    X,
    Lock,
} from "lucide-react";

// Simple admin password - in production, use proper authentication
const ADMIN_PASSWORD = "veyral2024";
const AUTH_KEY = "veyral_admin_auth";

interface AdminLayoutProps {
    children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
    const pathname = usePathname();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Check authentication on mount
    useEffect(() => {
        const auth = sessionStorage.getItem(AUTH_KEY);
        if (auth === "true") {
            setIsAuthenticated(true);
        }
        setIsLoading(false);
    }, []);

    // Handle login
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === ADMIN_PASSWORD) {
            sessionStorage.setItem(AUTH_KEY, "true");
            setIsAuthenticated(true);
            setError("");
        } else {
            setError("Invalid password");
        }
    };

    // Handle logout
    const handleLogout = () => {
        sessionStorage.removeItem(AUTH_KEY);
        setIsAuthenticated(false);
        setPassword("");
    };

    // Navigation items
    const navItems = [
        { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
        { href: "/admin/products", label: "Products", icon: Package },
        { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
    ];

    // Loading state
    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#030303] flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            </div>
        );
    }

    // Login screen
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-[#030303] flex items-center justify-center p-6">
                <div className="w-full max-w-sm">
                    <div className="bg-neutral-900/50 border border-white/10 rounded-lg p-8">
                        <div className="flex justify-center mb-6">
                            <div className="p-4 bg-white/5 rounded-full">
                                <Lock className="w-8 h-8 text-white" />
                            </div>
                        </div>
                        <h1 className="text-2xl font-medium text-white text-center mb-2">
                            Admin Access
                        </h1>
                        <p className="text-neutral-500 text-sm text-center mb-8">
                            Enter password to continue
                        </p>
                        <form onSubmit={handleLogin}>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white text-sm placeholder-neutral-600 focus:outline-none focus:border-white/30 mb-4"
                                autoFocus
                            />
                            {error && (
                                <p className="text-red-400 text-xs mb-4">{error}</p>
                            )}
                            <button
                                type="submit"
                                className="w-full bg-white text-black py-3 rounded text-sm font-semibold hover:bg-neutral-200 transition-colors"
                            >
                                Access Dashboard
                            </button>
                        </form>
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

    // Authenticated admin layout
    return (
        <div className="min-h-screen bg-[#030303] flex">
            {/* Mobile menu button */}
            <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-neutral-900 border border-white/10 rounded-lg text-white"
            >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Sidebar overlay for mobile */}
            {sidebarOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 z-30"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-neutral-900/50 border-r border-white/5 flex flex-col transform transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                    }`}
            >
                {/* Logo */}
                <div className="h-16 flex items-center px-6 border-b border-white/5">
                    <Link href="/admin" className="text-xl font-medium text-white tracking-tight">
                        VEYRAL
                    </Link>
                    <span className="ml-2 text-[10px] bg-white/10 text-neutral-400 px-2 py-0.5 rounded uppercase tracking-wider">
                        Admin
                    </span>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href ||
                            (item.href !== "/admin" && pathname.startsWith(item.href));
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setSidebarOpen(false)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${isActive
                                        ? "bg-white text-black font-medium"
                                        : "text-neutral-400 hover:text-white hover:bg-white/5"
                                    }`}
                            >
                                <item.icon className="w-4 h-4" />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer */}
                <div className="p-4 border-t border-white/5">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-neutral-400 hover:text-red-400 hover:bg-red-500/10 transition-colors w-full"
                    >
                        <LogOut className="w-4 h-4" />
                        Logout
                    </button>
                    <Link
                        href="/"
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-neutral-500 hover:text-white transition-colors"
                    >
                        ← Back to Store
                    </Link>
                </div>
            </aside>

            {/* Main content */}
            <main className="flex-1 lg:ml-0">
                {children}
            </main>
        </div>
    );
}
