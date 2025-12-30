"use client";
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Linkedin, Instagram, Send, Globe, ChevronRight, Mail, Briefcase, Zap, Star, ShieldCheck } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
    const containerRef = useRef(null);
    const [status, setStatus] = useState('');
    const [showContact, setShowContact] = useState(false);
    const sphereRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Perfil y Hero
            gsap.from(".profile-area", {
                duration: 1.5,
                y: 30,
                opacity: 0,
                ease: "power4.out"
            });

            // Animación de enlaces con entrada "magnética"
            gsap.from(".link-item", {
                duration: 1,
                x: -20,
                opacity: 0,
                stagger: 0.1,
                ease: "back.out(1.7)",
                delay: 0.5
            });

            // Floating particles / Background glow dynamic movement
            gsap.to(".bg-glow-1", {
                x: '20vw',
                y: '10vh',
                duration: 15,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
            gsap.to(".bg-glow-2", {
                x: '-10vw',
                y: '-20vh',
                duration: 20,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });

            // Sphere floating effect
            if (sphereRef.current) {
                gsap.to(sphereRef.current, {
                    y: -15,
                    duration: 3,
                    repeat: -1,
                    yoyo: true,
                    ease: "power1.inOut"
                });
            }
        }, containerRef);
        return () => ctx.revert();
    }, []);

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 20;
        const yPos = (clientY / window.innerHeight - 0.5) * 20;

        gsap.to(".magnetic-bg", {
            x: xPos,
            y: yPos,
            duration: 1,
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
            className="min-h-screen bg-[#030303] text-zinc-100 flex flex-col items-center justify-center p-6 overflow-hidden selection:bg-teal-500/40"
        >
            {/* Dynamic Ambient Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="bg-glow-1 absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-teal-500/10 blur-[150px] opacity-40"></div>
                <div className="bg-glow-2 absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-[150px] opacity-30"></div>
                <div className="magnetic-bg absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-50 contrast-150"></div>
            </div>

            <div className="max-w-md w-full relative z-10">
                {/* Profile Section - Neo-Glassmorphism */}
                <header className="profile-area mb-12 flex flex-col items-center text-center">
                    <div className="relative mb-8 group" ref={sphereRef}>
                        <div className="absolute -inset-4 bg-gradient-to-tr from-teal-500 to-blue-600 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition duration-1000 animate-pulse"></div>
                        <div className="relative w-36 h-36 rounded-full p-[2px] bg-gradient-to-tr from-white/10 to-transparent border border-white/5 shadow-2xl">
                            <div className="relative w-full h-full rounded-full overflow-hidden bg-zinc-950">
                                <Image
                                    src="/perfil1.png"
                                    alt="Asensio Sabater"
                                    fill
                                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.src = "https://ui-avatars.com/api/?name=Asensio+Sabater&background=0a0a0a&color=fff&size=256&bold=true";
                                    }}
                                />
                            </div>
                            <div className="absolute bottom-1 right-1 bg-teal-500 text-black p-1.5 rounded-full shadow-lg border-2 border-[#030303]">
                                <ShieldCheck size={16} />
                            </div>
                        </div>
                    </div>

                    <h1 className="text-4xl font-black tracking-tighter mb-2 bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-500 uppercase">
                        Asensio Sabater
                    </h1>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="h-px w-4 bg-teal-500"></span>
                        <p className="text-xs font-bold tracking-[0.4em] text-teal-500 uppercase">Strategic Innovation</p>
                        <span className="h-px w-4 bg-teal-500"></span>
                    </div>
                    <p className="text-zinc-500 text-sm max-w-[280px] leading-relaxed">
                        Connecting ideas, people, and places through excellence and global vision.
                    </p>
                </header>

                {/* Links Grid - Animated Cards */}
                <div className="w-full space-y-4 mb-10">
                    {links.map((link, i) => (
                        <a
                            key={i}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`link-item group relative block w-full p-5 rounded-2xl bg-gradient-to-br ${link.color} border border-white/5 hover:border-white/15 transition-all duration-500 backdrop-blur-md shadow-lg overflow-hidden`}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="flex items-center justify-between relative z-10">
                                <div className="flex items-center gap-5">
                                    <div className="p-3 rounded-xl bg-zinc-950/50 text-teal-400 border border-white/5 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(20,184,166,0.3)] transition-all duration-500">
                                        {link.icon}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest leading-none mb-1.5">{link.label}</span>
                                        <span className="font-bold tracking-tight text-zinc-100">{link.name}</span>
                                    </div>
                                </div>
                                <div className="p-1 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
                                    <ChevronRight size={18} className="text-zinc-600 group-hover:text-teal-400 group-hover:translate-x-0.5 transition-all" />
                                </div>
                            </div>
                        </a>
                    ))}

                    {/* Epic Contact Button */}
                    <button
                        onClick={() => setShowContact(!showContact)}
                        className="link-item group w-full p-5 rounded-2xl bg-zinc-100 text-black font-black hover:bg-teal-400 transition-all duration-500 flex items-center justify-between shadow-2xl relative overflow-hidden"
                    >
                        <div className="flex items-center gap-5">
                            <div className="p-3 rounded-xl bg-black/5">
                                <Mail size={20} />
                            </div>
                            <span className="uppercase tracking-tight">Direct Connection</span>
                        </div>
                        <Send size={18} className={`transition-all duration-700 ${showContact ? 'rotate-[450deg] scale-110' : ''}`} />
                    </button>
                </div>

                {/* Advanced Dynamic Form */}
                <div className={`w-full transition-all duration-700 ease-[cubic-bezier(0.16, 1, 0.3, 1)] overflow-hidden ${showContact ? 'max-h-[500px] opacity-100 mb-12' : 'max-h-0 opacity-0'}`}>
                    <div className="bg-zinc-900/60 p-8 rounded-3xl border border-white/10 backdrop-blur-2xl shadow-2xl">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-teal-500 mb-6 flex items-center gap-2">
                            <Zap size={14} /> Send a message
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="relative">
                                <input name="name" placeholder="Full Name" required className="w-full bg-white/5 border border-white/5 rounded-xl p-4 outline-none focus:border-teal-500/50 transition-all placeholder:text-zinc-700 text-sm" />
                            </div>
                            <div className="relative">
                                <input name="email" type="email" placeholder="Email Address" required className="w-full bg-white/5 border border-white/5 rounded-xl p-4 outline-none focus:border-teal-500/50 transition-all placeholder:text-zinc-700 text-sm" />
                            </div>
                            <div className="relative">
                                <textarea name="message" placeholder="Project details or collaboration ideas..." required rows={3} className="w-full bg-white/5 border border-white/5 rounded-xl p-4 outline-none focus:border-teal-500/50 transition-all placeholder:text-zinc-700 text-sm resize-none" />
                            </div>
                            <button type="submit" className="w-full bg-gradient-to-r from-teal-500 to-blue-600 text-black font-black py-4 rounded-xl hover:brightness-110 transition-all flex items-center justify-center gap-3 active:scale-[0.98]">
                                {status || 'INITIATE CONTACT'} <Send size={16} />
                            </button>
                        </form>
                    </div>
                </div>

                {/* Modern Footer */}
                <footer className="text-center pt-4">
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <div className="h-[1px] w-8 bg-zinc-900"></div>
                        <Star size={12} className="text-zinc-800" />
                        <div className="h-[1px] w-8 bg-zinc-900"></div>
                    </div>
                    <p className="text-[9px] tracking-[0.5em] text-zinc-700 font-black uppercase">
                        Strategic Excellence © 2025 AS
                    </p>
                </footer>
            </div>
        </main>
    );
}
