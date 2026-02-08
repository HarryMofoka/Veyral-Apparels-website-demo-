// Order utility functions

import { CartItem } from "./cart";

export interface ShippingInfo {
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

export interface Order {
    id: string;
    paymentId: string;
    items: CartItem[];
    shipping: ShippingInfo;
    subtotal: number;
    shippingCost: number;
    total: number;
    status: "confirmed" | "processing" | "shipped" | "delivered";
    createdAt: string;
}

const ORDERS_KEY = "veyral_orders";
const CURRENT_ORDER_KEY = "veyral_current_order";

// Generate random order ID
export function generateOrderId(): string {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `VEY-${timestamp}-${random}`;
}

// Generate random payment confirmation ID
export function generatePaymentId(): string {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "PAY-";
    for (let i = 0; i < 16; i++) {
        if (i > 0 && i % 4 === 0) result += "-";
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

// Save order to localStorage
export function saveOrder(order: Order): void {
    if (typeof window === "undefined") return;

    // Save as current order for confirmation page
    localStorage.setItem(CURRENT_ORDER_KEY, JSON.stringify(order));

    // Also add to orders history
    const orders = getOrders();
    orders.push(order);
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

// Get current order (for confirmation page)
export function getCurrentOrder(): Order | null {
    if (typeof window === "undefined") return null;
    const order = localStorage.getItem(CURRENT_ORDER_KEY);
    return order ? JSON.parse(order) : null;
}

// Clear current order
export function clearCurrentOrder(): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem(CURRENT_ORDER_KEY);
}

// Get all orders history
export function getOrders(): Order[] {
    if (typeof window === "undefined") return [];
    const orders = localStorage.getItem(ORDERS_KEY);
    return orders ? JSON.parse(orders) : [];
}

// Validate email format
export function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Validate phone format (basic)
export function isValidPhone(phone: string): boolean {
    const phoneRegex = /^[\d\s\-+()]{10,}$/;
    return phoneRegex.test(phone);
}

// Validate shipping form
export function validateShippingForm(info: ShippingInfo): Record<string, string> {
    const errors: Record<string, string> = {};

    if (!info.firstName.trim()) errors.firstName = "First name is required";
    if (!info.lastName.trim()) errors.lastName = "Last name is required";
    if (!info.email.trim()) {
        errors.email = "Email is required";
    } else if (!isValidEmail(info.email)) {
        errors.email = "Please enter a valid email";
    }
    if (!info.phone.trim()) {
        errors.phone = "Phone number is required";
    } else if (!isValidPhone(info.phone)) {
        errors.phone = "Please enter a valid phone number";
    }
    if (!info.address.trim()) errors.address = "Address is required";
    if (!info.city.trim()) errors.city = "City is required";
    if (!info.state.trim()) errors.state = "State is required";
    if (!info.zipCode.trim()) errors.zipCode = "ZIP code is required";
    if (!info.country.trim()) errors.country = "Country is required";

    return errors;
}
