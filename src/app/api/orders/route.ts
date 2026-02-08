import { NextResponse } from "next/server";
import { products } from "@/data/products";
import { updateProductStock, getProductWithStock } from "../products/route";

// Order interface
interface OrderItem {
    productId: string;
    quantity: number;
    selectedSize: string;
    selectedColor: string;
    price: number;
}

interface ShippingInfo {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
}

interface Order {
    id: string;
    paymentId: string;
    items: OrderItem[];
    shipping: ShippingInfo;
    subtotal: number;
    shippingCost: number;
    total: number;
    status: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled";
    createdAt: string;
    updatedAt: string;
}

// In-memory orders storage
const orders: Map<string, Order> = new Map();

// Generate unique order ID
function generateOrderId(): string {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `VEY-${timestamp}-${random}`;
}

// Generate payment ID
function generatePaymentId(): string {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "PAY-";
    for (let i = 0; i < 16; i++) {
        if (i > 0 && i % 4 === 0) result += "-";
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

// GET - Get orders (by ID or list)
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get("id");
    const email = searchParams.get("email");

    if (orderId) {
        const order = orders.get(orderId);
        if (!order) {
            return NextResponse.json(
                { success: false, error: "Order not found" },
                { status: 404 }
            );
        }
        return NextResponse.json({ success: true, order });
    }

    if (email) {
        // Get orders by email
        const userOrders = Array.from(orders.values())
            .filter((o) => o.shipping.email.toLowerCase() === email.toLowerCase())
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

        return NextResponse.json({
            success: true,
            orders: userOrders,
            total: userOrders.length,
        });
    }

    // Return all orders (admin view - in production, add auth)
    const allOrders = Array.from(orders.values())
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return NextResponse.json({
        success: true,
        orders: allOrders,
        total: allOrders.length,
    });
}

// POST - Create new order
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { items, shipping } = body;

        // Validate items
        if (!items || !Array.isArray(items) || items.length === 0) {
            return NextResponse.json(
                { success: false, error: "Order must have at least one item" },
                { status: 400 }
            );
        }

        // Validate and process items
        const orderItems: OrderItem[] = [];
        let subtotal = 0;

        for (const item of items) {
            const product = products.find((p) => p.id === item.productId);
            if (!product) {
                return NextResponse.json(
                    { success: false, error: `Product not found: ${item.productId}` },
                    { status: 400 }
                );
            }

            // Update stock
            const stockUpdated = updateProductStock(item.productId, item.quantity);
            if (!stockUpdated) {
                return NextResponse.json(
                    { success: false, error: `Insufficient stock for: ${product.name}` },
                    { status: 400 }
                );
            }

            orderItems.push({
                productId: item.productId,
                quantity: item.quantity,
                selectedSize: item.selectedSize,
                selectedColor: item.selectedColor,
                price: product.price,
            });

            subtotal += product.price * item.quantity;
        }

        // Calculate shipping
        const shippingCost = subtotal > 100 ? 0 : 10;
        const total = subtotal + shippingCost;

        // Create order
        const order: Order = {
            id: generateOrderId(),
            paymentId: generatePaymentId(),
            items: orderItems,
            shipping,
            subtotal,
            shippingCost,
            total,
            status: "confirmed",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        orders.set(order.id, order);

        return NextResponse.json({
            success: true,
            message: "Order created successfully",
            order,
        });
    } catch {
        return NextResponse.json(
            { success: false, error: "Invalid request body" },
            { status: 400 }
        );
    }
}

// PUT - Update order status
export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const { orderId, status } = body;

        const order = orders.get(orderId);
        if (!order) {
            return NextResponse.json(
                { success: false, error: "Order not found" },
                { status: 404 }
            );
        }

        const validStatuses = ["pending", "confirmed", "processing", "shipped", "delivered", "cancelled"];
        if (!validStatuses.includes(status)) {
            return NextResponse.json(
                { success: false, error: "Invalid status" },
                { status: 400 }
            );
        }

        order.status = status;
        order.updatedAt = new Date().toISOString();
        orders.set(orderId, order);

        return NextResponse.json({
            success: true,
            message: "Order status updated",
            order,
        });
    } catch {
        return NextResponse.json(
            { success: false, error: "Invalid request body" },
            { status: 400 }
        );
    }
}
