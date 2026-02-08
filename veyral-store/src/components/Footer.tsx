import Link from "next/link";
import { Instagram, Twitter, Facebook } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-gray-100 py-12">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div>
                        <h3 className="text-lg font-bold font-serif mb-4">VEYRAL</h3>
                        <p className="text-gray-600 mb-4">
                            Premium clothing designed for everyday elegance and lasting quality.
                        </p>
                        <div className="flex space-x-4">
                            <a href="https://instagram.com" className="text-gray-600 hover:text-black transition">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="https://twitter.com" className="text-gray-600 hover:text-black transition">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="https://facebook.com" className="text-gray-600 hover:text-black transition">
                                <Facebook className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Shop */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">Shop</h3>
                        <ul className="space-y-2">
                            <li><Link href="/shop?filter=new" className="text-gray-600 hover:underline">New Arrivals</Link></li>
                            <li><Link href="/shop?filter=featured" className="text-gray-600 hover:underline">Bestsellers</Link></li>
                            <li><Link href="/collections" className="text-gray-600 hover:underline">Collections</Link></li>
                            <li><Link href="/shop" className="text-gray-600 hover:underline">Gift Cards</Link></li>
                        </ul>
                    </div>

                    {/* Information */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">Information</h3>
                        <ul className="space-y-2">
                            <li><Link href="/about" className="text-gray-600 hover:underline">About Us</Link></li>
                            <li><Link href="/about#sustainability" className="text-gray-600 hover:underline">Sustainability</Link></li>
                            <li><Link href="/shipping" className="text-gray-600 hover:underline">Shipping & Returns</Link></li>
                            <li><Link href="/contact" className="text-gray-600 hover:underline">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">Contact</h3>
                        <address className="not-italic text-gray-600 space-y-2">
                            <p>123 Fashion Avenue</p>
                            <p>Johannesburg, Gauteng 10001</p>
                            <p>info@veyral.com</p>
                            <p>+27 11 123 4567</p>
                        </address>
                    </div>
                </div>

                <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-500 mb-4 md:mb-0">© 2025 VEYRAL. All rights reserved.</p>
                    <div className="flex space-x-6">
                        <Link href="/privacy" className="text-gray-500 hover:underline">Privacy Policy</Link>
                        <Link href="/terms" className="text-gray-500 hover:underline">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
