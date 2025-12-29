"use client";
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Linkedin, Instagram, Bug, Send, Globe, ChevronRight, Mail, ExternalLink } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
    const containerRef = useRef(null);
    const [status, setStatus] = useState('');
    const [showContact, setShowContact] = useState(false);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".link-item", {
                opacity: 0,
                y: 20,
                duration: 0.8,
                stagger: 0.1,
                ease: "power3.out",
                delay: 0.5
            });
            gsap.from(".profile-area", {
                scale: 0.8,
                opacity: 0,
                duration: 1.2,
                ease: "elastic.out(1, 0.5)"
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
            if (res.ok) setStatus('¡Enviado con éxito!');
            else setStatus('Error al enviar.');
        } catch (err) {
            setStatus('Error al enviar.');
        }
    };

    const links = [
        { name: "Data Spider Web", url: "https://spider.asensios.com", icon: <Bug size={20} />, color: "from-teal-500/20 to-emerald-500/20" },
        { name: "LinkedIn Professional", url: "https://linkedin.com/in/asensios", icon: <Linkedin size={20} />, color: "from-blue-600/20 to-indigo-600/20" },
        { name: "Instagram Personal", url: "https://instagram.com/asensios", icon: <Instagram size={20} />, color: "from-pink-500/20 to-orange-500/20" },
        { name: "Global Consulting", url: "#", icon: <Globe size={20} />, color: "from-zinc-800 to-zinc-900" },
    ];

    return (
        <main ref={containerRef} className="min-h-screen bg-[#080808] text-white flex flex-col items-center justify-center p-6 selection:bg-teal-500/30">
            {/* Background Effects */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-teal-500/10 blur-[120px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/5 blur-[120px]"></div>
            </div>

            <div className="max-w-md w-full relative z-10 flex flex-col items-center">
                {/* Profile Area */}
                <div className="profile-area mb-8 flex flex-col items-center text-center">
                    <div className="relative group mb-6">
                        <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                        <div className="relative w-32 h-32 rounded-full border-2 border-white/10 overflow-hidden bg-zinc-900">
                            <Image
                                src="/perfil1.png"
                                alt="Asensio Sabater"
                                fill
                                className="object-cover"
                                onError={(e) => {
                                    // Fallback if image not found
                                    const target = e.target as HTMLImageElement;
                                    target.src = "https://ui-avatars.com/api/?name=Asensio+Sabater&background=14b8a6&color=fff&size=128";
                                }}
                            />
                        </div>
                    </div>
                    <h1 className="text-3xl font-black tracking-tighter mb-1 uppercase">Asensio Sabater</h1>
                    <p className="text-zinc-500 text-sm font-medium tracking-[0.2em] uppercase">Strategic Innovation</p>
                </div>

                {/* Links List */}
                <div className="w-full space-y-4 mb-12">
                    {links.map((link, i) => (
                        <a
                            key={i}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`link-item group block w-full p-4 rounded-2xl bg-gradient-to-br ${link.color} border border-white/5 hover:border-white/20 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]`}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 rounded-lg bg-white/5 text-teal-400 group-hover:scale-110 transition-transform">
                                        {link.icon}
                                    </div>
                                    <span className="font-bold tracking-tight">{link.name}</span>
                                </div>
                                <ChevronRight size={18} className="text-zinc-600 group-hover:text-white group-hover:translate-x-1 transition-all" />
                            </div>
                        </a>
                    ))}

                    {/* Contact Button */}
                    <button
                        onClick={() => setShowContact(!showContact)}
                        className="link-item group w-full p-4 rounded-2xl bg-white text-black font-bold hover:bg-teal-400 transition-all duration-300 flex items-center justify-between shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                    >
                        <div className="flex items-center gap-4">
                            <div className="p-2 rounded-lg bg-black/5">
                                <Mail size={20} />
                            </div>
                            <span>Contacto Directo</span>
                        </div>
                        <Send size={18} className={`transition-transform duration-500 ${showContact ? 'rotate-90' : ''}`} />
                    </button>
                </div>

                {/* Dynamic Contact Form */}
                <div className={`w-full transition-all duration-500 overflow-hidden ${showContact ? 'max-h-[500px] opacity-100 mb-12' : 'max-h-0 opacity-0'}`}>
                    <div className="bg-zinc-900/50 p-6 rounded-3xl border border-white/5 backdrop-blur-xl">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input name="name" placeholder="Nombre" required className="w-full bg-white/5 border border-white/10 rounded-xl p-3 outline-none focus:border-teal-500 transition-colors" />
                            <input name="email" type="email" placeholder="Email" required className="w-full bg-white/5 border border-white/10 rounded-xl p-3 outline-none focus:border-teal-500 transition-colors" />
                            <textarea name="message" placeholder="¿En qué puedo ayudarte?" required rows={3} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 outline-none focus:border-teal-500 transition-colors resize-none" />
                            <button type="submit" className="w-full bg-teal-500 text-black font-bold py-3 rounded-xl hover:bg-teal-400 transition-colors flex items-center justify-center gap-2">
                                {status || 'ENVIAR MENSAJE'} <Send size={16} />
                            </button>
                        </form>
                    </div>
                </div>

                {/* Footer */}
                <footer className="text-center">
                    <p className="text-[10px] tracking-[0.4em] text-zinc-600 font-bold uppercase">© 2025 Asensio Sabater</p>
                </footer>
            </div>
        </main>
    );
}
