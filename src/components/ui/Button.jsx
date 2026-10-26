import { motion } from "motion/react";
const Button = ({
    id = "",
    color = 'blue',
    label = "",
    href = "#",
    target = "",
    rel = "",
    icon = "",
    classes = "",
    animation = {},
}) => {
    const colorClass = color === "red" ? "button-russian-red" : "button-russian-blue";
    const className = `button text-center ${colorClass} ${classes}`;
    return (
        <motion.a id={id} className={className} href={href} target={target} rel={rel}
            {...animation}
            // whileHover={{ y: -5 }}
        >
            <span>{label} {icon}</span>
        </motion.a>
    );
};

export default Button
