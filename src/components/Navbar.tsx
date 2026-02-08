/**
 * Navbar Component
 * 
 * A responsive navigation bar for the VEYRAL e-commerce site.
 * Features:
 * - Fixed positioning with glass-panel effect on scroll
 * - Mobile hamburger menu with full-screen overlay
 * - Cart icon with item count indicator
 * - Desktop navigation links with hover effects
 * 
 * @component
 */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, User, ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
    // Access cart context for toggle functionality and item count display
    const { toggleCart, itemCount } = useCart();

    // Track scroll position to apply glass-panel effect when scrolled
    const [isScrolled, setIsScrolled] = useState(false);

    // Control mobile menu open/close state
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    /**
     * Scroll Event Handler
     * Adds glass-panel styling when user scrolls past 50px threshold.
     * This creates a frosted glass effect for better content visibility.
     */
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

    /**
     * Toggle Mobile Menu
     * Opens/closes the full-screen mobile navigation overlay.
     * Also controls body overflow to prevent background scrolling when menu is open.
     */
    const toggleMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
        // Prevent body scroll when mobile menu is open
        if (!isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    };

    return (
        <>
            {/* 
              * Main Navigation Bar
              * - Fixed at top with z-50 to stay above page content
              * - Applies glass-panel effect when scrolled (backdrop blur + semi-transparent bg)
              * - Border visibility changes based on scroll state
              */}
            <nav
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${isScrolled
                    ? "glass-panel border-white/10"
                    : "bg-transparent border-transparent"
                    }`}
            >
                <div className="max-w-[1920px] mx-auto px-6 h-16 flex items-center justify-between">
                    {/* 
                      * Mobile Menu Toggle Button
                      * Only visible on mobile (md:hidden)
                      * Hamburger icon that triggers the full-screen menu overlay
                      */}
                    <button
                        onClick={toggleMenu}
                        className="md:hidden text-neutral-400 hover:text-white transition-colors"
                        aria-label="Toggle mobile menu"
                    >
                        <Menu className="w-6 h-6" />
                    </button>

                    {/* 
                      * Desktop Navigation Links
                      * Hidden on mobile, displayed as horizontal links on desktop (md+)
                      * Links to main sections: Shop, Collections, Editorial
                      */}
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

                    {/* 
                      * Centered Logo
                      * Absolutely positioned at horizontal center of navbar
                      * Always visible on both mobile and desktop
                      */}
                    <Link
                        href="/"
                        className="text-xl font-medium tracking-tight text-white absolute left-1/2 -translate-x-1/2"
                    >
                        VEYRAL
                    </Link>

                    {/* 
                      * Right-side Icon Actions
                      * Search, User account, and Shopping cart icons
                      * Cart icon shows a pulsing indicator when items are in cart
                      */}
                    <div className="flex items-center gap-5">
                        <button
                            className="text-neutral-500 hover:text-white transition-colors"
                            aria-label="Search products"
                        >
                            <Search className="w-5 h-5" />
                        </button>
                        <button
                            className="text-neutral-500 hover:text-white transition-colors"
                            aria-label="User account"
                        >
                            <User className="w-5 h-5" />
                        </button>
                        <button
                            onClick={toggleCart}
                            className="text-neutral-500 hover:text-white transition-colors relative"
                            aria-label={`Shopping cart${itemCount > 0 ? ` with ${itemCount} items` : ''}`}
                        >
                            <ShoppingBag className="w-5 h-5" />
                            {/* Cart item count indicator - pulsing white dot */}
                            {itemCount > 0 && (
                                <span className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full animate-pulse" />
                            )}
                        </button>
                    </div>
                </div>
            </nav>

            {/* 
              * Mobile Menu Overlay
              * 
              * IMPORTANT: This overlay uses pointer-events-none and invisible when closed
              * to prevent it from blocking clicks on the underlying page content.
              * Without these classes, the fixed inset-0 positioning would create an
              * invisible barrier over the entire page even when the menu is off-screen.
              * 
              * When open:
              * - Slides in from the left (translate-x-0)
              * - Becomes visible and interactive (visible, pointer-events-auto)
              * 
              * When closed:
              * - Slides out to the left (-translate-x-full)
              * - Becomes invisible and non-interactive (invisible, pointer-events-none)
              */}
            <div
                className={`fixed inset-0 bg-[#030303] z-40 transition-all duration-500 flex flex-col items-center justify-center space-y-6 ${isMobileMenuOpen
                        ? "translate-x-0 visible pointer-events-auto"
                        : "-translate-x-full invisible pointer-events-none"
                    }`}
                aria-hidden={!isMobileMenuOpen}
            >
                {/* Close button - positioned top right */}
                <button
                    onClick={toggleMenu}
                    className="absolute top-6 right-6 text-neutral-500 hover:text-white transition-colors"
                    aria-label="Close mobile menu"
                >
                    <X className="w-8 h-8" />
                </button>

                {/* Mobile Navigation Links - Large, centered text */}
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
