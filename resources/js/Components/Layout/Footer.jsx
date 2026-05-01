import { Link } from '@inertiajs/react';
import { IpadPro } from '@/Components/ui/ipad-pro';

export default function Footer() {
    return (
        <footer className="bg-[#0a0a0a] border-t border-white/5 relative overflow-hidden z-40">
            {/* Massive Background Watermark */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 overflow-hidden pointer-events-none flex justify-center translate-y-[35%] opacity-[0.02] w-full">
                <span className="font-display font-black text-[22vw] leading-none whitespace-nowrap text-white select-none tracking-tighter">
                    AK KREATIF
                </span>
            </div>

            <div className="container-custom py-16 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-6">
                    
                    {/* 1. Brand Info (Span 4) */}
                    <div className="md:col-span-4 flex flex-col gap-6 pr-4">
                        <Link href="/" className="font-display font-black text-3xl tracking-tight text-white hover:text-[#10b981] transition-colors inline-block w-fit">
                            AK Kreatif<span className="text-[#10b981]">.</span>
                        </Link>
                        <p className="font-body text-white/40 text-sm leading-relaxed max-w-sm">
                            Agensi digital yang merancang pengalaman, produk, dan identitas visual berkelas untuk membawa audiens Anda ke tingkat selanjutnya.
                        </p>
                    </div>

                    {/* 2. Navigation (Span 2) */}
                    <div className="md:col-span-2 flex flex-col gap-5">
                        <h4 className="font-mono text-[10px] text-white/30 uppercase tracking-widest">Eksplorasi</h4>
                        <ul className="flex flex-col gap-3 font-body text-sm font-medium text-white/60">
                            <li><Link href="/" className="hover:text-white hover:translate-x-1 transition-transform inline-block">Home</Link></li>
                            <li><Link href="/services" className="hover:text-white hover:translate-x-1 transition-transform inline-block">Layanan</Link></li>
                            <li><Link href="/portfolio" className="hover:text-white hover:translate-x-1 transition-transform inline-block">Portfolio</Link></li>
                            <li><Link href="/about" className="hover:text-white hover:translate-x-1 transition-transform inline-block">Tentang Kami</Link></li>
                        </ul>
                    </div>

                    {/* 3. Contact (Span 3) */}
                    <div className="md:col-span-3 flex flex-col gap-5">
                        <h4 className="font-mono text-[10px] text-white/30 uppercase tracking-widest">Kontak</h4>
                        <ul className="flex flex-col gap-3 font-body text-sm font-medium text-white/60">
                            <li>
                                <a href="mailto:hello@akkreatif.com" className="hover:text-white hover:translate-x-1 transition-transform inline-flex items-center gap-2 group">
                                    hello@akkreatif.com <span className="opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 text-[#10b981] transition-all">↗</span>
                                </a>
                            </li>
                            <li>
                                <a href="tel:+6285224302550" className="hover:text-white hover:translate-x-1 transition-transform inline-flex items-center gap-2 group">
                                    +62 852 2430 2550 <span className="opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 text-[#10b981] transition-all">↗</span>
                                </a>
                            </li>
                            <li className="text-white/30 pt-2 leading-relaxed text-xs font-mono">
                                Samarinda,<br/>Kalimantan Timur
                            </li>
                        </ul>
                    </div>

                    {/* 4. Social Mockup iPad (Span 3) */}
                    <div className="md:col-span-3 flex flex-col items-start md:items-end z-20 relative h-[180px] md:h-auto">
                        <h4 className="font-mono text-[10px] text-white/30 uppercase tracking-widest md:text-right w-full mb-4">Sosial Hub</h4>
                        
                        {/* Container that isolates the scaled iPad so it doesn't break layout */}
                        <div className="absolute top-10 md:top-8 right-auto left-0 md:left-auto md:-right-16 w-[550px] origin-top-left md:origin-top-right scale-[0.45] xl:scale-[0.5]">
                            <IpadPro className="group hover:-translate-y-4 hover:shadow-[0_40px_100px_rgba(16,185,129,0.2)] transition-all duration-700">
                                {/* iPad Screen Content */}
                                <div className="w-full h-full bg-[#0a0a0a] relative overflow-hidden flex flex-col items-center justify-center">
                                    {/* Wallpaper / Background Effect */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#10b981]/20 via-black to-blue-900/20" />
                                    
                                    <div className="relative z-10 w-full px-12 text-center mb-8">
                                        <h3 className="font-display text-white text-3xl font-black mb-2">Connect With Us</h3>
                                        <p className="font-body text-white/50 text-sm">Follow our creative journey</p>
                                    </div>

                                    {/* iPad Dock for Apps */}
                                    <div className="relative z-10 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-4 flex gap-6 shadow-2xl">
                                        {/* Instagram */}
                                        <a href="#" className="w-16 h-16 rounded-[1rem] bg-black/40 border border-white/10 flex items-center justify-center hover:bg-gradient-to-tr hover:from-yellow-500 hover:via-red-500 hover:to-fuchsia-500 hover:border-transparent transition-all duration-300 hover:scale-110 hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(236,72,153,0.4)] group/icon relative">
                                            <svg className="w-8 h-8 text-white/70 group-hover/icon:text-white transition-colors" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                                            </svg>
                                        </a>

                                        {/* YouTube */}
                                        <a href="#" className="w-16 h-16 rounded-[1rem] bg-black/40 border border-white/10 flex items-center justify-center hover:bg-[#FF0000] hover:border-transparent transition-all duration-300 hover:scale-110 hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(255,0,0,0.4)] group/icon relative">
                                            <svg className="w-8 h-8 text-white/70 group-hover/icon:text-white transition-colors" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                            </svg>
                                        </a>

                                        {/* TikTok */}
                                        <a href="#" className="w-16 h-16 rounded-[1rem] bg-black/40 border border-white/10 flex items-center justify-center hover:bg-black hover:border-white/30 transition-all duration-300 hover:scale-110 hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(255,255,255,0.1)] group/icon relative">
                                            <svg className="w-8 h-8 text-white/70 group-hover/icon:text-white transition-colors" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z"/>
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </IpadPro>
                        </div>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="mt-20 md:mt-16 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 font-mono text-[10px] text-white/30 uppercase tracking-widest relative z-30">
                    <span>&copy; {new Date().getFullYear()} AK Kreatif. Hak Cipta Dilindungi.</span>
                    <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
                        <span>All systems operational</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
