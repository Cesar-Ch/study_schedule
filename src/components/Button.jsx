const Button = ({ children, variant = "primary", className = "", ...props }) => {
    const baseStyles = "font-medium rounded-lg text-sm px-5 py-2.5 transition transition-all duration-300 ease-in-out";
    
    const variants = {
        primary: "text-white bg-primary hover:bg-primary-hover dark:bg-dark-primary dark:text-black dark:hover:bg-dark-hover border border-transparent",
        secondary: "text-black bg-white hover:bg-[#f1f5f9] border border-black dark:bg-black dark:text-white dark:hover:bg-[#27272a] dark:border-white",
    };

    return (
        <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
            {children}
        </button>
    );
};

export default Button