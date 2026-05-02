import SEOHead from '@/Components/SEOHead';
import MainLayout from '@/Layouts/MainLayout';

const WA_NUMBER = '6285224302550';
const WA_MSG = encodeURIComponent('Halo AK Kreatif! Saya ingin berkonsultasi mengenai layanan Anda. 🙏');
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${WA_MSG}`;

const INFO = [
    {
        label: 'WhatsApp',
        value: '+62 852-2430-2550',
        href: WA_LINK,
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.524 5.845L.057 23.852l6.174-1.442A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.933a9.921 9.921 0 0 1-5.352-1.564l-.383-.228-3.967.927.967-3.864-.251-.396A9.894 9.894 0 0 1 2.067 12C2.067 6.52 6.52 2.067 12 2.067c5.48 0 9.933 4.453 9.933 9.933 0 5.481-4.453 9.933-9.933 9.933z"/>
            </svg>
        ),
    },
    {
        label: 'Lokasi',
        value: 'Samarinda, Kalimantan Timur',
        href: 'https://maps.google.com/?q=Samarinda',
        icon: (
            <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"/>
            </svg>
        ),
    },
    {
        label: 'Jam Respons',
        value: 'Dalam 1×24 jam kerja',
        href: null,
        icon: (
            <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
            </svg>
        ),
    },
];

function PhoneMockup() {
    return (
        <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat WhatsApp AK Kreatif"
            className="group relative block mx-auto"
            style={{ width: 260 }}
        >
            {/* Glow ring */}
            <div className="absolute inset-0 rounded-[44px] bg-[#10b981]/20 blur-2xl scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            {/* Phone shell */}
            <div className="relative w-[260px] h-[520px] rounded-[44px] bg-[#141414] border-[3px] border-[#2a2a2a] shadow-[0_40px_80px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,255,255,0.04)] group-hover:scale-[1.03] group-hover:shadow-[0_50px_100px_rgba(16,185,129,0.2)] transition-all duration-500">

                {/* Dynamic Island */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-black rounded-full z-20 flex items-center justify-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-[#1a1a1a] ring-1 ring-white/10" />
                    <div className="w-5 h-1.5 rounded-full bg-[#1a1a1a]" />
                </div>

                {/* Screen */}
                <div className="absolute inset-1.5 rounded-[38px] overflow-hidden bg-[#0a0a0a] flex flex-col">

                    {/* Status bar */}
                    <div className="flex items-center justify-between px-5 pt-10 pb-1">
                        <span className="text-white text-[10px] font-semibold">9:41</span>
                        <div className="flex items-center gap-1">
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M1.5 8.5C5.5 4.5 10.5 2.5 12 2.5s6.5 2 10.5 6"/><path d="M5 12c2-2 4.5-3.5 7-3.5s5 1.5 7 3.5"/><path d="M8.5 15.5c1-1 2.5-2 3.5-2s2.5 1 3.5 2"/><circle cx="12" cy="19" r="1"/></svg>
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24"><rect x="2" y="7" width="16" height="11" rx="2"/><path d="M22 11v3" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round"/></svg>
                        </div>
                    </div>

                    {/* WA Header */}
                    <div className="bg-[#075E54] px-4 py-2.5 flex items-center gap-3">
                        <button className="text-white/80">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5"/></svg>
                        </button>
                        <div className="w-8 h-8 rounded-full bg-[#10b981] flex items-center justify-center text-white text-xs font-black flex-shrink-0">AK</div>
                        <div className="flex-1 min-w-0">
                            <p className="text-white font-bold text-[12px] leading-tight">AK Kreatif</p>
                            <p className="text-green-300 text-[9px]">online</p>
                        </div>
                        <div className="flex gap-3 text-white/70">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 6Z"/></svg>
                        </div>
                    </div>

                    {/* Chat area */}
                    <div className="flex-1 bg-[#0d1117] p-3 space-y-2.5 relative overflow-hidden"
                        style={{ backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(16,185,129,0.04) 0%, transparent 60%)' }}>

                        {/* Incoming */}
                        <div className="flex justify-start">
                            <div className="bg-[#1e2d29] text-white/90 text-[10px] px-3 py-2 rounded-[10px_10px_10px_2px] max-w-[78%] leading-relaxed shadow">
                                Halo! 👋 Selamat datang di<br />
                                <strong>AK Kreatif</strong>. Ada yang bisa<br />
                                kami bantu?
                                <div className="text-white/30 text-[8px] text-right mt-1">09:00 ✓✓</div>
                            </div>
                        </div>

                        {/* Outgoing */}
                        <div className="flex justify-end">
                            <div className="bg-[#054740] text-white/90 text-[10px] px-3 py-2 rounded-[10px_10px_2px_10px] max-w-[78%] leading-relaxed shadow">
                                Halo! Saya ingin konsultasi<br />
                                proyek website. 🙏
                                <div className="text-white/30 text-[8px] text-right mt-1">09:01 ✓✓</div>
                            </div>
                        </div>

                        {/* Incoming reply */}
                        <div className="flex justify-start">
                            <div className="bg-[#1e2d29] text-white/90 text-[10px] px-3 py-2 rounded-[10px_10px_10px_2px] max-w-[78%] leading-relaxed shadow">
                                Siap! Tim kami akan segera<br />
                                merespons. 🚀
                                <div className="text-white/30 text-[8px] text-right mt-1">09:01 ✓✓</div>
                            </div>
                        </div>

                        {/* Typing */}
                        <div className="flex justify-start">
                            <div className="bg-[#1e2d29] px-3 py-2 rounded-full flex gap-1 items-center">
                                <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce [animation-delay:0ms]" />
                                <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce [animation-delay:150ms]" />
                                <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce [animation-delay:300ms]" />
                            </div>
                        </div>

                        <div className="absolute bottom-0 inset-x-0 h-8 bg-gradient-to-t from-[#0d1117] to-transparent pointer-events-none" />
                    </div>

                    {/* Input bar */}
                    <div className="bg-[#0d1117] border-t border-white/5 px-3 py-2 flex items-center gap-2">
                        <div className="flex-1 bg-[#1e2d29] rounded-full px-3 py-1.5 text-white/20 text-[10px]">Ketik pesan…</div>
                        <div className="w-7 h-7 rounded-full bg-[#10b981] flex items-center justify-center flex-shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" className="w-3.5 h-3.5"><path d="M2.01 21 23 12 2.01 3 2 10l15 2-15 2z"/></svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA pill */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-[#10b981] text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-lg shadow-green-500/40 group-hover:shadow-green-500/60 group-hover:scale-105 transition-all duration-300 whitespace-nowrap">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 flex-shrink-0">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.524 5.845L.057 23.852l6.174-1.442A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.933a9.921 9.921 0 0 1-5.352-1.564l-.383-.228-3.967.927.967-3.864-.251-.396A9.894 9.894 0 0 1 2.067 12C2.067 6.52 6.52 2.067 12 2.067c5.48 0 9.933 4.453 9.933 9.933 0 5.481-4.453 9.933-9.933 9.933z"/>
                </svg>
                Tap untuk Chat WhatsApp
            </div>
        </a>
    );
}

export default function Contact() {
    return (
        <MainLayout>
            <SEOHead
                title="Hubungi Kami"
                description="Hubungi AK Kreatif langsung via WhatsApp. Kami siap membantu kebutuhan website, desain grafis, foto & video, dan social media Anda."
                canonical="/contact"
                jsonLd={{
                    '@context': 'https://schema.org',
                    '@type': 'ContactPage',
                    name: 'Kontak AK Kreatif',
                    url: 'https://akkreatif.my.id/contact',
                }}
            />

            <main className="relative min-h-screen bg-[#060809] overflow-hidden flex flex-col">

                {/* ── Background FX ── */}
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-[#10b981]/8 blur-[120px]" />
                    <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-[#10b981]/5 blur-[100px]" />
                    <div className="absolute inset-0 opacity-[0.025]"
                        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
                </div>

                <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pt-32 pb-24">

                    {/* ── Badge ── */}
                    <span className="inline-flex items-center gap-2 text-[#10b981] text-xs font-mono uppercase tracking-[0.35em] mb-8">
                        <span className="w-6 h-px bg-[#10b981]" />
                        Hubungi Kami
                        <span className="w-6 h-px bg-[#10b981]" />
                    </span>

                    {/* ── Headline ── */}
                    <h1 className="font-display text-center font-black text-white leading-none tracking-tight mb-4"
                        style={{ fontSize: 'clamp(2.8rem, 8vw, 7rem)' }}>
                        Mari<br />
                        <span style={{ WebkitTextStroke: '2px #10b981', color: 'transparent' }}>
                            Berkolaborasi.
                        </span>
                    </h1>

                    <p className="font-body text-white/40 text-center text-base md:text-lg max-w-md leading-relaxed mb-16">
                        Punya proyek atau ide? Klik mockup HP di bawah dan langsung chat bersama tim AK Kreatif via WhatsApp.
                    </p>

                    {/* ── Phone Mockup ── */}
                    <div className="mb-20">
                        <PhoneMockup />
                    </div>

                    {/* ── Divider ── */}
                    <div className="flex items-center gap-4 w-full max-w-xs mb-10">
                        <div className="flex-1 h-px bg-white/10" />
                        <span className="text-white/20 text-xs font-mono uppercase tracking-widest">Info</span>
                        <div className="flex-1 h-px bg-white/10" />
                    </div>

                    {/* ── Info Cards ── */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl">
                        {INFO.map((item) => {
                            const Wrapper = item.href ? 'a' : 'div';
                            const props = item.href
                                ? { href: item.href, target: '_blank', rel: 'noopener noreferrer', className: 'group flex items-center gap-4 p-4 rounded-2xl bg-white/[0.04] border border-white/8 hover:border-[#10b981]/40 hover:bg-[#10b981]/5 transition-all duration-300 cursor-pointer' }
                                : { className: 'flex items-center gap-4 p-4 rounded-2xl bg-white/[0.04] border border-white/8' };
                            return (
                                <Wrapper key={item.label} {...props}>
                                    <div className="w-10 h-10 rounded-xl bg-[#10b981]/10 flex items-center justify-center text-[#10b981] flex-shrink-0 group-hover:bg-[#10b981]/20 transition-colors duration-300">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <p className="text-white/30 text-[9px] uppercase tracking-widest font-mono">{item.label}</p>
                                        <p className="text-white/80 text-sm font-body mt-0.5">{item.value}</p>
                                    </div>
                                </Wrapper>
                            );
                        })}
                    </div>

                    {/* ── Bottom CTA ── */}
                    <div className="mt-12 text-center">
                        <a
                            href={WA_LINK}
                            target="_blank"
                            rel="noopener noreferrer"
                            id="contact-wa-btn"
                            className="inline-flex items-center gap-3 bg-[#10b981] hover:bg-[#059669] text-white font-body font-bold text-sm px-8 py-4 rounded-full shadow-lg shadow-[#10b981]/30 hover:shadow-[#10b981]/50 hover:-translate-y-1 transition-all duration-300"
                        >
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.524 5.845L.057 23.852l6.174-1.442A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.933a9.921 9.921 0 0 1-5.352-1.564l-.383-.228-3.967.927.967-3.864-.251-.396A9.894 9.894 0 0 1 2.067 12C2.067 6.52 6.52 2.067 12 2.067c5.48 0 9.933 4.453 9.933 9.933 0 5.481-4.453 9.933-9.933 9.933z"/>
                            </svg>
                            Chat WhatsApp Sekarang
                        </a>
                        <p className="text-white/20 text-xs font-body mt-4">Respons dalam 1×24 jam · Gratis Konsultasi</p>
                    </div>
                </div>
            </main>
        </MainLayout>
    );
}
