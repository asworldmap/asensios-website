"use client";
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Linkedin, Instagram, Mail, Bug, Send } from 'lucide-react';

export default function Home() {
    const containerRef = useRef(null);
    const [status, setStatus] = useState('');

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to(".reveal", { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power4.out" });
            gsap.to(".bg-glow", { scale: 1.3, opacity: 0.6, duration: 5, repeat: -1, yoyo: true, ease: "sine.inOut" });
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

    return (
        <main ref={containerRef} className="min-h-screen bg-black text-white p-8 flex flex-col justify-between overflow-x-hidden">
            <div className="bg-glow fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] rounded-full blur-[120px] pointer-events-none opacity-20"
                style={{ background: 'radial-gradient(circle, #14b8a6 0%, transparent 70%)' }}></div>

            <header className="reveal opacity-0 -translate-y-5 z-10">
                <span className="text-2xl font-black tracking-tighter">ASENSIO<span className="text-teal-400">.</span></span>
            </header>

            <div className="grid lg:grid-cols-2 gap-12 items-center z-10 max-w-7xl mx-auto w-full">
                <section className="text-left">
                    <h1 className="text-[10vw] lg:text-[6vw] font-black leading-none tracking-tighter mb-4 reveal opacity-0">
                        MENTALIDAD<br />GLOBAL<span className="text-teal-400">.</span>
                    </h1>
                    <p className="text-2xl italic text-zinc-500 mb-8 reveal opacity-0">Acento local.</p>

                    <div className="flex gap-6 reveal opacity-0">
                        <a href="https://spider.asensios.com" target="_blank" className="hover:text-teal-400 transition-colors"><Bug size={32} /></a>
                        <a href="#" className="hover:text-teal-400 transition-colors"><Linkedin size={32} /></a>
                        <a href="#" className="hover:text-teal-400 transition-colors"><Instagram size={32} /></a>
                    </div>
                </section>

                {/* Formulario minimalista */}
                <section className="bg-zinc-900/50 p-8 rounded-2xl border border-zinc-800 reveal opacity-0">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <input name="name" placeholder="Nombre" required className="bg-transparent border-b border-zinc-700 p-2 focus:border-teal-400 outline-none transition-colors" />
                        <input name="email" type="email" placeholder="Email" required className="bg-transparent border-b border-zinc-700 p-2 focus:border-teal-400 outline-none transition-colors" />
                        <textarea name="message" placeholder="¿Cómo podemos colaborar?" required rows={3} className="bg-transparent border-b border-zinc-700 p-2 focus:border-teal-400 outline-none transition-colors resize-none" />
                        <button type="submit" className="bg-teal-500 hover:bg-teal-400 text-black font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-all active:scale-95">
                            {status || 'ENVIAR MENSAJE'} <Send size={18} />
                        </button>
                    </form>
                </section>
            </div>

            <footer className="text-center pt-8 reveal opacity-0">
                <p className="text-[10px] tracking-[0.5em] text-zinc-600 uppercase font-bold">© 2025 Asensio Sabater — Strategic Innovation</p>
            </footer>
        </main>
    );
}
