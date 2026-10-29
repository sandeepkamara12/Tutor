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
    initial,
  whileInView,
  viewport,
  transition,
}) => {
    const colorClass = color === "red" ? "button-russian-red" : "button-russian-blue";
    const className = `button text-center ${colorClass} ${classes}`;
    return (
        <motion.a id={id} className={className} href={href} target={target} rel={rel}
             initial={initial}
      whileInView={whileInView}
      viewport={viewport}
      transition={transition}
            // whileHover={{ y: -5 }}
        >
            <span>{label} {icon}</span>
        </motion.a>
    );
};

export default Button
