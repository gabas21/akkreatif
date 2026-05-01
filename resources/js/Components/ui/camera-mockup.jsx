import React from 'react';
import { cn } from '@/lib/utils';

export function CameraMockup({ children, className }) {
    return (
        <div className={cn('relative w-[800px] h-[520px]', className)}>
            {/* Flash/Viewfinder hump (Top center) */}
            <div className="absolute top-[-30px] left-1/2 -translate-x-1/2 w-[180px] h-[40px] bg-zinc-800 rounded-t-2xl border-t border-zinc-600 shadow-[inset_0_2px_10px_rgba(255,255,255,0.1)]">
                {/* Hot shoe */}
                 <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60px] h-[6px] bg-zinc-900 rounded-b-sm border-b border-x border-zinc-700 flex justify-center">
                    <div className="w-4 h-full bg-zinc-600" />
                 </div>
                 {/* Viewfinder eyepiece protruding back */}
                 <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[80px] h-[30px] bg-zinc-950 rounded-b-xl border border-zinc-800 shadow-xl z-20">
                     <div className="absolute inset-1 rounded-b-lg border-b-4 border-zinc-900" />
                 </div>
            </div>

            {/* Left Top Dial */}
            <div className="absolute top-[-15px] left-[15%] w-[80px] h-[20px] bg-zinc-800 rounded-t-lg border-t-2 border-zinc-600 flex overflow-hidden">
                <div className="w-full h-full flex gap-[2px]">
                    {[...Array(15)].map((_, i) => (
                        <div key={i} className="w-[3px] h-full bg-zinc-900" />
                    ))}
                </div>
            </div>
            
            {/* Right Top Dial */}
            <div className="absolute top-[-20px] right-[18%] w-[100px] h-[25px] bg-zinc-700 rounded-t-lg border-t-2 border-zinc-400 flex justify-end px-2 overflow-hidden shadow-[inset_0_2px_4px_rgba(255,255,255,0.3)]">
                <div className="w-full h-full flex gap-[2px] items-end">
                    {[...Array(20)].map((_, i) => (
                        <div key={i} className="w-[3px] h-[80%] bg-zinc-900" />
                    ))}
                </div>
            </div>
            
            {/* Shutter Button (Top Right edge) */}
            <div className="absolute top-[-10px] right-[8%] w-[40px] h-[15px] bg-zinc-300 rounded-t-full border-t border-white shadow-[0_-2px_5px_rgba(255,255,255,0.5)]" />

            {/* Strap Lugs */}
            <div className="absolute top-[20%] left-[-10px] w-[15px] h-[25px] bg-zinc-400 rounded-l-md border-y border-l border-zinc-500 shadow-md flex items-center">
                <div className="w-[10px] h-[15px] border-2 border-zinc-600 rounded-sm ml-1" />
            </div>
            <div className="absolute top-[20%] right-[-10px] w-[15px] h-[25px] bg-zinc-400 rounded-r-md border-y border-r border-zinc-500 shadow-md flex items-center justify-end">
                <div className="w-[10px] h-[15px] border-2 border-zinc-600 rounded-sm mr-1" />
            </div>

            {/* Main Body */}
            <div className="relative w-full h-full bg-zinc-800 rounded-3xl shadow-2xl border border-zinc-700 p-5 flex gap-5 overflow-hidden ring-1 ring-black/50">
                {/* Leather Texture overlay */}
                <div className="absolute inset-0 opacity-30 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#111 1px, transparent 1px)', backgroundSize: '4px 4px' }} />
                
                {/* Right hand grip bump shadow */}
                <div className="absolute right-0 top-0 bottom-0 w-[30%] bg-gradient-to-l from-black/60 to-transparent pointer-events-none" />

                {/* Left Side: The Screen (where children go) */}
                <div className="relative z-10 w-[620px] h-full bg-black rounded-xl border-[14px] border-zinc-900 flex flex-col overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.8)] border-b-[20px]">
                    {/* Screen logo */}
                    <div className="absolute bottom-[-16px] left-1/2 -translate-x-1/2 text-[8px] font-bold tracking-widest text-white/30 z-50">LUMIX</div>

                    {/* Viewfinder UI Overlay */}
                    <div className="absolute inset-0 z-50 pointer-events-none mix-blend-screen">
                        {/* Corner Brackets */}
                        <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-white/70" />
                        <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-white/70" />
                        <div className="absolute bottom-12 left-4 w-8 h-8 border-b-2 border-l-2 border-white/70" />
                        <div className="absolute bottom-12 right-4 w-8 h-8 border-b-2 border-r-2 border-white/70" />
                        
                        {/* Center Crosshair & AF Points */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 border border-white/40 rounded-sm flex items-center justify-center">
                            <div className="w-1.5 h-1.5 bg-red-500/90 rounded-full" />
                        </div>
                        <div className="absolute top-1/2 left-[30%] -translate-x-1/2 -translate-y-1/2 w-8 h-8 border border-white/20 rounded-sm" />
                        <div className="absolute top-1/2 right-[30%] -translate-x-1/2 -translate-y-1/2 w-8 h-8 border border-white/20 rounded-sm" />
                        
                        {/* Rule of thirds grid */}
                        <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 opacity-10">
                            <div className="border-r border-b border-white" />
                            <div className="border-r border-b border-white" />
                            <div className="border-b border-white" />
                            <div className="border-r border-b border-white" />
                            <div className="border-r border-b border-white" />
                            <div className="border-b border-white" />
                            <div className="border-r border-white" />
                            <div className="border-r border-white" />
                            <div className="" />
                        </div>

                        {/* Bottom Status Bar */}
                        <div className="absolute bottom-0 left-0 right-0 h-10 bg-black/50 backdrop-blur-md flex items-center justify-between px-4 text-[11px] font-mono text-green-400 font-bold border-t border-white/10">
                            <div className="flex gap-4">
                                <span className="bg-white/20 px-1 text-white rounded-sm">M</span>
                                <span>1/125</span>
                                <span>F2.8</span>
                                <span className="flex items-center gap-1"><span className="text-white/70">ISO</span> 400</span>
                                <span>+0.3</span>
                            </div>
                            <div className="flex gap-4 items-center">
                                <span className="bg-white/20 px-1 text-white rounded-sm font-sans tracking-wide">RAW+J</span>
                                <span className="flex items-center gap-0.5 text-white/80" title="Continuous High">
                                    <div className="relative w-3 h-3">
                                        <div className="absolute top-0 right-0 w-2 h-2 border border-white/80 rounded-[1px] bg-black/50" />
                                        <div className="absolute top-0.5 right-0.5 w-2 h-2 border border-white/80 rounded-[1px] bg-black/50" />
                                        <div className="absolute top-1 right-1 w-2 h-2 border border-white/80 rounded-[1px] bg-black" />
                                    </div>
                                </span>
                                <span className="tracking-wider">[ 1423 ]</span>
                                <span className="flex items-center border border-green-400 px-1 h-3 rounded-[2px] relative before:absolute before:-right-[2px] before:w-[2px] before:h-1.5 before:bg-green-400">
                                    <div className="w-1.5 h-full bg-green-400" /><div className="w-1.5 h-full bg-green-400 border-l border-black" /><div className="w-1.5 h-full bg-green-400 border-l border-black" />
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Content (Image/Video) */}
                    <div className="absolute inset-0 z-10 bg-zinc-900 overflow-hidden flex items-center justify-center">
                        {children}
                    </div>
                </div>

                {/* Right Side: Physical Buttons */}
                <div className="relative z-10 flex-1 flex flex-col py-2 items-center">
                    {/* Thumb grip area */}
                    <div className="absolute top-2 right-[-10px] w-8 h-24 bg-black/20 rounded-l-full pointer-events-none" />

                    {/* Top Right Buttons */}
                    <div className="w-full flex justify-end gap-3 px-4 pt-2">
                        <div className="flex flex-col items-center">
                            <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-700 shadow-[inset_0_2px_4px_rgba(0,0,0,0.5),0_1px_2px_rgba(255,255,255,0.1)] flex items-center justify-center text-white/40 text-[9px] font-bold cursor-pointer hover:bg-zinc-800 active:scale-95 transition-all">AF ON</div>
                        </div>
                        <div className="flex flex-col items-center">
                            <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-700 shadow-[inset_0_2px_4px_rgba(0,0,0,0.5),0_1px_2px_rgba(255,255,255,0.1)] flex items-center justify-center text-white/40 text-[9px] font-bold cursor-pointer hover:bg-zinc-800 active:scale-95 transition-all">AEL</div>
                        </div>
                    </div>

                    {/* D-Pad (Multi-selector) */}
                    <div className="relative w-24 h-24 rounded-full bg-zinc-950 border border-zinc-800 shadow-[0_2px_5px_rgba(0,0,0,0.5),inset_0_2px_5px_rgba(255,255,255,0.05)] flex items-center justify-center mt-8">
                        <div className="absolute top-2 w-4 h-4 text-white/30 text-[10px] flex justify-center cursor-pointer hover:text-white transition-colors">▲</div>
                        <div className="absolute bottom-2 w-4 h-4 text-white/30 text-[10px] flex justify-center cursor-pointer hover:text-white transition-colors">▼</div>
                        <div className="absolute left-2 w-4 h-4 text-white/30 text-[10px] flex items-center cursor-pointer hover:text-white transition-colors">◀</div>
                        <div className="absolute right-2 w-4 h-4 text-white/30 text-[10px] flex items-center cursor-pointer hover:text-white transition-colors">▶</div>
                        
                        {/* Center OK button */}
                        <div className="w-10 h-10 rounded-full bg-zinc-800 border-2 border-zinc-900 shadow-md flex items-center justify-center text-white/60 text-[10px] font-bold cursor-pointer hover:bg-zinc-700 active:scale-95 transition-all">OK</div>
                        
                        {/* Rotary Dial Ring Texture */}
                        <div className="absolute inset-1 rounded-full border border-dashed border-zinc-700/50 pointer-events-none" />
                    </div>

                    {/* Bottom Buttons Grid */}
                    <div className="w-full grid grid-cols-2 gap-y-6 gap-x-2 px-2 mt-8">
                        <div className="flex flex-col items-center gap-1.5 cursor-pointer group">
                            <div className="w-7 h-7 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center shadow-inner group-hover:bg-zinc-800 group-active:scale-95 transition-all"><div className="w-3 h-2 border-[1.5px] border-white/40 rounded-[2px]" /></div>
                            <span className="text-[8px] text-white/40 font-sans tracking-wider">MENU</span>
                        </div>
                        <div className="flex flex-col items-center gap-1.5 cursor-pointer group">
                            <div className="w-7 h-7 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center shadow-inner group-hover:bg-zinc-800 group-active:scale-95 transition-all">
                                <svg className="w-3 h-3 text-white/40 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                            </div>
                            <span className="text-[8px] text-white/40 font-sans tracking-wider">PLAY</span>
                        </div>
                        <div className="flex flex-col items-center gap-1.5 cursor-pointer group">
                            <div className="w-7 h-7 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center shadow-inner group-hover:bg-zinc-800 group-active:scale-95 transition-all">
                                <span className="text-[12px] text-white/40 font-serif italic">i</span>
                            </div>
                            <span className="text-[8px] text-white/40 font-sans tracking-wider">INFO</span>
                        </div>
                        <div className="flex flex-col items-center gap-1.5 cursor-pointer group">
                            <div className="w-7 h-7 rounded-full bg-zinc-900 border border-zinc-700 flex items-center justify-center shadow-inner group-hover:bg-zinc-800 group-active:scale-95 transition-all">
                                <svg className="w-3.5 h-3.5 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                            </div>
                            <span className="text-[8px] text-white/40 font-sans tracking-wider">DELETE</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
