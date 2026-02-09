/**
 * Admin Products Page
 * 
 * Product management page with:
 * - Product list with search and filter
 * - Inline stock editing
 * - Add/Edit/Delete product functionality
 * 
 * @page /admin/products
 */
"use client";

import { useState, useEffect, useMemo } from "react";
import {
    Search,
    Plus,
    Edit2,
    Trash2,
    X,
    Save,
    Package,
} from "lucide-react";
import { products as initialProducts, Product } from "@/data/products";
import { formatPrice } from "@/utils/helpers";

// LocalStorage key for product modifications
const PRODUCTS_KEY = "veyral_admin_products";

export default function AdminProductsPage() {
    const [productList, setProductList] = useState<Product[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [editingStock, setEditingStock] = useState<string | null>(null);
    const [stockValue, setStockValue] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Load products from localStorage or use initial data
    useEffect(() => {
        const saved = localStorage.getItem(PRODUCTS_KEY);
        if (saved) {
            setProductList(JSON.parse(saved));
        } else {
            setProductList(initialProducts);
        }
        setIsLoading(false);
    }, []);

    // Save products to localStorage
    const saveProducts = (products: Product[]) => {
        localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
        setProductList(products);
    };

    // Get unique categories
    const categories = useMemo(() => {
        const cats = [...new Set(productList.map((p) => p.category))];
        return ["all", ...cats];
    }, [productList]);

    // Filter products
    const filteredProducts = useMemo(() => {
        let result = [...productList];

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(
                (p) =>
                    p.name.toLowerCase().includes(query) ||
                    p.id.toLowerCase().includes(query)
            );
        }

        if (selectedCategory !== "all") {
            result = result.filter((p) => p.category === selectedCategory);
        }

        return result;
    }, [productList, searchQuery, selectedCategory]);

    // Handle stock update
    const handleStockUpdate = (productId: string) => {
        const updated = productList.map((p) =>
            p.id === productId
                ? { ...p, stock: stockValue, inStock: stockValue > 0 }
                : p
        );
        saveProducts(updated);
        setEditingStock(null);
    };

    // Handle product delete
    const handleDelete = (productId: string) => {
        if (confirm("Are you sure you want to delete this product?")) {
            const updated = productList.filter((p) => p.id !== productId);
            saveProducts(updated);
        }
    };

    // Handle add/edit product
    const handleSaveProduct = (product: Product) => {
        if (editingProduct) {
            // Update existing
            const updated = productList.map((p) =>
                p.id === product.id ? product : p
            );
            saveProducts(updated);
        } else {
            // Add new
            saveProducts([...productList, product]);
        }
        setShowModal(false);
        setEditingProduct(null);
    };

    if (isLoading) {
        return (
            <div className="p-8 lg:p-12 flex items-center justify-center min-h-screen">
                <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="p-6 lg:p-12 pt-20 lg:pt-12">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-medium text-white tracking-tight mb-2">
                        Products
                    </h1>
                    <p className="text-neutral-500 text-sm">
                        {filteredProducts.length} products
                    </p>
                </div>
                <button
                    onClick={() => {
                        setEditingProduct(null);
                        setShowModal(true);
                    }}
                    className="flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded text-sm font-semibold hover:bg-neutral-200 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Add Product
                </button>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-neutral-900/50 border border-white/10 rounded-lg pl-11 pr-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-white/30"
                    />
                </div>
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="bg-neutral-900/50 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-white/30 capitalize"
                >
                    {categories.map((cat) => (
                        <option key={cat} value={cat} className="capitalize">
                            {cat === "all" ? "All Categories" : cat}
                        </option>
                    ))}
                </select>
            </div>

            {/* Products Table */}
            <div className="bg-neutral-900/30 rounded-lg border border-white/5 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-white/5">
                            <tr>
                                <th className="px-6 py-4 text-left text-[10px] uppercase tracking-widest font-medium text-neutral-400">
                                    Product
                                </th>
                                <th className="px-6 py-4 text-left text-[10px] uppercase tracking-widest font-medium text-neutral-400">
                                    Category
                                </th>
                                <th className="px-6 py-4 text-left text-[10px] uppercase tracking-widest font-medium text-neutral-400">
                                    Price
                                </th>
                                <th className="px-6 py-4 text-left text-[10px] uppercase tracking-widest font-medium text-neutral-400">
                                    Stock
                                </th>
                                <th className="px-6 py-4 text-left text-[10px] uppercase tracking-widest font-medium text-neutral-400">
                                    Status
                                </th>
                                <th className="px-6 py-4 text-right text-[10px] uppercase tracking-widest font-medium text-neutral-400">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {filteredProducts.map((product) => (
                                <tr
                                    key={product.id}
                                    className="hover:bg-white/5 transition-colors group"
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-12 bg-neutral-800 rounded-sm overflow-hidden relative border border-white/5">
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                                />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-white">
                                                    {product.name}
                                                </p>
                                                <p className="text-xs text-neutral-500 font-mono mt-0.5">
                                                    {product.id.substring(0, 12)}...
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-neutral-400 text-sm capitalize">
                                        {product.category}
                                    </td>
                                    <td className="px-6 py-4 font-medium text-white text-sm">
                                        {formatPrice(product.price)}
                                    </td>
                                    <td className="px-6 py-4">
                                        {editingStock === product.id ? (
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="number"
                                                    value={stockValue}
                                                    onChange={(e) =>
                                                        setStockValue(parseInt(e.target.value) || 0)
                                                    }
                                                    className="w-16 bg-black/50 border border-white/20 rounded px-2 py-1 text-sm text-white text-center"
                                                    min="0"
                                                    autoFocus
                                                />
                                                <button
                                                    onClick={() => handleStockUpdate(product.id)}
                                                    className="p-1 text-emerald-400 hover:bg-emerald-500/10 rounded"
                                                >
                                                    <Save className="w-3.5 h-3.5" />
                                                </button>
                                                <button
                                                    onClick={() => setEditingStock(null)}
                                                    className="p-1 text-neutral-400 hover:bg-white/5 rounded"
                                                >
                                                    <X className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => {
                                                    setEditingStock(product.id);
                                                    setStockValue(product.stock);
                                                }}
                                                className="text-sm text-white hover:text-neutral-300 font-mono"
                                            >
                                                {product.stock}
                                            </button>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] uppercase tracking-wider border ${product.stock === 0
                                                ? "bg-red-500/10 text-red-400 border-red-500/20"
                                                : product.stock < 10
                                                    ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                                                    : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                                }`}
                                        >
                                            <span
                                                className={`w-1 h-1 rounded-full ${product.stock === 0
                                                    ? "bg-red-400"
                                                    : product.stock < 10
                                                        ? "bg-amber-400"
                                                        : "bg-emerald-400"
                                                    }`}
                                            />
                                            {product.stock === 0
                                                ? "Out of Stock"
                                                : product.stock < 10
                                                    ? "Low Stock"
                                                    : "In Stock"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-1">
                                            <button
                                                onClick={() => {
                                                    setEditingProduct(product);
                                                    setShowModal(true);
                                                }}
                                                className="p-2 text-neutral-500 hover:text-white hover:bg-white/5 rounded transition-colors"
                                            >
                                                <Edit2 className="w-3.5 h-3.5" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(product.id)}
                                                className="p-2 text-neutral-500 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors"
                                            >
                                                <Trash2 className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {filteredProducts.length === 0 && (
                    <div className="p-12 text-center text-neutral-500 text-sm">
                        <Package className="w-10 h-10 mx-auto mb-3 opacity-30" />
                        No products found
                    </div>
                )}
            </div>

            {/* Add/Edit Modal */}
            {showModal && (
                <ProductModal
                    product={editingProduct}
                    onSave={handleSaveProduct}
                    onClose={() => {
                        setShowModal(false);
                        setEditingProduct(null);
                    }}
                />
            )}
        </div>
    );
}

// Product Modal Component
function ProductModal({
    product,
    onSave,
    onClose,
}: {
    product: Product | null;
    onSave: (product: Product) => void;
    onClose: () => void;
}) {
    const [formData, setFormData] = useState({
        name: product?.name || "",
        price: product?.price || 0,
        category: product?.category || "tops",
        stock: product?.stock || 0,
        description: product?.description || "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newProduct: Product = product
            ? {
                ...product,
                ...formData,
                inStock: formData.stock > 0,
            }
            : {
                id: `product-${Date.now()}`,
                name: formData.name,
                description: formData.description,
                price: formData.price,
                category: formData.category,
                tags: [],
                image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800",
                images: [],
                sizes: ["S", "M", "L", "XL"],
                colors: [{ name: "Black", hex: "#000000" }],
                stock: formData.stock,
                inStock: formData.stock > 0,
                featured: false,
                isNew: true,
                popularity: 50,
                createdAt: new Date().toISOString(),
            };

        onSave(newProduct);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/70" onClick={onClose} />
            <div className="relative bg-neutral-900 border border-white/10 rounded-lg w-full max-w-md p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-medium text-white">
                        {product ? "Edit Product" : "Add New Product"}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 text-neutral-500 hover:text-white transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs text-neutral-500 uppercase tracking-wider mb-2">
                            Product Name
                        </label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) =>
                                setFormData({ ...formData, name: e.target.value })
                            }
                            required
                            className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-white/30"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs text-neutral-500 uppercase tracking-wider mb-2">
                                Price ($)
                            </label>
                            <input
                                type="number"
                                value={formData.price}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        price: parseFloat(e.target.value) || 0,
                                    })
                                }
                                required
                                min="0"
                                step="0.01"
                                className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-white/30"
                            />
                        </div>
                        <div>
                            <label className="block text-xs text-neutral-500 uppercase tracking-wider mb-2">
                                Stock
                            </label>
                            <input
                                type="number"
                                value={formData.stock}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        stock: parseInt(e.target.value) || 0,
                                    })
                                }
                                required
                                min="0"
                                className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-white/30"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs text-neutral-500 uppercase tracking-wider mb-2">
                            Category
                        </label>
                        <select
                            value={formData.category}
                            onChange={(e) =>
                                setFormData({ ...formData, category: e.target.value })
                            }
                            className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-white/30"
                        >
                            <option value="tops">Tops</option>
                            <option value="bottoms">Bottoms</option>
                            <option value="outerwear">Outerwear</option>
                            <option value="accessories">Accessories</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs text-neutral-500 uppercase tracking-wider mb-2">
                            Description
                        </label>
                        <textarea
                            value={formData.description}
                            onChange={(e) =>
                                setFormData({ ...formData, description: e.target.value })
                            }
                            rows={3}
                            className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-white/30 resize-none"
                        />
                    </div>
                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-3 border border-white/10 rounded text-sm text-neutral-400 hover:text-white hover:border-white/30 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-3 bg-white text-black rounded text-sm font-semibold hover:bg-neutral-200 transition-colors"
                        >
                            {product ? "Update" : "Create"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
