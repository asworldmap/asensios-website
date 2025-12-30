"use client";
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Linkedin, Instagram, Send, Globe, ChevronRight, Mail, Briefcase, Zap, Star, ShieldCheck, Copy, Check } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [status, setStatus] = useState('');
    const [showContact, setShowContact] = useState(false);
    const [copied, setCopied] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Hide loading screen after a short delay to ensure everything is ready
        const timer = setTimeout(() => setIsLoading(false), 800);

        const ctx = gsap.context(() => {
            // Entrance animations
            const tl = gsap.timeline();

            tl.to(".loading-overlay", { opacity: 0, duration: 0.5, pointerEvents: "none" })
                .from(".profile-area", { duration: 1, y: 30, opacity: 0, ease: "power4.out" }, "-=0.2")
                .from(".link-item", {
                    duration: 0.8,
                    y: 20,
                    opacity: 0,
                    stagger: 0.08,
                    ease: "power3.out"
                }, "-=0.5")
                .from(".footer-info", { opacity: 0, duration: 1 }, "-=0.3");

            // Continuous ambient animations
            gsap.to(".bg-glow-1", {
                x: "10%",
                y: "5%",
                duration: 12,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
            gsap.to(".bg-glow-2", {
                x: "-10%",
                y: "-5%",
                duration: 15,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        }, containerRef);

        return () => {
            clearTimeout(timer);
            ctx.revert();
        };
    }, []);

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 12;
        const yPos = (clientY / window.innerHeight - 0.5) * 12;

        gsap.to(".magnetic-layers", {
            x: xPos,
            y: yPos,
            duration: 1.2,
            ease: "power2.out"
        });
    };

    const copyEmail = () => {
        navigator.clipboard.writeText("hola@asensios.com");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('enviando...');
        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message'),
        };

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (res.ok) setStatus('¡Mensaje enviado!');
            else setStatus('Error al enviar.');
        } catch (err) {
            setStatus('Error al enviar.');
        }
    };

    const links = [
        { name: "LinkedIn Professional", url: "https://linkedin.com/in/asensios", icon: <Linkedin size={18} />, color: "from-blue-600/10 to-indigo-600/10", tag: "Strategy" },
        { name: "Instagram Personal", url: "https://instagram.com/asensios", icon: <Instagram size={18} />, color: "from-pink-500/10 to-rose-500/10", tag: "Life" },
        { name: "Global Projects", url: "#", icon: <Briefcase size={18} />, color: "from-teal-500/10 to-emerald-500/10", tag: "Innovation" },
        { name: "International Consulting", url: "#", icon: <Globe size={18} />, color: "from-zinc-100/5 to-zinc-100/10", tag: "Vision" },
    ];

    return (
        <main
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="min-h-screen bg-[#050505] text-zinc-200 flex flex-col items-center justify-center p-6 overflow-hidden selection:bg-teal-500/30"
        >
            {/* Loading Overlay */}
            <div className="loading-overlay fixed inset-0 z-[100] bg-[#050505] flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-teal-500/20 border-t-teal-500 rounded-full animate-spin"></div>
            </div>

            {/* Modern Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none magnetic-layers">
                <div className="bg-glow-1 absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full bg-teal-500/[0.07] blur-[120px]"></div>
                <div className="bg-glow-2 absolute bottom-[-20%] right-[-10%] w-[70vw] h-[70vw] rounded-full bg-blue-600/[0.05] blur-[120px]"></div>
            </div>

            <div className="max-w-[400px] w-full relative z-10">
                {/* Profile Section */}
                <header className="profile-area mb-10 flex flex-col items-center text-center">
                    <div className="relative mb-6">
                        <div className="absolute inset-0 bg-teal-500/20 blur-2xl rounded-full scale-110 animate-pulse"></div>
                        <div className="relative w-28 h-28 rounded-full p-[1.5px] bg-gradient-to-tr from-white/20 to-transparent border border-white/10 shadow-3xl overflow-hidden bg-zinc-900">
                            <Image
                                src="/perfil1.png"
                                alt="Asensio Sabater"
                                fill
                                className="object-cover"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = "https://ui-avatars.com/api/?name=Asensio+Sabater&background=0a0a0a&color=fff&size=256&bold=true";
                                }}
                            />
                        </div>
                    </div>

                    <h1 className="text-2xl font-black tracking-tight mb-1 text-white uppercase italic">
                        Asensio Sabater
                    </h1>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/5 border border-teal-500/10 mb-4">
                        <Zap size={12} className="text-teal-500" />
                        <p className="text-[10px] font-bold tracking-[0.2em] text-teal-400 uppercase">Strategic Innovation</p>
                    </div>
                </header>

                {/* Links Grid */}
                <div className="w-full space-y-3 mb-8">
                    {links.map((link, i) => (
                        <a
                            key={i}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`link-item group relative block w-full p-4 rounded-2xl bg-gradient-to-br ${link.color} border border-white/[0.05] hover:border-white/20 transition-all duration-500 backdrop-blur-md overflow-hidden`}
                        >
                            <div className="flex items-center justify-between relative z-10">
                                <div className="flex items-center gap-4">
                                    <div className="p-2.5 rounded-xl bg-black/40 text-teal-400 border border-white/5 transition-all group-hover:scale-110 group-hover:bg-teal-500 group-hover:text-black">
                                        {link.icon}
                                    </div>
                                    <div className="flex flex-col text-left">
                                        <span className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest leading-none mb-1">{link.tag}</span>
                                        <span className="text-sm font-bold tracking-tight text-white/90">{link.name}</span>
                                    </div>
                                </div>
                                <ChevronRight size={16} className="text-zinc-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
                            </div>
                        </a>
                    ))}

                    {/* Email Quick Action */}
                    <div className="link-item flex gap-2">
                        <button
                            onClick={() => setShowContact(!showContact)}
                            className="flex-1 p-4 rounded-2xl bg-white text-black font-black hover:bg-teal-400 transition-all duration-300 flex items-center justify-between text-xs"
                        >
                            <span className="uppercase tracking-tight">Contacto</span>
                            <Mail size={16} />
                        </button>
                        <button
                            onClick={copyEmail}
                            className="p-4 rounded-2xl bg-zinc-900 border border-white/5 text-zinc-400 hover:text-white transition-all flex items-center justify-center relative"
                            title="Copiar email"
                        >
                            {copied ? <Check size={18} className="text-teal-500" /> : <Copy size={18} />}
                            {copied && <span className="absolute -top-10 bg-teal-500 text-black text-[10px] font-bold px-2 py-1 rounded">Copiado</span>}
                        </button>
                    </div>
                </div>

                {/* Contact Form */}
                <div className={`w-full transition-all duration-700 ease-[cubic-bezier(0.23, 1, 0.32, 1)] overflow-hidden ${showContact ? 'max-h-[500px] opacity-100 mb-8' : 'max-h-0 opacity-0'}`}>
                    <div className="bg-zinc-950/50 p-6 rounded-3xl border border-white/5 backdrop-blur-2xl">
                        <form onSubmit={handleSubmit} className="space-y-3">
                            <input name="name" placeholder="Tu nombre" required className="w-full bg-white/5 border border-white/5 rounded-xl p-3 outline-none focus:border-teal-500/40 transition-all text-xs text-white" />
                            <input name="email" type="email" placeholder="Tu email" required className="w-full bg-white/5 border border-white/5 rounded-xl p-3 outline-none focus:border-teal-500/40 transition-all text-xs text-white" />
                            <textarea name="message" placeholder="Mensaje..." required rows={3} className="w-full bg-white/5 border border-white/5 rounded-xl p-3 outline-none focus:border-teal-500/40 transition-all text-xs text-white resize-none" />
                            <button type="submit" className="w-full bg-teal-500 text-black font-black py-3 rounded-xl hover:brightness-110 transition-all text-xs uppercase tracking-tighter">
                                {status || 'Enviar ahora'}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Footer info */}
                <footer className="footer-info text-center">
                    <p className="text-[7px] tracking-[0.5em] text-zinc-800 font-bold uppercase">
                        Strategic Personal Branding © 2025
                    </p>
                </footer>
            </div>
        </main>
    );
}
