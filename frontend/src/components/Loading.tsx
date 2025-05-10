import { motion, useAnimate } from "framer-motion";
import { useEffect } from "react";
export default function SvgPathLoader() {
    const [scope, animate] = useAnimate();

    useEffect(() => {
        const animateLoader = async () => {
            const duration = 2;
            const repeat = Infinity;
            const ease = "linear";

            animate([
                [".L1", { pathLength: 0.5, pathOffset: 0 }],
                [".L1", { pathLength: 0.005, pathOffset: 0 }],
                [".L2", { pathLength: 0.5, pathOffset: 0.5 }, { at: "<" }]
            ], { duration, ease, repeat });

            animate([
                [".O1", { pathLength: 1.1, pathOffset: 0 }],
                [".O1", { pathLength: 0, pathOffset: 0 }]
            ], { duration: 1.8, repeat, repeatDelay: 0.6 });

            animate([
                [".A1", { pathLength: 0.5, pathOffset: 0 }],
                [".A1", { pathLength: 0.005, pathOffset: 0 }],
                [".A2", { pathLength: 0.5, pathOffset: 0.5 }, { at: "<" }]
            ], { duration, ease, repeat });

            animate([
                [".D1", { pathLength: 0.5, pathOffset: 0 }],
                [".D1", { pathLength: 0.005, pathOffset: 0 }],
                [".D2", { pathLength: 0.5, pathOffset: 0.5 }, { at: "<" }]
            ], { duration, ease, repeat });

            animate([
                [".I", { pathLength: 1, pathOffset: 1 }],
                [".I", { pathLength: 0, pathOffset: 0 }]
            ], { duration, ease, repeat });

            animate([
                [".N", { pathLength: 1, pathOffset: 1 }],
                [".N", { pathLength: 0, pathOffset: 0 }]
            ], { duration, ease, repeat });

            animate([
                [".G", { pathLength: 1, pathOffset: 1 }],
                [".G", { pathLength: 0, pathOffset: 0 }]
            ], { duration, ease, repeat });
        };
        animateLoader();
    }, []);

    return (
        <div className="flex justify-center items-center w-full h-screen bg-white">
            <svg
                ref={scope}
                viewBox="0 0 600 100"
                width="600"
                height="100"
                fill="none"
                className="[&>path]:stroke-black [&>path]:stroke-[1.7] [&>path]:fill-none"
            >
                {/* L */}
                <motion.path className="L1 text-green-800" initial={{ pathLength: 0.5, pathOffset: 0.5 }} d="M 10,10 V 80 H 50" />
                <motion.path className="L2 text-green-800" initial={{ pathLength: 0, pathOffset: 1 }} d="M 10,10 V 80 H 50" />

                {/* O */}
                <motion.circle className="O1 text-green-800" initial={{ pathLength: 1.1, pathOffset: 1 }} cx="100" cy="45" r="35" />

                {/* A */}
                <motion.path className="A1 text-green-800" initial={{ pathLength: 0.5, pathOffset: 0.5 }} d="M 150,80 L 170,10 L 190,80" />
                <motion.path className="A2 text-green-800" initial={{ pathLength: 0, pathOffset: 1 }} d="M 160,50 H 180" />

                {/* D */}
                <motion.path className="D1 text-green-800" initial={{ pathLength: 0.5, pathOffset: 0.5 }} d="M 220,10 V 80 Q 260,80 260,45 Q 260,10 220,10 Z" />
                <motion.path className="D2 text-green-800" initial={{ pathLength: 0, pathOffset: 1 }} d="M 220,10 V 80 Q 260,80 260,45 Q 260,10 220,10 Z" />

                {/* I */}
                <motion.line className="I text-green-800" initial={{ pathLength: 0, pathOffset: 1 }} x1="290" y1="10" x2="290" y2="80" />

                {/* N */}
                <motion.path className="N text-green-800" initial={{ pathLength: 0, pathOffset: 1 }} d="M 320,80 V 10 L 370,80 V 10" />

                {/* G */}
                <motion.path className="G text-green-800" initial={{ pathLength: 0, pathOffset: 1 }} d="M 400,50 Q 400,10 440,10 H 460 V 40 H 440" />
            </svg>
        </div>
    );
}
