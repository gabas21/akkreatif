"use client";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  IconCode,
  IconBrowser,
  IconCamera,
  IconVideo,
  IconBrush,
  IconDeviceMobile,
  IconColorSwatch,
} from "@tabler/icons-react";

const iconsList = [
  IconCode,
  IconBrowser,
  IconCamera,
  IconVideo,
  IconBrush,
  IconDeviceMobile,
  IconColorSwatch,
];

const random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const FloatingIcons = ({
  id,
  className,
  background = "transparent",
  minSize = 20,
  maxSize = 40,
  particleDensity = 25,
  particleColor = "#22c55e",
}) => {
  const [nodes, setNodes] = useState([]);

  useEffect(() => {
    const newNodes = Array.from({ length: particleDensity }).map((_, i) => ({
      id: i,
      x: `${random(5, 95)}%`,
      y: `${random(5, 95)}%`,
      size: random(minSize, maxSize),
      delay: `${random(0, 5000)}ms`,
      duration: `${random(4000, 10000)}ms`,
      rotation: random(0, 360),
      IconComponent: iconsList[random(0, iconsList.length - 1)],
    }));
    setNodes(newNodes);
  }, [particleDensity, minSize, maxSize]);

  return (
    <div
      id={id}
      className={cn("absolute inset-0 overflow-hidden", className)}
      style={{ background }}
    >
      {nodes.map((node) => (
        <span
          key={node.id}
          className="absolute text-secondary opacity-0"
          style={{
            left: node.x,
            top: node.y,
            color: particleColor,
            animation: `floatIcon ${node.duration} ${node.delay} infinite ease-in-out alternate`,
            transform: `rotate(${node.rotation}deg)`,
          }}
        >
          <node.IconComponent size={node.size} stroke={1.5} />
        </span>
      ))}
      <style>{`
        @keyframes floatIcon {
          0% { opacity: 0; transform: translateY(20px) rotate(0deg) scale(0.8); }
          50% { opacity: 0.5; transform: translateY(-20px) rotate(180deg) scale(1); }
          100% { opacity: 0; transform: translateY(-40px) rotate(360deg) scale(0.8); }
        }
      `}</style>
    </div>
  );
};
