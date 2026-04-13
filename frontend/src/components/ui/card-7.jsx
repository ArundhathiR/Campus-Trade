"use client";

import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GlowCard } from "./spotlight-card";

export function InteractiveProductCard({
    className,
    productId,
    imageUrl,
    logoUrl,
    title,
    description,
    price,
}) {
    const tiltRef = useRef(null);
    const navigate = useNavigate();

    const handleMouseMove = (e) => {
        const card = tiltRef.current;
        if (!card) return;

        const { left, top, width, height } = card.getBoundingClientRect();
        const x = e.clientX - left;
        const y = e.clientY - top;

        // Calculate rotation angles
        const rotateX = ((y - height / 2) / height) * 15;
        const rotateY = ((x - width / 2) / width) * -15;

        // Apply 3D transform with a slight scale on hover
        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    };

    const handleMouseLeave = () => {
        const card = tiltRef.current;
        if (!card) return;
        // Reset transform on mouse leave
        card.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
    };

    return (
        <div
            className={`flex w-full justify-center px-4 py-4 ${className || ""}`}
            style={{ perspective: "1000px" }}
        >
            <GlowCard
                customSize={true}
                glowColor="blue"
                className="w-full max-w-sm rounded-[24px] overflow-visible z-10"
            >
                <div
                    ref={tiltRef}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => navigate(`/product/${productId}`)}
                    className="group relative w-full h-full rounded-[24px] border border-white/60 bg-white/80 backdrop-blur-2xl p-6 shadow-xl transition-transform duration-300 ease-out hover:shadow-2xl cursor-pointer"
                    style={{ transformStyle: "preserve-3d" }}
                >
                    {/* Title with translateZ for depth effect */}
                    <h2
                        className="text-2xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-600 truncate drop-shadow-sm"
                        style={{ transform: "translateZ(50px)" }}
                    >
                        {title}
                    </h2>

                    {/* Description / Category */}
                    <p
                        className="mt-2 text-xs font-semibold text-indigo-500/80 uppercase tracking-[0.2em] truncate"
                        style={{ transform: "translateZ(60px)" }}
                    >
                        {description}
                    </p>

                    {/* Image pushing super far out */}
                    <div
                        className="mt-6 w-full relative"
                        style={{ transform: "translateZ(90px)" }}
                    >
                        <img
                            src={imageUrl}
                            alt={title}
                            className="h-56 w-full rounded-2xl object-cover transition-transform duration-500 group-hover:scale-[1.03] group-hover:shadow-[0_20px_40px_rgba(59,130,246,0.3)] bg-white"
                        />
                        {/* Price Tag Floating over Image */}
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-xl px-5 py-2 rounded-full shadow-lg border border-white/40">
                            <span className="font-extrabold text-blue-600 text-[15px] tracking-tight">₹{price}</span>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="mt-8 flex items-center justify-between pointer-events-none">
                        <span
                            className="text-[13px] font-bold text-slate-400 group-hover:text-blue-500 transition-colors tracking-wide"
                            style={{ transform: "translateZ(30px)" }}
                        >
                            CampusTrade
                        </span>
                        <button
                            className="rounded-full bg-gradient-to-r from-slate-900 to-slate-800 px-7 py-2.5 text-sm font-bold tracking-wide text-white transition-all duration-300 hover:from-blue-600 hover:to-indigo-600 shadow-md hover:shadow-indigo-500/40 pointer-events-auto border border-slate-700/50 hover:border-indigo-400/50"
                            style={{ transform: "translateZ(30px)" }}
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                navigate(`/product/${productId}`);
                            }}
                        >
                            Details ✦
                        </button>
                    </div>
                </div>
            </GlowCard>
        </div>
    );
}

export default InteractiveProductCard;
