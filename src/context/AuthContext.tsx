/**
 * User Authentication Context
 * 
 * Provides mock user authentication with:
 * - Login/logout functionality using LocalStorage
 * - Hardcoded demo user credentials
 * - User state management across the app
 * 
 * Demo Credentials:
 * - Email: demo@veyral.com
 * - Password: demo123
 * 
 * @context
 */
"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// User interface
export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phone?: string;
    address?: {
        street: string;
        city: string;
        state: string;
        zipCode: string;
        country: string;
    };
    createdAt: string;
}

// Auth context type
interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    login: (email: string, password: string) => { success: boolean; error?: string };
    logout: () => void;
    updateProfile: (updates: Partial<User>) => void;
}

// LocalStorage keys
const USER_KEY = "veyral_user";
const AUTH_KEY = "veyral_auth";

// Hardcoded demo users
const DEMO_USERS = [
    {
        id: "user-demo-001",
        email: "demo@veyral.com",
        password: "demo123",
        firstName: "Alex",
        lastName: "Johnson",
        phone: "+1 (555) 123-4567",
        address: {
            street: "123 Fashion Ave",
            city: "New York",
            state: "NY",
            zipCode: "10001",
            country: "United States",
        },
        createdAt: "2024-01-15T10:00:00Z",
    },
    {
        id: "user-demo-002",
        email: "test@example.com",
        password: "test123",
        firstName: "Jordan",
        lastName: "Smith",
        phone: "+1 (555) 987-6543",
        address: {
            street: "456 Style St",
            city: "Los Angeles",
            state: "CA",
            zipCode: "90001",
            country: "United States",
        },
        createdAt: "2024-02-20T14:30:00Z",
    },
];

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Check for existing session on mount
    useEffect(() => {
        const savedAuth = localStorage.getItem(AUTH_KEY);
        const savedUser = localStorage.getItem(USER_KEY);

        if (savedAuth === "true" && savedUser) {
            try {
                setUser(JSON.parse(savedUser));
            } catch {
                // Invalid stored data, clear it
                localStorage.removeItem(AUTH_KEY);
                localStorage.removeItem(USER_KEY);
            }
        }
        setIsLoading(false);
    }, []);

    // Login function
    const login = (email: string, password: string): { success: boolean; error?: string } => {
        const normalizedEmail = email.toLowerCase().trim();

        // Find matching user
        const matchedUser = DEMO_USERS.find(
            (u) => u.email.toLowerCase() === normalizedEmail && u.password === password
        );

        if (matchedUser) {
            // Create user object without password
            const { password: _, ...userWithoutPassword } = matchedUser;

            // Save to state and localStorage
            setUser(userWithoutPassword);
            localStorage.setItem(AUTH_KEY, "true");
            localStorage.setItem(USER_KEY, JSON.stringify(userWithoutPassword));

            return { success: true };
        }

        return { success: false, error: "Invalid email or password" };
    };

    // Logout function
    const logout = () => {
        setUser(null);
        localStorage.removeItem(AUTH_KEY);
        localStorage.removeItem(USER_KEY);
    };

    // Update profile function
    const updateProfile = (updates: Partial<User>) => {
        if (user) {
            const updatedUser = { ...user, ...updates };
            setUser(updatedUser);
            localStorage.setItem(USER_KEY, JSON.stringify(updatedUser));
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoading,
                isAuthenticated: !!user,
                login,
                logout,
                updateProfile,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

// Custom hook
export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
