"use client";
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Linkedin, Instagram, Send, Globe, ChevronRight, Mail, Briefcase, Zap, Star, ShieldCheck, ArrowRight, Plane, ExternalLink, Sparkles } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
    const containerRef = useRef<HTMLDivElement>(null);
    const cursorRef = useRef<HTMLDivElement>(null);
    const [status, setStatus] = useState('');
    const [showContact, setShowContact] = useState(false);
    const [scrambledText, setScrambledText] = useState("ASENSIO SABATER");

    useEffect(() => {
        // 1. Text Scramble Animation on Load
        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let interval: any = null;
        const originalText = "ASENSIO SABATER";

        let iteration = 0;
        clearInterval(interval);

        interval = setInterval(() => {
            setScrambledText(
                originalText.split("")
                    .map((letter, index) => {
                        if (index < iteration) return originalText[index];
                        return letters[Math.floor(Math.random() * 26)];
                    })
                    .join("")
            );

            if (iteration >= originalText.length) clearInterval(interval);
            iteration += 1 / 3;
        }, 30);

        const ctx = gsap.context(() => {
            // 2. High-End Entrance Timeline
            const tl = gsap.timeline({ defaults: { ease: "expo.out", duration: 1.5 } });

            tl.to(".loading-bar", { width: "100%", duration: 0.8, ease: "power2.inOut" })
                .to(".loading-screen", { yPercent: -100, duration: 1, ease: "expo.inOut" })
                .from(".profile-wrap", { scale: 0.5, opacity: 0, rotate: -10, duration: 1.2 }, "-=0.5")
                .from(".content-fade", { y: 30, opacity: 0, stagger: 0.1 }, "-=0.8");

            // 3. Fluid Background Motion
            gsap.to(".fluid-bg-1", {
                x: "+=50",
                y: "+=30",
                rotate: 360,
                duration: 20,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
            gsap.to(".fluid-bg-2", {
                x: "-=40",
                y: "-=60",
                rotate: -360,
                duration: 25,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;

        // Custom Cursor Movement
        if (cursorRef.current) {
            gsap.to(cursorRef.current, {
                x: clientX,
                y: clientY,
                duration: 0.5,
                ease: "power2.out"
            });
        }

        // 3D Tilt Effect for cards
        const cards = document.querySelectorAll(".tilt-card");
        cards.forEach((card: any) => {
            const rect = card.getBoundingClientRect();
            const x = clientX - rect.left;
            const y = clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            gsap.to(card, {
                rotateX: rotateX,
                rotateY: rotateY,
                duration: 0.5,
                ease: "power2.out"
            });
        });
    };

    const resetTilt = (e: React.MouseEvent) => {
        gsap.to(e.currentTarget, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.5,
            ease: "power2.out"
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('Procesando solicitud...');
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
                setTimeout(() => setShowContact(false), 3000);
            } else {
                setStatus('Error en el envío. Reintenta.');
            }
        } catch (err) {
            setStatus('Fallo de red.');
        }
    };

    const links = [
        {
            name: "LinkedIn",
            url: "https://linkedin.com/in/asensios",
            icon: <Linkedin size={22} />,
            title: "Trayectoria Profesional",
            color: "from-blue-600/20 via-transparent to-blue-600/5"
        },
        {
            name: "Instagram",
            url: "https://instagram.com/asensios",
            icon: <Instagram size={22} />,
            title: "Visión Diaria",
            color: "from-pink-600/20 via-transparent to-pink-600/5"
        },
        {
            name: "Próxima Aventura",
            url: "https://www.swy.international/",
            icon: <Plane size={22} />,
            title: "SWY Japan 🚢",
            color: "from-amber-500/20 via-transparent to-amber-500/5"
        },
    ];

    return (
        <main
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 overflow-hidden perspective-1000"
        >
            {/* Custom Cursor */}
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 w-8 h-8 border border-teal-500/50 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
            ></div>

            {/* Loading Screen */}
            <div className="loading-screen fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center">
                <h2 className="text-2xl font-black italic tracking-tighter mb-4">ASENSIO</h2>
                <div className="w-48 h-[1px] bg-zinc-900 overflow-hidden">
                    <div className="loading-bar w-0 h-full bg-teal-500 shadow-[0_0_15px_rgba(20,184,166,0.8)]"></div>
                </div>
            </div>

            {/* Fluid Dynamic Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="fluid-bg-1 absolute top-[-20%] left-[-10%] w-[80vw] h-[80vw] rounded-[40%_60%_70%_30%/40%_50%_60%_50%] bg-teal-500/[0.08] blur-[100px]"></div>
                <div className="fluid-bg-2 absolute bottom-[-20%] right-[-10%] w-[70vw] h-[70vw] rounded-[60%_40%_30%_70%/50%_30%_70%_50%] bg-blue-600/[0.06] blur-[100px]"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)]"></div>
            </div>

            <div className="max-w-[420px] w-full relative z-10 flex flex-col items-center">
                {/* Profile - Neo-Morph Case */}
                <div className="profile-wrap mb-10 flex flex-col items-center">
                    <div className="relative group cursor-none">
                        <div className="absolute -inset-4 bg-gradient-to-tr from-teal-500/20 to-blue-600/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition duration-1000"></div>
                        <div className="relative w-36 h-36 rounded-full border-2 border-white/5 p-1.5 bg-black/40 backdrop-blur-xl shadow-2xl overflow-hidden ring-1 ring-white/10">
                            <Image
                                src="/perfil1.jpg"
                                alt="Asensio Sabater"
                                fill
                                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                                priority
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = "https://ui-avatars.com/api/?name=Asensio+Sabater&background=0a0a0a&color=fff&size=256&bold=true";
                                }}
                            />
                        </div>
                    </div>

                    <h1 className="content-fade text-4xl font-black tracking-tighter mt-8 mb-2 uppercase italic text-center font-mono">
                        {scrambledText}
                    </h1>
                    <div className="content-fade flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                        <Sparkles size={14} className="text-teal-400" />
                        <p className="text-[10px] font-black tracking-[0.4em] text-teal-400 uppercase">Strategic Innovation</p>
                    </div>
                </div>

                {/* Links Grid - 3D Cards */}
                <div className="w-full space-y-5 mb-12">
                    {links.map((link, i) => (
                        <a
                            key={i}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onMouseLeave={resetTilt}
                            className="tilt-card content-fade group relative block w-full p-5 rounded-[2.5rem] bg-zinc-900/30 border border-white/5 backdrop-blur-2xl transition-all shadow-xl hover:shadow-teal-500/5 transform-gpu"
                            style={{ transformStyle: 'preserve-3d' }}
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${link.color} opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[2.5rem]`}></div>

                            <div className="flex items-center justify-between relative z-10" style={{ transform: 'translateZ(30px)' }}>
                                <div className="flex items-center gap-5">
                                    <div className="p-4 rounded-2xl bg-black/50 text-teal-400 border border-white/5 group-hover:border-teal-500/30 transition-all group-hover:scale-110">
                                        {link.icon}
                                    </div>
                                    <div className="flex flex-col text-left">
                                        <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest leading-none mb-2">{link.name}</span>
                                        <span className="text-lg font-bold tracking-tight text-white/90 leading-none">{link.title}</span>
                                    </div>
                                </div>
                                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 group-hover:bg-teal-500 group-hover:text-black transition-all">
                                    <ArrowRight size={20} className="group-hover:translate-x-0.5 transition-transform" />
                                </div>
                            </div>
                        </a>
                    ))}

                    {/* Epic Floating Contact Button */}
                    <button
                        onClick={() => setShowContact(!showContact)}
                        className="content-fade w-full p-6 rounded-[2.5rem] bg-white text-black font-black hover:bg-teal-400 transition-all duration-700 flex items-center justify-between shadow-[0_20px_40px_rgba(0,0,0,0.4)] group overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                        <div className="flex items-center gap-5 relative z-10 transition-transform group-hover:translate-x-1">
                            <Mail size={24} />
                            <span className="uppercase text-md tracking-tighter">Contactar conmigo</span>
                        </div>
                        <div className="relative z-10 bg-black/10 p-2 rounded-full">
                            <Send size={20} className={`transition-all duration-700 ${showContact ? 'rotate-[-45deg] translate-x-10 opacity-0' : 'group-hoverScale-110'}`} />
                            <Zap size={20} className={`absolute inset-0 m-auto transition-all duration-700 ${showContact ? 'opacity-100 scale-125' : 'opacity-0 scale-0'}`} />
                        </div>
                    </button>
                </div>

                {/* Dynamic Contact Form - Glass Portal */}
                <div className={`w-full transition-all duration-1000 cubic-bezier(0.23, 1, 0.32, 1) ${showContact ? 'max-h-[700px] opacity-100 mb-12 translate-y-0' : 'max-h-0 opacity-0 -translate-y-10 overflow-hidden'}`}>
                    <div className="bg-zinc-900/60 p-10 rounded-[3rem] border border-white/10 backdrop-blur-[40px] shadow-3xl">
                        <div className="flex items-center justify-between mb-8 text-teal-500 font-black text-xs uppercase tracking-widest leading-none">
                            <span>Nova Col·laboració</span>
                            <div className="h-2 w-2 rounded-full bg-teal-500 animate-pulse"></div>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="group relative">
                                <input name="name" placeholder="Nombre completo" required className="w-full bg-white/5 border border-white/5 rounded-2xl p-5 outline-none focus:border-teal-500/30 transition-all text-sm group-hover:bg-white/[0.08]" />
                            </div>
                            <div className="group relative">
                                <input name="email" type="email" placeholder="Correo electrónico" required className="w-full bg-white/5 border border-white/5 rounded-2xl p-5 outline-none focus:border-teal-500/30 transition-all text-sm group-hover:bg-white/[0.08]" />
                            </div>
                            <div className="group relative">
                                <textarea name="message" placeholder="¿Cómo podemos colaborar?" required rows={4} className="w-full bg-white/5 border border-white/5 rounded-2xl p-5 outline-none focus:border-teal-500/30 transition-all text-sm resize-none group-hover:bg-white/[0.08]" />
                            </div>
                            <button type="submit" className="w-full bg-teal-500 text-black font-black py-5 rounded-2xl hover:brightness-110 transition-all flex items-center justify-center gap-4 shadow-xl shadow-teal-500/20 active:scale-[0.98]">
                                {status || 'ENVIAR AHORA'} <Send size={20} />
                            </button>
                        </form>
                    </div>
                </div>

                {/* High-End Tech Footer */}
                <footer className="w-full pt-8 flex flex-col items-center gap-6 opacity-40 hover:opacity-100 transition-opacity duration-1000">
                    <div className="flex gap-4">
                        <a href="#" className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors"><Linkedin size={16} /></a>
                        <a href="#" className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors"><Instagram size={16} /></a>
                        <a href="#" className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors"><Globe size={16} /></a>
                    </div>
                    <p className="text-[7px] tracking-[0.8em] font-black uppercase text-center pl-[0.8em]">
                        EXCELENCIA E INNOVACIÓN ESTRATÉGICA · MMXXV
                    </p>
                </footer>
            </div>
        </main>
    );
}
