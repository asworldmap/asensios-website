"use client";
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Linkedin, Instagram, Send, Globe, ChevronRight, Mail, Briefcase, Plane, Compass, Zap, Heart, Coffee } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
    const containerRef = useRef<HTMLDivElement>(null);
    const orbitalRef = useRef<HTMLDivElement>(null);
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
            const tl = gsap.timeline();

            // 1. Dragon Ball style initial animation
            // The balls fly in randomly and converge
            tl.set(".skill-sphere", {
                x: () => (Math.random() - 0.5) * window.innerWidth * 1.5,
                y: () => (Math.random() - 0.5) * window.innerHeight * 1.5,
                scale: 0,
                opacity: 0
            });

            tl.to(".skill-sphere", {
                scale: 1,
                opacity: 1,
                duration: 1.5,
                x: (i) => Math.cos((i * 2 * Math.PI) / 5) * 160,
                y: (i) => Math.sin((i * 2 * Math.PI) / 5) * 160,
                stagger: 0.1,
                ease: "power4.out"
            })
                .from(".profile-center", { scale: 0, opacity: 0, duration: 1 }, "-=0.5")
                .from(".footer-links", { y: 20, opacity: 0, duration: 1 }, "-=0.5");

            // 2. Continuous orbital float
            gsap.to(".skill-sphere", {
                y: "+=15",
                duration: 2.5,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                stagger: {
                    each: 0.2,
                    from: "random"
                }
            });

            // 3. Background pulse
            gsap.to(".bg-pulse", {
                scale: 1.2,
                opacity: 0.4,
                duration: 4,
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

        // Magnetic effect on spheres
        gsap.to(".skill-sphere", {
            x: (i) => {
                const baseDirX = Math.cos((i * 2 * Math.PI) / 5) * 160;
                const mouseOffset = (clientX - centerX) * 0.05;
                return baseDirX + mouseOffset;
            },
            y: (i) => {
                const baseDirY = Math.sin((i * 2 * Math.PI) / 5) * 160;
                const mouseOffset = (clientY - centerY) * 0.05;
                return baseDirY + mouseOffset;
            },
            duration: 0.6,
            ease: "power2.out"
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
                setStatus('¡Enviado!');
                setTimeout(() => setShowContact(false), 2000);
            } else {
                setStatus('Fallo');
            }
        } catch (err) {
            setStatus('Error');
        }
    };

    return (
        <main
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="min-h-screen bg-[#020202] text-white flex flex-col items-center justify-center p-6 overflow-hidden perspective-1000"
        >
            {/* Background Pulse Lights */}
            <div className="bg-pulse fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full bg-teal-500/5 blur-[120px] pointer-events-none"></div>

            {/* Profile & Orbital Skills Container */}
            <div className="relative w-full max-w-lg h-[500px] flex items-center justify-center">

                {/* Profile Center */}
                <div className="profile-center relative z-20 w-40 h-40 rounded-full p-1 bg-gradient-to-tr from-white/20 to-transparent border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden">
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

                {/* Skill Spheres (Dragon Balls) */}
                {skills.map((skill, i) => (
                    <div
                        key={i}
                        onMouseEnter={() => setHoveredSkill(skill.name)}
                        onMouseLeave={() => setHoveredSkill(null)}
                        className="skill-sphere absolute z-30 cursor-pointer group"
                    >
                        <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${skill.color} p-[2px] shadow-[0_0_20px_rgba(0,0,0,0.4)] transition-transform duration-500 group-hover:scale-125`}>
                            <div className="w-full h-full rounded-full bg-[#050505] flex items-center justify-center text-white/80 group-hover:text-white">
                                {skill.icon}
                            </div>
                        </div>
                        {/* Tooltip */}
                        <div className={`absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 bg-black/80 border border-white/10 rounded-full text-[10px] font-bold tracking-widest uppercase transition-opacity duration-300 ${hoveredSkill === skill.name ? 'opacity-100' : 'opacity-0'}`}>
                            {skill.name}
                        </div>
                    </div>
                ))}
            </div>

            {/* Main Info */}
            <div className="relative z-40 text-center -mt-10">
                <h1 className="text-4xl font-black italic tracking-tighter mb-1 uppercase">Asensio Sabater</h1>
                <p className="text-[10px] font-bold tracking-[0.5em] text-teal-500 uppercase mb-8">Strategic Innovation</p>

                {/* Call to Action Links */}
                <div className="footer-links flex flex-col gap-4 w-full max-w-[280px] mx-auto mb-10">
                    <a href="https://linkedin.com/in/asensios" target="_blank" className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-all group">
                        <span className="text-xs font-bold uppercase tracking-widest">LinkedIn</span>
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                    <a href="https://instagram.com/asensios" target="_blank" className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-all group">
                        <span className="text-xs font-bold uppercase tracking-widest">Instagram</span>
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                    <button
                        onClick={() => setShowContact(!showContact)}
                        className="p-4 bg-white text-black font-black rounded-2xl flex items-center justify-between uppercase text-xs tracking-widest hover:bg-teal-400 transition-all"
                    >
                        {showContact ? "Cerrar" : "Enviar Mensaje"}
                        <Mail size={16} />
                    </button>
                </div>
            </div>

            {/* Contact Form Overlay */}
            <div className={`fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-md transition-all duration-500 ${showContact ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                <div className="max-w-md w-full bg-zinc-900 p-8 rounded-[2rem] border border-white/10 shadow-3xl">
                    <h3 className="text-sm font-black uppercase tracking-widest text-teal-400 mb-6">Nueva Colaboración</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input name="name" placeholder="Tu nombre" required className="w-full bg-white/5 border border-white/5 rounded-xl p-4 text-sm outline-none focus:border-teal-500/50" />
                        <input name="email" type="email" placeholder="Tu email" required className="w-full bg-white/5 border border-white/5 rounded-xl p-4 text-sm outline-none focus:border-teal-500/50" />
                        <textarea name="message" placeholder="¿Cómo puedo ayudarte?" required rows={4} className="w-full bg-white/5 border border-white/5 rounded-xl p-4 text-sm outline-none focus:border-teal-500/50 resize-none" />
                        <button type="submit" className="w-full bg-teal-500 text-black font-black py-4 rounded-xl hover:brightness-110 transition-all">
                            {status || 'ENVIAR MENSAJE'}
                        </button>
                    </form>
                </div>
            </div>

            {/* Final Mini Footer */}
            <footer className="footer-links opacity-20 text-[7px] font-bold tracking-[0.5em] uppercase">
                Asensio Sabater · Tokyo - Murcia · 2025
            </footer>
        </main>
    );
}

function ArrowRight({ size, className }: { size: number, className?: string }) {
    return <ChevronRight size={size} className={className} />;
}
