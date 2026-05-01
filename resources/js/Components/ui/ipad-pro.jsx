import React from "react";
import { cn } from "@/lib/utils";

export function IpadPro({
  className,
  children,
  src,
  ...props
}) {
  return (
    <div
      className={cn(
        "relative bg-[#0a0a0b] border-[14px] border-[#1d1d1f] rounded-[2.5rem] h-[410px] w-[550px] shadow-[0_30px_80px_rgba(0,0,0,0.8),_inset_0_0_0_1px_rgba(255,255,255,0.05)] origin-center transition-transform",
        className
      )}
      {...props}
    >
      {/* Top Buttons (Landscape) */}
      <div className="absolute -top-[15px] left-[60px] w-[45px] h-[3px] bg-[#2a2a2b] rounded-t-sm shadow-inner" />
      <div className="absolute -top-[15px] left-[120px] w-[45px] h-[3px] bg-[#2a2a2b] rounded-t-sm shadow-inner" />
      <div className="absolute top-[40px] -right-[15px] w-[3px] h-[40px] bg-[#2a2a2b] rounded-r-sm shadow-inner" />

      {/* Frame Screen Area */}
      <div className="relative w-full h-full rounded-[1.75rem] overflow-hidden bg-zinc-950 border border-white/5 flex justify-center items-center z-10">
        
        {/* Camera Pill Notch (Landscape) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80px] h-[20px] bg-black rounded-b-[12px] z-50 flex items-center justify-center shadow-md">
           <div className="w-[8px] h-[8px] rounded-full bg-zinc-900 border border-white/5 mx-1" />
           <div className="w-[4px] h-[4px] rounded-full bg-emerald-500/80 blur-[0.5px] mx-1" />
        </div>

        {src ? (
          <img src={src} alt="App preview" className="w-full h-full object-cover" />
        ) : (
          children
        )}

        {/* Home Indicator (Landscape) */}
        <div className="absolute bottom-[6px] left-1/2 -translate-x-1/2 w-1/3 h-[5px] bg-white/20 rounded-full pointer-events-none z-50" />
      </div>

      {/* Glossy Reflection */}
      <div className="absolute inset-0 pointer-events-none rounded-[2rem] shadow-[inset_0_0_15px_rgba(255,255,255,0.02)] z-20" />
    </div>
  );
}
