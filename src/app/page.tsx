"use client";
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Linkedin, Instagram, Send, Globe, ChevronRight, Mail, Briefcase, Plane, Compass, Zap, Heart, Sparkles, ExternalLink } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [status, setStatus] = useState('');
    const [showContact, setShowContact] = useState(false);
    const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

    const skills = [
        { name: "Relaciones Internacionales", icon: <Globe size={18} />, color: "from-blue-500 to-cyan-400" },
        { name: "Emprendimiento", icon: <Zap size={18} />, color: "from-amber-400 to-orange-500" },
        { name: "Naturaleza", icon: <Heart size={18} />, color: "from-emerald-400 to-teal-600" },
        { name: "Aventura", icon: <Plane size={18} />, color: "from-rose-500 to-purple-600" },
        { name: "Curiosidad", icon: <Compass size={18} />, color: "from-zinc-100 to-zinc-400" },
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

            // 1. Initial "Dragon Ball" Entrance
            // Spheres fly in from outside with high velocity and slight overshoot
            tl.set(".skill-sphere", {
                x: () => (Math.random() - 0.5) * window.innerWidth * 2,
                y: () => (Math.random() - 0.5) * window.innerHeight * 2,
                scale: 0,
                opacity: 0
            });

            tl.to(".skill-sphere", {
                scale: 1,
                opacity: 1,
                duration: 2,
                x: (i) => Math.cos((i * 2 * Math.PI) / 5) * 170,
                y: (i) => Math.sin((i * 2 * Math.PI) / 5) * 170,
                stagger: 0.1,
                ease: "elastic.out(1, 0.5)"
            })
                .from(".profile-center", { scale: 0, opacity: 0, duration: 1.5, ease: "back.out(1.7)" }, "-=1.2")
                .from(".main-info", { y: 30, opacity: 0, duration: 1 }, "-=0.8")
                .from(".footer-links-wrap", { y: 20, opacity: 0, duration: 1 }, "-=0.5");

            // 2. Playful Jitter (the "naughty/traviesas" spheres)
            // Each sphere has its own independent float cycle
            gsap.to(".skill-sphere", {
                x: "+=8",
                y: "+=12",
                duration: (i) => 2 + i * 0.5,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                stagger: {
                    each: 0.3,
                    from: "random"
                }
            });

            // 3. Ambient Glow Animation
            gsap.to(".bg-orb", {
                scale: 1.4,
                opacity: 0.3,
                duration: 10,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        // Playful magnetic reaction
        gsap.to(".skill-sphere", {
            x: (i) => {
                const baseDirX = Math.cos((i * 2 * Math.PI) / 5) * 170;
                const mouseShift = (clientX - centerX) * 0.08;
                return baseDirX + mouseShift;
            },
            y: (i) => {
                const baseDirY = Math.sin((i * 2 * Math.PI) / 5) * 170;
                const mouseShift = (clientY - centerY) * 0.08;
                return baseDirY + mouseShift;
            },
            duration: 1.2,
            ease: "power2.out"
        });

        // Subtle 3D tilt for the profile
        gsap.to(".profile-center", {
            rotateX: (clientY - centerY) * 0.02,
            rotateY: (clientX - centerX) * -0.02,
            duration: 0.5
        });
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
            if (res.ok) {
                setStatus('¡Enviado!');
                setTimeout(() => setShowContact(false), 2000);
            } else {
                setStatus('Error SMTP');
            }
        } catch (err) {
            setStatus('Error');
        }
    };

    return (
        <main
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="min-h-screen bg-[#010101] text-white flex flex-col items-center justify-center p-6 overflow-hidden selection:bg-teal-500/30"
        >
            {/* Background Atmosphere */}
            <div className="bg-orb fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] rounded-full bg-teal-500/[0.03] blur-[150px] pointer-events-none"></div>
            <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none"></div>

            {/* Orbital Stage */}
            <div className="relative w-full max-w-lg h-[460px] flex items-center justify-center perspective-1000">

                {/* Profile Hub */}
                <div className="profile-center relative z-20 group">
                    <div className="absolute -inset-4 bg-teal-500/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                    <div className="relative w-36 h-36 rounded-full p-[1.5px] bg-gradient-to-tr from-white/20 to-transparent border border-white/10 shadow-3xl overflow-hidden bg-zinc-950">
                        <Image
                            src="/perfil1.jpg"
                            alt="Asensio Sabater"
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                            priority
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = "https://ui-avatars.com/api/?name=Asensio+Sabater&background=0a0a0a&color=fff&size=256&bold=true";
                            }}
                        />
                    </div>
                    {/* Pulsing ring */}
                    <div className="absolute inset-0 border border-teal-500/10 rounded-full animate-[ping_3s_infinite_ease-in-out]"></div>
                </div>

                {/* Playful Orbital Spheres */}
                {skills.map((skill, i) => (
                    <div
                        key={i}
                        onMouseEnter={() => setHoveredSkill(skill.name)}
                        onMouseLeave={() => setHoveredSkill(null)}
                        className="skill-sphere absolute z-30 group"
                    >
                        <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${skill.color} p-[1.5px] shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-all duration-500 group-hover:scale-150 group-hover:shadow-teal-500/20`}>
                            <div className="w-full h-full rounded-full bg-[#050505] flex items-center justify-center text-white/50 group-hover:text-white transition-colors">
                                {skill.icon}
                            </div>
                        </div>
                        {/* Playful Tooltip */}
                        <div className={`absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap px-4 py-1.5 bg-zinc-900/90 backdrop-blur-md border border-white/10 rounded-full text-[9px] font-black tracking-widest uppercase transition-all duration-500 scale-90 ${hoveredSkill === skill.name ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                            {skill.name}
                        </div>
                    </div>
                ))}
            </div>

            {/* Hero Info */}
            <div className="main-info relative z-40 text-center -mt-8 mb-12">
                <h1 className="text-4xl font-black italic tracking-tighter mb-2 uppercase leading-none">
                    Asensio Sabater
                </h1>
                <div className="flex items-center justify-center gap-2 px-6 py-1.5 rounded-full bg-white/5 border border-white/10">
                    <Sparkles size={12} className="text-teal-400" />
                    <p className="text-[9px] font-bold tracking-[0.4em] text-teal-400 uppercase">Strategic Innovation</p>
                </div>
            </div>

            {/* Action Hub */}
            <div className="footer-links-wrap relative z-40 w-full max-w-[320px] space-y-3">
                <a
                    href="https://www.linkedin.com/in/asensio-sabater-lopez-guillen/"
                    target="_blank"
                    className="flex items-center justify-between p-4 bg-zinc-900 border border-white/5 rounded-2xl hover:bg-zinc-800 hover:border-white/10 transition-all group overflow-hidden relative"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="flex items-center gap-4 relative z-10">
                        <Linkedin size={18} className="text-blue-400" />
                        <span className="text-xs font-black uppercase tracking-widest">LinkedIn</span>
                    </div>
                    <ExternalLink size={14} className="text-zinc-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                <a
                    href="https://instagram.com/asensiosabater"
                    target="_blank"
                    className="flex items-center justify-between p-4 bg-zinc-900 border border-white/5 rounded-2xl hover:bg-zinc-800 hover:border-white/10 transition-all group overflow-hidden relative"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="flex items-center gap-4 relative z-10">
                        <Instagram size={18} className="text-pink-400" />
                        <span className="text-xs font-black uppercase tracking-widest">Instagram</span>
                    </div>
                    <ExternalLink size={14} className="text-zinc-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>

                <button
                    onClick={() => setShowContact(true)}
                    className="w-full p-5 bg-white text-black font-black rounded-3xl flex items-center justify-center gap-3 uppercase text-xs tracking-widest hover:bg-teal-400 transition-all shadow-2xl active:scale-[0.98]"
                >
                    Enviar Mensaje Directo <Mail size={16} />
                </button>
            </div>

            {/* High-End Contact Overlay */}
            <div className={`fixed inset-0 z-50 flex items-center justify-center p-6 transition-all duration-700 ${showContact ? 'opacity-100 pointer-events-auto scale-100' : 'opacity-0 pointer-events-none scale-105'}`}>
                <div className="absolute inset-0 bg-black/60 backdrop-blur-xl" onClick={() => setShowContact(false)}></div>
                <div className="relative max-w-md w-full bg-[#0a0a0a] p-10 rounded-[3rem] border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.8)]">
                    <button
                        onClick={() => setShowContact(false)}
                        className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors"
                    >
                        Cerrar
                    </button>
                    <h3 className="text-sm font-black uppercase tracking-widest text-teal-400 mb-8 flex items-center gap-3">
                        <Zap size={14} className="fill-teal-400" />
                        Nueva Conexión
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input name="name" placeholder="Tu nombre completo" required className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 text-sm outline-none focus:border-teal-500/40 text-white placeholder:text-zinc-600" />
                        <input name="email" type="email" placeholder="Tu correo electrónico" required className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 text-sm outline-none focus:border-teal-500/40 text-white placeholder:text-zinc-600" />
                        <textarea name="message" placeholder="Hablemos de estrategia, aventura o proyectos..." required rows={4} className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 text-sm outline-none focus:border-teal-500/40 text-white placeholder:text-zinc-600 resize-none" />
                        <button type="submit" className="w-full bg-teal-500 text-black font-black py-4 rounded-2xl hover:brightness-110 transition-all flex items-center justify-center gap-2">
                            {status || 'ENVIAR MENSAJE'} <Send size={16} />
                        </button>
                    </form>
                </div>
            </div>

            {/* Decorative Final Line */}
            <footer className="mt-12 opacity-30 text-[7px] font-black tracking-[0.8em] uppercase text-center animate-pulse">
                Global Vision · Tokyo ↔ Murcia · 2025
            </footer>
        </main>
    );
}
