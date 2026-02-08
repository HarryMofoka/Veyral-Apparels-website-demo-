"use client";

import {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react";
import {
    CartItem,
    getCart,
    addToCart as addToCartUtil,
    removeFromCart as removeFromCartUtil,
    updateQuantity as updateQuantityUtil,
    clearCart as clearCartUtil,
    getCartTotal,
} from "@/utils/cart";

interface CartContextType {
    cart: CartItem[];
    isCartOpen: boolean;
    openCart: () => void;
    closeCart: () => void;
    toggleCart: () => void;
    itemCount: number;
    addItem: (item: CartItem) => void;
    removeItem: (productId: string, size: string, color: string) => void;
    updateItemQuantity: (
        productId: string,
        size: string,
        color: string,
        quantity: number
    ) => void;
    clear: () => void;
    total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    // Initialize cart from local storage
    useEffect(() => {
        setCart(getCart());
        setIsLoaded(true);

        // Listen for storage events to sync across tabs
        const handleStorage = () => {
            setCart(getCart());
        };

        window.addEventListener("storage", handleStorage);
        window.addEventListener("cartUpdated", handleStorage);

        return () => {
            window.removeEventListener("storage", handleStorage);
            window.removeEventListener("cartUpdated", handleStorage);
        };
    }, []);

    const openCart = () => setIsCartOpen(true);
    const closeCart = () => setIsCartOpen(false);
    const toggleCart = () => setIsCartOpen((prev) => !prev);

    const addItem = (item: CartItem) => {
        const updatedCart = addToCartUtil(
            item.product,
            item.quantity,
            item.selectedSize,
            item.selectedColor
        );
        setCart(updatedCart);
        openCart();
    };

    const removeItem = (productId: string, size: string, color: string) => {
        const updatedCart = removeFromCartUtil(productId, size, color);
        setCart(updatedCart);
    };

    const updateItemQuantity = (
        productId: string,
        size: string,
        color: string,
        quantity: number
    ) => {
        const updatedCart = updateQuantityUtil(productId, size, color, quantity);
        setCart(updatedCart);
    };

    const clear = () => {
        clearCartUtil();
        setCart([]);
    };

    const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    const total = getCartTotal(cart);

    return (
        <CartContext.Provider
            value={{
                cart,
                isCartOpen,
                openCart,
                closeCart,
                toggleCart,
                itemCount,
                addItem,
                removeItem,
                updateItemQuantity,
                clear,
                total,
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
