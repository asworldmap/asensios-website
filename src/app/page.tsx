"use client";
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Linkedin, Instagram, Send, Globe, ChevronRight, Mail, Briefcase, Zap, Star, ShieldCheck } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [status, setStatus] = useState('');
    const [showContact, setShowContact] = useState(false);
    const sphereRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Ensure styles are applied before starting animations
        const ctx = gsap.context(() => {
            // Clear any initial hidden states
            gsap.set(".content-wrapper", { visibility: "visible" });

            // Profile Area entrance
            gsap.from(".profile-area", {
                duration: 1.2,
                y: 20,
                opacity: 0,
                ease: "power3.out"
            });

            // Link items entrance
            gsap.from(".link-item", {
                duration: 0.8,
                y: 15,
                opacity: 0,
                stagger: 0.1,
                ease: "power2.out",
                delay: 0.4
            });

            // Background glows pulse
            gsap.to(".bg-glow-1", {
                scale: 1.2,
                duration: 8,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 15;
        const yPos = (clientY / window.innerHeight - 0.5) * 15;

        gsap.to(".magnetic-layers", {
            x: xPos,
            y: yPos,
            duration: 1.5,
            ease: "power2.out"
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('Enviando...');
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
            if (res.ok) setStatus('¡Éxito! Hablamos pronto.');
            else setStatus('Error al enviar.');
        } catch (err) {
            setStatus('Error al enviar.');
        }
    };

    const links = [
        { name: "LinkedIn Professional", url: "https://linkedin.com/in/asensios", icon: <Linkedin size={20} />, color: "from-blue-600/20 to-indigo-600/20", label: "Network" },
        { name: "Instagram Insights", url: "https://instagram.com/asensios", icon: <Instagram size={20} />, color: "from-pink-500/20 to-rose-500/20", label: "Personal" },
        { name: "Global Strategy & Projects", url: "#", icon: <Briefcase size={20} />, color: "from-teal-500/20 to-emerald-500/20", label: "Expertise" },
        { name: "International Consulting", url: "#", icon: <Globe size={20} />, color: "from-amber-500/10 to-orange-500/20", label: "Solutions" },
    ];

    return (
        <main
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="min-h-screen bg-[#020202] text-zinc-100 flex flex-col items-center justify-center p-6 overflow-hidden"
        >
            {/* Dynamic Ambient Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none magnetic-layers">
                <div className="bg-glow-1 absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-teal-500/10 blur-[120px] opacity-30"></div>
                <div className="bg-glow-2 absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-[120px] opacity-20"></div>
            </div>

            <div className="content-wrapper max-w-md w-full relative z-10">
                {/* Profile Section */}
                <header className="profile-area mb-10 flex flex-col items-center text-center">
                    <div className="relative mb-6 group">
                        <div className="absolute -inset-2 bg-teal-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition duration-700"></div>
                        <div className="relative w-32 h-32 rounded-full p-[2px] bg-white/10 border border-white/5 shadow-2xl overflow-hidden">
                            <Image
                                src="/perfil1.png"
                                alt="Asensio Sabater"
                                fill
                                className="object-cover"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = "https://ui-avatars.com/api/?name=Asensio+Sabater&background=14b8a6&color=fff&size=256&bold=true";
                                }}
                            />
                        </div>
                        <div className="absolute bottom-1 right-1 bg-teal-500 text-black p-1 rounded-full border-2 border-[#020202]">
                            <ShieldCheck size={14} />
                        </div>
                    </div>

                    <h1 className="text-3xl font-black tracking-tighter mb-2 uppercase text-white">
                        Asensio Sabater
                    </h1>
                    <p className="text-xs font-bold tracking-[0.3em] text-teal-500 uppercase mb-3 px-4 py-1 rounded-full bg-teal-500/5 border border-teal-500/10">
                        Strategic Innovation
                    </p>
                    <p className="text-zinc-500 text-sm max-w-[260px] leading-relaxed">
                        Connecting vision with execution in global projects.
                    </p>
                </header>

                {/* Links List */}
                <div className="w-full space-y-3 mb-10">
                    {links.map((link, i) => (
                        <a
                            key={i}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`link-item group relative block w-full p-4 rounded-2xl bg-gradient-to-br ${link.color} border border-white/5 hover:border-white/15 transition-all duration-300 backdrop-blur-sm`}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="p-2.5 rounded-xl bg-zinc-950/50 text-teal-400 border border-white/5 transition-transform group-hover:scale-110">
                                        {link.icon}
                                    </div>
                                    <div className="flex flex-col text-left">
                                        <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest leading-none mb-1">{link.label}</span>
                                        <span className="font-bold tracking-tight text-zinc-200">{link.name}</span>
                                    </div>
                                </div>
                                <ChevronRight size={16} className="text-zinc-600 group-hover:text-teal-400 group-hover:translate-x-0.5 transition-all" />
                            </div>
                        </a>
                    ))}

                    {/* Contact Toggle */}
                    <button
                        onClick={() => setShowContact(!showContact)}
                        className="link-item group w-full p-4 rounded-2xl bg-zinc-100 text-black font-black hover:bg-teal-400 transition-all duration-300 flex items-center justify-between"
                    >
                        <div className="flex items-center gap-4 text-left">
                            <div className="p-2.5 rounded-xl bg-black/5">
                                <Mail size={20} />
                            </div>
                            <span className="uppercase text-sm tracking-tight">Direct Access</span>
                        </div>
                        <Send size={16} className={`transition-transform duration-500 ${showContact ? 'rotate-90' : ''}`} />
                    </button>
                </div>

                {/* Contact Form Container */}
                <div className={`w-full transition-all duration-500 ease-out overflow-hidden ${showContact ? 'max-h-[500px] opacity-100 mb-10' : 'max-h-0 opacity-0'}`}>
                    <div className="bg-zinc-900/40 p-6 rounded-3xl border border-white/5 backdrop-blur-xl">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input name="name" placeholder="Name" required className="w-full bg-white/5 border border-white/5 rounded-xl p-3 outline-none focus:border-teal-500/30 transition-all text-sm" />
                            <input name="email" type="email" placeholder="Email" required className="w-full bg-white/5 border border-white/5 rounded-xl p-3 outline-none focus:border-teal-500/30 transition-all text-sm" />
                            <textarea name="message" placeholder="Message..." required rows={3} className="w-full bg-white/5 border border-white/5 rounded-xl p-3 outline-none focus:border-teal-500/30 transition-all text-sm resize-none" />
                            <button type="submit" className="w-full bg-teal-500 text-black font-black py-3 rounded-xl hover:brightness-110 transition-all text-sm">
                                {status || 'SEND MESSAGE'}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Simple Footer */}
                <footer className="text-center">
                    <p className="text-[8px] tracking-[0.4em] text-zinc-700 font-bold uppercase opacity-50">
                        © 2025 ASENSIO SABATER
                    </p>
                </footer>
            </div>
        </main>
    );
}
