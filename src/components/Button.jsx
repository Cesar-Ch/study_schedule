export const Button = ({ children, className, ...props }) => {
    const baseStyles = "text-sm rounded-lg text-sm px-5 py-2.5 transition transition-all duration-300 ease-in-out gap-1.5 flex items-center font-semibold";

    return (
        <button className={baseStyles + " " + className} {...props}>
            {children}
        </button>
    );
};
