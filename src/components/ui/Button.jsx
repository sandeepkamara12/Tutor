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
    animation={},
    delay= '0.05'
}) => {
    const colorClass = color === "red" ? "button-russian-red" : "button-russian-blue";
    const className = `button text-center ${colorClass} ${classes}`;
    return (
        <motion.a id={id} className={className} href={href} target={target} rel={rel}
             {...animation}
              transition={{
                ...animation.transition,
                delay: delay,
              }}
        >
            <span>{label} {icon}</span>
        </motion.a>
    );
};

export default Button
