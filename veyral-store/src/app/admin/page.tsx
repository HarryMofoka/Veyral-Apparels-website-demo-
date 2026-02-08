"use client";

import { products } from "@/data/products";
import { formatPriceUSD } from "@/utils/helpers";

export default function AdminPage() {
    const totalProducts = products.length;
    const totalValue = products.reduce((acc, p) => acc + p.price, 0);
    const inStockProducts = products.filter((p) => p.inStock).length;
    const featuredProducts = products.filter((p) => p.featured).length;

    return (
        <div className="min-h-screen bg-gray-50">
            <section className="py-12">
                <div className="container mx-auto px-6">
                    <h1 className="text-3xl font-serif font-bold mb-8">Admin Dashboard</h1>

                    {/* Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        <div className="bg-white rounded-lg p-6 shadow-sm">
                            <p className="text-gray-500 text-sm">Total Products</p>
                            <p className="text-3xl font-bold mt-2">{totalProducts}</p>
                        </div>
                        <div className="bg-white rounded-lg p-6 shadow-sm">
                            <p className="text-gray-500 text-sm">Inventory Value</p>
                            <p className="text-3xl font-bold mt-2">{formatPriceUSD(totalValue)}</p>
                        </div>
                        <div className="bg-white rounded-lg p-6 shadow-sm">
                            <p className="text-gray-500 text-sm">In Stock</p>
                            <p className="text-3xl font-bold mt-2">{inStockProducts}</p>
                        </div>
                        <div className="bg-white rounded-lg p-6 shadow-sm">
                            <p className="text-gray-500 text-sm">Featured</p>
                            <p className="text-3xl font-bold mt-2">{featuredProducts}</p>
                        </div>
                    </div>

                    {/* Products Table */}
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                        <div className="p-6 border-b">
                            <h2 className="text-xl font-bold">Products</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Product</th>
                                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Category</th>
                                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Price</th>
                                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                                        <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {products.map((product) => (
                                        <tr key={product.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden">
                                                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium">{product.name}</p>
                                                        <p className="text-sm text-gray-500">{product.id}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-gray-600 capitalize">{product.category}</td>
                                            <td className="px-6 py-4 font-medium">{formatPriceUSD(product.price)}</td>
                                            <td className="px-6 py-4">
                                                <span
                                                    className={`px-2 py-1 text-xs rounded-full ${product.inStock ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                                                        }`}
                                                >
                                                    {product.inStock ? "In Stock" : "Out of Stock"}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <button className="text-amber-600 hover:underline text-sm">Edit</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
