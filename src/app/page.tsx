"use client";
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Linkedin, Instagram, Send, Globe, ChevronRight, Mail, Briefcase, Plane, Compass, Zap, Heart, Sparkles, ExternalLink, MapPin } from 'lucide-react';
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

            // 1. Cinematic "Dragon Ball" Entrance
            tl.set(".skill-sphere", {
                x: () => (Math.random() - 0.5) * window.innerWidth * 2,
                y: () => (Math.random() - 0.5) * window.innerHeight * 2,
                scale: 0,
                opacity: 0,
                filter: "blur(10px)"
            });

            // Rapid sequence like energy charging
            tl.to(".skill-sphere", {
                scale: 1,
                opacity: 1,
                filter: "blur(0px)",
                duration: 1.2,
                x: (i) => Math.cos((i * 2 * Math.PI) / 5) * 140, // Reduced radius to avoid off-screen
                y: (i) => Math.sin((i * 2 * Math.PI) / 5) * 140,
                stagger: {
                    each: 0.05,
                    from: "random"
                },
                ease: "power4.inOut"
            })
                .from(".profile-center", {
                    scale: 0,
                    rotate: 180,
                    opacity: 0,
                    duration: 1.8,
                    ease: "elastic.out(1, 0.3)"
                }, "-=0.8")
                .from(".main-info", { y: 20, opacity: 0, duration: 1.2, ease: "power3.out" }, "-=1")
                .from(".action-hub", { y: 20, opacity: 0, duration: 1, stagger: 0.1 }, "-=0.8");

            // 2. Playful float (harmonized jitter)
            gsap.to(".skill-sphere", {
                x: (i) => `+=${Math.sin(i) * 10}`,
                y: (i) => `+=${Math.cos(i) * 10}`,
                duration: 3,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                stagger: { each: 0.2, from: "center" }
            });

            // Ambient atmosphere
            gsap.to(".bg-pulse", {
                scale: 1.5,
                opacity: 0.4,
                duration: 8,
                repeat: -1,
                yoyo: true,
                ease: "power1.inOut"
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        gsap.to(".skill-sphere", {
            x: (i) => {
                const baseDirX = Math.cos((i * 2 * Math.PI) / 5) * 140;
                const mouseX = (clientX - centerX) * 0.04;
                return baseDirX + mouseX;
            },
            y: (i) => {
                const baseDirY = Math.sin((i * 2 * Math.PI) / 5) * 140;
                const mouseY = (clientY - centerY) * 0.04;
                return baseDirY + mouseY;
            },
            duration: 1.5,
            ease: "power3.out"
        });

        gsap.to(".profile-center", {
            rotateX: (clientY - centerY) * 0.015,
            rotateY: (clientX - centerX) * -0.015,
            duration: 0.8
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('procesando...');
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
                setStatus('¡Enviado con éxito!');
                setTimeout(() => setShowContact(false), 2000);
            } else {
                setStatus('Error de conexión');
            }
        } catch (err) {
            setStatus('Fallo');
        }
    };

    return (
        <main
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className={`min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 overflow-hidden font-sans`}
        >
            {/* Cinematic Background */}
            <div className="bg-pulse fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] rounded-full bg-teal-500/5 blur-[120px] pointer-events-none"></div>
            <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-overlay pointer-events-none"></div>

            {/* Orbital Arena */}
            <div className="relative w-full max-w-lg h-[450px] flex items-center justify-center perspective-1000 mb-4">

                {/* Profile Nucleus */}
                <div className="profile-center relative z-20 group">
                    <div className="absolute -inset-6 bg-teal-500/10 blur-3xl rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-1000"></div>
                    <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full p-[2px] bg-gradient-to-tr from-white/20 via-transparent to-teal-500/20 border border-white/10 shadow-3xl overflow-hidden bg-black/80">
                        <Image
                            src="/perfil1.jpg"
                            alt="Asensio Sabater"
                            fill
                            className="object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0"
                            priority
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = "https://ui-avatars.com/api/?name=Asensio+Sabater&background=0a0a0a&color=fff&size=256&bold=true";
                            }}
                        />
                    </div>
                </div>

                {/* Dragon Ball Spheres */}
                {skills.map((skill, i) => (
                    <div
                        key={i}
                        onMouseEnter={() => setHoveredSkill(skill.name)}
                        onMouseLeave={() => setHoveredSkill(null)}
                        className="skill-sphere absolute z-30 group"
                    >
                        <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br ${skill.color} p-[1.5px] shadow-[0_0_30px_rgba(0,0,0,0.6)] transition-all duration-700 group-hover:scale-125 group-hover:shadow-teal-500/30`}>
                            <div className="w-full h-full rounded-full bg-[#050505] flex items-center justify-center text-white/40 group-hover:text-white transition-colors">
                                {skill.icon}
                            </div>
                        </div>
                        {/* Elegant Tooltip */}
                        <div className={`absolute -bottom-14 left-1/2 -translate-x-1/2 whitespace-nowrap px-4 py-1.5 bg-black/90 backdrop-blur-xl border border-white/5 rounded-full text-[8px] font-black tracking-[0.2em] uppercase transition-all duration-300 ${hoveredSkill === skill.name ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                            {skill.name}
                        </div>
                    </div>
                ))}
            </div>

            {/* Hero Content - CALLIGRAPHY IMPACT */}
            <div className="main-info relative z-40 text-center mb-10">
                <h1 className="text-5xl md:text-6xl font-black italic tracking-tighter mb-4 uppercase leading-none font-playfair bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-600">
                    Asensio Sabater
                </h1>
                <div className="flex flex-col items-center gap-3">
                    <div className="h-px w-12 bg-teal-500/50"></div>
                    <p className="text-[10px] md:text-xs font-black tracking-[0.6em] text-teal-400 uppercase">
                        Mentalidad Global <span className="text-white/40 font-normal">con</span> Acento Local
                    </p>
                </div>
            </div>

            {/* Action Hub */}
            <div className="action-hub relative z-40 w-full max-w-[340px] space-y-4">
                <div className="grid grid-cols-2 gap-3">
                    <a href="https://www.linkedin.com/in/asensio-sabater-lopez-guillen/" target="_blank" className="flex items-center justify-center gap-3 p-4 bg-zinc-900/50 border border-white/5 rounded-2xl hover:bg-zinc-800 transition-all group">
                        <Linkedin size={20} className="text-zinc-500 group-hover:text-blue-400 transition-colors" />
                        <span className="text-[9px] font-black tracking-widest uppercase">LinkedIn</span>
                    </a>
                    <a href="https://instagram.com/asensiosabater" target="_blank" className="flex items-center justify-center gap-3 p-4 bg-zinc-900/50 border border-white/5 rounded-2xl hover:bg-zinc-800 transition-all group">
                        <Instagram size={20} className="text-zinc-500 group-hover:text-pink-400 transition-colors" />
                        <span className="text-[9px] font-black tracking-widest uppercase">Instagram</span>
                    </a>
                </div>

                <button
                    onClick={() => setShowContact(true)}
                    className="w-full p-6 bg-white text-black font-black rounded-[2rem] flex items-center justify-center gap-4 uppercase text-xs tracking-widest hover:bg-teal-400 transition-all shadow-[0_10px_40px_rgba(0,0,0,0.3)] shadow-teal-500/10"
                >
                    Mensaje Directo <Mail size={18} />
                </button>

                {/* PROXIMA AVENTURA */}
                <a
                    href="https://www.swy.international/"
                    target="_blank"
                    className="flex items-center justify-center gap-3 py-3 px-6 rounded-full border border-teal-500/20 bg-teal-500/5 hover:bg-teal-500/10 transition-all group"
                >
                    <Plane size={14} className="text-teal-500 group-hover:rotate-12 transition-transform" />
                    <span className="text-[9px] font-bold text-teal-500/80 uppercase tracking-[0.2em]">Próxima aventura: <span className="text-teal-400 font-black">SWY Japan</span></span>
                    <ChevronRight size={12} className="text-teal-500/40" />
                </a>
            </div>

            {/* Luxury Contact Modal */}
            <div className={`fixed inset-0 z-[100] flex items-center justify-center p-6 transition-all duration-700 ${showContact ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                <div className="absolute inset-0 bg-black/80 backdrop-blur-2xl" onClick={() => setShowContact(false)}></div>
                <div className="relative max-w-md w-full bg-[#080808] p-10 rounded-[4rem] border border-white/5 shadow-3xl transform transition-all duration-700 overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-teal-500/40 to-transparent"></div>
                    <button onClick={() => setShowContact(false)} className="absolute top-8 right-8 text-zinc-600 hover:text-white transition-colors uppercase text-[8px] font-black tracking-widest">Cerrar</button>

                    <h3 className="text-xs font-black uppercase tracking-[0.3em] text-teal-400 mb-10 flex items-center gap-3">
                        <Send size={14} /> Nueva Conexión
                    </h3>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input name="name" placeholder="Tu nombre" required className="w-full bg-white/5 border border-white/5 rounded-2xl p-5 text-sm outline-none focus:border-teal-500/20 focus:bg-white/10 transition-all placeholder:text-zinc-700" />
                        <input name="email" type="email" placeholder="Tu email" required className="w-full bg-white/5 border border-white/5 rounded-2xl p-5 text-sm outline-none focus:border-teal-500/20 focus:bg-white/10 transition-all placeholder:text-zinc-700" />
                        <textarea name="message" placeholder="¿Cómo podemos colaborar?" required rows={4} className="w-full bg-white/5 border border-white/5 rounded-2xl p-5 text-sm outline-none focus:border-teal-500/20 focus:bg-white/10 transition-all placeholder:text-zinc-700 resize-none" />
                        <button type="submit" className="w-full bg-teal-500 text-black font-black py-5 rounded-2xl hover:brightness-110 shadow-lg shadow-teal-500/20 active:scale-[0.98] transition-all uppercase text-xs tracking-widest">
                            {status || 'Enviar ahora'}
                        </button>
                    </form>
                </div>
            </div>

            <footer className="mt-16 text-center opacity-30 group cursor-default">
                <div className="flex items-center justify-center gap-4 mb-4">
                    <div className="h-px w-8 bg-zinc-800"></div>
                    <MapPin size={10} className="text-teal-500" />
                    <div className="h-px w-8 bg-zinc-800"></div>
                </div>
                <p className="text-[7px] font-black tracking-[1em] uppercase group-hover:tracking-[1.2em] transition-all duration-1000">
                    Tokyo ↔ Murcia · MMXXV
                </p>
            </footer>
        </main>
    );
}
