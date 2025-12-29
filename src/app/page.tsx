"use client";
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { Linkedin, Instagram, Mail, Bug, Send, Globe, MapPin, Briefcase, Zap, Heart } from 'lucide-react';
import Image from 'next/image';

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
    const containerRef = useRef(null);
    const [status, setStatus] = useState('');

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Hero Animations
            gsap.to(".reveal", { opacity: 1, y: 0, duration: 1.2, stagger: 0.15, ease: "power4.out" });

            // Background Glow
            gsap.to(".bg-glow", {
                scale: 1.4,
                opacity: 0.4,
                duration: 8,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });

            // Scroll Reveal
            gsap.utils.toArray(".scroll-reveal").forEach((el: any) => {
                gsap.fromTo(el, {
                    opacity: 0,
                    y: 50
                }, {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: el,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                });
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

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

    const services = [
        { icon: <Globe className="text-teal-400" />, title: "Ingeniería de Proyectos", desc: "Especialista en fondos europeos (Erasmus+, FEDER) y gestión de consorcios internacionales." },
        { icon: <Briefcase className="text-teal-400" />, title: "Estrategia Global", desc: "Consultoría estratégica con enfoque en relaciones internacionales y turismo sostenible." },
        { icon: <MapPin className="text-teal-400" />, title: "Soft Landing", desc: "Servicios integrales de acogida para perfiles internacionales que aterrizan en Murcia." },
    ];

    return (
        <main ref={containerRef} className="min-h-screen bg-[#050505] text-white selection:bg-teal-500/30 selection:text-teal-200">
            {/* Dynamic Background */}
            <div className="bg-glow fixed top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] rounded-full blur-[140px] pointer-events-none opacity-20"
                style={{ background: 'radial-gradient(circle, #14b8a6 0%, transparent 70%)' }}></div>
            <div className="bg-glow fixed bottom-0 right-0 w-[50vw] h-[50vw] rounded-full blur-[140px] pointer-events-none opacity-10"
                style={{ background: 'radial-gradient(circle, #1d4ed8 0%, transparent 70%)' }}></div>

            {/* Header */}
            <header className="fixed top-0 left-0 w-full p-8 flex justify-between items-center z-50 backdrop-blur-sm">
                <span className="text-2xl font-black tracking-tighter">ASENSIO<span className="text-teal-400">.</span></span>
                <button className="bg-white/10 hover:bg-white/20 px-6 py-2 rounded-full text-sm font-medium transition-all backdrop-blur-md border border-white/5">
                    DESCARGAR CV
                </button>
            </header>

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center pt-24 pb-12 px-8 overflow-hidden">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
                    <div className="relative z-10">
                        <div className="reveal opacity-0 -translate-y-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-bold uppercase tracking-widest mb-6">
                            <Zap size={14} /> Strategic Innovation Expert
                        </div>
                        <h1 className="text-[12vw] lg:text-[7vw] font-black leading-[0.85] tracking-tighter mb-8 reveal opacity-0 -translate-y-4">
                            MENTALIDAD<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-500">GLOBAL.</span>
                        </h1>
                        <p className="text-2xl lg:text-3xl italic text-zinc-400 mb-12 reveal opacity-0 -translate-y-4 max-w-lg">
                            Acento local desde Murcia para el mundo entero.
                        </p>

                        <div className="flex gap-6 reveal opacity-0 -translate-y-4">
                            <a href="https://spider.asensios.com" target="_blank" className="p-4 rounded-full bg-zinc-900 border border-zinc-800 hover:border-teal-400 hover:text-teal-400 transition-all"><Bug size={24} /></a>
                            <a href="#" className="p-4 rounded-full bg-zinc-900 border border-zinc-800 hover:border-teal-400 hover:text-teal-400 transition-all"><Linkedin size={24} /></a>
                            <a href="#" className="p-4 rounded-full bg-zinc-900 border border-zinc-800 hover:border-teal-400 hover:text-teal-400 transition-all"><Instagram size={24} /></a>
                        </div>
                    </div>

                    <div className="relative reveal opacity-0 scale-95 duration-1000">
                        <div className="aspect-square relative rounded-3xl overflow-hidden border border-white/10 group">
                            <Image
                                src="/hero.png"
                                alt="Mentalidad Global"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                            <div className="absolute bottom-8 left-8 right-8">
                                <p className="text-xs font-bold tracking-[0.2em] text-teal-400 uppercase mb-2">Philosophy</p>
                                <p className="text-lg font-medium leading-tight">"De los mapas en mi cuarto de niño a liderar proyectos internacionales."</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trajectory / Story Section */}
            <section className="py-32 px-8 bg-zinc-950/50">
                <div className="max-w-4xl mx-auto scroll-reveal">
                    <h2 className="text-4xl lg:text-5xl font-black tracking-tighter mb-12">LA HISTORIA DETRÁS<br />DEL ACENTO<span className="text-teal-400">.</span></h2>
                    <div className="space-y-8 text-xl text-zinc-400 leading-relaxed font-light">
                        <p>
                            Todo comenzó en Murcia, con una pared empapelada de mapas que encendieron una curiosidad infinita por lo que había más allá del horizonte. Esa chispa me llevó a recorrer el globo, desde becas internacionales hasta la ingeniería de proyectos europeos complejos.
                        </p>
                        <p>
                            Hoy, mi propósito es conectar ideas, personas y lugares a través de tres pilares: <span className="text-white font-medium">estrategia, experiencia y hospitalidad</span>. Entiendo el progreso como un equilibrio (como mi bicicleta de bambú): flexibilidad, fuerza y respeto absoluto por el camino recorrido.
                        </p>
                        <div className="grid grid-cols-2 gap-8 pt-8">
                            <div className="p-6 rounded-2xl bg-zinc-900/30 border border-white/5">
                                <h4 className="text-white font-bold mb-2">Valores</h4>
                                <p className="text-sm">Kaizen, sostenibilidad real y honestidad radical en cada colaboración.</p>
                            </div>
                            <div className="p-6 rounded-2xl bg-zinc-900/30 border border-white/5">
                                <h4 className="text-white font-bold mb-2">Impacto</h4>
                                <p className="text-sm">Especialista en transformar la incertidumbre en oportunidades tangibles.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-32 px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-8">
                        {services.map((s, i) => (
                            <div key={i} className="scroll-reveal group p-10 rounded-3xl bg-zinc-900/40 border border-zinc-800/50 hover:border-teal-500/50 transition-all duration-500">
                                <div className="mb-6 p-4 rounded-2xl bg-teal-500/10 w-fit group-hover:bg-teal-500 group-hover:text-black transition-colors duration-500">
                                    {s.icon}
                                </div>
                                <h3 className="text-2xl font-bold mb-4">{s.title}</h3>
                                <p className="text-zinc-500 leading-relaxed">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Formulario minimalista Full Width */}
            <section className="py-32 px-8 border-t border-zinc-900">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center">
                    <div>
                        <h2 className="text-5xl lg:text-7xl font-black tracking-tightest mb-8 scroll-reveal">VAMOS A<br />COLABORAR<span className="text-teal-400">.</span></h2>
                        <p className="text-2xl text-zinc-500 scroll-reveal">¿Tienes un proyecto internacional o buscas aterrizar en Murcia con éxito?</p>
                    </div>
                    <div className="scroll-reveal">
                        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                            <div className="grid sm:grid-cols-2 gap-8">
                                <input name="name" placeholder="Tu Nombre" required className="bg-transparent border-b border-zinc-800 py-4 focus:border-teal-400 outline-none transition-colors text-lg" />
                                <input name="email" type="email" placeholder="Tu Email" required className="bg-transparent border-b border-zinc-800 py-4 focus:border-teal-400 outline-none transition-colors text-lg" />
                            </div>
                            <textarea name="message" placeholder="¿Cómo puedo ayudarte?" required rows={4} className="bg-transparent border-b border-zinc-800 py-4 focus:border-teal-400 outline-none transition-colors text-lg resize-none" />
                            <button type="submit" className="group bg-teal-500 hover:bg-teal-400 text-black font-bold py-5 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-95 text-lg">
                                {status || 'ENVIAR MENSAJE'} <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            <footer className="p-12 border-t border-zinc-900 text-center">
                <div className="flex justify-center gap-8 mb-8 text-zinc-500">
                    <Heart size={20} className="hover:text-teal-400 transition-colors" />
                    <Zap size={20} className="hover:text-teal-400 transition-colors" />
                    <Globe size={20} className="hover:text-teal-400 transition-colors" />
                </div>
                <p className="text-[10px] tracking-[0.5em] text-zinc-700 uppercase font-black">© 2025 Asensio Sabater López-Guillén — Global Mindset</p>
            </footer>
        </main>
    );
}
