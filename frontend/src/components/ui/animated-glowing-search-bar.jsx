"use client";

import React from 'react';

export const AnimatedGlowingSearchBar = ({ value, onChange, placeholder = "Search for gear..." }) => {
    return (
        <div className="relative flex items-center justify-center w-full my-6 z-[100]">
            <div className="relative flex items-center justify-center group w-full max-w-[650px]">
                {/* Layer 1 - Outer Glow Ring */}
                <div className="absolute z-[-1] overflow-hidden h-full w-full max-h-[84px] max-w-[625px] rounded-[24px] blur-[8px] 
                        before:absolute before:content-[''] before:z-[-2] before:w-[1500px] before:h-[1500px] before:bg-no-repeat before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-60
                        before:bg-[conic-gradient(transparent,#8b5cf6_5%,transparent_38%,transparent_50%,#3b82f6_60%,transparent_87%)] before:transition-all before:duration-[2000ms]
                        group-hover:before:rotate-[-120deg] group-focus-within:before:rotate-[420deg] group-focus-within:before:duration-[4000ms]">
                </div>

                {/* Layer 2 - Mid Glow Ring */}
                <div className="absolute z-[-1] overflow-hidden h-full w-full max-h-[79px] max-w-[615px] rounded-[20px] blur-[5px] 
                        before:absolute before:content-[''] before:z-[-2] before:w-[1200px] before:h-[1200px] before:bg-no-repeat before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-[82deg]
                        before:bg-[conic-gradient(rgba(255,255,255,0),#8b5cf6,rgba(255,255,255,0)_10%,rgba(255,255,255,0)_50%,#ec4899,rgba(255,255,255,0)_60%)] before:transition-all before:duration-[2000ms]
                        group-hover:before:rotate-[-98deg] group-focus-within:before:rotate-[442deg] group-focus-within:before:duration-[4000ms]">
                </div>

                {/* Layer 3 - Core Glow Ring */}
                <div className="absolute z-[-1] overflow-hidden h-full w-full max-h-[75px] max-w-[608px] rounded-[18px] blur-[3px] 
                        before:absolute before:content-[''] before:z-[-2] before:w-[1200px] before:h-[1200px] before:bg-no-repeat before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:rotate-[83deg]
                        before:bg-[conic-gradient(rgba(255,255,255,0)_0%,#3b82f6,rgba(255,255,255,0)_8%,rgba(255,255,255,0)_50%,#8b5cf6,rgba(255,255,255,0)_58%)] before:brightness-[1.2]
                        before:transition-all before:duration-[2000ms] group-hover:before:rotate-[-97deg] group-focus-within:before:rotate-[443deg] group-focus-within:before:duration-[4000ms]">
                </div>

                {/* Main Input Container */}
                <div className="relative group flex items-center shadow-[0_20px_50px_rgba(139,92,246,0.3)] rounded-2xl w-full max-w-[600px] transition-transform duration-500 hover:scale-[1.02]">
                    <input
                        placeholder={placeholder}
                        type="text"
                        value={value}
                        onChange={onChange}
                        className="bg-white/95 border border-white/60 w-full h-[70px] rounded-2xl text-slate-800 px-[70px] text-[18px] font-bold tracking-wide focus:outline-none placeholder-slate-400 group-hover:bg-white transition-colors duration-500 backdrop-blur-xl"
                    />

                    {/* Animated Overlay Masks for Light Theme */}
                    <div className="pointer-events-none w-[150px] h-[25px] absolute bg-gradient-to-r from-transparent to-white/90 top-[22px] left-[70px] group-focus-within:hidden group-hover:to-white transition-colors duration-500"></div>

                    <div className="pointer-events-none w-[35px] h-[25px] absolute bg-[#8b5cf6] top-[22px] left-[18px] blur-[20px] opacity-30 transition-all duration-1000 group-hover:opacity-0 group-focus-within:opacity-0 mix-blend-multiply"></div>

                    {/* Custom Chrome Search Vector Node formatted for Light Theme */}
                    <div className="absolute left-7 top-[23px] pointer-events-none shadow-aurora">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" height="24" fill="none" className="feather feather-search">
                            <circle stroke="url(#search)" r="8" cy="11" cx="11"></circle>
                            <line stroke="url(#searchl)" y2="16.65" y1="22" x2="16.65" x1="22"></line>
                            <defs>
                                <linearGradient gradientTransform="rotate(50)" id="search">
                                    <stop stopColor="#8b5cf6" offset="0%"></stop>
                                    <stop stopColor="#3b82f6" offset="100%"></stop>
                                </linearGradient>
                                <linearGradient id="searchl">
                                    <stop stopColor="#3b82f6" offset="0%"></stop>
                                    <stop stopColor="#8b5cf6" offset="100%"></stop>
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnimatedGlowingSearchBar;
