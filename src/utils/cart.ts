// Cart utility functions

import { Product } from "@/data/products";

export interface CartItem {
    product: Product;
    quantity: number;
    selectedSize: string;
    selectedColor: string;
}

const CART_KEY = "veyral_cart";

export function getCart(): CartItem[] {
    if (typeof window === "undefined") return [];
    const cart = localStorage.getItem(CART_KEY);
    return cart ? JSON.parse(cart) : [];
}

export function saveCart(cart: CartItem[]): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function addToCart(
    product: Product,
    quantity: number = 1,
    selectedSize: string,
    selectedColor: string
): CartItem[] {
    const cart = getCart();

    const existingIndex = cart.findIndex(
        (item) =>
            item.product.id === product.id &&
            item.selectedSize === selectedSize &&
            item.selectedColor === selectedColor
    );

    if (existingIndex > -1) {
        cart[existingIndex].quantity += quantity;
    } else {
        cart.push({ product, quantity, selectedSize, selectedColor });
    }

    saveCart(cart);
    return cart;
}

export function removeFromCart(
    productId: string,
    selectedSize: string,
    selectedColor: string
): CartItem[] {
    const cart = getCart().filter(
        (item) =>
            !(
                item.product.id === productId &&
                item.selectedSize === selectedSize &&
                item.selectedColor === selectedColor
            )
    );
    saveCart(cart);
    return cart;
}

export function updateQuantity(
    productId: string,
    selectedSize: string,
    selectedColor: string,
    quantity: number
): CartItem[] {
    const cart = getCart();
    const item = cart.find(
        (item) =>
            item.product.id === productId &&
            item.selectedSize === selectedSize &&
            item.selectedColor === selectedColor
    );

    if (item) {
        item.quantity = Math.max(1, quantity);
    }

    saveCart(cart);
    return cart;
}

export function clearCart(): void {
    saveCart([]);
}

export function getCartTotal(cart: CartItem[]): number {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
}

export function getCartItemCount(cart: CartItem[]): number {
    return cart.reduce((count, item) => count + item.quantity, 0);
}
