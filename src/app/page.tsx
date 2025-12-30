"use client";
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Linkedin, Instagram, Send, Globe, ChevronRight, Mail, Briefcase, Zap, Star, ShieldCheck, ArrowRight, Plane } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [status, setStatus] = useState('');
    const [showContact, setShowContact] = useState(false);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "expo.out", duration: 1 } });

            tl.from(".profile-box", { scale: 0.9, opacity: 0, duration: 1.2 })
                .from(".main-title", { y: 20, opacity: 0 }, "-=0.8")
                .from(".link-card", {
                    y: 20,
                    opacity: 0,
                    stagger: 0.1,
                    clearProps: "all"
                }, "-=0.5");

            gsap.to(".glow-bg", {
                opacity: 0.6,
                duration: 4,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

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
            if (res.ok) {
                setStatus('¡Mensaje enviado con éxito!');
                setTimeout(() => {
                    setShowContact(false);
                    setStatus('');
                }, 3000);
            } else {
                setStatus('Error al enviar. Revisa el SMTP.');
            }
        } catch (err) {
            setStatus('Error de conexión.');
        }
    };

    const links = [
        {
            name: "LinkedIn Professional",
            url: "https://linkedin.com/in/asensios",
            icon: <Linkedin size={20} />,
            title: "Trayectoria y Red",
            color: "border-blue-500/20 hover:bg-blue-500/5"
        },
        {
            name: "Instagram Personal",
            url: "https://instagram.com/asensios",
            icon: <Instagram size={20} />,
            title: "Visión Diaria",
            color: "border-pink-500/20 hover:bg-pink-500/5"
        },
        {
            name: "Próxima aventura: SWY Japan",
            url: "https://www.swy.international/",
            icon: <Plane size={20} />,
            title: "Ship for World Youth Program",
            color: "border-amber-500/20 hover:bg-amber-500/5"
        },
    ];

    return (
        <main
            ref={containerRef}
            className="min-h-screen bg-[#020202] text-white flex flex-col items-center justify-center p-6 selection:bg-teal-500/30"
        >
            {/* Premium Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="glow-bg absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-teal-900/10 blur-[120px]"></div>
                <div className="glow-bg absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-900/10 blur-[120px]" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="max-w-md w-full relative z-10 flex flex-col items-center">
                {/* Profile Section */}
                <div className="profile-box mb-10 flex flex-col items-center text-center">
                    <div className="relative mb-6 group">
                        <div className="absolute -inset-1.5 bg-gradient-to-tr from-teal-500 to-blue-600 rounded-full blur opacity-20 group-hover:opacity-40 transition-all duration-1000"></div>
                        <div className="relative w-32 h-32 rounded-full border border-white/10 p-1 bg-zinc-900 overflow-hidden">
                            <Image
                                src="/perfil1.jpg"
                                alt="Asensio Sabater"
                                fill
                                className="object-cover"
                                priority
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = "https://ui-avatars.com/api/?name=Asensio+Sabater&background=0a0a0a&color=fff&size=256&bold=true";
                                }}
                            />
                        </div>
                    </div>

                    <h1 className="main-title text-4xl font-black tracking-tighter mb-2 uppercase italic text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500 transition-all">
                        Asensio Sabater
                    </h1>
                    <p className="main-title text-[10px] font-bold tracking-[0.5em] text-teal-400 uppercase mb-4 py-1.5 px-6 rounded-full bg-teal-500/5 border border-teal-500/10 inline-block">
                        Strategic Innovation
                    </p>
                </div>

                {/* Links Grid */}
                <div className="w-full space-y-4 mb-10">
                    {links.map((link, i) => (
                        <a
                            key={i}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`link-card group block w-full p-4 rounded-3xl bg-zinc-900/50 border ${link.color} backdrop-blur-xl transition-all duration-300 hover:scale-[1.01] active:scale-[0.98]`}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 rounded-2xl bg-black/40 text-teal-400 border border-white/5 transition-all group-hover:shadow-[0_0_15px_rgba(20,184,166,0.2)]">
                                        {link.icon}
                                    </div>
                                    <div className="flex flex-col text-left">
                                        <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest leading-none mb-1.5">{link.name}</span>
                                        <span className="font-bold tracking-tight text-white/90 leading-tight">{link.title}</span>
                                    </div>
                                </div>
                                <ArrowRight size={18} className="text-zinc-700 group-hover:text-teal-400 group-hover:translate-x-1 transition-all" />
                            </div>
                        </a>
                    ))}

                    {/* Epic Contact Button */}
                    <button
                        onClick={() => setShowContact(!showContact)}
                        className="link-card w-full p-5 rounded-3xl bg-white text-black font-black hover:bg-teal-400 transition-all duration-500 flex items-center justify-between shadow-2xl overflow-hidden group"
                    >
                        <div className="flex items-center gap-4 text-left">
                            <div className="p-3 rounded-2xl bg-black/5">
                                <Mail size={22} />
                            </div>
                            <span className="uppercase text-sm tracking-tighter">Enviar Mensaje Directo</span>
                        </div>
                        <Send size={20} className={`transition-all duration-500 ${showContact ? 'rotate-[360deg] scale-125' : 'group-hover:translate-x-1'}`} />
                    </button>
                </div>

                {/* Dynamic Contact Form */}
                <div className={`w-full transition-all duration-700 cubic-bezier(0.16, 1, 0.3, 1) ${showContact ? 'max-h-[600px] opacity-100 mb-12' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                    <div className="bg-zinc-900/80 p-8 rounded-[40px] border border-white/10 backdrop-blur-3xl shadow-3xl">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-teal-500 mb-6 flex items-center gap-2">
                            <Zap size={14} className="fill-teal-500" /> Nueva Colaboración
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input name="name" placeholder="Nombre completo" required className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 outline-none focus:border-teal-500/50 transition-all text-sm placeholder:text-zinc-600" />
                            <input name="email" type="email" placeholder="Email de contacto" required className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 outline-none focus:border-teal-500/50 transition-all text-sm placeholder:text-zinc-600" />
                            <textarea name="message" placeholder="¿Cómo puedo ayudarte?" required rows={4} className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 outline-none focus:border-teal-500/50 transition-all text-sm placeholder:text-zinc-600 resize-none" />
                            <button type="submit" className="w-full bg-teal-500 text-black font-black py-4 rounded-2xl hover:brightness-110 transition-all flex items-center justify-center gap-3 active:scale-[0.98] shadow-lg shadow-teal-500/10">
                                {status || 'ENVIAR MENSAJE'} <Send size={18} />
                            </button>
                        </form>
                    </div>
                </div>

                {/* Minimalist Footer */}
                <footer className="w-full text-center">
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-zinc-900 to-transparent mb-6"></div>
                    <p className="text-[8px] tracking-[0.5em] text-zinc-700 font-bold uppercase">
                        Personal Excellence · 2025
                    </p>
                </footer>
            </div>
        </main>
    );
}
