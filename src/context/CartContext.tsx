"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { Product } from "@/data/products";
import {
    CartItem,
    getCart,
    addToCart as addToCartUtil,
    removeFromCart as removeFromCartUtil,
    updateQuantity as updateQuantityUtil,
    clearCart as clearCartUtil,
    getCartTotal,
    getCartItemCount,
} from "@/utils/cart";

interface CartContextType {
    cart: CartItem[];
    itemCount: number;
    total: number;
    isCartOpen: boolean;
    addItem: (product: Product, quantity: number, size: string, color: string) => void;
    removeItem: (productId: string, size: string, color: string) => void;
    updateItemQuantity: (productId: string, size: string, color: string, quantity: number) => void;
    clearCart: () => void;
    openCart: () => void;
    closeCart: () => void;
    toggleCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load cart from localStorage on mount
    useEffect(() => {
        setCart(getCart());
        setIsLoaded(true);
    }, []);

    // Listen for storage events (for cross-tab sync)
    useEffect(() => {
        const handleStorageChange = () => {
            setCart(getCart());
        };

        window.addEventListener("storage", handleStorageChange);
        window.addEventListener("cartUpdated", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
            window.removeEventListener("cartUpdated", handleStorageChange);
        };
    }, []);

    const addItem = useCallback(
        (product: Product, quantity: number, size: string, color: string) => {
            const updatedCart = addToCartUtil(product, quantity, size, color);
            setCart(updatedCart);
            setIsCartOpen(true); // Open cart drawer when item added
            window.dispatchEvent(new Event("cartUpdated"));
        },
        []
    );

    const removeItem = useCallback(
        (productId: string, size: string, color: string) => {
            const updatedCart = removeFromCartUtil(productId, size, color);
            setCart(updatedCart);
            window.dispatchEvent(new Event("cartUpdated"));
        },
        []
    );

    const updateItemQuantity = useCallback(
        (productId: string, size: string, color: string, quantity: number) => {
            const updatedCart = updateQuantityUtil(productId, size, color, quantity);
            setCart(updatedCart);
            window.dispatchEvent(new Event("cartUpdated"));
        },
        []
    );

    const clearCart = useCallback(() => {
        clearCartUtil();
        setCart([]);
        window.dispatchEvent(new Event("cartUpdated"));
    }, []);

    const openCart = useCallback(() => setIsCartOpen(true), []);
    const closeCart = useCallback(() => setIsCartOpen(false), []);
    const toggleCart = useCallback(() => setIsCartOpen((prev) => !prev), []);

    const itemCount = isLoaded ? getCartItemCount(cart) : 0;
    const total = isLoaded ? getCartTotal(cart) : 0;

    return (
        <CartContext.Provider
            value={{
                cart,
                itemCount,
                total,
                isCartOpen,
                addItem,
                removeItem,
                updateItemQuantity,
                clearCart,
                openCart,
                closeCart,
                toggleCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
