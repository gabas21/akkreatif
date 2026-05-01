import { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}) => {
  const containerRef = useRef(null);
  const scrollerRef = useRef(null);

  useEffect(() => {
    addAnimation();
  }, []);

  const addAnimation = () => {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        scrollerRef.current.appendChild(duplicatedItem);
      });
      setDirection();
      setSpeed();
    }
  };

  const setDirection = () => {
    if (containerRef.current) {
      containerRef.current.style.setProperty(
        "--animation-direction",
        direction === "left" ? "forwards" : "reverse"
      );
    }
  };

  const setSpeed = () => {
    if (containerRef.current) {
      const speeds = { fast: "20s", normal: "40s", slow: "80s" };
      containerRef.current.style.setProperty(
        "--animation-duration",
        speeds[speed] ?? "40s"
      );
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-6 py-4",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
        style={{
          animation: "scroll var(--animation-duration,40s) linear var(--animation-direction,forwards) infinite",
        }}
      >
        {items.map((item, idx) => (
          <li
            key={idx}
            className="relative w-[380px] max-w-full shrink-0 rounded-3xl border border-border bg-surface px-10 py-8"
          >
            {/* Quote icon */}
            <div className="absolute top-6 right-8 text-secondary/20">
              <svg className="h-10 w-10" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>
            <blockquote>
              <p className="font-body text-base leading-relaxed text-text-primary italic mb-8">
                "{item.quote}"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center shrink-0">
                  <span className="font-display font-bold text-secondary text-sm">
                    {item.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-display font-semibold text-primary text-sm">{item.name}</p>
                  <p className="font-body text-xs uppercase tracking-widest text-text-muted mt-0.5">{item.title}</p>
                </div>
              </div>
            </blockquote>
          </li>
        ))}
      </ul>
      <style>{`
        @keyframes scroll {
          to { transform: translate(calc(-50% - 12px)); }
        }
      `}</style>
    </div>
  );
};
