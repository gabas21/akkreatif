import { useIntersection } from '@/hooks/useIntersection';
import { cn } from '@/lib/utils';
import {
    IconBuildingMonument,
    IconTrees,
    IconBuildingBank,
    IconBuildingCommunity,
    IconFlame,
    IconBuildingPavilion,
    IconBriefcase,
    IconBuildingSkyscraper,
    IconBuildingFactory,
    IconBuildingEstate,
    IconBuildingCastle,
    IconBuildingCottage,
    IconBuildingStore
} from '@tabler/icons-react';

const row1_base = [
    { name: "UPTD PPRD Samarinda", logo: "/images/clients/transparent_uptdsamarinda.webp", hideText: true },
    { name: "Biro PBJ Kaltim", logo: "/images/clients/transparent_biropbj.webp", hideText: true },
    { name: "Kemendikbud", logo: "/images/clients/transparent_kemendikbud.webp", hideText: true },
    { name: "DPD RI", logo: "/images/clients/transparent_dpdri.webp", hideText: true },
    { name: "DP3A Kaltim", logo: "/images/clients/logo-dp3a-kaltim.webp", hideText: true },
    { name: "MGRM", logo: "/images/clients/mgrm.webp", hideText: true, darkCard: true },
];

const row2_base = [
    { name: "Pemkot Bogor", logo: "/images/clients/transparent_pemkotbogor.webp", hideText: true },
    { name: "BPOM", logo: "/images/clients/transparent_bpom.webp", hideText: true },
    { name: "Pamjaya Jakarta", logo: "/images/clients/transparent_pam-jaya-logo.webp", hideText: true },
    { name: "Badan Informasi Geospasial", logo: "/images/clients/transparent_geospasial.webp", hideText: true },
    { name: "PT Bayan Resources", logo: "/images/clients/bayan.webp", hideText: true, darkCard: true },
];

const row1 = [...row1_base, ...row1_base, ...row1_base, ...row1_base];
const row2 = [...row2_base, ...row2_base, ...row2_base, ...row2_base];

const ClientCard = ({ client }) => (
    <div className={`flex-shrink-0 flex items-center justify-center px-6 py-4 mx-3 rounded-2xl border border-black/5 shadow-sm hover:-translate-y-1 hover:border-secondary/30 hover:shadow-xl hover:shadow-secondary/5 transition-all duration-300 cursor-default h-[88px] min-w-[140px] max-w-[240px] ${client.darkCard ? 'bg-zinc-900 border-zinc-800' : 'bg-white'}`}>
        <img
            src={client.logo}
            alt={client.name}
            width="200"
            height="80"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-contain"
        />
    </div>
);

export default function ClientsSection() {
    const [ref, isVisible] = useIntersection();

    return (
        <section className="relative py-20 md:py-32 bg-background border-y border-white/5 overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-secondary/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 mb-16 relative z-10">
                <div
                    ref={ref}
                    className={cn(
                        "text-center transition-all duration-1000",
                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    )}
                >
                    <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 rounded-full bg-secondary/10 border border-secondary/20">
                        <span className="font-body text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
                            Klien Kami
                        </span>
                    </div>
                    <h2 className="font-display text-3xl md:text-5xl font-semibold text-primary">
                        Telah Dipercaya Oleh
                    </h2>
                    <p className="mt-4 text-text-muted font-body max-w-2xl mx-auto text-sm md:text-base">
                        Berbagai instansi pemerintah dan perusahaan ternama telah membuktikan kualitas dan profesionalisme layanan kami.
                    </p>
                </div>
            </div>

            <div className="relative flex flex-col gap-6 max-w-[100vw] overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_15%,white_85%,transparent)] z-10">
                
                {/* Marquee Row 1 - Ke Kiri */}
                <div className="flex w-max animate-marquee-left hover:[animation-play-state:paused]">
                    {row1.map((client, idx) => (
                        <ClientCard key={`row1-${idx}`} client={client} />
                    ))}
                </div>

                {/* Marquee Row 2 - Ke Kanan */}
                <div className="flex w-max animate-marquee-right hover:[animation-play-state:paused]">
                    {row2.map((client, idx) => (
                        <ClientCard key={`row2-${idx}`} client={client} />
                    ))}
                </div>

            </div>

            <style>{`
                @keyframes marquee-left {
                    0% { transform: translateX(0%); }
                    100% { transform: translateX(-50%); }
                }
                @keyframes marquee-right {
                    0% { transform: translateX(-50%); }
                    100% { transform: translateX(0%); }
                }
                .animate-marquee-left {
                    animation: marquee-left 40s linear infinite;
                }
                .animate-marquee-right {
                    animation: marquee-right 45s linear infinite;
                }
            `}</style>
        </section>
    );
}
