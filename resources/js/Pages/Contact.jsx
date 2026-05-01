import { useState } from 'react';
import SEOHead from '@/Components/SEOHead';
import MainLayout from '@/Layouts/MainLayout';
import { useIntersection } from '@/hooks/useIntersection';
import { cn } from '@/lib/utils';

const WA_NUMBER = '6285224302550'; // Nomor WA AK Kreatif
const WA_DEFAULT_MSG = encodeURIComponent('Halo AK Kreatif! Saya ingin berkonsultasi mengenai layanan Anda.');

const SERVICE_OPTIONS = [
    'Website & Aplikasi',
    'Desain Grafis',
    'Social Media Management',
    'Foto & Video Event',
    'Usaha Makanan',
    'Lainnya',
];

const INITIAL_FORM = { name: '', email: '', phone: '', service: '', message: '' };

// ─── WA PHONE MOCKUP ────────────────────────────────────────────────────────
function WhatsAppMockup({ form }) {
    const buildWaLink = () => {
        const msg = form.name
            ? encodeURIComponent(
                `Halo AK Kreatif! Saya *${form.name}*${form.service ? `, tertarik dengan layanan *${form.service}*` : ''}. ${form.message || 'Boleh saya konsultasi?'}`
            )
            : WA_DEFAULT_MSG;
        return `https://wa.me/${WA_NUMBER}?text=${msg}`;
    };

    return (
        <a
            href={buildWaLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="group block relative cursor-pointer"
            aria-label="Hubungi via WhatsApp"
        >
            {/* Phone shell */}
            <div className="relative mx-auto w-[280px] h-[560px] rounded-[44px] bg-[#1a1a1a] border-4 border-[#2a2a2a] shadow-[0_40px_100px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.05)] group-hover:scale-[1.02] group-hover:shadow-[0_40px_100px_rgba(16,185,129,0.2)] transition-all duration-500">
                {/* Notch */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-full z-20" />
                {/* Screen */}
                <div className="absolute inset-2 rounded-[36px] overflow-hidden bg-[#0a0a0a]">
                    {/* WA Header */}
                    <div className="bg-[#075E54] pt-10 pb-3 px-4 flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#10b981] flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">AK</div>
                        <div>
                            <p className="text-white font-bold text-sm leading-tight">AK Kreatif</p>
                            <p className="text-green-200 text-[10px]">Online</p>
                        </div>
                        <div className="ml-auto flex gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="white" className="w-4 h-4 opacity-80"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 6Z" /></svg>
                        </div>
                    </div>
                    {/* Chat area */}
                    <div className="flex-1 bg-[#0d1117] p-3 space-y-3 h-[360px] overflow-hidden relative"
                        style={{ backgroundImage: "radial-gradient(circle at 20% 80%, rgba(16,185,129,0.05) 0%, transparent 50%)" }}>
                        {/* Incoming bubble */}
                        <div className="flex justify-start">
                            <div className="bg-[#1e2d29] text-white/90 text-[11px] px-3 py-2 rounded-[12px_12px_12px_2px] max-w-[75%] leading-relaxed shadow">
                                Halo! 👋 Selamat datang di AK Kreatif.<br />Ada yang bisa kami bantu?
                                <div className="text-white/30 text-[9px] text-right mt-1">09:00 ✓✓</div>
                            </div>
                        </div>
                        {/* Outgoing bubble — dinamis dari form */}
                        <div className="flex justify-end">
                            <div className="bg-[#054740] text-white/90 text-[11px] px-3 py-2 rounded-[12px_12px_2px_12px] max-w-[75%] leading-relaxed shadow">
                                {form.name
                                    ? `Halo! Saya ${form.name}${form.service ? `, tertarik dengan ${form.service}` : ''}. 🙏`
                                    : 'Halo! Saya ingin konsultasi proyek...'}
                                <div className="text-white/30 text-[9px] text-right mt-1">09:01 ✓✓</div>
                            </div>
                        </div>
                        {/* Incoming reply */}
                        <div className="flex justify-start">
                            <div className="bg-[#1e2d29] text-white/90 text-[11px] px-3 py-2 rounded-[12px_12px_12px_2px] max-w-[75%] leading-relaxed shadow">
                                Siap! Tim kami akan segera merespons dalam 1×24 jam. 🚀
                                <div className="text-white/30 text-[9px] text-right mt-1">09:01 ✓✓</div>
                            </div>
                        </div>
                        {/* Typing indicator */}
                        <div className="flex justify-start">
                            <div className="bg-[#1e2d29] px-3 py-2 rounded-full flex gap-1 items-center">
                                <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce [animation-delay:0ms]" />
                                <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce [animation-delay:150ms]" />
                                <span className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce [animation-delay:300ms]" />
                            </div>
                        </div>
                        {/* Fade out bottom */}
                        <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-[#0d1117] to-transparent pointer-events-none" />
                    </div>
                    {/* Input bar */}
                    <div className="absolute bottom-0 inset-x-0 bg-[#0d1117] border-t border-white/5 px-3 py-2 flex items-center gap-2">
                        <div className="flex-1 bg-[#1e2d29] rounded-full px-3 py-1.5 text-white/30 text-[11px]">
                            Ketik pesan…
                        </div>
                        <div className="w-8 h-8 rounded-full bg-[#10b981] flex items-center justify-center flex-shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" className="w-4 h-4"><path d="M2.01 21 23 12 2.01 3 2 10l15 2-15 2z"/></svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Pill */}
            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-[#10b981] text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-lg shadow-green-500/30 group-hover:shadow-green-500/50 group-hover:scale-105 transition-all duration-300 whitespace-nowrap">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.553 4.116 1.524 5.845L.057 23.852l6.174-1.442A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.933a9.921 9.921 0 0 1-5.352-1.564l-.383-.228-3.967.927.967-3.864-.251-.396A9.894 9.894 0 0 1 2.067 12C2.067 6.52 6.52 2.067 12 2.067c5.48 0 9.933 4.453 9.933 9.933 0 5.481-4.453 9.933-9.933 9.933z"/>
                </svg>
                Tap untuk Chat WhatsApp
            </div>
        </a>
    );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function Contact() {
    const [form, setForm] = useState(INITIAL_FORM);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [heroRef, heroVisible] = useIntersection();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const validate = () => {
        const e = {};
        if (!form.name.trim()) e.name = 'Nama wajib diisi.';
        if (!form.email.trim()) e.email = 'Email wajib diisi.';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Format email tidak valid.';
        if (!form.message.trim()) e.message = 'Pesan wajib diisi.';
        return e;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length) { setErrors(errs); return; }
        setLoading(true);
        try {
            const msg = `Halo AK Kreatif! Saya *${form.name}*${form.service ? `, tertarik dengan layanan *${form.service}*` : ''}.
${form.phone ? `\nNo HP/WA: ${form.phone}` : ''}
Email: ${form.email}

Pesan:
${form.message}`;

            window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
            setSuccess(true);
            setForm(INITIAL_FORM);
        } catch {
            setErrors({ submit: 'Terjadi kesalahan. Coba lagi.' });
        } finally {
            setLoading(false);
        }
    };

    const inputClass = "w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3.5 font-body text-white placeholder:text-white/30 focus:outline-none focus:border-[#10b981]/60 focus:bg-white/8 transition-all duration-300 text-sm";

    return (
        <MainLayout>
            <SEOHead
                title="Hubungi Kami"
                description="Hubungi AK Kreatif untuk mendiskusikan kebutuhan digital bisnis Anda. Kami siap membantu pembuatan website, desain grafis, dan manajemen media sosial."
                canonical="/contact"
                jsonLd={{
                    '@context': 'https://schema.org',
                    '@type': 'ContactPage',
                    name: 'Kontak AK Kreatif',
                    description: 'Halaman kontak AK Kreatif Digital Agency',
                    url: 'https://akkreatif.my.id/contact',
                }}
            />

            {/* ── HERO ── */}
            <section className="relative min-h-[55vh] flex items-end pb-16 pt-40 overflow-hidden bg-[#060809]">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(16,185,129,0.12),transparent_60%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(16,185,129,0.06),transparent_50%)]" />
                {/* Grid lines */}
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

                <div
                    ref={heroRef}
                    className={cn(
                        'max-w-7xl mx-auto px-6 w-full transition-all duration-1000',
                        heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    )}
                >
                    <span className="inline-flex items-center gap-3 text-[#10b981] text-xs font-mono uppercase tracking-[0.4em] mb-6">
                        <span className="w-8 h-px bg-[#10b981]" /> Hubungi Kami
                    </span>
                    <h1 className="font-display text-[clamp(3.5rem,9vw,8rem)] font-black text-white leading-none tracking-tight">
                        Mari<br />
                        <span style={{ WebkitTextStroke: '2px #10b981', color: 'transparent' }}>Berkolaborasi.</span>
                    </h1>
                    <p className="font-body text-white/40 text-lg mt-6 max-w-lg leading-relaxed">
                        Punya proyek atau ide? Ceritakan kepada kami. Tim AK Kreatif siap merespons dalam <strong className="text-white/70">1×24 jam</strong>.
                    </p>
                </div>
            </section>

            {/* ── MAIN CONTENT ── */}
            <section className="bg-[#060809] py-20 md:py-28">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-[1fr_480px] gap-16 xl:gap-24 items-start">

                        {/* ── LEFT: FORM ── */}
                        <div>
                            {success ? (
                                <div className="h-full flex flex-col items-center justify-center text-center py-20">
                                    <div className="w-20 h-20 rounded-full bg-[#10b981]/15 border border-[#10b981]/30 flex items-center justify-center mb-6 animate-pulse">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="#10b981" className="w-10 h-10"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
                                    </div>
                                    <h2 className="font-display text-3xl font-black text-white mb-3">Pesan Terkirim!</h2>
                                    <p className="font-body text-white/50 mb-8">Terima kasih! Kami akan segera menghubungi Anda.</p>
                                    <button onClick={() => setSuccess(false)} className="text-[#10b981] font-body text-sm hover:underline">Kirim pesan lain →</button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                                    <p className="font-body text-white/40 text-sm mb-8">Isi form di bawah atau langsung chat via WhatsApp →</p>

                                    {errors.submit && <p role="alert" className="text-red-400 text-sm font-body bg-red-500/10 border border-red-500/20 rounded-2xl px-4 py-3">{errors.submit}</p>}

                                    {/* Row 1 */}
                                    <div className="grid sm:grid-cols-2 gap-5">
                                        <div>
                                            <label htmlFor="c-name" className="block text-white/40 text-[10px] uppercase tracking-widest font-mono mb-2">Nama Lengkap *</label>
                                            <input id="c-name" name="name" type="text" required value={form.name} onChange={handleChange} className={cn(inputClass, errors.name && 'border-red-500/50')} placeholder="John Doe" />
                                            {errors.name && <p className="text-red-400 text-xs mt-1.5 font-body">{errors.name}</p>}
                                        </div>
                                        <div>
                                            <label htmlFor="c-email" className="block text-white/40 text-[10px] uppercase tracking-widest font-mono mb-2">Email *</label>
                                            <input id="c-email" name="email" type="email" required value={form.email} onChange={handleChange} className={cn(inputClass, errors.email && 'border-red-500/50')} placeholder="email@anda.com" />
                                            {errors.email && <p className="text-red-400 text-xs mt-1.5 font-body">{errors.email}</p>}
                                        </div>
                                    </div>

                                    {/* Row 2 */}
                                    <div className="grid sm:grid-cols-2 gap-5">
                                        <div>
                                            <label htmlFor="c-phone" className="block text-white/40 text-[10px] uppercase tracking-widest font-mono mb-2">WhatsApp (opsional)</label>
                                            <input id="c-phone" name="phone" type="tel" value={form.phone} onChange={handleChange} className={inputClass} placeholder="08xxxxxxxxxx" />
                                        </div>
                                        <div>
                                            <label htmlFor="c-service" className="block text-white/40 text-[10px] uppercase tracking-widest font-mono mb-2">Layanan</label>
                                            <select id="c-service" name="service" value={form.service} onChange={handleChange} className={cn(inputClass, 'appearance-none cursor-pointer')}>
                                                <option value="" className="bg-[#1a1a1a]">-- Pilih layanan --</option>
                                                {SERVICE_OPTIONS.map(o => <option key={o} value={o} className="bg-[#1a1a1a]">{o}</option>)}
                                            </select>
                                        </div>
                                    </div>

                                    {/* Message */}
                                    <div>
                                        <label htmlFor="c-message" className="block text-white/40 text-[10px] uppercase tracking-widest font-mono mb-2">Pesan *</label>
                                        <textarea id="c-message" name="message" rows={6} required value={form.message} onChange={handleChange} className={cn(inputClass, 'resize-none', errors.message && 'border-red-500/50')} placeholder="Ceritakan proyek Anda — tujuan, target, dan deadline jika ada..." />
                                        {errors.message && <p className="text-red-400 text-xs mt-1.5 font-body">{errors.message}</p>}
                                    </div>

                                    {/* Submit */}
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full flex items-center justify-center gap-3 bg-[#10b981] hover:bg-[#059669] text-white font-body font-bold text-sm py-4 rounded-2xl transition-all duration-300 disabled:opacity-60 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#10b981]/30"
                                    >
                                        {loading ? (
                                            <><svg className="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4"/><path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v8z"/></svg> Mengirim...</>
                                        ) : 'Kirim Pesan →'}
                                    </button>

                                    <p className="text-white/20 text-xs text-center font-body">* Wajib diisi — Data Anda aman bersama kami</p>
                                </form>
                            )}
                        </div>

                        {/* ── RIGHT: PHONE MOCKUP + INFO ── */}
                        <div className="flex flex-col items-center gap-16 lg:sticky lg:top-28">
                            <WhatsAppMockup form={form} />

                            {/* Contact info cards */}
                            <div className="w-full space-y-3 mt-8">
                                {[
                                    {
                                        icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"/></svg>,
                                        label: 'Lokasi',
                                        value: 'Samarinda, Kalimantan Timur'
                                    },
                                    {
                                        icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>,
                                        label: 'Respons',
                                        value: 'Dalam 1×24 jam kerja'
                                    },
                                    {
                                        icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"/></svg>,
                                        label: 'Email',
                                        value: 'hello@akkreatif.com'
                                    },
                                ].map(item => (
                                    <div key={item.label} className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.04] border border-white/8 hover:border-[#10b981]/30 transition-colors">
                                        <div className="w-10 h-10 rounded-xl bg-[#10b981]/10 flex items-center justify-center text-[#10b981] flex-shrink-0">{item.icon}</div>
                                        <div>
                                            <p className="text-white/30 text-[10px] uppercase tracking-widest font-mono">{item.label}</p>
                                            <p className="text-white/80 text-sm font-body mt-0.5">{item.value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </MainLayout>
    );
}
