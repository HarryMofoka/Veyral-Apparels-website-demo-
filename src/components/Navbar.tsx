"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingBag, Search, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { itemCount, openCart } = useCart();

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/shop", label: "Shop" },
        { href: "/collections", label: "Collections" },
        { href: "/about", label: "About" },
        { href: "/journal", label: "Journal" },
    ];

    return (
        <header className="fixed w-full z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100">
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold font-serif">
                    VEYRAL
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex space-x-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="relative text-gray-700 hover:text-black transition-colors after:absolute after:bottom-[-5px] after:left-0 after:w-0 after:h-0.5 after:bg-amber-600 after:transition-all hover:after:w-full"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Icons */}
                <div className="flex items-center space-x-4">
                    <button className="p-2 hover:bg-gray-100 rounded-full transition">
                        <Search className="w-5 h-5" />
                    </button>
                    <button
                        onClick={openCart}
                        className="p-2 hover:bg-gray-100 rounded-full transition relative"
                    >
                        <ShoppingBag className="w-5 h-5" />
                        {itemCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                                {itemCount > 99 ? "99+" : itemCount}
                            </span>
                        )}
                    </button>
                    <button
                        className="md:hidden p-2 hover:bg-gray-100 rounded-full transition"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-t px-6 py-4">
                    <div className="flex flex-col space-y-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-gray-700 hover:text-black transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
}
