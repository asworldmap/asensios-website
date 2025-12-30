import type { Metadata } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
    title: "Asensio Sabater | Mentalidad Global",
    description: "Mentalidad Global. Acento Local.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es" className={`${montserrat.variable} ${playfair.variable}`}>
            <body className="antialiased font-sans">{children}</body>
        </html>
    );
}
