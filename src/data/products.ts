// Expanded Product data for Veyral Apparels store - 100+ products

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    originalPrice?: number;
    category: string;
    subcategory?: string;
    tags: string[];
    image: string;
    images: string[];
    sizes: string[];
    colors: { name: string; hex: string }[];
    stock: number;
    inStock: boolean;
    featured: boolean;
    isNew: boolean;
    popularity: number; // 1-100 score for sorting
    createdAt: string; // ISO date for sorting by newness
}

// Helper function to generate products
function generateProduct(
    id: string,
    name: string,
    description: string,
    price: number,
    category: string,
    subcategory: string,
    tags: string[],
    imageNum: number,
    sizes: string[],
    colors: { name: string; hex: string }[],
    stock: number,
    featured: boolean,
    isNew: boolean,
    popularity: number,
    daysAgo: number
): Product {
    const imageUrls: Record<string, string[]> = {
        tops: [
            "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800",
            "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800",
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800",
            "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800",
            "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800",
        ],
        bottoms: [
            "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800",
            "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800",
            "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800",
            "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800",
            "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800",
        ],
        outerwear: [
            "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800",
            "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800",
            "https://images.unsplash.com/photo-1548883354-94bcfe321cbb?w=800",
            "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800",
            "https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?w=800",
        ],
        dresses: [
            "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800",
            "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800",
            "https://images.unsplash.com/photo-1605763240000-3e744c2f4d52?w=800",
            "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800",
            "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800",
        ],
        accessories: [
            "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800",
            "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800",
            "https://images.unsplash.com/photo-1509941943102-10c232fc06e0?w=800",
            "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=800",
            "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800",
        ],
    };

    const images = imageUrls[category] || imageUrls.tops;
    const image = images[imageNum % images.length];

    const date = new Date();
    date.setDate(date.getDate() - daysAgo);

    return {
        id,
        name,
        description,
        price,
        category,
        subcategory,
        tags,
        image,
        images: [image],
        sizes,
        colors,
        stock,
        inStock: stock > 0,
        featured,
        isNew,
        popularity,
        createdAt: date.toISOString(),
    };
}

// Standard sizes
const clothingSizes = ["XS", "S", "M", "L", "XL", "XXL"];
const pantSizes = ["28", "30", "32", "34", "36", "38", "40"];
const accessorySizes = ["One Size"];

// Standard colors
const basicColors = [
    { name: "Black", hex: "#000000" },
    { name: "White", hex: "#ffffff" },
    { name: "Grey", hex: "#6b7280" },
];
const earthyColors = [
    { name: "Cream", hex: "#fffdd0" },
    { name: "Camel", hex: "#c19a6b" },
    { name: "Brown", hex: "#8b4513" },
];
const coolColors = [
    { name: "Navy", hex: "#1e3a5f" },
    { name: "Slate", hex: "#708090" },
    { name: "Charcoal", hex: "#36454f" },
];
const warmColors = [
    { name: "Burgundy", hex: "#800020" },
    { name: "Rust", hex: "#b7410e" },
    { name: "Amber", hex: "#d4a373" },
];

export const products: Product[] = [
    // ===== TOPS (30 products) =====
    generateProduct("silk-blouse-1", "Silk Blouse", "Luxurious silk blouse with a relaxed fit. Perfect for both office and evening wear.", 159, "tops", "blouses", ["silk", "elegant", "office"], 0, clothingSizes, [...basicColors, { name: "Blush", hex: "#ffc0cb" }], 45, true, false, 92, 5),
    generateProduct("cashmere-sweater-1", "Cashmere Crew Neck", "100% pure cashmere sweater. Incredibly soft and warm for cool days.", 249, "tops", "sweaters", ["cashmere", "luxury", "winter"], 1, clothingSizes, earthyColors, 30, true, true, 88, 3),
    generateProduct("cotton-tee-basic", "Essential Cotton Tee", "Organic cotton t-shirt. A wardrobe essential in multiple colors.", 49, "tops", "t-shirts", ["cotton", "essential", "casual"], 2, clothingSizes, basicColors, 150, false, false, 95, 60),
    generateProduct("linen-shirt-1", "Linen Button-Up", "Breathable linen shirt perfect for warm weather.", 119, "tops", "shirts", ["linen", "summer", "casual"], 3, clothingSizes, [...basicColors, { name: "Sky Blue", hex: "#87ceeb" }], 60, false, true, 78, 7),
    generateProduct("merino-polo-1", "Merino Wool Polo", "Premium merino wool polo. Temperature regulating and odor resistant.", 129, "tops", "polos", ["merino", "wool", "smart-casual"], 4, clothingSizes, coolColors, 40, true, false, 82, 15),
    generateProduct("silk-cami-1", "Silk Camisole", "Delicate silk camisole for layering or wearing solo.", 89, "tops", "camisoles", ["silk", "layering", "elegant"], 0, clothingSizes, [...basicColors, { name: "Champagne", hex: "#f7e7ce" }], 55, false, false, 70, 20),
    generateProduct("cashmere-vneck-1", "Cashmere V-Neck", "Classic V-neck cashmere sweater. Timeless elegance.", 229, "tops", "sweaters", ["cashmere", "classic", "luxury"], 1, clothingSizes, [...coolColors, { name: "Ivory", hex: "#fffff0" }], 25, true, false, 85, 12),
    generateProduct("cotton-henley-1", "Cotton Henley", "Comfortable cotton henley with subtle button detail.", 69, "tops", "t-shirts", ["cotton", "casual", "layering"], 2, clothingSizes, basicColors, 80, false, false, 75, 30),
    generateProduct("silk-wrap-top-1", "Silk Wrap Top", "Elegant wrap top in pure silk. Flattering drape.", 179, "tops", "blouses", ["silk", "elegant", "evening"], 0, clothingSizes, warmColors, 35, true, true, 80, 4),
    generateProduct("wool-turtleneck-1", "Wool Turtleneck", "Fine wool turtleneck for sophisticated layering.", 149, "tops", "sweaters", ["wool", "winter", "layering"], 1, clothingSizes, coolColors, 45, false, false, 77, 25),
    generateProduct("striped-tee-1", "Striped Breton Tee", "Classic Breton striped t-shirt. French-inspired style.", 79, "tops", "t-shirts", ["cotton", "stripes", "casual"], 2, clothingSizes, [{ name: "Navy/White", hex: "#1e3a5f" }], 70, false, true, 83, 8),
    generateProduct("oxford-shirt-1", "Oxford Button-Down", "Crisp cotton Oxford shirt. Business casual essential.", 99, "tops", "shirts", ["cotton", "office", "classic"], 3, clothingSizes, [...basicColors, ...coolColors], 90, true, false, 90, 45),
    generateProduct("cashmere-cardigan-1", "Cashmere Cardigan", "Lightweight cashmere cardigan with mother-of-pearl buttons.", 269, "tops", "cardigans", ["cashmere", "luxury", "layering"], 1, clothingSizes, earthyColors, 20, true, false, 84, 18),
    generateProduct("jersey-tank-1", "Modal Jersey Tank", "Silky modal jersey tank top. Ultra-soft and breathable.", 45, "tops", "tanks", ["modal", "essential", "summer"], 4, clothingSizes, basicColors, 120, false, false, 72, 40),
    generateProduct("poplin-blouse-1", "Cotton Poplin Blouse", "Crisp cotton poplin blouse with relaxed silhouette.", 89, "tops", "blouses", ["cotton", "office", "classic"], 3, clothingSizes, basicColors, 65, false, true, 76, 6),
    generateProduct("merino-crew-1", "Merino Crew Sweater", "Fine gauge merino wool crew neck. Year-round versatility.", 139, "tops", "sweaters", ["merino", "wool", "versatile"], 1, clothingSizes, [...basicColors, ...coolColors], 50, false, false, 79, 22),
    generateProduct("silk-tie-neck-1", "Silk Tie-Neck Blouse", "Sophisticated tie-neck blouse in lustrous silk.", 189, "tops", "blouses", ["silk", "elegant", "office"], 0, clothingSizes, [...basicColors, { name: "Sage", hex: "#9dc183" }], 30, true, true, 81, 2),
    generateProduct("cotton-crop-tee-1", "Cropped Cotton Tee", "Relaxed fit cropped t-shirt in organic cotton.", 55, "tops", "t-shirts", ["cotton", "casual", "cropped"], 2, clothingSizes, basicColors, 85, false, false, 68, 35),
    generateProduct("wool-blend-top-1", "Wool Blend Knit Top", "Cozy wool blend knit with subtle texture.", 119, "tops", "sweaters", ["wool", "winter", "textured"], 1, clothingSizes, earthyColors, 40, false, false, 74, 28),
    generateProduct("modal-long-sleeve-1", "Modal Long Sleeve Tee", "Super soft modal long sleeve t-shirt.", 65, "tops", "t-shirts", ["modal", "essential", "soft"], 4, clothingSizes, basicColors, 100, false, true, 80, 10),
    generateProduct("satin-cami-1", "Satin Camisole", "Lustrous satin camisole with lace trim.", 95, "tops", "camisoles", ["satin", "elegant", "evening"], 0, clothingSizes, [{ name: "Black", hex: "#000000" }, { name: "Champagne", hex: "#f7e7ce" }, { name: "Wine", hex: "#722f37" }], 45, false, false, 71, 32),
    generateProduct("cable-knit-1", "Cable Knit Sweater", "Traditional cable knit sweater in merino wool.", 169, "tops", "sweaters", ["wool", "cable-knit", "winter"], 1, clothingSizes, [{ name: "Cream", hex: "#fffdd0" }, { name: "Oatmeal", hex: "#c3b091" }, { name: "Charcoal", hex: "#36454f" }], 35, true, false, 86, 14),
    generateProduct("oversized-tee-1", "Oversized Cotton Tee", "Relaxed oversized t-shirt in premium cotton.", 59, "tops", "t-shirts", ["cotton", "oversized", "casual"], 2, clothingSizes, basicColors, 95, false, false, 77, 20),
    generateProduct("ribbed-tank-1", "Ribbed Cotton Tank", "Fitted ribbed tank in stretchy cotton blend.", 42, "tops", "tanks", ["cotton", "ribbed", "layering"], 4, clothingSizes, basicColors, 110, false, true, 73, 9),
    generateProduct("chiffon-blouse-1", "Chiffon Layered Blouse", "Floaty chiffon blouse with delicate layers.", 139, "tops", "blouses", ["chiffon", "elegant", "layered"], 0, clothingSizes, [{ name: "Blush", hex: "#ffc0cb" }, { name: "Ivory", hex: "#fffff0" }, { name: "Black", hex: "#000000" }], 28, false, false, 69, 38),
    generateProduct("mock-neck-1", "Mock Neck Knit Top", "Sleek mock neck top in fine gauge knit.", 89, "tops", "sweaters", ["knit", "modern", "layering"], 1, clothingSizes, coolColors, 55, false, false, 75, 26),
    generateProduct("pima-tee-1", "Pima Cotton Crew Tee", "Ultra-soft Pima cotton t-shirt.", 75, "tops", "t-shirts", ["pima", "luxury", "essential"], 2, clothingSizes, basicColors, 80, false, true, 82, 5),
    generateProduct("wrap-cardigan-1", "Wrap Cardigan", "Cozy wrap cardigan with tie belt.", 149, "tops", "cardigans", ["wool", "wrap", "cozy"], 1, clothingSizes, earthyColors, 38, true, false, 78, 16),
    generateProduct("embroidered-top-1", "Embroidered Cotton Top", "Cotton top with delicate embroidery detail.", 109, "tops", "blouses", ["cotton", "embroidered", "artisan"], 3, [...clothingSizes.slice(0, 5)], basicColors, 32, false, true, 70, 4),
    generateProduct("jersey-turtleneck-1", "Jersey Turtleneck", "Soft jersey turtleneck for everyday wear.", 79, "tops", "t-shirts", ["jersey", "layering", "essential"], 4, clothingSizes, [...basicColors, ...coolColors], 75, false, false, 76, 33),

    // ===== BOTTOMS (25 products) =====
    generateProduct("wool-trousers-1", "Tailored Wool Trousers", "Impeccably tailored wool trousers with a refined drape.", 189, "bottoms", "trousers", ["wool", "tailored", "office"], 0, pantSizes, coolColors, 40, true, false, 89, 10),
    generateProduct("wide-leg-pants-1", "Wide Leg Trousers", "Elegant wide leg trousers in flowing fabric.", 149, "bottoms", "trousers", ["wide-leg", "elegant", "evening"], 1, pantSizes, [{ name: "Black", hex: "#000000" }, { name: "Ivory", hex: "#fffff0" }, { name: "Navy", hex: "#1e3a5f" }], 35, true, true, 84, 6),
    generateProduct("slim-chinos-1", "Slim Fit Chinos", "Classic slim fit chinos in premium cotton twill.", 99, "bottoms", "chinos", ["cotton", "casual", "versatile"], 2, pantSizes, [...earthyColors, { name: "Navy", hex: "#1e3a5f" }], 70, false, false, 88, 30),
    generateProduct("linen-pants-1", "Linen Wide Leg Pants", "Relaxed linen pants perfect for summer.", 129, "bottoms", "trousers", ["linen", "summer", "relaxed"], 3, pantSizes, basicColors, 50, false, true, 77, 8),
    generateProduct("high-waist-jeans-1", "High Waist Straight Jeans", "Classic high-waisted straight leg jeans.", 139, "bottoms", "jeans", ["denim", "high-waist", "classic"], 4, pantSizes, [{ name: "Indigo", hex: "#3f51b5" }, { name: "Black", hex: "#000000" }, { name: "Light Wash", hex: "#b8d4e8" }], 60, true, false, 91, 15),
    generateProduct("pleated-trousers-1", "Pleated Front Trousers", "Sophisticated pleated trousers with tapered leg.", 169, "bottoms", "trousers", ["pleated", "tailored", "refined"], 0, pantSizes, coolColors, 30, false, false, 80, 22),
    generateProduct("cropped-pants-1", "Cropped Ankle Pants", "Modern cropped pants with clean lines.", 119, "bottoms", "trousers", ["cropped", "modern", "office"], 1, pantSizes, [...basicColors, { name: "Tan", hex: "#d2b48c" }], 45, false, true, 79, 5),
    generateProduct("cigarette-pants-1", "Cigarette Pants", "Sleek cigarette pants with side zip.", 129, "bottoms", "trousers", ["slim", "elegant", "evening"], 2, pantSizes, [{ name: "Black", hex: "#000000" }, { name: "Burgundy", hex: "#800020" }], 38, true, false, 83, 18),
    generateProduct("relaxed-jeans-1", "Relaxed Fit Jeans", "Comfortable relaxed fit jeans in organic cotton.", 119, "bottoms", "jeans", ["denim", "relaxed", "casual"], 4, pantSizes, [{ name: "Mid Blue", hex: "#6699cc" }, { name: "Black", hex: "#000000" }], 55, false, false, 75, 28),
    generateProduct("palazzo-pants-1", "Palazzo Pants", "Flowing palazzo pants for effortless elegance.", 139, "bottoms", "trousers", ["wide-leg", "flowy", "summer"], 3, pantSizes, [{ name: "White", hex: "#ffffff" }, { name: "Black", hex: "#000000" }, { name: "Terracotta", hex: "#e2725b" }], 32, false, true, 76, 7),
    generateProduct("wool-shorts-1", "Wool Blend Shorts", "Tailored wool blend shorts for smart occasions.", 109, "bottoms", "shorts", ["wool", "tailored", "smart"], 0, pantSizes, coolColors, 25, false, false, 68, 35),
    generateProduct("cargo-pants-1", "Premium Cargo Pants", "Elevated cargo pants in premium cotton.", 149, "bottoms", "trousers", ["cargo", "utility", "modern"], 2, pantSizes, [{ name: "Khaki", hex: "#c3b091" }, { name: "Black", hex: "#000000" }, { name: "Olive", hex: "#556b2f" }], 40, true, true, 82, 4),
    generateProduct("ankle-jeans-1", "Ankle Length Jeans", "Perfect length ankle jeans with raw hem.", 129, "bottoms", "jeans", ["denim", "ankle", "modern"], 4, pantSizes, [{ name: "Dark Wash", hex: "#1a237e" }, { name: "Light Wash", hex: "#b8d4e8" }], 48, false, false, 78, 20),
    generateProduct("paper-bag-pants-1", "Paper Bag Waist Pants", "Trendy paper bag waist pants with belt.", 119, "bottoms", "trousers", ["paper-bag", "belted", "trendy"], 1, pantSizes, [...basicColors, { name: "Sage", hex: "#9dc183" }], 35, false, false, 72, 25),
    generateProduct("bootcut-jeans-1", "Bootcut Jeans", "Classic bootcut jeans with subtle flare.", 135, "bottoms", "jeans", ["denim", "bootcut", "classic"], 4, pantSizes, [{ name: "Indigo", hex: "#3f51b5" }, { name: "Black", hex: "#000000" }], 42, false, true, 74, 12),
    generateProduct("jogger-pants-1", "Elevated Joggers", "Refined jogger pants in premium ponte fabric.", 99, "bottoms", "trousers", ["jogger", "comfort", "modern"], 2, pantSizes, [{ name: "Black", hex: "#000000" }, { name: "Grey", hex: "#6b7280" }, { name: "Navy", hex: "#1e3a5f" }], 65, false, false, 80, 15),
    generateProduct("culottes-1", "Wide Leg Culottes", "Sophisticated culottes in structured fabric.", 129, "bottoms", "trousers", ["culottes", "wide-leg", "modern"], 1, pantSizes, [{ name: "Black", hex: "#000000" }, { name: "Camel", hex: "#c19a6b" }], 28, true, false, 71, 30),
    generateProduct("skinny-jeans-1", "Skinny Fit Jeans", "Classic skinny jeans with stretch comfort.", 125, "bottoms", "jeans", ["denim", "skinny", "classic"], 4, pantSizes, [{ name: "Black", hex: "#000000" }, { name: "Dark Wash", hex: "#1a237e" }], 58, false, false, 85, 40),
    generateProduct("bermuda-shorts-1", "Bermuda Shorts", "Tailored bermuda shorts for warm weather.", 89, "bottoms", "shorts", ["cotton", "summer", "smart-casual"], 3, pantSizes, [{ name: "White", hex: "#ffffff" }, { name: "Navy", hex: "#1e3a5f" }, { name: "Khaki", hex: "#c3b091" }], 45, false, true, 69, 9),
    generateProduct("mom-jeans-1", "High Rise Mom Jeans", "Vintage-inspired high rise mom jeans.", 139, "bottoms", "jeans", ["denim", "vintage", "high-waist"], 4, pantSizes, [{ name: "Light Wash", hex: "#b8d4e8" }, { name: "Mid Blue", hex: "#6699cc" }], 40, true, true, 86, 3),
    generateProduct("tailored-shorts-1", "Tailored Shorts", "Smart tailored shorts for summer styling.", 95, "bottoms", "shorts", ["tailored", "summer", "smart"], 0, pantSizes, [...basicColors, { name: "Tan", hex: "#d2b48c" }], 38, false, false, 70, 22),
    generateProduct("flare-pants-1", "Flared Trousers", "Retro-inspired flared trousers.", 145, "bottoms", "trousers", ["flare", "retro", "evening"], 1, pantSizes, [{ name: "Black", hex: "#000000" }, { name: "Burgundy", hex: "#800020" }, { name: "Cream", hex: "#fffdd0" }], 32, false, false, 73, 18),
    generateProduct("straight-jeans-1", "Straight Leg Jeans", "Timeless straight leg jeans.", 129, "bottoms", "jeans", ["denim", "straight", "classic"], 4, pantSizes, [{ name: "Indigo", hex: "#3f51b5" }, { name: "Black", hex: "#000000" }], 52, false, true, 84, 11),
    generateProduct("linen-shorts-1", "Linen Drawstring Shorts", "Relaxed linen shorts for effortless summer style.", 79, "bottoms", "shorts", ["linen", "summer", "relaxed"], 3, pantSizes, [{ name: "White", hex: "#ffffff" }, { name: "Natural", hex: "#f5f5dc" }, { name: "Navy", hex: "#1e3a5f" }], 55, false, false, 67, 14),
    generateProduct("pinstripe-pants-1", "Pinstripe Trousers", "Classic pinstripe trousers for sharp styling.", 159, "bottoms", "trousers", ["pinstripe", "tailored", "office"], 0, pantSizes, [{ name: "Navy/White", hex: "#1e3a5f" }, { name: "Charcoal/White", hex: "#36454f" }], 28, true, false, 77, 25),

    // ===== OUTERWEAR (20 products) =====
    generateProduct("signature-blazer-1", "Signature Wool Blazer", "Our best-selling blazer in premium Italian wool.", 349, "outerwear", "blazers", ["wool", "tailored", "classic"], 0, clothingSizes, coolColors, 30, true, false, 94, 20),
    generateProduct("trench-coat-1", "Classic Trench Coat", "Timeless trench coat with water-resistant finish.", 389, "outerwear", "coats", ["trench", "classic", "rain"], 1, clothingSizes, [{ name: "Tan", hex: "#d2b48c" }, { name: "Black", hex: "#000000" }, { name: "Navy", hex: "#1e3a5f" }], 25, true, true, 90, 5),
    generateProduct("cashmere-coat-1", "Cashmere Blend Coat", "Luxurious cashmere blend coat with refined silhouette.", 499, "outerwear", "coats", ["cashmere", "luxury", "winter"], 2, clothingSizes, [{ name: "Camel", hex: "#c19a6b" }, { name: "Black", hex: "#000000" }, { name: "Grey", hex: "#6b7280" }], 18, true, false, 88, 15),
    generateProduct("leather-jacket-1", "Leather Biker Jacket", "Classic leather biker jacket in butter-soft leather.", 449, "outerwear", "jackets", ["leather", "biker", "edgy"], 3, clothingSizes, [{ name: "Black", hex: "#000000" }, { name: "Brown", hex: "#8b4513" }], 20, true, false, 87, 25),
    generateProduct("wool-overcoat-1", "Wool Overcoat", "Elegant wool overcoat for the coldest days.", 429, "outerwear", "coats", ["wool", "winter", "elegant"], 4, clothingSizes, [...coolColors, { name: "Camel", hex: "#c19a6b" }], 22, false, true, 85, 8),
    generateProduct("quilted-jacket-1", "Quilted Puffer Jacket", "Lightweight quilted jacket with down fill.", 279, "outerwear", "jackets", ["quilted", "puffer", "winter"], 1, clothingSizes, [{ name: "Black", hex: "#000000" }, { name: "Navy", hex: "#1e3a5f" }, { name: "Olive", hex: "#556b2f" }], 35, false, false, 82, 12),
    generateProduct("denim-jacket-1", "Denim Trucker Jacket", "Classic denim jacket with vintage wash.", 169, "outerwear", "jackets", ["denim", "classic", "casual"], 2, clothingSizes, [{ name: "Mid Wash", hex: "#6699cc" }, { name: "Light Wash", hex: "#b8d4e8" }, { name: "Black", hex: "#000000" }], 45, false, true, 83, 6),
    generateProduct("linen-blazer-1", "Linen Blazer", "Unstructured linen blazer for summer sophistication.", 249, "outerwear", "blazers", ["linen", "summer", "unstructured"], 0, clothingSizes, [{ name: "Natural", hex: "#f5f5dc" }, { name: "Navy", hex: "#1e3a5f" }, { name: "White", hex: "#ffffff" }], 28, true, false, 79, 18),
    generateProduct("bomber-jacket-1", "Satin Bomber Jacket", "Sleek satin bomber jacket with ribbed trim.", 199, "outerwear", "jackets", ["bomber", "satin", "modern"], 3, clothingSizes, [{ name: "Black", hex: "#000000" }, { name: "Olive", hex: "#556b2f" }, { name: "Burgundy", hex: "#800020" }], 32, false, false, 78, 22),
    generateProduct("cape-coat-1", "Wool Cape Coat", "Dramatic wool cape coat for statement styling.", 359, "outerwear", "coats", ["cape", "wool", "statement"], 4, clothingSizes.slice(1, 5), [{ name: "Black", hex: "#000000" }, { name: "Charcoal", hex: "#36454f" }, { name: "Camel", hex: "#c19a6b" }], 15, true, true, 75, 4),
    generateProduct("rain-jacket-1", "Technical Rain Jacket", "Waterproof rain jacket with breathable membrane.", 229, "outerwear", "jackets", ["rain", "technical", "outdoor"], 1, clothingSizes, [{ name: "Black", hex: "#000000" }, { name: "Navy", hex: "#1e3a5f" }, { name: "Stone", hex: "#928e85" }], 40, false, false, 76, 30),
    generateProduct("velvet-blazer-1", "Velvet Evening Blazer", "Luxurious velvet blazer for special occasions.", 289, "outerwear", "blazers", ["velvet", "evening", "luxury"], 0, clothingSizes, [{ name: "Burgundy", hex: "#800020" }, { name: "Navy", hex: "#1e3a5f" }, { name: "Black", hex: "#000000" }], 20, false, false, 74, 35),
    generateProduct("parka-1", "Hooded Parka", "Warm hooded parka with faux fur trim.", 349, "outerwear", "coats", ["parka", "winter", "hooded"], 2, clothingSizes, [{ name: "Black", hex: "#000000" }, { name: "Khaki", hex: "#c3b091" }, { name: "Navy", hex: "#1e3a5f" }], 25, true, false, 81, 10),
    generateProduct("shearling-jacket-1", "Shearling Jacket", "Genuine shearling jacket for ultimate warmth.", 599, "outerwear", "jackets", ["shearling", "luxury", "winter"], 3, clothingSizes.slice(1, 5), [{ name: "Tan", hex: "#d2b48c" }, { name: "Black", hex: "#000000" }], 12, false, true, 72, 8),
    generateProduct("cropped-jacket-1", "Cropped Tweed Jacket", "Chic cropped jacket in textured tweed.", 219, "outerwear", "jackets", ["tweed", "cropped", "chic"], 4, clothingSizes, [{ name: "Cream/Black", hex: "#fffdd0" }, { name: "Pink/Grey", hex: "#ffc0cb" }], 22, false, false, 73, 28),
    generateProduct("utility-jacket-1", "Utility Field Jacket", "Practical utility jacket with multiple pockets.", 189, "outerwear", "jackets", ["utility", "field", "casual"], 1, clothingSizes, [{ name: "Olive", hex: "#556b2f" }, { name: "Khaki", hex: "#c3b091" }, { name: "Black", hex: "#000000" }], 38, false, true, 80, 7),
    generateProduct("cocoon-coat-1", "Cocoon Coat", "Oversized cocoon coat in luxe wool blend.", 379, "outerwear", "coats", ["cocoon", "oversized", "modern"], 2, clothingSizes.slice(0, 4), [{ name: "Black", hex: "#000000" }, { name: "Camel", hex: "#c19a6b" }, { name: "Pale Pink", hex: "#fadadd" }], 18, true, false, 77, 15),
    generateProduct("suede-jacket-1", "Suede Jacket", "Soft suede jacket with western details.", 329, "outerwear", "jackets", ["suede", "western", "statement"], 3, clothingSizes, [{ name: "Tan", hex: "#d2b48c" }, { name: "Cognac", hex: "#9a463d" }], 16, false, false, 70, 32),
    generateProduct("wrap-coat-1", "Wrap Coat", "Elegant wrap coat with tie belt.", 329, "outerwear", "coats", ["wrap", "belted", "elegant"], 4, clothingSizes, [{ name: "Camel", hex: "#c19a6b" }, { name: "Grey", hex: "#6b7280" }, { name: "Black", hex: "#000000" }], 24, true, true, 84, 3),
    generateProduct("double-breasted-blazer-1", "Double Breasted Blazer", "Sharp double breasted blazer with gold buttons.", 279, "outerwear", "blazers", ["double-breasted", "tailored", "sharp"], 0, clothingSizes, [{ name: "Navy", hex: "#1e3a5f" }, { name: "Black", hex: "#000000" }], 28, false, false, 82, 20),

    // ===== DRESSES (15 products) =====
    generateProduct("silk-slip-dress-1", "Silk Slip Dress", "Effortlessly elegant silk slip dress.", 229, "dresses", "slip-dresses", ["silk", "elegant", "evening"], 0, clothingSizes, [{ name: "Black", hex: "#000000" }, { name: "Champagne", hex: "#f7e7ce" }, { name: "Navy", hex: "#1e3a5f" }], 35, true, true, 91, 4),
    generateProduct("linen-midi-dress-1", "Linen Midi Dress", "Relaxed linen midi dress for warm days.", 179, "dresses", "midi-dresses", ["linen", "summer", "relaxed"], 1, clothingSizes, [{ name: "White", hex: "#ffffff" }, { name: "Natural", hex: "#f5f5dc" }, { name: "Sage", hex: "#9dc183" }], 40, true, false, 85, 10),
    generateProduct("wrap-dress-1", "Jersey Wrap Dress", "Flattering wrap dress in soft jersey.", 149, "dresses", "wrap-dresses", ["jersey", "wrap", "office"], 2, clothingSizes, [{ name: "Black", hex: "#000000" }, { name: "Navy", hex: "#1e3a5f" }, { name: "Burgundy", hex: "#800020" }], 50, false, false, 88, 20),
    generateProduct("maxi-dress-1", "Flowing Maxi Dress", "Bohemian-inspired flowing maxi dress.", 189, "dresses", "maxi-dresses", ["flowy", "boho", "summer"], 3, clothingSizes, [{ name: "Terracotta", hex: "#e2725b" }, { name: "Olive", hex: "#556b2f" }, { name: "Black", hex: "#000000" }], 32, false, true, 80, 8),
    generateProduct("shirt-dress-1", "Cotton Shirt Dress", "Classic shirt dress in crisp cotton.", 159, "dresses", "shirt-dresses", ["cotton", "classic", "versatile"], 4, clothingSizes, [{ name: "White", hex: "#ffffff" }, { name: "Blue Stripe", hex: "#87ceeb" }, { name: "Khaki", hex: "#c3b091" }], 45, true, false, 83, 15),
    generateProduct("cocktail-dress-1", "Cocktail Dress", "Sophisticated cocktail dress for special events.", 269, "dresses", "cocktail-dresses", ["elegant", "evening", "special-occasion"], 0, clothingSizes, [{ name: "Black", hex: "#000000" }, { name: "Red", hex: "#c41e3a" }, { name: "Emerald", hex: "#50c878" }], 25, true, true, 86, 5),
    generateProduct("knit-dress-1", "Knit Bodycon Dress", "Figure-hugging knit dress with subtle ribbing.", 139, "dresses", "bodycon-dresses", ["knit", "bodycon", "modern"], 1, clothingSizes, [{ name: "Black", hex: "#000000" }, { name: "Camel", hex: "#c19a6b" }, { name: "Grey", hex: "#6b7280" }], 38, false, false, 77, 22),
    generateProduct("tiered-dress-1", "Tiered Cotton Dress", "Feminine tiered dress with delicate details.", 169, "dresses", "midi-dresses", ["cotton", "tiered", "feminine"], 2, clothingSizes, [{ name: "White", hex: "#ffffff" }, { name: "Blush", hex: "#ffc0cb" }, { name: "Blue", hex: "#87ceeb" }], 35, false, true, 79, 7),
    generateProduct("blazer-dress-1", "Blazer Dress", "Sharp blazer-style dress with button front.", 199, "dresses", "blazer-dresses", ["tailored", "modern", "office"], 3, clothingSizes, [{ name: "Black", hex: "#000000" }, { name: "Ivory", hex: "#fffff0" }, { name: "Red", hex: "#c41e3a" }], 28, true, false, 81, 12),
    generateProduct("sweater-dress-1", "Cashmere Sweater Dress", "Cozy cashmere sweater dress for cooler days.", 279, "dresses", "sweater-dresses", ["cashmere", "winter", "cozy"], 4, clothingSizes, [{ name: "Grey", hex: "#6b7280" }, { name: "Camel", hex: "#c19a6b" }, { name: "Cream", hex: "#fffdd0" }], 22, false, false, 75, 18),
    generateProduct("pleated-dress-1", "Pleated Midi Dress", "Elegant pleated midi dress in flowing fabric.", 189, "dresses", "midi-dresses", ["pleated", "elegant", "evening"], 0, clothingSizes, [{ name: "Navy", hex: "#1e3a5f" }, { name: "Blush", hex: "#ffc0cb" }, { name: "Black", hex: "#000000" }], 30, true, true, 84, 3),
    generateProduct("denim-dress-1", "Denim Shirt Dress", "Casual denim shirt dress with belt.", 149, "dresses", "shirt-dresses", ["denim", "casual", "versatile"], 1, clothingSizes, [{ name: "Light Wash", hex: "#b8d4e8" }, { name: "Mid Wash", hex: "#6699cc" }], 42, false, false, 78, 25),
    generateProduct("velvet-dress-1", "Velvet Mini Dress", "Luxe velvet mini dress for evening glamour.", 199, "dresses", "mini-dresses", ["velvet", "evening", "glamour"], 2, clothingSizes, [{ name: "Burgundy", hex: "#800020" }, { name: "Emerald", hex: "#50c878" }, { name: "Black", hex: "#000000" }], 24, false, true, 76, 9),
    generateProduct("cutout-dress-1", "Cutout Midi Dress", "Modern midi dress with subtle cutout details.", 179, "dresses", "midi-dresses", ["cutout", "modern", "evening"], 3, clothingSizes, [{ name: "Black", hex: "#000000" }, { name: "White", hex: "#ffffff" }], 26, true, false, 74, 28),
    generateProduct("smocked-dress-1", "Smocked Midi Dress", "Romantic smocked dress with puff sleeves.", 159, "dresses", "midi-dresses", ["smocked", "romantic", "feminine"], 4, clothingSizes, [{ name: "Floral", hex: "#ffc0cb" }, { name: "White", hex: "#ffffff" }, { name: "Sage", hex: "#9dc183" }], 33, false, false, 73, 14),

    // ===== ACCESSORIES (15 products) =====
    generateProduct("leather-belt-1", "Italian Leather Belt", "Handcrafted Italian leather belt with brushed buckle.", 129, "accessories", "belts", ["leather", "italian", "classic"], 0, ["S", "M", "L"], [{ name: "Brown", hex: "#8b4513" }, { name: "Black", hex: "#000000" }, { name: "Tan", hex: "#d2b48c" }], 60, true, false, 87, 30),
    generateProduct("silk-scarf-1", "Silk Square Scarf", "Luxurious silk scarf with artistic print.", 149, "accessories", "scarves", ["silk", "printed", "luxury"], 1, accessorySizes, [{ name: "Multi", hex: "#ff69b4" }], 40, true, true, 82, 8),
    generateProduct("leather-tote-1", "Leather Tote Bag", "Spacious leather tote for everyday elegance.", 349, "accessories", "bags", ["leather", "tote", "everyday"], 2, accessorySizes, [{ name: "Black", hex: "#000000" }, { name: "Tan", hex: "#d2b48c" }, { name: "Burgundy", hex: "#800020" }], 25, true, false, 89, 15),
    generateProduct("wool-beanie-1", "Cashmere Beanie", "Soft cashmere beanie for cold weather.", 89, "accessories", "hats", ["cashmere", "winter", "cozy"], 3, accessorySizes, [{ name: "Grey", hex: "#6b7280" }, { name: "Black", hex: "#000000" }, { name: "Camel", hex: "#c19a6b" }], 50, false, false, 78, 20),
    generateProduct("sunglasses-1", "Acetate Sunglasses", "Classic acetate sunglasses with UV protection.", 189, "accessories", "eyewear", ["sunglasses", "classic", "uv-protection"], 4, accessorySizes, [{ name: "Tortoise", hex: "#8b4513" }, { name: "Black", hex: "#000000" }], 35, true, true, 84, 5),
    generateProduct("leather-wallet-1", "Leather Card Wallet", "Slim leather card wallet with RFID protection.", 99, "accessories", "wallets", ["leather", "slim", "rfid"], 0, accessorySizes, [{ name: "Black", hex: "#000000" }, { name: "Brown", hex: "#8b4513" }], 55, false, false, 80, 25),
    generateProduct("cashmere-scarf-1", "Cashmere Wrap Scarf", "Oversized cashmere wrap scarf for ultimate warmth.", 199, "accessories", "scarves", ["cashmere", "wrap", "winter"], 1, accessorySizes, [{ name: "Grey", hex: "#6b7280" }, { name: "Camel", hex: "#c19a6b" }, { name: "Black", hex: "#000000" }], 30, true, false, 85, 12),
    generateProduct("crossbody-bag-1", "Leather Crossbody Bag", "Compact leather crossbody for hands-free style.", 249, "accessories", "bags", ["leather", "crossbody", "compact"], 2, accessorySizes, [{ name: "Black", hex: "#000000" }, { name: "Tan", hex: "#d2b48c" }, { name: "Olive", hex: "#556b2f" }], 28, false, true, 83, 7),
    generateProduct("leather-gloves-1", "Leather Driving Gloves", "Supple leather gloves with cashmere lining.", 129, "accessories", "gloves", ["leather", "cashmere-lined", "winter"], 3, ["S", "M", "L"], [{ name: "Black", hex: "#000000" }, { name: "Brown", hex: "#8b4513" }], 35, false, false, 76, 18),
    generateProduct("bucket-hat-1", "Cotton Bucket Hat", "Casual cotton bucket hat for sun protection.", 69, "accessories", "hats", ["cotton", "summer", "casual"], 4, accessorySizes, [{ name: "White", hex: "#ffffff" }, { name: "Black", hex: "#000000" }, { name: "Khaki", hex: "#c3b091" }], 45, false, true, 72, 10),
    generateProduct("watch-strap-1", "Leather Watch Strap", "Premium leather watch strap with quick-release.", 79, "accessories", "watches", ["leather", "quick-release", "premium"], 0, accessorySizes, [{ name: "Brown", hex: "#8b4513" }, { name: "Black", hex: "#000000" }], 60, false, false, 70, 35),
    generateProduct("silk-pocket-square-1", "Silk Pocket Square", "Hand-rolled silk pocket square.", 59, "accessories", "pocket-squares", ["silk", "hand-rolled", "formal"], 1, accessorySizes, [{ name: "Navy", hex: "#1e3a5f" }, { name: "Burgundy", hex: "#800020" }, { name: "White", hex: "#ffffff" }], 50, false, false, 68, 40),
    generateProduct("canvas-tote-1", "Canvas Tote Bag", "Eco-friendly canvas tote with leather handles.", 89, "accessories", "bags", ["canvas", "eco", "everyday"], 2, accessorySizes, [{ name: "Natural", hex: "#f5f5dc" }, { name: "Black", hex: "#000000" }], 65, false, true, 75, 6),
    generateProduct("wool-scarf-1", "Merino Wool Scarf", "Soft merino wool scarf with fringed ends.", 99, "accessories", "scarves", ["merino", "wool", "winter"], 3, accessorySizes, [{ name: "Charcoal", hex: "#36454f" }, { name: "Navy", hex: "#1e3a5f" }, { name: "Camel", hex: "#c19a6b" }], 40, true, false, 77, 22),
    generateProduct("jewelry-box-1", "Leather Jewelry Case", "Travel jewelry case in fine leather.", 149, "accessories", "storage", ["leather", "travel", "jewelry"], 4, accessorySizes, [{ name: "Black", hex: "#000000" }, { name: "Blush", hex: "#ffc0cb" }], 25, false, false, 71, 28),
];

// Categories with counts
export const categories = [
    { id: "all", name: "All", count: products.length },
    { id: "tops", name: "Tops", count: products.filter((p) => p.category === "tops").length },
    { id: "bottoms", name: "Bottoms", count: products.filter((p) => p.category === "bottoms").length },
    { id: "outerwear", name: "Outerwear", count: products.filter((p) => p.category === "outerwear").length },
    { id: "dresses", name: "Dresses", count: products.filter((p) => p.category === "dresses").length },
    { id: "accessories", name: "Accessories", count: products.filter((p) => p.category === "accessories").length },
];

// All unique tags
export const allTags = Array.from(new Set(products.flatMap((p) => p.tags))).sort();

// Collections
export const collections = [
    {
        id: "everyday-essentials",
        title: "Everyday Essentials",
        description: "Timeless pieces for your daily wardrobe",
        image: "https://gabriellearruda.com/wp-content/uploads/2021/03/timelessstyle.jpg",
        productIds: products.filter((p) => p.tags.includes("essential") || p.tags.includes("classic")).map((p) => p.id),
    },
    {
        id: "seasonal-selection",
        title: "Seasonal Selection",
        description: "Fresh styles for the current season",
        image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800",
        productIds: products.filter((p) => p.isNew).map((p) => p.id),
    },
    {
        id: "premium-classics",
        title: "Premium Classics",
        description: "Investment pieces that last forever",
        image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800",
        productIds: products.filter((p) => p.tags.includes("luxury") || p.tags.includes("cashmere")).map((p) => p.id),
    },
    {
        id: "office-ready",
        title: "Office Ready",
        description: "Professional pieces for the modern workplace",
        image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800",
        productIds: products.filter((p) => p.tags.includes("office") || p.tags.includes("tailored")).map((p) => p.id),
    },
];
