const Button = ({
    id="",
    color = 'blue',
    label = "",
    href = "#",
    target="",
    rel="",
    icon="",
    classes=""
}) => {
    const colorClass = color === "red" ? "button-russian-red" : "button-russian-blue";
    const className = `button text-center ${colorClass} ${classes}`;
    return (
        <a id={id} className={className} href={href} target={target} rel={rel}>
            <span>{label} {icon}</span>
        </a>
    );
};

export default Button
