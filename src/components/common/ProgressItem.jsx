import { useEffect, useRef } from "react";
import { animate, motion, useInView, useMotionValue, useTransform } from "motion/react";

export default function ProgressItem({ title, progress, color, delay = 0 }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-50px" });

    const value = useMotionValue(0);
    const width = useTransform(value, (v) => `${v}%`);
    const label = useTransform(value, (v) => `${Math.round(v)}%`);

    useEffect(() => {
        if (!inView) return;
        const controls = animate(value, progress, {
            duration: 1.2,
            delay,
            ease: "easeOut",
        });
        return () => controls.stop();
    }, [inView, progress]);

    return (
        <div ref={ref}>
            <div className="flex justify-between items-center lg:text-sm font-semibold text-russian-dark-blue">
                <span>{title}</span>
                <motion.span className="text-sm font-medium text-gray-600 tabular-nums">
                    {label}
                </motion.span>
            </div>

            <div className="h-1.5 rounded-full bg-gray-200 overflow-hidden">
                <motion.div
                    style={{ width }}
                    className={`h-full rounded-full ${color}`}
                />
            </div>
        </div>
    );
}