import React from "react";
import { cn } from "@/lib/utils";

export function Iphone15Pro({
  className,
  children,
  src,
  ...props
}) {
  return (
    <div
      className={cn(
        "relative mx-auto mt-8 xl:mt-12 bg-black border-[12px] border-[#1d1d1f] rounded-[3rem] h-[650px] w-[320px] shadow-[0_0_0_1px_rgba(255,255,255,0.05),_0_30px_60px_-10px_rgba(0,0,0,0.8)] filter drop-shadow-2xl flex-shrink-0 origin-center transition-transform",
        className
      )}
      {...props}
    >
      {/* Hardware Buttons */}
      <div className="w-[3px] h-[26px] bg-[#2a2a2b] absolute -left-[15px] top-[110px] rounded-l-sm shadow-inner" />
      <div className="w-[3px] h-[55px] bg-[#2a2a2b] absolute -left-[15px] top-[155px] rounded-l-sm shadow-inner" />
      <div className="w-[3px] h-[55px] bg-[#2a2a2b] absolute -left-[15px] top-[225px] rounded-l-sm shadow-inner" />
      <div className="w-[3px] h-[85px] bg-[#2a2a2b] absolute -right-[15px] top-[180px] rounded-r-sm shadow-inner" />
      
      {/* Antenna Lines */}
      <div className="w-full h-px bg-[#2a2a2b] absolute top-[40px] left-0 pointer-events-none z-0" />
      <div className="w-full h-px bg-[#2a2a2b] absolute bottom-[40px] left-0 pointer-events-none z-0" />

      {/* Frame Screen Area */}
      <div className="relative w-full h-full rounded-[2.25rem] overflow-hidden bg-zinc-950 flex flex-col items-center z-10 border border-white/5">
        {/* Dynamic Island */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[110px] h-[30px] bg-black rounded-[20px] z-50 flex items-center justify-between px-2.5 shadow-md">
            <span className="text-[7px] text-zinc-500 font-mono tracking-widest uppercase">AirPods Pro</span>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 blur-[1px]" />
        </div>
        
        {/* Inner Content or Image */}
        {src ? (
          <img
            src={src}
            alt="App preview"
            className="w-full h-full object-cover object-top"
          />
        ) : (
          children
        )}

        {/* Home Indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1/3 h-[4px] bg-white/20 rounded-full z-50" />
      </div>
      
      {/* Glossy Bezel Flare */}
      <div className="absolute inset-0 pointer-events-none rounded-[3rem] shadow-[inset_0_0_15px_rgba(255,255,255,0.02)] z-20" />
    </div>
  );
}
