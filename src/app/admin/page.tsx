"use client";

import { products } from "@/data/products";
import { formatPriceUSD } from "@/utils/helpers";
import { Edit2, Package, DollarSign, Archive, Star } from "lucide-react";

export default function AdminPage() {
    const totalProducts = products.length;
    const totalValue = products.reduce((acc, p) => acc + p.price, 0);
    const inStockProducts = products.filter((p) => p.inStock).length;
    const featuredProducts = products.filter((p) => p.featured).length;

    return (
        <div className="min-h-screen bg-[#030303] pt-24 pb-12">
            <section className="container mx-auto px-6">
                <div className="flex justify-between items-end mb-12 border-b border-white/5 pb-8">
                    <div>
                        <h1 className="text-3xl font-medium text-white tracking-tight mb-2">Command Center</h1>
                        <p className="text-neutral-500 text-sm">System Overview & Inventory Management</p>
                    </div>
                    <button className="bg-white text-black px-6 py-2.5 rounded text-xs font-semibold uppercase tracking-widest hover:bg-neutral-200 transition-colors">
                        Add New Unit
                    </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    <div className="bg-neutral-900/30 rounded-sm border border-white/5 p-6 hover:border-white/10 transition-colors">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-white/5 rounded text-white">
                                <Package className="w-4 h-4" />
                            </div>
                            <p className="text-[10px] uppercase tracking-widest text-neutral-500">Total Units</p>
                        </div>
                        <p className="text-3xl font-medium text-white">{totalProducts}</p>
                    </div>
                    <div className="bg-neutral-900/30 rounded-sm border border-white/5 p-6 hover:border-white/10 transition-colors">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-white/5 rounded text-white">
                                <DollarSign className="w-4 h-4" />
                            </div>
                            <p className="text-[10px] uppercase tracking-widest text-neutral-500">Asset Value</p>
                        </div>
                        <p className="text-3xl font-medium text-white">{formatPriceUSD(totalValue)}</p>
                    </div>
                    <div className="bg-neutral-900/30 rounded-sm border border-white/5 p-6 hover:border-white/10 transition-colors">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-white/5 rounded text-white">
                                <Archive className="w-4 h-4" />
                            </div>
                            <p className="text-[10px] uppercase tracking-widest text-neutral-500">Active Stock</p>
                        </div>
                        <p className="text-3xl font-medium text-white">{inStockProducts}</p>
                    </div>
                    <div className="bg-neutral-900/30 rounded-sm border border-white/5 p-6 hover:border-white/10 transition-colors">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-white/5 rounded text-white">
                                <Star className="w-4 h-4" />
                            </div>
                            <p className="text-[10px] uppercase tracking-widest text-neutral-500">Featured</p>
                        </div>
                        <p className="text-3xl font-medium text-white">{featuredProducts}</p>
                    </div>
                </div>

                {/* Products Table */}
                <div className="bg-neutral-900/30 rounded-sm border border-white/5 overflow-hidden">
                    <div className="p-6 border-b border-white/5 flex justify-between items-center">
                        <h2 className="text-sm font-medium text-white uppercase tracking-widest">Inventory Manifest</h2>
                        <div className="flex gap-2">
                            {/* Filter buttons could go here */}
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-white/5">
                                <tr>
                                    <th className="px-6 py-4 text-left text-[10px] uppercase tracking-widest font-medium text-neutral-400">Product</th>
                                    <th className="px-6 py-4 text-left text-[10px] uppercase tracking-widest font-medium text-neutral-400">Category</th>
                                    <th className="px-6 py-4 text-left text-[10px] uppercase tracking-widest font-medium text-neutral-400">Price</th>
                                    <th className="px-6 py-4 text-left text-[10px] uppercase tracking-widest font-medium text-neutral-400">Status</th>
                                    <th className="px-6 py-4 text-right text-[10px] uppercase tracking-widest font-medium text-neutral-400">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {products.map((product) => (
                                    <tr key={product.id} className="hover:bg-white/5 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-12 bg-neutral-800 rounded-sm overflow-hidden relative border border-white/5">
                                                    <img src={product.image} alt={product.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-white">{product.name}</p>
                                                    <p className="text-xs text-neutral-500 font-mono mt-0.5">{product.id.substring(0, 8)}...</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-neutral-400 text-xs capitalize">{product.category}</td>
                                        <td className="px-6 py-4 font-medium text-white text-xs">{formatPriceUSD(product.price)}</td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] uppercase tracking-wider border ${product.inStock
                                                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                                    : "bg-red-500/10 text-red-400 border-red-500/20"
                                                    }`}
                                            >
                                                <span className={`w-1 h-1 rounded-full ${product.inStock ? "bg-emerald-400" : "bg-red-400"}`}></span>
                                                {product.inStock ? "In Stock" : "Depleted"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="text-neutral-500 hover:text-white transition-colors p-2 hover:bg-white/5 rounded">
                                                <Edit2 className="w-3.5 h-3.5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>
    );
}
