"use client";
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Linkedin, Instagram, Send, Globe, ChevronRight, Mail, Briefcase, Plane, Compass, Zap, Heart, Sparkles, MapPin, MousePointer2 } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [status, setStatus] = useState('');
    const [showContact, setShowContact] = useState(false);
    const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
    const [lang, setLang] = useState<'es' | 'jp'>('es');

    // Translation Dictionary
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
            // 1. Orbital Entrance
            gsap.set(".skill-sphere", {
                x: () => (Math.random() - 0.5) * window.innerWidth,
                y: () => (Math.random() - 0.5) * window.innerHeight,
                scale: 0,
                opacity: 0
            });

            gsap.to(".skill-sphere", {
                scale: 1,
                opacity: 1,
                duration: 1.8,
                x: (i) => Math.cos((i * 2 * Math.PI) / 5) * 140,
                y: (i) => Math.sin((i * 2 * Math.PI) / 5) * 140,
                stagger: 0.05,
                ease: "power4.inOut"
            });

            // 2. Continuous floating float
            gsap.to(".skill-sphere", {
                y: "+=15",
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                stagger: { each: 0.2, from: "random" }
            });

        }, containerRef);

        return () => ctx.revert();
    }, [lang]);

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        gsap.to(".skill-sphere", {
            x: (i) => {
                const baseDirX = Math.cos((i * 2 * Math.PI) / 5) * 140;
                const mouseX = (clientX - centerX) * 0.03;
                return baseDirX + mouseX;
            },
            y: (i) => {
                const baseDirY = Math.sin((i * 2 * Math.PI) / 5) * 140;
                const mouseY = (clientY - centerY) * 0.03;
                return baseDirY + mouseY;
            },
            duration: 1,
            ease: "power2.out"
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
                setTimeout(() => {
                    setShowContact(false);
                    setStatus('');
                }, 2000);
            }
        } catch (err) {
            setStatus('Error');
        }
    };

    return (
        <main
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="min-h-screen bg-[#030303] text-white flex flex-col items-center justify-start p-6 overflow-x-hidden selection:bg-teal-500/30"
        >
            {/* Background Layer */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] rounded-full bg-teal-500/[0.03] blur-[160px]"></div>
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04]"></div>
            </div>

            {/* SINGLE Language Toggle - Clean & Professional */}
            <button
                onClick={() => setLang(lang === 'es' ? 'jp' : 'es')}
                className="fixed top-6 right-6 z-[100] flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-2xl px-5 py-2.5 rounded-2xl transition-all shadow-xl active:scale-95 group"
            >
                <span className="text-lg transition-transform group-hover:scale-110">
                    {lang === 'es' ? '🇯🇵' : '🇪🇸'}
                </span>
                <span className="text-[10px] font-black tracking-[0.2em] text-white/50 group-hover:text-teal-400 transition-colors uppercase">
                    {lang === 'es' ? 'JA' : 'ES'}
                </span>
            </button>

            {/* Experience Stage */}
            <div className="relative w-full max-w-lg mt-12 flex flex-col items-center min-h-[140vh]">

                {/* Orbital Nucleus */}
                <div className="relative w-full h-[400px] flex items-center justify-center mb-8">
                    <div className="relative z-20 w-36 h-36 md:w-44 md:h-44 rounded-full border border-white/10 p-1.5 bg-zinc-950 shadow-3xl overflow-hidden group">
                        <Image
                            src="/perfil1.jpg"
                            alt="Asensio Sabater"
                            fill
                            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                            priority
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = "https://ui-avatars.com/api/?name=Asensio+Sabater&background=0a0a0a&color=fff&size=256&bold=true";
                            }}
                        />
                    </div>

                    {current.skills.map((skill, i) => (
                        <div
                            key={i}
                            onMouseEnter={() => setHoveredSkill(skill)}
                            onMouseLeave={() => setHoveredSkill(null)}
                            className="skill-sphere absolute z-30 group"
                        >
                            <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${skillIcons[i].color} p-[1.8px] shadow-2xl transition-all duration-700 group-hover:scale-125 group-hover:rotate-[360deg]`}>
                                <div className="w-full h-full rounded-full bg-[#030303] flex items-center justify-center text-white/40 group-hover:text-white transition-colors">
                                    {skillIcons[i].icon}
                                </div>
                            </div>
                            <div className={`absolute -bottom-16 left-1/2 -translate-x-1/2 whitespace-nowrap px-4 py-1.5 bg-black/95 backdrop-blur-xl border border-white/10 rounded-full text-[8px] font-black tracking-widest uppercase transition-all duration-500 ${hoveredSkill === skill ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-90'}`}>
                                {skill}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Identity Block */}
                <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-5 duration-1000">
                    <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter mb-4 uppercase font-playfair bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-700">
                        {current.name}
                    </h1>
                    <div className="flex items-center justify-center gap-3">
                        <div className="h-[1px] w-6 bg-teal-500/40"></div>
                        <p className="text-[10px] md:text-xs font-black tracking-[0.6em] text-teal-400 uppercase">
                            {current.tagline}
                        </p>
                        <div className="h-[1px] w-6 bg-teal-500/40"></div>
                    </div>
                </div>

                {/* Action Grid */}
                <div className="w-full max-w-[360px] space-y-4 mb-16">
                    <div className="grid grid-cols-2 gap-3">
                        <a href="https://www.linkedin.com/in/asensio-sabater-lopez-guillen/" target="_blank" className="flex flex-col items-center justify-center gap-2 p-5 bg-zinc-900/40 border border-white/5 rounded-[2rem] hover:bg-zinc-800/60 transition-all group overflow-hidden relative">
                            <Linkedin size={22} className="text-zinc-600 group-hover:text-blue-400 transition-colors relative z-10" />
                            <span className="text-[8px] font-black uppercase tracking-[0.2em] relative z-10 text-zinc-500 group-hover:text-white transition-colors">{current.links.linkedin}</span>
                            <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </a>
                        <a href="https://instagram.com/asensiosabater" target="_blank" className="flex flex-col items-center justify-center gap-2 p-5 bg-zinc-900/40 border border-white/5 rounded-[2rem] hover:bg-zinc-800/60 transition-all group overflow-hidden relative">
                            <Instagram size={22} className="text-zinc-600 group-hover:text-pink-400 transition-colors relative z-10" />
                            <span className="text-[8px] font-black uppercase tracking-[0.2em] relative z-10 text-zinc-500 group-hover:text-white transition-colors">{current.links.instagram}</span>
                            <div className="absolute inset-0 bg-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </a>
                    </div>

                    <button
                        onClick={() => setShowContact(true)}
                        className="w-full p-6 bg-white text-black font-black rounded-full flex items-center justify-center gap-4 uppercase text-xs tracking-[0.2em] hover:bg-teal-400 transition-all shadow-[0_20px_40px_rgba(0,0,0,0.4)] hover:shadow-teal-500/20 active:scale-95"
                    >
                        {current.links.contact} <Mail size={20} className="animate-pulse" />
                    </button>

                    <a
                        href="https://www.swy.international/"
                        target="_blank"
                        className="flex items-center justify-center gap-3 py-4 px-8 rounded-full border border-teal-500/20 bg-teal-500/5 hover:bg-teal-500/10 transition-all group"
                    >
                        <Plane size={14} className="text-teal-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        <span className="text-[10px] font-black text-teal-400/90 uppercase tracking-[0.3em]">{current.links.adventure}</span>
                    </a>
                </div>

                {/* Japanese Cover Letter - HIGH-END REVEAL */}
                {lang === 'jp' && (
                    <div className="w-full max-w-2xl bg-white/[0.03] border border-white/10 backdrop-blur-[60px] rounded-[4rem] p-12 md:p-16 mb-20 shadow-3xl animate-in zoom-in-95 duration-1000 relative">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#030303] p-4 rounded-full border border-white/10">
                            <Sparkles size={24} className="text-teal-400" />
                        </div>

                        <div className="space-y-8 text-zinc-300 text-base leading-[2] font-medium tracking-wider text-justify">
                            <p className="text-4xl font-black text-white italic tracking-tighter mb-10 text-center">はじめまして。</p>
                            <p>
                                アセンシオ・サバテルと申します。私は「グローバルな戦略」と「地域の価値」を融合させるスペシャリストとして活動しています。
                            </p>
                            <p>
                                この度、日本政府が主催する<span className="text-teal-400 font-black">Ship for World Youth (SWY)</span>プログラムに、スペイン代表として参加することになりました。国際協力、持続可能な発展、そして次世代のイノベーションが私の情熱の源です。
                            </p>
                            <p>
                                日本という素晴らしい国で、新たな知見を得て、共に世界をより良くするためのパートナーシップを築けることを心から楽しみにしています。
                            </p>
                            <div className="pt-10 mt-10 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
                                <div className="flex items-center gap-4">
                                    <div className="h-10 w-10 rounded-full border border-white/20 flex items-center justify-center bg-black">
                                        <MapPin size={16} className="text-teal-500" />
                                    </div>
                                    <span className="text-[10px] font-black tracking-[0.5em] text-white/40 uppercase">東京 2025</span>
                                </div>
                                <span className="text-[10px] font-black tracking-[0.5em] text-teal-500 uppercase">新しい冒険の始まり</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Hint for Jap version */}
                {lang === 'jp' && !showContact && (
                    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-20 hidden md:block">
                        <MousePointer2 size={24} />
                    </div>
                )}

                {/* Minimal Footer */}
                <footer className="footer-links opacity-20 py-10 flex flex-col items-center gap-4">
                    <div className="h-[1px] w-24 bg-zinc-800"></div>
                    <p className="text-[8px] font-black tracking-[1em] uppercase">
                        {lang === 'es' ? 'Global Excellence · MMXXV' : 'グローバルな卓越性 · 2025'}
                    </p>
                </footer>
            </div>

            {/* Global Contact Portal */}
            <div className={`fixed inset-0 z-[110] flex items-center justify-center p-6 transition-all duration-700 ${showContact ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                <div className="absolute inset-0 bg-black/90 backdrop-blur-3xl" onClick={() => setShowContact(false)}></div>
                <div className="relative max-w-md w-full bg-zinc-950 p-12 rounded-[4rem] border border-white/5 shadow-3xl">
                    <button
                        onClick={() => setShowContact(false)}
                        className="absolute top-10 right-10 text-zinc-500 hover:text-white transition-colors"
                        title="Cerrar"
                    >
                        <Zap size={20} className={showContact ? 'animate-pulse text-teal-500' : ''} />
                    </button>

                    <h3 className="text-xs font-black uppercase tracking-[0.4em] text-teal-400 mb-12 flex items-center gap-4">
                        <Send size={16} /> {current.form.title}
                    </h3>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <input name="name" placeholder={current.form.name} required className="w-full bg-white/5 border border-white/5 rounded-3xl p-5 text-sm outline-none focus:border-teal-500/30 transition-all text-white" />
                        <input name="email" type="email" placeholder={current.form.email} required className="w-full bg-white/5 border border-white/5 rounded-3xl p-5 text-sm outline-none focus:border-teal-500/30 transition-all text-white" />
                        <textarea name="message" placeholder={current.form.msg} required rows={4} className="w-full bg-white/5 border border-white/5 rounded-3xl p-5 text-sm outline-none focus:border-teal-500/30 transition-all text-white resize-none" />
                        <button type="submit" className="w-full bg-teal-500 text-black font-black py-5 rounded-3xl hover:brightness-110 shadow-xl shadow-teal-500/10 active:scale-95 transition-all text-sm tracking-widest">
                            {status || current.form.send}
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
}
