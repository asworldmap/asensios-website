import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Asensio Sabater | Strategic Innovation",
    description: "Mentalidad Global. Acento Local.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es">
            <body className="antialiased">{children}</body>
        </html>
    );
}
