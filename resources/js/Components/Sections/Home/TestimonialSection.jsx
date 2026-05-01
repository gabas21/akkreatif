import { InfiniteMovingCards } from '@/Components/ui/infinite-moving-cards';
import { useIntersection } from '@/hooks/useIntersection';
import { cn } from '@/lib/utils';

const testimonials = [
    { quote: 'Kami sungguh senang bekerja sama dengan tim IT ini. Mereka membantu kami mengembangkan aplikasi web dan mobile yang telah mempermudah pekerjaan kita di kantor. Terima kasih karena telah menjadikan kerja kami lebih efektif dan lebih lancar.', name: 'Bambang Erryanto, S.Sos, M.Si', title: 'Kepala UPTD PPRD Wil. Samarinda' },
    { quote: 'Terima kasih kepada perusahaan IT ini! Mereka telah membantu kita menciptakan aplikasi yang mengubah cara kita bekerja. Lebih mudah, lebih efisien, dan membantu kita mencapai lebih banyak.', name: 'Taufik Rahman, S.Sos.,MM', title: 'Kabid Pengendalian dan Evaluasi Pendapatan' },
    { quote: 'Kami sungguh senang bekerja sama dengan tim IT ini. Mereka membantu kami mengembangkan aplikasi web dan mobile yang telah mempermudah pekerjaan kita di kantor.', name: 'Bambang Erryanto, S.Sos, M.Si', title: 'Sekretaris BAPENDA KALTIM' },
    { quote: 'Kerja sama dengan tim ini sangat profesional. Solusi digital yang ditawarkan kreatif dan inovatif. Kami sangat mengapresiasi dedikasi mereka dalam mendukung transformasi digital instansi.', name: 'Anthoni Safarisa, SE, MM', title: 'Sekretaris DPMPTSP KALTIM' },
    { quote: 'Apresiasi sebesar-besarnya kepada AK Kreatif yang telah bersemangat dalam membangun industri kreatif di Samarinda khususnya dan Kalimantan Timur pada umumnya.', name: 'Ir. H. Rusmadi, M.S., Ph.D.', title: 'Ex Wakil Wali Kota Samarinda' },
    { quote: 'Tim kreatif ini menghadirkan terobosan luar biasa. Pendekatan mereka yang modern sangat membantu kami menjangkau masyarakat secara efektif.', name: 'Charmarijati, S.T., M.Si.', title: 'Sekretaris BRIDA KALTIM' },
    { quote: 'Tim kreatif yang isinya anak-anak muda potensial, dengan kualitas bakat dan kompetensi serta ide-ide yang inovatif.', name: 'Anik Nurul Aini S.Kom', title: 'Sekretaris DP3A KALTIM' },
];

export default function TestimonialSection() {
    const [ref, isVisible] = useIntersection();

    return (
        <section className="section-padding bg-background overflow-hidden">
            {/* Header */}
            <div
                ref={ref}
                className={cn(
                    "text-center mb-16 transition-all duration-700",
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                )}
            >
                <span className="font-body text-xs font-medium uppercase tracking-[0.2em] text-secondary">Testimonial</span>
                <div className="w-8 h-px bg-secondary mx-auto my-3" />
                <h2 className="font-display text-3xl md:text-5xl font-semibold text-primary mt-4">
                    Apa Kata <span className="text-secondary">Klien Kami</span>
                </h2>
            </div>

            {/* Infinite Marquee Row 1 — left */}
            <InfiniteMovingCards
                items={testimonials}
                direction="left"
                speed="slow"
                className="mb-4"
            />

            {/* Infinite Marquee Row 2 — right (reversed) */}
            <InfiniteMovingCards
                items={[...testimonials].reverse()}
                direction="right"
                speed="slow"
            />
        </section>
    );
}
