import Link from "next/link";
import { Twitter, Instagram } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-[#050505] pt-16 pb-8 border-t border-white/5 text-neutral-400">
            <div className="max-w-[1920px] mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                <div>
                    <Link
                        href="/"
                        className="text-xl font-medium tracking-tight text-white block mb-6"
                    >
                        VEYRAL
                    </Link>
                    <p className="text-xs leading-relaxed max-w-xs text-neutral-500">
                        Constructing the future of fashion through technical precision and
                        aesthetic minimalism.
                    </p>
                </div>

                <div>
                    <h4 className="text-[10px] font-semibold uppercase tracking-widest mb-4 text-neutral-500">
                        Catalog
                    </h4>
                    <ul className="space-y-2 text-xs font-normal">
                        <li>
                            <Link href="/shop" className="hover:text-white transition-colors">
                                Latest Drop
                            </Link>
                        </li>
                        <li>
                            <Link href="/shop" className="hover:text-white transition-colors">
                                Essentials
                            </Link>
                        </li>
                        <li>
                            <Link href="/shop?category=outerwear" className="hover:text-white transition-colors">
                                Outerwear
                            </Link>
                        </li>
                        <li>
                            <Link href="/shop?category=accessories" className="hover:text-white transition-colors">
                                Accessories
                            </Link>
                        </li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-[10px] font-semibold uppercase tracking-widest mb-4 text-neutral-500">
                        Protocol
                    </h4>
                    <ul className="space-y-2 text-xs font-normal">
                        <li>
                            <Link href="/about" className="hover:text-white transition-colors">
                                About VEYRAL
                            </Link>
                        </li>
                        <li>
                            <Link href="/contact" className="hover:text-white transition-colors">
                                Contact
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="hover:text-white transition-colors">
                                Sustainability
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="hover:text-white transition-colors">
                                Fabric Technology
                            </Link>
                        </li>
                        <li>
                            <Link href="#" className="hover:text-white transition-colors">
                                Legal & Privacy
                            </Link>
                        </li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-[10px] font-semibold uppercase tracking-widest mb-4 text-neutral-500">
                        Network
                    </h4>
                    <div className="flex gap-4 mb-4">
                        <a href="#" className="hover:text-white transition-colors">
                            <Instagram className="w-5 h-5" />
                        </a>
                        <a href="#" className="hover:text-white transition-colors">
                            <Twitter className="w-5 h-5" />
                        </a>
                    </div>
                    <p className="text-[10px] text-neutral-600">
                        © {new Date().getFullYear()} VEYRAL Systems.
                        <br />
                        All rights reserved.
                    </p>
                </div>
            </div>
            <div className="text-center border-t border-white/5 pt-8">
                <p className="text-[10px] text-neutral-700 uppercase tracking-widest">
                    Engineered in Void
                </p>
            </div>
        </footer>
    );
}
