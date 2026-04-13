"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function NavHeader({ links = [] }) {
    const [position, setPosition] = useState({
        left: 0,
        width: 0,
        opacity: 0,
    });

    return (
        <ul
            className="relative mx-auto flex w-fit rounded-full border border-slate-200 bg-white/60 backdrop-blur-xl p-1 shadow-sm"
            onMouseLeave={() => setPosition((pv) => ({ ...pv, opacity: 0 }))}
        >
            {links.map((link) => (
                <Tab key={link.to} to={link.to} setPosition={setPosition}>
                    {link.label}
                </Tab>
            ))}

            <Cursor position={position} />
        </ul>
    );
}

const Tab = ({ children, to, setPosition }) => {
    const ref = useRef(null);
    const navigate = useNavigate();

    return (
        <li
            ref={ref}
            onMouseEnter={() => {
                if (!ref.current) return;

                const { width } = ref.current.getBoundingClientRect();
                setPosition({
                    width,
                    opacity: 1,
                    left: ref.current.offsetLeft,
                });
            }}
            onClick={() => navigate(to)}
            className="relative z-10 block cursor-pointer px-4 py-2 text-sm font-bold text-slate-700 transition-colors hover:text-purple-700 md:px-6 md:py-2.5 md:text-base"
        >
            {children}
        </li>
    );
};

const Cursor = ({ position }) => {
    return (
        <motion.li
            animate={position}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="absolute z-0 h-[36px] md:h-[44px] rounded-full bg-white shadow-md border border-slate-100/50"
        />
    );
};

export default NavHeader;
