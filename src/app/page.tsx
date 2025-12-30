"use client";
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Linkedin, Instagram, Send, Globe, ChevronRight, Mail, Briefcase, Plane, Compass, Zap, Heart, Sparkles, MapPin, Languages } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [status, setStatus] = useState('');
    const [showContact, setShowContact] = useState(false);
    const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
    const [lang, setLang] = useState<'es' | 'jp'>('es');

    // Multi-language content
    const t = {
        es: {
            name: "Asensio Sabater",
            tagline: "Mentalidad Global con Acento Local",
            skills: ["Relaciones Internacionales", "Emprendimiento", "Naturaleza", "Aventura", "Curiosidad"],
            links: {
                linkedin: "LinkedIn",
                instagram: "Instagram",
                adventure: "Próxima aventura: SWY Japan",
                contact: "Mensaje Directo"
            },
            form: {
                title: "Nueva Conexión",
                name: "Tu nombre",
                email: "Tu email",
                msg: "¿Cómo podemos colaborar?",
                send: "Enviar ahora",
                sending: "Procesando..."
            }
        },
        jp: {
            name: "アセンシオ・サバテル",
            tagline: "グローバルな視点、ローカルな感性",
            skills: ["国際関係", "起業家精神", "自然", "冒険", "好奇心"],
            links: {
                linkedin: "LinkedIn",
                instagram: "Instagram",
                adventure: "次なる冒険: SWY Japan",
                contact: "直接メッセージ"
            },
            form: {
                title: "新しい繋がり",
                name: "お名前",
                email: "メールアドレス",
                msg: "メッセージをお書きください",
                send: "送信する",
                sending: "送信中..."
            }
        }
    };

    const current = t[lang];

    const skillIcons = [
        { icon: <Globe size={18} />, color: "from-blue-500 to-cyan-400" },
        { icon: <Zap size={18} />, color: "from-amber-400 to-orange-500" },
        { icon: <Heart size={18} />, color: "from-emerald-400 to-teal-600" },
        { icon: <Plane size={18} />, color: "from-rose-500 to-purple-600" },
        { icon: <Compass size={18} />, color: "from-zinc-100 to-zinc-400" },
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

            tl.set(".skill-sphere", {
                x: () => (Math.random() - 0.5) * window.innerWidth * 1.5,
                y: () => (Math.random() - 0.5) * window.innerHeight * 1.5,
                scale: 0,
                opacity: 0,
                filter: "blur(10px)"
            });

            tl.to(".skill-sphere", {
                scale: 1,
                opacity: 1,
                filter: "blur(0px)",
                duration: 2,
                x: (i) => Math.cos((i * 2 * Math.PI) / 5) * 140,
                y: (i) => Math.sin((i * 2 * Math.PI) / 5) * 140,
                stagger: 0.08,
                ease: "power4.inOut"
            })
                .from(".main-stage", { scale: 0.8, opacity: 0, duration: 1.5 }, "-=1.2")
                .from(".content-block", { y: 20, opacity: 0, stagger: 0.1 }, "-=1");

        }, containerRef);

        return () => ctx.revert();
    }, [lang]); // Re-run subtle animations when language toggles

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
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus(current.form.sending);
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
                setStatus(lang === 'es' ? '¡Enviado!' : '送信完了！');
                setTimeout(() => setShowContact(false), 2000);
            }
        } catch (err) {
            setStatus('Error');
        }
    };

    return (
        <main
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-start p-6 overflow-x-hidden selection:bg-teal-500/30 font-sans"
        >
            {/* Background Atmosphere */}
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] rounded-full bg-teal-500/[0.04] blur-[150px] pointer-events-none"></div>
            <div className="fixed inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] pointer-events-none"></div>

            {/* Floating Language Toggle */}
            <button
                onClick={() => setLang(lang === 'es' ? 'jp' : 'es')}
                className="fixed top-8 right-8 z-[100] group flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-xl px-4 py-2 rounded-full transition-all active:scale-95"
            >
                <span className="text-xl">{lang === 'es' ? '🇯🇵' : '🇪🇸'}</span>
                <span className="text-[10px] font-black tracking-widest uppercase text-white/60 group-hover:text-white">
                    {lang === 'es' ? 'JA' : 'ES'}
                </span>
            </button>

            {/* Main Experience Container */}
            <div className="relative w-full max-w-lg pt-20 flex flex-col items-center">

                {/* Orbital Stage */}
                <div className="relative w-full h-[420px] flex items-center justify-center mb-8">
                    <div className="profile-center main-stage relative z-20 w-32 h-32 md:w-40 md:h-40 rounded-full border border-white/10 p-1 bg-black shadow-3xl overflow-hidden ring-1 ring-white/10">
                        <Image
                            src="/perfil1.jpg"
                            alt="Asensio Sabater"
                            fill
                            className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                            priority
                        />
                    </div>

                    {current.skills.map((skill, i) => (
                        <div
                            key={i}
                            onMouseEnter={() => setHoveredSkill(skill)}
                            onMouseLeave={() => setHoveredSkill(null)}
                            className="skill-sphere absolute z-30 group cursor-none"
                        >
                            <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br ${skillIcons[i].color} p-[1.5px] shadow-2xl transition-all duration-700 group-hover:scale-125`}>
                                <div className="w-full h-full rounded-full bg-[#050505] flex items-center justify-center text-white/40 group-hover:text-white transition-colors">
                                    {skillIcons[i].icon}
                                </div>
                            </div>
                            <div className={`absolute -bottom-14 left-1/2 -translate-x-1/2 whitespace-nowrap px-4 py-1.5 bg-black/90 backdrop-blur-xl border border-white/5 rounded-full text-[8px] font-black tracking-widest uppercase transition-all duration-500 ${hoveredSkill === skill ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                                {skill}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Hero Copy */}
                <div className="content-block text-center mb-12">
                    <h1 className="text-4xl md:text-6xl font-black italic tracking-tighter mb-4 uppercase font-playfair bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-600">
                        {current.name}
                    </h1>
                    <p className="text-[10px] md:text-xs font-black tracking-[0.6em] text-teal-400 uppercase">
                        {current.tagline}
                    </p>
                </div>

                {/* Action Hub */}
                <div className="content-block w-full max-w-[340px] space-y-4 mb-10">
                    <div className="grid grid-cols-2 gap-3">
                        <a href="https://www.linkedin.com/in/asensio-sabater-lopez-guillen/" target="_blank" className="flex items-center justify-center gap-3 p-4 bg-zinc-900/50 border border-white/5 rounded-2xl hover:bg-zinc-800 transition-all group">
                            <Linkedin size={20} className="text-zinc-500 group-hover:text-blue-400" />
                            <span className="text-[9px] font-black uppercase tracking-widest">{current.links.linkedin}</span>
                        </a>
                        <a href="https://instagram.com/asensiosabater" target="_blank" className="flex items-center justify-center gap-3 p-4 bg-zinc-900/50 border border-white/5 rounded-2xl hover:bg-zinc-800 transition-all group">
                            <Instagram size={20} className="text-zinc-500 group-hover:text-pink-400" />
                            <span className="text-[9px] font-black uppercase tracking-widest">{current.links.instagram}</span>
                        </a>
                    </div>

                    <button
                        onClick={() => setShowContact(true)}
                        className="w-full p-6 bg-white text-black font-black rounded-[2rem] flex items-center justify-center gap-4 uppercase text-xs tracking-widest hover:bg-teal-400 transition-all shadow-xl"
                    >
                        {current.links.contact} <Mail size={18} />
                    </button>

                    <a
                        href="https://www.swy.international/"
                        target="_blank"
                        className="flex items-center justify-center gap-3 py-3 px-6 rounded-full border border-teal-500/20 bg-teal-500/5 hover:bg-teal-500/10 transition-all group"
                    >
                        <Plane size={14} className="text-teal-500" />
                        <span className="text-[9px] font-bold text-teal-500/80 uppercase tracking-[0.2em]">{current.links.adventure}</span>
                    </a>
                </div>

                {/* Japanese Intro (Only shown in JP mode) */}
                {lang === 'jp' && (
                    <div className="content-block w-full max-w-xl bg-white/5 border border-white/5 backdrop-blur-2xl rounded-[3rem] p-10 mb-10 animate-in fade-in slide-in-from-bottom-5 duration-1000">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="h-px flex-1 bg-white/10"></div>
                            <Sparkles size={20} className="text-teal-400" />
                            <div className="h-px flex-1 bg-white/10"></div>
                        </div>
                        <div className="space-y-6 text-zinc-300 text-sm leading-relaxed font-light tracking-wide">
                            <p className="text-xl font-black text-white italic tracking-tighter mb-4">はじめまして。</p>
                            <p>
                                アセンシオ・サバテルと申します。私は「グローバルな戦略」と「地域の価値」を融合させるスペシャリストとして活動しています。
                            </p>
                            <p>
                                この度、日本政府が主催する**Ship for World Youth (SWY)**プログラムのスペイン代表として参加することになり、大変光栄に思っています。国際協力、持続可能な発展、そして次世代のイノベーションが私の情熱の源です。
                            </p>
                            <p>
                                日本という素晴らしい国で、新たな知見を得て、共に世界をより良くするためのパートナーシップを築けることを心から楽しみにしています。
                            </p>
                            <p className="pt-4 border-t border-white/5 font-bold text-teal-400 uppercase tracking-widest text-[10px]">
                                新しい冒険の始まり · 東京 2025
                            </p>
                        </div>
                    </div>
                )}

                {/* Footer */}
                <footer className="opacity-30 py-10 text-center">
                    <p className="text-[7px] font-black tracking-[1em] uppercase">
                        {lang === 'es' ? 'Global Vision · MMXXV' : 'グローバルビジョン · 2025'}
                    </p>
                </footer>
            </div>

            {/* Contact Modal */}
            <div className={`fixed inset-0 z-[100] flex items-center justify-center p-6 transition-all duration-700 ${showContact ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                <div className="absolute inset-0 bg-black/80 backdrop-blur-2xl" onClick={() => setShowContact(false)}></div>
                <div className="relative max-w-md w-full bg-[#080808] p-10 rounded-[4rem] border border-white/10 shadow-3xl">
                    <button
                        onClick={() => setShowContact(false)}
                        className="absolute top-8 right-8 text-zinc-600 hover:text-white uppercase text-[8px] font-black tracking-widest"
                    >
                        {lang === 'es' ? 'Cerrar' : '閉じる'}
                    </button>
                    <h3 className="text-xs font-black uppercase tracking-[0.3em] text-teal-400 mb-10">{current.form.title}</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input name="name" placeholder={current.form.name} required className="w-full bg-white/5 border border-white/5 rounded-2xl p-5 text-sm outline-none focus:border-teal-500/20" />
                        <input name="email" type="email" placeholder={current.form.email} required className="w-full bg-white/5 border border-white/5 rounded-2xl p-5 text-sm outline-none focus:border-teal-500/20" />
                        <textarea name="message" placeholder={current.form.msg} required rows={4} className="w-full bg-white/5 border border-white/5 rounded-2xl p-5 text-sm outline-none focus:border-teal-500/20 resize-none" />
                        <button type="submit" className="w-full bg-teal-500 text-black font-black py-5 rounded-2xl hover:brightness-110 shadow-lg shadow-teal-500/20 active:scale-[0.98]">
                            {status || current.form.send}
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
}
