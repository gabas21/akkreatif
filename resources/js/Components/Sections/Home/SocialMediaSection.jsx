import { useIntersection } from '@/hooks/useIntersection';
import { cn } from '@/lib/utils';
import { IconBrandInstagram, IconBrandYoutube, IconArrowUpRight } from '@tabler/icons-react';

export default function SocialMediaSection() {
    const [ref, isVisible] = useIntersection();

    return (
        <section className="section-padding bg-background border-t border-border mt-10">
            <div className="container-custom">
                <div className="text-center mb-16">
                    <span className="font-['Space_Grotesk'] text-xs font-bold uppercase tracking-[0.2em] text-[#10b981]">Media Sosial</span>
                    <div className="w-8 h-px bg-[#10b981] mx-auto my-3"></div>
                    <h2 className="font-['Space_Grotesk'] text-3xl md:text-5xl font-bold text-brand-black mt-4">
                        Di Balik Layar <br className="hidden md:block"/><span className="text-brand-black/40">AK Kreatif</span>
                    </h2>
                </div>

                <div 
                    ref={ref}
                    className={cn(
                        "grid md:grid-cols-2 gap-8 max-w-5xl mx-auto transition-all duration-1000",
                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                    )}
                >
                    {/* Instagram Card Preview */}
                    <div className="group relative overflow-hidden bg-white rounded-[2rem] p-5 sm:p-8 md:p-10 border border-black/5 hover:border-[#10b981]/50 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col h-full">
                        <div className="flex justify-between items-start mb-6">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#fd5949] via-[#d6249f] to-[#285AEB] p-0.5">
                                    <div className="w-full h-full bg-white rounded-full flex items-center justify-center overflow-hidden">
                                        <img src="https://ui-avatars.com/api/?name=AK+Kreatif&background=10b981&color=fff&rounded=true" alt="AK Kreatif IG" width="56" height="56" loading="lazy" decoding="async" className="w-full h-full object-cover" />
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-['Space_Grotesk'] text-xl font-bold text-black leading-none mb-1">ak_kreatif</h3>
                                    <p className="font-['Plus_Jakarta_Sans'] text-xs text-black/50">Official Instagram</p>
                                </div>
                            </div>
                            <a href="https://instagram.com/ak_kreatif" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-[#10b981] group-hover:border-transparent group-hover:text-white transition-all duration-300 z-10">
                                <IconArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </a>
                        </div>
                        
                        {/* 6-Grid IG Feed Mockup */}
                        <div className="grid grid-cols-3 gap-1.5 sm:gap-2 mb-5 sm:mb-6 relative">
                            {/* Overlay clickable direct to IG */}
                            <a href="https://instagram.com/ak_kreatif" target="_blank" rel="noreferrer" className="absolute inset-0 z-10" aria-label="Visit Instagram Profile"></a>
                            
                            {[
                                "/images/unsplash/1542744173-8e7e53415bb0.webp", // Agency team
                                "/images/unsplash/1600880292203-757bb62b4baf.webp", // Desk setup
                                "/images/unsplash/1551288049-bebda4e38f71.webp", // Code
                                "/images/unsplash/1512758684632-a2eb69eb3c6b.webp", // Design
                                "/images/unsplash/social-media-icons.webp", // Social Media
                                "/images/unsplash/1511512578047-dfb367046420.webp"  // Video/Event
                            ].map((img, i) => (
                                <div key={i} className="aspect-square bg-gray-100 rounded-lg overflow-hidden relative group/img">
                                    <img src={img} alt={`Post preview ${i+1}`} width="200" height="200" loading="lazy" decoding="async" className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-500" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                                        <IconBrandInstagram className="text-white w-6 h-6 transform translate-y-2 group-hover/img:translate-y-0 transition-transform duration-300" />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <p className="font-['Plus_Jakarta_Sans'] text-black/60 text-sm leading-relaxed flex-grow">
                            Intip keseharian tim kreatif kami, portofolio terbaru, dan tips desain serta teknologi langsung di *feed* Anda.
                        </p>
                        
                        <a href="https://instagram.com/ak_kreatif" target="_blank" rel="noreferrer" className="mt-4 inline-block w-full text-center font-['Plus_Jakarta_Sans'] font-bold text-sm text-black bg-black/5 hover:bg-[#10b981] hover:text-white transition-colors py-3 rounded-xl shadow-sm">
                            Follow @ak_kreatif
                        </a>
                    </div>

                    {/* YouTube Card Preview */}
                    <div className="group relative overflow-hidden bg-white rounded-[2rem] p-5 sm:p-8 md:p-10 border border-black/5 hover:border-[#FF0000]/50 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col h-full">
                        <div className="flex justify-between items-start mb-6">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-full bg-[#FF0000]/10 flex items-center justify-center">
                                    <IconBrandYoutube className="w-7 h-7 text-[#FF0000]" />
                                </div>
                                <div>
                                    <h3 className="font-['Space_Grotesk'] text-xl font-bold text-black leading-none mb-1">YouTube</h3>
                                    <p className="font-['Plus_Jakarta_Sans'] text-xs text-black/50">AK Kreatif Studio</p>
                                </div>
                            </div>
                        </div>

                        {/* Real YouTube Embed */}
                        <div className="w-full aspect-video rounded-xl overflow-hidden mb-6 relative z-10 shadow-md">
                            <iframe
                                className="w-full h-full"
                                src="https://www.youtube.com/embed/OvVf9Fpzfu4?modestbranding=1&rel=0"
                                title="AK Kreatif YouTube Video"
                                frameBorder="0"
                                loading="lazy"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>

                        <p className="font-['Plus_Jakarta_Sans'] text-black/60 text-sm leading-relaxed flex-grow">
                            Tonton karya sinematik, video dokumentasi event komersial, dan highlight eksekusi proyek kami.
                        </p>

                        <a href="https://youtube.com" target="_blank" rel="noreferrer" className="mt-4 inline-block w-full text-center font-['Plus_Jakarta_Sans'] font-bold text-sm text-white bg-[#FF0000] hover:bg-black transition-colors py-3 rounded-xl shadow-lg shadow-[#FF0000]/30">
                            Subscribe Channel
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
