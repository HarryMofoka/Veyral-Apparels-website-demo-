// Product data for Veyral Apparels store

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    originalPrice?: number;
    category: string;
    image: string;
    images: string[];
    sizes: string[];
    colors: { name: string; hex: string }[];
    inStock: boolean;
    featured: boolean;
    isNew: boolean;
}

export const products: Product[] = [
    {
        id: "signature-blazer",
        name: "Signature Blazer",
        description: "Our best-selling blazer, crafted from premium wool and designed for both comfort and style. Perfect for both office wear and evening occasions.",
        price: 249,
        category: "outerwear",
        image: "https://thefoschini.vtexassets.com/arquivos/ids/220247008-800-1067/4b2d72a1-c525-46d8-beea-12972c56e764.png?v=638925765378970000",
        images: [
            "https://thefoschini.vtexassets.com/arquivos/ids/220247008-800-1067/4b2d72a1-c525-46d8-beea-12972c56e764.png?v=638925765378970000",
        ],
        sizes: ["XS", "S", "M", "L", "XL", "XXL"],
        colors: [
            { name: "Charcoal", hex: "#1a1a1a" },
            { name: "Grey", hex: "#6b7280" },
            { name: "Navy", hex: "#1e3a5f" },
        ],
        inStock: true,
        featured: true,
        isNew: false,
    },
    {
        id: "wool-trousers",
        name: "Wool Trousers",
        description: "Tailored fit wool trousers with a refined drape. Perfect for formal and smart-casual occasions.",
        price: 129,
        category: "bottoms",
        image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800",
        images: ["https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800"],
        sizes: ["28", "30", "32", "34", "36", "38"],
        colors: [
            { name: "Black", hex: "#000000" },
            { name: "Charcoal", hex: "#374151" },
        ],
        inStock: true,
        featured: false,
        isNew: true,
    },
    {
        id: "silk-shirt",
        name: "Silk Shirt",
        description: "Luxury silk shirt with a relaxed fit. Breathable and elegant for any occasion.",
        price: 159,
        category: "tops",
        image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800",
        images: ["https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800"],
        sizes: ["XS", "S", "M", "L", "XL"],
        colors: [
            { name: "Ivory", hex: "#fffff0" },
            { name: "Blush", hex: "#ffc0cb" },
        ],
        inStock: true,
        featured: true,
        isNew: false,
    },
    {
        id: "cashmere-sweater",
        name: "Cashmere Sweater",
        description: "100% cashmere sweater, incredibly soft and warm. A timeless investment piece.",
        price: 199,
        category: "tops",
        image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800",
        images: ["https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800"],
        sizes: ["S", "M", "L", "XL"],
        colors: [
            { name: "Cream", hex: "#fffdd0" },
            { name: "Camel", hex: "#c19a6b" },
        ],
        inStock: true,
        featured: false,
        isNew: true,
    },
    {
        id: "leather-belt",
        name: "Leather Belt",
        description: "Genuine leather belt with brushed metal buckle. Handcrafted for durability.",
        price: 89,
        category: "accessories",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800",
        images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800"],
        sizes: ["S", "M", "L"],
        colors: [
            { name: "Brown", hex: "#8b4513" },
            { name: "Black", hex: "#000000" },
        ],
        inStock: true,
        featured: false,
        isNew: false,
    },
    {
        id: "linen-dress",
        name: "Linen Dress",
        description: "Effortlessly elegant linen dress, perfect for warm weather occasions.",
        price: 179,
        category: "dresses",
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800",
        images: ["https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800"],
        sizes: ["XS", "S", "M", "L"],
        colors: [
            { name: "White", hex: "#ffffff" },
            { name: "Sage", hex: "#9dc183" },
        ],
        inStock: true,
        featured: true,
        isNew: false,
    },
    {
        id: "structured-coat",
        name: "Structured Coat",
        description: "A statement piece with clean lines and impeccable tailoring. Wool blend for warmth.",
        price: 349,
        category: "outerwear",
        image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800",
        images: ["https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800"],
        sizes: ["S", "M", "L", "XL"],
        colors: [
            { name: "Camel", hex: "#c19a6b" },
            { name: "Black", hex: "#000000" },
        ],
        inStock: true,
        featured: true,
        isNew: true,
    },
    {
        id: "cotton-tee",
        name: "Organic Cotton Tee",
        description: "Essential organic cotton t-shirt. Sustainable, comfortable, and versatile.",
        price: 49,
        category: "tops",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800",
        images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800"],
        sizes: ["XS", "S", "M", "L", "XL", "XXL"],
        colors: [
            { name: "White", hex: "#ffffff" },
            { name: "Black", hex: "#000000" },
            { name: "Grey", hex: "#9ca3af" },
        ],
        inStock: true,
        featured: false,
        isNew: false,
    },
];

export const categories = [
    { id: "all", name: "All", count: products.length },
    { id: "tops", name: "Tops", count: products.filter(p => p.category === "tops").length },
    { id: "bottoms", name: "Bottoms", count: products.filter(p => p.category === "bottoms").length },
    { id: "outerwear", name: "Outerwear", count: products.filter(p => p.category === "outerwear").length },
    { id: "dresses", name: "Dresses", count: products.filter(p => p.category === "dresses").length },
    { id: "accessories", name: "Accessories", count: products.filter(p => p.category === "accessories").length },
];

export const collections = [
    {
        id: "everyday-essentials",
        title: "Everyday Essentials",
        description: "Timeless pieces for your daily wardrobe",
        image: "https://gabriellearruda.com/wp-content/uploads/2021/03/timelessstyle.jpg",
    },
    {
        id: "seasonal-selection",
        title: "Seasonal Selection",
        description: "Fresh styles for the current season",
        image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800",
    },
    {
        id: "premium-classics",
        title: "Premium Classics",
        description: "Investment pieces that last forever",
        image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800",
    },
];
