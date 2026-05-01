"use client";
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const SparkleInstance = ({ size, style, color }) => (
  <span style={style} className="absolute inline-block animate-ping">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 160 160"
      width={size}
      height={size}
    >
      <path
        d="M80 0 C80 0 84 80 160 80 C84 80 80 160 80 160 C80 160 76 80 0 80 C76 80 80 0 80 0 Z"
        fill={color}
      />
    </svg>
  </span>
);

export const SparklesCore = ({
  id,
  className,
  background = "transparent",
  minSize = 0.4,
  maxSize = 1,
  particleDensity = 80,
  particleColor = "#16a34a",
}) => {
  const canvasRef = useRef(null);
  const [sparks, setSparks] = useState([]);

  useEffect(() => {
    const newSparks = Array.from({ length: particleDensity }).map((_, i) => ({
      id: i,
      x: `${random(0, 100)}%`,
      y: `${random(0, 100)}%`,
      size: random(minSize * 10, maxSize * 10),
      delay: `${random(0, 3000)}ms`,
      duration: `${random(1000, 3000)}ms`,
    }));
    setSparks(newSparks);
  }, []);

  return (
    <div
      id={id}
      className={cn("absolute inset-0 overflow-hidden", className)}
      style={{ background }}
    >
      {sparks.map((spark) => (
        <span
          key={spark.id}
          className="absolute rounded-full"
          style={{
            left: spark.x,
            top: spark.y,
            width: `${spark.size}px`,
            height: `${spark.size}px`,
            backgroundColor: particleColor,
            animation: `sparkle ${spark.duration} ${spark.delay} infinite alternate`,
            opacity: Math.random(),
          }}
        />
      ))}
      <style>{`
        @keyframes sparkle {
          0% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1.5); }
          100% { opacity: 0; transform: scale(0); }
        }
      `}</style>
    </div>
  );
};
