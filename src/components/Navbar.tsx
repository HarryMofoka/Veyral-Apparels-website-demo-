"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, User, ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
    const { toggleCart, itemCount } = useCart();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
        if (!isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    };

    return (
        <>
            <nav
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${isScrolled
                        ? "glass-panel border-white/10"
                        : "bg-transparent border-transparent"
                    }`}
            >
                <div className="max-w-[1920px] mx-auto px-6 h-16 flex items-center justify-between">
                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleMenu}
                        className="md:hidden text-neutral-400 hover:text-white transition-colors"
                    >
                        <Menu className="w-6 h-6" />
                    </button>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-8 text-xs font-normal text-neutral-500">
                        <Link href="/shop" className="hover:text-white transition-colors">
                            Shop
                        </Link>
                        <Link href="/#collections" className="hover:text-white transition-colors">
                            Collections
                        </Link>
                        <Link href="/#journal" className="hover:text-white transition-colors">
                            Editorial
                        </Link>
                    </div>

                    {/* Logo */}
                    <Link
                        href="/"
                        className="text-xl font-medium tracking-tight text-white absolute left-1/2 -translate-x-1/2"
                    >
                        VEYRAL
                    </Link>

                    {/* Icons */}
                    <div className="flex items-center gap-5">
                        <button className="text-neutral-500 hover:text-white transition-colors">
                            <Search className="w-5 h-5" />
                        </button>
                        <button className="text-neutral-500 hover:text-white transition-colors">
                            <User className="w-5 h-5" />
                        </button>
                        <button
                            onClick={toggleCart}
                            className="text-neutral-500 hover:text-white transition-colors relative"
                        >
                            <ShoppingBag className="w-5 h-5" />
                            {itemCount > 0 && (
                                <span className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full animate-pulse" />
                            )}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 bg-[#030303] z-40 transition-transform duration-500 flex flex-col items-center justify-center space-y-6 ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <button
                    onClick={toggleMenu}
                    className="absolute top-6 right-6 text-neutral-500 hover:text-white transition-colors"
                >
                    <X className="w-8 h-8" />
                </button>
                <Link
                    href="/shop"
                    onClick={toggleMenu}
                    className="text-2xl font-light tracking-tight text-white hover:text-neutral-400 transition-colors"
                >
                    Shop
                </Link>
                <Link
                    href="/#collections"
                    onClick={toggleMenu}
                    className="text-2xl font-light tracking-tight text-white hover:text-neutral-400 transition-colors"
                >
                    Collections
                </Link>
                <Link
                    href="/#journal"
                    onClick={toggleMenu}
                    className="text-2xl font-light tracking-tight text-white hover:text-neutral-400 transition-colors"
                >
                    Journal
                </Link>
                <Link
                    href="#"
                    className="text-2xl font-light tracking-tight text-white hover:text-neutral-400 transition-colors"
                >
                    Manifesto
                </Link>
            </div>
        </>
    );
}
