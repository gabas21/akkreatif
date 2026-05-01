import React from "react";
import { cn } from "@/lib/utils";

export function MacbookPro({
  className,
  children,
  src,
  ...props
}) {
  return (
    <div
      className={cn(
        "relative bg-black border-[12px] border-[#1d1d1f] rounded-t-[1.5rem] rounded-b-sm h-[400px] w-[640px] shadow-[0_30px_60px_rgba(0,0,0,0.9),_inset_0_0_0_1px_rgba(255,255,255,0.05)] origin-center transition-transform",
        className
      )}
      {...props}
    >
      {/* Notch & Webcam */}
      <div className="absolute top-[3px] left-1/2 -translate-x-1/2 w-[120px] h-[22px] bg-black rounded-b-[10px] z-50 flex items-center justify-center">
         <div className="w-[8px] h-[8px] rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center ml-2">
           <div className="w-[3px] h-[3px] rounded-full bg-blue-700/60 blur-[0.5px]" />
         </div>
         <div className="w-1.5 h-1.5 ml-4 rounded-full bg-emerald-500/80 blur-[1px]" />
      </div>
      
      {/* Screen Area */}
      <div className="relative w-full h-full overflow-hidden bg-zinc-950 border-t border-white/5 flex flex-col z-10 rounded-sm">
        {src ? (
          <img src={src} alt="App preview" className="w-full h-full object-cover object-top" />
        ) : (
          children
        )}
      </div>

      {/* Keyboard Base Lip */}
      <div className="absolute -bottom-[18px] -left-[24px] -right-[24px] h-[18px] bg-gradient-to-b from-[#2a2a2b] via-[#222] to-[#111] rounded-b-[2rem] z-20 flex justify-center shadow-[0_20px_40px_rgba(0,0,0,0.8)] border-t border-white/10">
        {/* Trackpad notch */}
        <div className="w-[100px] h-[4px] bg-gradient-to-b from-[#111] to-black rounded-b-[10px] opacity-80" />
      </div>

      {/* Glossy Screen Overlay */}
      <div className="absolute inset-0 pointer-events-none rounded-t-[1.5rem] shadow-[inset_0_0_15px_rgba(255,255,255,0.02)] z-20" />
    </div>
  );
}
