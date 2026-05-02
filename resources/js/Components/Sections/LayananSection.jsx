import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Sparkles, Share2, Camera, Utensils, ArrowUpRight } from 'lucide-react';
import { Link } from '@inertiajs/react';

const services = [
  {
    id: 1,
    tag: "Dev & Engineering",
    title: "Web & Application",
    desc: "Pengembangan web, profil instansi, dan mobile app berkualitas premium.",
    icon: Code2,
    href: "/services/web-application",
    // GANTI: /assets/images/layanan-it.jpg
    image: "/images/unsplash/1555066931-4365d14bab8c.webp",
    className: "md:col-span-2 md:row-span-1 min-h-[260px]",
  },
  {
    id: 2,
    tag: "Creative Studio",
    title: "Desain Grafis",
    desc: "Visual unik, logo, animasi, dan 3D yang menerjemahkan ide.",
    icon: Sparkles,
    href: "/services/desain-grafis",
    // GANTI: /assets/images/layanan-desain.jpg
    image: "/images/unsplash/1626785774573-4b799315345d.webp",
    className: "md:col-span-1 md:row-span-2 min-h-[260px] md:min-h-full",
  },
  {
    id: 3,
    tag: "Growth & Content",
    title: "Social Media Management",
    desc: "Strategi konten dan pertumbuhan organik di semua platform digital.",
    icon: Share2,
    href: "/services/social-media",
    // GANTI: /assets/images/layanan-sosmed.jpg
    image: "/images/unsplash/social-media-icons.webp",
    className: "md:col-span-1 md:row-span-1 min-h-[260px]",
  },
  {
    id: 4,
    tag: "Photo & Video",
    title: "Foto, Video & Event",
    desc: "Mengabadikan momen terbaik lewat fotografi dan videografi.",
    icon: Camera,
    href: "/services/foto-video-event",
    // GANTI: /assets/images/layanan-dokumentasi.jpg
    image: "/images/unsplash/1516035069371-29a1b244cc32.webp",
    className: "md:col-span-1 md:row-span-1 min-h-[260px]",
  },
  {
    id: 5,
    tag: "F&B Consulting",
    title: "Usaha Makanan",
    desc: "Pengembangan usaha kuliner dengan konsep modern berkualitas.",
    icon: Utensils,
    href: "/services/usaha-makanan",
    // GANTI: /assets/images/layanan-fb.jpg
    image: "/images/unsplash/1555396273-367ea4eb4db5.webp",
    className: "md:col-span-3 md:row-span-1 min-h-[200px]",
  }
];

export default function LayananSection() {
  return (
    <section className="py-12 md:py-16 bg-[#F9FAF9] overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        {/* Header */}
        <div className="mb-10">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <span className="text-[11px] tracking-[0.12em] uppercase text-[#16A34A] font-medium mb-4 block">
              LAYANAN KAMI
            </span>
            <h2 className="text-[28px] md:text-[36px] font-bold leading-tight max-w-2xl text-[#0A0A0A]">
              Semua yang Kamu Butuhkan, <span className="text-[#16A34A]">Satu Mitra</span> Terpercaya.
            </h2>
          </motion.div>
        </div>

        {/* Bento Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-[12px] auto-rows-min"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Link
                href={service.href}
                key={service.id}
                className={`group relative rounded-[18px] overflow-hidden bg-zinc-900 block ${service.className}`}
              >
                {/* Background Image */}
                <img
                  src={service.image}
                  alt={service.title}
                  width="400"
                  height="300"
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-[600ms] ease-out group-hover:scale-[1.06] group-hover:brightness-[0.55] brightness-[0.8]"
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-all duration-[600ms] ease-out group-hover:from-black group-hover:via-black/60" />

                {/* Arrow Icon Top Right */}
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-[600ms] ease-out">
                  <ArrowUpRight className="w-5 h-5 text-white" />
                </div>

                {/* Content Bottom */}
                <div className="absolute bottom-0 left-0 p-6 md:p-8 w-full flex flex-col justify-end">
                  {/* Icon Box */}
                  <div className={`rounded-xl bg-white/15 border border-white/20 backdrop-blur-md flex items-center justify-center mb-4 opacity-0 translate-y-[8px] group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-[600ms] ease-out ${service.id === 1 ? 'w-11 h-11 md:w-12 md:h-12' : 'w-10 h-10'}`}>
                    <Icon className={`text-white ${service.id === 1 ? 'w-5 h-5 md:w-6 md:h-6' : 'w-5 h-5'}`} />
                  </div>

                  {/* Tag & Title */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] uppercase tracking-[0.1em] text-[#6ee88a] font-medium block">
                      {service.tag}
                    </span>
                    <h3 className={`font-semibold text-white ${service.id === 1 ? 'text-[20px] md:text-[22px]' : 'text-[17px]'}`}>
                      {service.title}
                    </h3>
                  </div>

                  {/* Description (Slide Reveal) */}
                  <div className={`max-h-0 opacity-0 overflow-hidden group-hover:opacity-100 transition-all duration-[600ms] ease-out ${service.id === 1 ? 'group-hover:max-h-[100px]' : 'group-hover:max-h-[80px]'}`}>
                    <p className={`text-white/65 mt-3 leading-relaxed ${service.id === 1 ? 'text-[13.5px] md:text-[14px] max-w-lg' : 'text-[12.5px]'}`}>
                      {service.desc}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
