import { Head } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';

export default function About() {
    return (
        <MainLayout>
            <Head title="About" />
            <div className="section-padding container-custom">
                <div className="text-center mb-16">
                    <span className="font-['Space_Grotesk'] text-xs font-bold uppercase tracking-[0.2em] text-[#10b981]">Tentang Kami</span>
                    <div className="w-8 h-px bg-[#10b981] mx-auto my-3"></div>
                    <h2 className="font-['Space_Grotesk'] text-3xl md:text-5xl font-bold text-black mt-4">
                        Lahir dari Keresahan, Beraksi Membawa Inovasi.
                    </h2>
                </div>
                <div className="max-w-4xl mx-auto text-center font-['Plus_Jakarta_Sans'] text-lg text-black/80 leading-relaxed bg-white border border-black/10 p-10 shadow-sm rounded-xl hover:border-[#10b981] transition-colors duration-300">
                    Kami memahami bahwa setiap masalah operasional adalah celah menuju keunggulan. 
                    Di AK Kreatif, kami tidak sekadar membuat desain atau aplikasi; kami mendiagnosis 
                    masalah bisnis Anda dan menciptakan <strong className="text-[#10b981]">inovasi digital</strong> yang memastikan efisiensi berjalan maksimal.
                </div>
            </div>
        </MainLayout>
    );
}
