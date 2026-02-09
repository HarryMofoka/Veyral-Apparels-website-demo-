import { Metadata } from "next";
import ContactContent from "@/components/ContactContent";

export const metadata: Metadata = {
    title: "Contact | VEYRAL",
    description: "Initiate contact with VEYRAL headquarters. Inquiries regarding orders, technical specifications, and partnerships.",
};

export default function ContactPage() {
    return <ContactContent />;
}
