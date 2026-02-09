/**
 * StatCard Component
 * 
 * Reusable statistics card for admin dashboard.
 * Displays an icon, label, value, and optional trend indicator.
 * 
 * @component
 */
"use client";

import { ReactNode } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
    icon: ReactNode;
    label: string;
    value: string | number;
    trend?: {
        value: number;
        isPositive: boolean;
    };
    className?: string;
}

export default function StatCard({ icon, label, value, trend, className = "" }: StatCardProps) {
    return (
        <div className={`bg-neutral-900/30 rounded-lg border border-white/5 p-6 hover:border-white/10 transition-colors ${className}`}>
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/5 rounded-lg text-white">
                        {icon}
                    </div>
                    <p className="text-[10px] uppercase tracking-widest text-neutral-500">
                        {label}
                    </p>
                </div>
                {trend && (
                    <div className={`flex items-center gap-1 text-xs ${trend.isPositive ? "text-emerald-400" : "text-red-400"
                        }`}>
                        {trend.isPositive ? (
                            <TrendingUp className="w-3 h-3" />
                        ) : (
                            <TrendingDown className="w-3 h-3" />
                        )}
                        <span>{trend.value}%</span>
                    </div>
                )}
            </div>
            <p className="text-3xl font-medium text-white">{value}</p>
        </div>
    );
}
