"use client";

import { Mail, MapPin, Send } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-[#030303] text-white pt-24 pb-12">
            <div className="container mx-auto px-6">
                <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-8">
                    Initiate Protocol
                </h1>
                <p className="text-neutral-400 max-w-xl mb-16 leading-relaxed">
                    Our team is available for inquiries regarding orders,
                    technical specifications, and partnership opportunities.
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Contact Form */}
                    <div className="bg-neutral-900/30 border border-white/5 p-8 rounded-sm">
                        <h2 className="text-sm font-medium uppercase tracking-widest mb-8 text-neutral-500">
                            Transmission
                        </h2>
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-wider text-neutral-400">Identity</label>
                                    <input
                                        type="text"
                                        className="w-full bg-[#030303] border border-white/10 p-3 text-sm text-white focus:border-white/30 focus:outline-none transition-colors"
                                        placeholder="Name"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-wider text-neutral-400">Contact</label>
                                    <input
                                        type="email"
                                        className="w-full bg-[#030303] border border-white/10 p-3 text-sm text-white focus:border-white/30 focus:outline-none transition-colors"
                                        placeholder="Email"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-wider text-neutral-400">Subject</label>
                                <select className="w-full bg-[#030303] border border-white/10 p-3 text-sm text-white focus:border-white/30 focus:outline-none transition-colors">
                                    <option>General Inquiry</option>
                                    <option>Order Support</option>
                                    <option>Press / Media</option>
                                    <option>Wholesale</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-wider text-neutral-400">Message</label>
                                <textarea
                                    className="w-full bg-[#030303] border border-white/10 p-3 text-sm text-white h-32 focus:border-white/30 focus:outline-none transition-colors resize-none"
                                    placeholder="Enter your message..."
                                ></textarea>
                            </div>
                            <button className="w-full bg-white text-black py-4 text-xs font-semibold uppercase tracking-widest hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2">
                                Send Transmission <Send className="w-4 h-4" />
                            </button>
                        </form>
                    </div>

                    {/* Info */}
                    <div className="space-y-12">
                        <div>
                            <div className="w-12 h-12 bg-white/5 border border-white/10 rounded flex items-center justify-center mb-6">
                                <MapPin className="w-5 h-5 text-white" />
                            </div>
                            <h3 className="text-lg font-medium mb-2">Operations Base</h3>
                            <p className="text-neutral-400 text-sm leading-relaxed">
                                1209 North Orange Street
                                <br />
                                Wilmington, Delaware 19801
                                <br />
                                United States
                            </p>
                        </div>

                        <div>
                            <div className="w-12 h-12 bg-white/5 border border-white/10 rounded flex items-center justify-center mb-6">
                                <Mail className="w-5 h-5 text-white" />
                            </div>
                            <h3 className="text-lg font-medium mb-2">Digital Channels</h3>
                            <p className="text-neutral-400 text-sm leading-relaxed mb-4">
                                For immediate assistance with ongoing orders:
                            </p>
                            <a href="mailto:support@veyral.com" className="text-white border-b border-white/30 hover:border-white pb-0.5 transition-colors">
                                support@veyral.com
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
