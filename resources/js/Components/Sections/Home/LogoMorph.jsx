import React, { useEffect, useRef, useState } from 'react';

export default function LogoMorph() {
    const scopeRef = useRef(null);
    const [isMorphReady, setIsMorphReady] = useState(false);

    // --- 1. Load GSAP + MorphSVGPlugin ---
    useEffect(() => {
        let gsapLoaded = false;
        let morphLoaded = false;
        
        const checkReady = () => {
            if (gsapLoaded && window.MorphSVGPlugin) {
                window.gsap.registerPlugin(window.MorphSVGPlugin);
                setIsMorphReady(true);
            }
        };

        const loadScript = (id, src, cb) => {
            if (document.getElementById(id)) { cb(); return; }
            let s = document.createElement('script');
            s.id = id; s.src = src; s.onload = cb;
            document.head.appendChild(s);
        };

        loadScript('gsap-cdn', 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js', () => {
            gsapLoaded = true;
            loadScript('gsap-morph-cdn', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/16327/MorphSVGPlugin3.min.js', () => {
                morphLoaded = true;
                checkReady();
            });
        });
    }, []);

    // --- 2. Master Recursive Sequence ---
    useEffect(() => {
        if (!isMorphReady || !scopeRef.current || !window.gsap) return;
        const gsap = window.gsap;

        let ctx = gsap.context(() => {
            // Original Path configs for resetting
            const sA_origPath = document.getElementById('sA').getAttribute('d');

            const runSequence = () => {
                // 1. HARD RESET ALL ELEMENTS TO INITIAL STATES
                gsap.set('.stroke-path', { opacity: 1 });
                gsap.utils.toArray('.stroke-path').forEach(el => {
                    let l = 3000; try { l = el.getTotalLength(); } catch(e) {}
                    gsap.set(el, { strokeDasharray: l, strokeDashoffset: l });
                });

                gsap.set(".fill-layer", { opacity: 0 });
                gsap.set("#sep", { width: 0, opacity: 0 });
                gsap.set("#tagline", { opacity: 0, y: 6 });
                gsap.set("#logoCon", { opacity: 1, y: 0 });
                gsap.set("#morph-targets", { autoAlpha: 0 }); // Purely hidden

                // Reset sA properties
                gsap.set('#sA', { 
                    morphSVG: sA_origPath, 
                    stroke: "#1a2e44", 
                    strokeWidth: 14, 
                    filter: "none", 
                    opacity: 1 
                });

                const E = { draw: "power3.inOut", fill: "sine.inOut", reveal: "power2.out", soft: "power2.inOut" };
                let t = gsap.timeline();

                // === INTRO ANIMATION ===
                t.to("#sA", { strokeDashoffset: 0, duration: 2.6, ease: E.draw })
                 .to("#sAI", { strokeDashoffset: 0, duration: 1.5, ease: E.draw }, 1.3)
                 .to("#fA", { opacity: 1, duration: 1.0, ease: E.fill }, 2.3)
                 .to("#fAH", { opacity: 1, duration: 0.6, ease: E.fill }, 2.6)
                 .to("#sK", { strokeDashoffset: 0, duration: 2.2, ease: E.draw }, 2.7)
                 .to("#fK", { opacity: 1, duration: 1.2, ease: E.fill }, 3.9)
                 .to("#sSep", { strokeDashoffset: 0, duration: 1.0, ease: E.soft }, 4.7);

                const letters = ['tK','tR','tE','tA','tT','tI','tF'];
                const txtStart = 5.1;
                letters.forEach((id, i) => {
                    const off = txtStart + i * 0.22;
                    if (document.querySelector(`#${id} .lbox`)) t.to(`#${id} .lbox`, { strokeDashoffset: 0, duration: 0.65, ease: E.draw }, off);
                    if (document.querySelectorAll(`#${id} .lch`)) t.to(`#${id} .lch`, { strokeDashoffset: 0, duration: 0.45, stagger: 0.07, ease: E.reveal }, off + 0.18);
                });

                const dotTime = txtStart + letters.length * 0.22 + 0.3;
                t.to("#dotAccent", { opacity: 1, duration: 0.4, ease: E.reveal }, dotTime);
                const finishTime = dotTime + 0.3;
                t.to("#sep", { width: 240, opacity: 0.4, duration: 0.9, ease: E.soft }, finishTime);
                t.to("#tagline", { opacity: 0.55, y: 0, duration: 0.8, ease: E.reveal }, finishTime + 0.25);
                t.to("#logoCon", { y: -4, duration: 1.4, ease: E.fill }, finishTime + 0.3);
                t.to("#logoCon", { y: 0, duration: 2.0, ease: E.fill }, finishTime + 1.7);


                // === MORPHING SEQUENCE ===
                // Fade out everything EXCEPT the main 'sA' stroke outline
                t.to(['.fill-layer', '#sAI', '#sK', '.letter', '#sSep', '#tagline', '#dotAccent'], { 
                    opacity: 0, duration: 1.5, ease: E.soft, delay: 2 
                });

                // Change 'sA' aesthetics to match fluid glowing Tabler icons
                t.to('#sA', {
                    stroke: "#10b981",
                    strokeWidth: 32,
                    filter: "drop-shadow(0px 0px 24px rgba(16,185,129,0.3))",
                    duration: 1.5
                }, "<"); 

                // Also fade out sep and tagline divs
                t.to('#sep', { opacity: 0, duration: 1.0 }, "<");

                const targets = ['#t-web', '#t-code', '#t-design', '#t-photo'];
                
                // Fluidly morph into the tabler icons
                targets.forEach((target) => {
                    t.to('#sA', { morphSVG: target, duration: 1.5, ease: "power2.inOut", delay: 1.5 });
                });

                // === SEAMLESS RETURN TO FULL AK INTRO ===
                // Morph back to A outline shape
                t.to('#sA', { morphSVG: sA_origPath, duration: 1.5, ease: "power2.inOut", delay: 1.5 });

                // Restore sA stroke style back to original dark blue
                t.to('#sA', {
                    stroke: "#1a2e44",
                    strokeWidth: 14,
                    filter: "none",
                    duration: 1.0,
                    ease: E.soft
                });

                // Now seamlessly rebuild the rest of the logo on top of the existing A outline
                // Reset stroke-dash for sAI, sK, sSep, letters (they were hidden, prep them)
                t.call(() => {
                    ['sAI', 'sK', 'sSep'].forEach(id => {
                        const el = document.getElementById(id);
                        if (!el) return;
                        let l = 3000; try { l = el.getTotalLength(); } catch(e) {}
                        gsap.set(el, { strokeDasharray: l, strokeDashoffset: l, opacity: 1 });
                    });
                    // Reset letter strokes
                    const letters = ['tK','tR','tE','tA','tT','tI','tF'];
                    letters.forEach(id => {
                        const g = document.getElementById(id);
                        if (!g) return;
                        gsap.set(g, { opacity: 1 });
                        g.querySelectorAll('.stroke-path').forEach(el => {
                            let l = 3000; try { l = el.getTotalLength(); } catch(e) {}
                            gsap.set(el, { strokeDasharray: l, strokeDashoffset: l });
                        });
                    });
                    // Reset fills
                    gsap.set('.fill-layer', { opacity: 0 });
                    gsap.set('#dotAccent', { opacity: 0 });
                    gsap.set('#sep', { width: 0, opacity: 0 });
                    gsap.set('#tagline', { opacity: 0, y: 6 });
                });

                // Draw inner A hole
                t.to("#sAI", { strokeDashoffset: 0, duration: 1.5, ease: E.draw });
                // Fill A
                t.to("#fA", { opacity: 1, duration: 1.0, ease: E.fill }, "<0.3");
                t.to("#fAH", { opacity: 1, duration: 0.6, ease: E.fill }, "<0.3");

                // Draw K
                t.to("#sK", { strokeDashoffset: 0, duration: 2.2, ease: E.draw }, "<0.2");
                // Fill K
                t.to("#fK", { opacity: 1, duration: 1.2, ease: E.fill }, ">-0.5");

                // Separator
                t.to("#sSep", { strokeDashoffset: 0, duration: 1.0, ease: E.soft });

                // KREATIF letters
                const letters2 = ['tK','tR','tE','tA','tT','tI','tF'];
                const txtStart2 = t.duration(); // current position
                letters2.forEach((id, i) => {
                    const off = txtStart2 + i * 0.22;
                    if (document.querySelector(`#${id} .lbox`)) t.to(`#${id} .lbox`, { strokeDashoffset: 0, duration: 0.65, ease: E.draw }, off);
                    if (document.querySelectorAll(`#${id} .lch`)) t.to(`#${id} .lch`, { strokeDashoffset: 0, duration: 0.45, stagger: 0.07, ease: E.reveal }, off + 0.18);
                });

                // Dot accent
                const dotTime2 = txtStart2 + letters2.length * 0.22 + 0.3;
                t.to("#dotAccent", { opacity: 1, duration: 0.4, ease: E.reveal }, dotTime2);

                // Sep & tagline
                const finishTime2 = dotTime2 + 0.3;
                t.to("#sep", { width: 240, opacity: 0.4, duration: 0.9, ease: E.soft }, finishTime2);
                t.to("#tagline", { opacity: 0.55, y: 0, duration: 0.8, ease: E.reveal }, finishTime2 + 0.25);

                // Settle breath
                t.to("#logoCon", { y: -4, duration: 1.4, ease: E.fill }, finishTime2 + 0.3);
                t.to("#logoCon", { y: 0, duration: 2.0, ease: E.fill }, finishTime2 + 1.7);

                // Recursive Loop! (goes back to morphing sequence after the settle)
                t.call(() => {
                    // Small recursive timeline for just the morph cycle
                    const t2 = gsap.timeline();
                    
                    // Fade out everything except sA
                    t2.to(['.fill-layer', '#sAI', '#sK', '.letter', '#sSep', '#tagline', '#dotAccent'], { 
                        opacity: 0, duration: 1.5, ease: E.soft, delay: 2 
                    });
                    t2.to('#sA', {
                        stroke: "#10b981", strokeWidth: 32,
                        filter: "drop-shadow(0px 0px 24px rgba(16,185,129,0.3))",
                        duration: 1.5
                    }, "<");
                    t2.to('#sep', { opacity: 0, duration: 1.0 }, "<");

                    targets.forEach((target) => {
                        t2.to('#sA', { morphSVG: target, duration: 1.5, ease: "power2.inOut", delay: 1.5 });
                    });

                    // morphSVG back to A
                    t2.to('#sA', { morphSVG: sA_origPath, duration: 1.5, ease: "power2.inOut", delay: 1.5 });
                    t2.to('#sA', { stroke: "#1a2e44", strokeWidth: 14, filter: "none", duration: 1.0, ease: E.soft });

                    // Prep & rebuild
                    t2.call(() => {
                        ['sAI', 'sK', 'sSep'].forEach(id => {
                            const el = document.getElementById(id);
                            if (!el) return;
                            let l = 3000; try { l = el.getTotalLength(); } catch(e) {}
                            gsap.set(el, { strokeDasharray: l, strokeDashoffset: l, opacity: 1 });
                        });
                        const ltrs = ['tK','tR','tE','tA','tT','tI','tF'];
                        ltrs.forEach(id => {
                            const g = document.getElementById(id);
                            if (!g) return;
                            gsap.set(g, { opacity: 1 });
                            g.querySelectorAll('.stroke-path').forEach(el => {
                                let l = 3000; try { l = el.getTotalLength(); } catch(e) {}
                                gsap.set(el, { strokeDasharray: l, strokeDashoffset: l });
                            });
                        });
                        gsap.set('.fill-layer', { opacity: 0 });
                        gsap.set('#dotAccent', { opacity: 0 });
                        gsap.set('#sep', { width: 0, opacity: 0 });
                        gsap.set('#tagline', { opacity: 0, y: 6 });
                    });

                    t2.to("#sAI", { strokeDashoffset: 0, duration: 1.5, ease: E.draw });
                    t2.to("#fA", { opacity: 1, duration: 1.0, ease: E.fill }, "<0.3");
                    t2.to("#fAH", { opacity: 1, duration: 0.6, ease: E.fill }, "<0.3");
                    t2.to("#sK", { strokeDashoffset: 0, duration: 2.2, ease: E.draw }, "<0.2");
                    t2.to("#fK", { opacity: 1, duration: 1.2, ease: E.fill }, ">-0.5");
                    t2.to("#sSep", { strokeDashoffset: 0, duration: 1.0, ease: E.soft });

                    const ltrs2 = ['tK','tR','tE','tA','tT','tI','tF'];
                    const ts2 = t2.duration();
                    ltrs2.forEach((id, i) => {
                        const off = ts2 + i * 0.22;
                        if (document.querySelector(`#${id} .lbox`)) t2.to(`#${id} .lbox`, { strokeDashoffset: 0, duration: 0.65, ease: E.draw }, off);
                        if (document.querySelectorAll(`#${id} .lch`)) t2.to(`#${id} .lch`, { strokeDashoffset: 0, duration: 0.45, stagger: 0.07, ease: E.reveal }, off + 0.18);
                    });
                    const dt2 = ts2 + ltrs2.length * 0.22 + 0.3;
                    t2.to("#dotAccent", { opacity: 1, duration: 0.4, ease: E.reveal }, dt2);
                    const ft2 = dt2 + 0.3;
                    t2.to("#sep", { width: 240, opacity: 0.4, duration: 0.9, ease: E.soft }, ft2);
                    t2.to("#tagline", { opacity: 0.55, y: 0, duration: 0.8, ease: E.reveal }, ft2 + 0.25);
                    t2.to("#logoCon", { y: -4, duration: 1.4, ease: E.fill }, ft2 + 0.3);
                    t2.to("#logoCon", { y: 0, duration: 2.0, ease: E.fill }, ft2 + 1.7);

                    // After this completes, call ourselves again for infinite loop
                    t2.call(() => t2.restart());
                });
            };

            runSequence();

        }, scopeRef);

        return () => ctx.revert();
    }, [isMorphReady]);

    return (
        <div ref={scopeRef} className="flex flex-col items-center justify-center w-full max-w-sm mx-auto pointer-events-none relative h-[420px]">
            <div id="logoCon" className="absolute top-0 bottom-0 left-0 right-0 flex flex-col items-center justify-center w-full max-w-[320px] mx-auto mt-6">
                <svg viewBox="0 0 940 1010" xmlns="http://www.w3.org/2000/svg" id="svg" className="w-[300px]">
                    <defs>
                        <linearGradient id="gGreen" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#4ad8ad"/>
                            <stop offset="100%" stopColor="#36c99a"/>
                        </linearGradient>
                        <clipPath id="cutA">
                            <path d="M 0 0 L 620 0 L 620 790 L 0 790 Z M 340 150 C 250 150 168 248 168 378 L 168 448 L 443 448 L 443 378 C 443 248 398 150 340 150 Z" fillRule="evenodd"/>
                        </clipPath>
                    </defs>

                    {/* HIDDEN TARGETS FOR DIRECT MORPHING (PRE-SCALED TO 940x1010) */}
                    <g id="morph-targets" style={{ display: 'none' }}>
                        <path id="t-web" d="M100 392a207 207 0 1 0 414 0 207 207 0 0 0-414 0M113.8 323h386.4M113.8 461h386.4M295.5 185a391 391 0 0 0 0 414M318.5 185a391 391 0 0 1 0 414" />
                        <path id="t-code" d="M192 300l-92 92 92 92M422 300l92 92-92 92M353 208l-92 368" />
                        <path id="t-design" d="M100 599v-92a92 92 0 1 1 92 92h-92M514 185a368 368 0 0 0-294.4 234.6M514 185a368 368 0 0 1-234.6 294.4M274.8 323a207 207 0 0 1 101.2 101.2" />
                        <path id="t-photo" d="M146 277h23a46 46 0 0 0 46-46 23 23 0 0 1 23-23h138a23 23 0 0 1 23 23 46 46 0 0 0 46 46h23a46 46 0 0 1 46 46v207a46 46 0 0 1-46 46H146a46 46 0 0 1-46-46V323a46 46 0 0 1 46-46M238 415a69 69 0 1 0 138 0 69 69 0 0 0-138 0" />
                    </g>

                    {/* FILLS */}
                    <path className="fill-layer" id="fA" d="M 340 16 C 152 16 16 178 16 388 L 16 768 L 168 768 L 168 562 L 443 562 L 443 768 L 598 768 L 598 388 C 598 178 488 16 340 16 Z" fill="#ebeef3" clipPath="url(#cutA)"/>
                    <path className="fill-layer" id="fAH" d="M 340 150 C 250 150 168 248 168 378 L 168 448 L 443 448 L 443 378 C 443 248 398 150 340 150 Z" fill="#f7f8fa"/>
                    <path className="fill-layer" id="fK" d="M 483 142 L 483 768 L 633 768 L 633 552 L 783 768 L 928 768 L 743 462 L 903 142 L 733 142 L 633 362 L 633 142 Z" fill="url(#gGreen)"/>

                    {/* STROKES */}
                    <path className="stroke-path" id="sA" d="M 340 16 C 152 16 16 178 16 388 L 16 768 L 168 768 L 168 562 L 443 562 L 443 768 L 598 768 L 598 388 C 598 178 488 16 340 16 Z" stroke="#1a2e44" strokeWidth="14" fill="none"/>
                    <path className="stroke-path" id="sAI" d="M 340 150 C 250 150 168 248 168 378 L 168 448 L 443 448 L 443 378 C 443 248 398 150 340 150 Z" stroke="#1a2e44" strokeWidth="12" fill="none"/>
                    <path className="stroke-path" id="sK" d="M 483 142 L 483 768 L 633 768 L 633 552 L 783 768 L 928 768 L 743 462 L 903 142 L 733 142 L 633 362 L 633 142 Z" stroke="#1a2e44" strokeWidth="14" fill="none"/>

                    <line className="stroke-path" id="sSep" x1="82" y1="816" x2="668" y2="816" stroke="#c8cdd4" strokeWidth="1.5" fill="none"/>

                    {/* KREATIF */}
                    <g className="letter" id="tK">
                        <rect className="stroke-path lbox" x="82" y="840" width="64" height="115" rx="15" stroke="#1a2e44" strokeWidth="6.5" fill="none"/>
                        <line className="stroke-path lch" x1="101" y1="860" x2="101" y2="942" stroke="#1a2e44" strokeWidth="11" strokeLinecap="round"/>
                        <line className="stroke-path lch" x1="103" y1="903" x2="133" y2="864" stroke="#1a2e44" strokeWidth="9" strokeLinecap="round"/>
                        <line className="stroke-path lch" x1="108" y1="909" x2="135" y2="944" stroke="#1a2e44" strokeWidth="9" strokeLinecap="round"/>
                    </g>
                    <g className="letter" id="tR">
                        <rect className="stroke-path lbox" x="168" y="840" width="64" height="115" rx="15" stroke="#1a2e44" strokeWidth="6.5" fill="none"/>
                        <path className="stroke-path lch" d="M 188 944 L 188 860 L 210 860 C 224 860 228 874 223 886 C 219 894 212 897 208 897" stroke="#1a2e44" strokeWidth="9" strokeLinecap="round" fill="none"/>
                        <line className="stroke-path lch" x1="206" y1="897" x2="225" y2="944" stroke="#1a2e44" strokeWidth="9" strokeLinecap="round"/>
                    </g>
                    <g className="letter" id="tE">
                        <rect className="stroke-path lbox" x="254" y="840" width="64" height="115" rx="15" stroke="#1a2e44" strokeWidth="6.5" fill="none"/>
                        <path className="stroke-path lch" d="M 300 864 L 274 864 L 274 942 L 300 942" stroke="#1a2e44" strokeWidth="9" strokeLinecap="round" fill="none"/>
                        <line className="stroke-path lch" x1="274" y1="902" x2="296" y2="902" stroke="#1a2e44" strokeWidth="8" strokeLinecap="round"/>
                    </g>
                    <g className="letter" id="tA">
                        <rect className="stroke-path lbox" x="340" y="840" width="64" height="115" rx="15" stroke="#1a2e44" strokeWidth="6.5" fill="none"/>
                        <path className="stroke-path lch" d="M 358 944 L 372 860 L 386 944" stroke="#1a2e44" strokeWidth="9" strokeLinecap="round" fill="none"/>
                        <line className="stroke-path lch" x1="363" y1="920" x2="381" y2="920" stroke="#1a2e44" strokeWidth="7" strokeLinecap="round"/>
                    </g>
                    <g className="letter" id="tT">
                        <rect className="stroke-path lbox" x="426" y="840" width="64" height="115" rx="15" stroke="#1a2e44" strokeWidth="6.5" fill="none"/>
                        <line className="stroke-path lch" x1="444" y1="864" x2="472" y2="864" stroke="#1a2e44" strokeWidth="9" strokeLinecap="round"/>
                        <line className="stroke-path lch" x1="458" y1="864" x2="458" y2="944" stroke="#1a2e44" strokeWidth="9" strokeLinecap="round"/>
                    </g>
                    <g className="letter" id="tI">
                        <rect className="stroke-path lbox" x="512" y="840" width="44" height="115" rx="15" stroke="#1a2e44" strokeWidth="6.5" fill="none"/>
                        <line className="stroke-path lch" x1="534" y1="862" x2="534" y2="944" stroke="#1a2e44" strokeWidth="11" strokeLinecap="round"/>
                    </g>
                    <g className="letter" id="tF">
                        <rect className="stroke-path lbox" x="578" y="840" width="64" height="115" rx="15" stroke="#1a2e44" strokeWidth="6.5" fill="none"/>
                        <path className="stroke-path lch" d="M 598 944 L 598 862 L 628 862" stroke="#1a2e44" strokeWidth="9" strokeLinecap="round" fill="none"/>
                        <line className="stroke-path lch" x1="598" y1="902" x2="622" y2="902" stroke="#1a2e44" strokeWidth="8" strokeLinecap="round"/>
                    </g>

                    <circle className="fill-layer" id="dotAccent" cx="680" cy="900" r="4" fill="#3ecfa0"/>
                </svg>

                <div id="sep" className="w-0 h-[1.5px] mt-[22px] mx-auto opacity-0 max-w-[240px] rounded-sm" style={{ background: 'linear-gradient(90deg, transparent, #1a2e44, #3ecfa0, #1a2e44, transparent)' }}></div>
                <div id="tagline" className="mt-[14px] text-[11px] font-semibold tracking-[5px] uppercase text-[#1a2e44] opacity-0 text-center translate-y-[6px]">Creative Design Studio</div>
            </div>
        </div>
    );
}
