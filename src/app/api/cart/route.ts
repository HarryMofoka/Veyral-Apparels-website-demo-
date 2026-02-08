import { NextResponse } from "next/server";
import { products } from "@/data/products";
import { getProductStock, updateProductStock, getProductWithStock } from "../products/route";

// In-memory cart storage (resets on server restart)
// In production, this would be stored in a database with session/user ID
interface CartItem {
    productId: string;
    quantity: number;
    selectedSize: string;
    selectedColor: string;
}

const carts: Map<string, CartItem[]> = new Map();

// Generate cart ID (in production, use session/user ID)
function getCartId(request: Request): string {
    const headers = new Headers(request.headers);
    return headers.get("x-cart-id") || "default";
}

// GET - Get cart contents
export async function GET(request: Request) {
    const cartId = getCartId(request);
    const cartItems = carts.get(cartId) || [];

    // Enrich cart items with product details
    const enrichedCart = cartItems.map((item) => {
        const product = products.find((p) => p.id === item.productId);
        if (!product) return null;

        return {
            ...item,
            product: getProductWithStock(product),
        };
    }).filter(Boolean);

    const subtotal = enrichedCart.reduce((sum, item) => {
        if (!item) return sum;
        return sum + (item.product.price * item.quantity);
    }, 0);

    return NextResponse.json({
        success: true,
        cart: enrichedCart,
        itemCount: enrichedCart.reduce((count, item) => count + (item?.quantity || 0), 0),
        subtotal,
    });
}

// POST - Add item to cart
export async function POST(request: Request) {
    try {
        const cartId = getCartId(request);
        const body = await request.json();
        const { productId, quantity = 1, selectedSize, selectedColor } = body;

        // Validate product exists
        const product = products.find((p) => p.id === productId);
        if (!product) {
            return NextResponse.json(
                { success: false, error: "Product not found" },
                { status: 404 }
            );
        }

        // Check stock
        const availableStock = getProductStock(productId);
        if (availableStock < quantity) {
            return NextResponse.json(
                { success: false, error: "Insufficient stock", availableStock },
                { status: 400 }
            );
        }

        // Get or create cart
        const cart = carts.get(cartId) || [];

        // Check if item already exists
        const existingIndex = cart.findIndex(
            (item) =>
                item.productId === productId &&
                item.selectedSize === selectedSize &&
                item.selectedColor === selectedColor
        );

        if (existingIndex > -1) {
            // Update quantity
            const newQuantity = cart[existingIndex].quantity + quantity;
            if (newQuantity > availableStock) {
                return NextResponse.json(
                    { success: false, error: "Cannot add more than available stock" },
                    { status: 400 }
                );
            }
            cart[existingIndex].quantity = newQuantity;
        } else {
            // Add new item
            cart.push({ productId, quantity, selectedSize, selectedColor });
        }

        carts.set(cartId, cart);

        return NextResponse.json({
            success: true,
            message: "Item added to cart",
            cart: cart.length,
        });
    } catch {
        return NextResponse.json(
            { success: false, error: "Invalid request body" },
            { status: 400 }
        );
    }
}

// PUT - Update cart item quantity
export async function PUT(request: Request) {
    try {
        const cartId = getCartId(request);
        const body = await request.json();
        const { productId, quantity, selectedSize, selectedColor } = body;

        const cart = carts.get(cartId);
        if (!cart) {
            return NextResponse.json(
                { success: false, error: "Cart not found" },
                { status: 404 }
            );
        }

        const itemIndex = cart.findIndex(
            (item) =>
                item.productId === productId &&
                item.selectedSize === selectedSize &&
                item.selectedColor === selectedColor
        );

        if (itemIndex === -1) {
            return NextResponse.json(
                { success: false, error: "Item not in cart" },
                { status: 404 }
            );
        }

        if (quantity <= 0) {
            // Remove item
            cart.splice(itemIndex, 1);
        } else {
            // Check stock
            const availableStock = getProductStock(productId);
            if (quantity > availableStock) {
                return NextResponse.json(
                    { success: false, error: "Quantity exceeds stock", availableStock },
                    { status: 400 }
                );
            }
            cart[itemIndex].quantity = quantity;
        }

        carts.set(cartId, cart);

        return NextResponse.json({
            success: true,
            message: "Cart updated",
        });
    } catch {
        return NextResponse.json(
            { success: false, error: "Invalid request body" },
            { status: 400 }
        );
    }
}

// DELETE - Remove item or clear cart
export async function DELETE(request: Request) {
    const cartId = getCartId(request);
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("productId");
    const selectedSize = searchParams.get("size");
    const selectedColor = searchParams.get("color");

    if (!productId) {
        // Clear entire cart
        carts.delete(cartId);
        return NextResponse.json({
            success: true,
            message: "Cart cleared",
        });
    }

    // Remove specific item
    const cart = carts.get(cartId);
    if (!cart) {
        return NextResponse.json(
            { success: false, error: "Cart not found" },
            { status: 404 }
        );
    }

    const filteredCart = cart.filter(
        (item) =>
            !(
                item.productId === productId &&
                item.selectedSize === selectedSize &&
                item.selectedColor === selectedColor
            )
    );

    carts.set(cartId, filteredCart);

    return NextResponse.json({
        success: true,
        message: "Item removed from cart",
    });
}
