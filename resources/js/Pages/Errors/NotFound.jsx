import { Link } from '@inertiajs/react';
import { IconArrowLeft, IconHome, IconBrandWhatsapp } from '@tabler/icons-react';

/**
 * Halaman 404 — Not Found
 * Branded, ramah pengguna, tidak hanya teks error saja.
 */
export default function NotFound() {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center px-6 relative overflow-hidden">

            {/* Background decorative blur */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-emerald-500/5 blur-[120px]" />
                <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-emerald-500/3 blur-[100px]" />
            </div>

            <div className="relative z-10 text-center max-w-xl">

                {/* 404 number */}
                <div className="relative mb-6 select-none">
                    <span className="text-[180px] font-black leading-none text-transparent bg-clip-text bg-gradient-to-b from-white/10 to-transparent pointer-events-none">
                        404
                    </span>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-br from-emerald-400 to-emerald-600">
                            404
                        </span>
                    </div>
                </div>

                {/* Message */}
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">
                    Halaman Tidak Ditemukan
                </h1>
                <p className="text-white/50 text-base leading-relaxed mb-10">
                    Sepertinya halaman yang Anda cari sudah dipindah, dihapus,
                    atau memang tidak pernah ada. Tidak perlu khawatir — kami
                    bisa bantu Anda kembali ke jalur yang benar.
                </p>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(16,185,129,0.3)]"
                    >
                        <IconHome size={18} />
                        Kembali ke Beranda
                    </Link>

                    <Link
                        href="/portfolio"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 hover:border-white/25 text-white/70 hover:text-white font-medium transition-all duration-200 hover:-translate-y-0.5"
                    >
                        <IconArrowLeft size={18} />
                        Lihat Portofolio
                    </Link>
                </div>

                {/* Contact fallback */}
                <p className="mt-8 text-sm text-white/30">
                    Butuh bantuan?{' '}
                    <a
                        href="https://wa.me/6281234567890"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1 transition-colors"
                    >
                        <IconBrandWhatsapp size={14} />
                        Hubungi kami via WhatsApp
                    </a>
                </p>

                {/* Brand */}
                <div className="mt-12 flex items-center justify-center gap-2 text-white/20 text-sm">
                    <img src="/images/logo-color.webp" alt="AK Kreatif" className="h-5 w-auto opacity-40" />
                    <span>AK Kreatif</span>
                </div>
            </div>
        </div>
    );
}
