import React from "react";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
  variant?: "primary" | "secondary" | "danger";
  size?: "small" | "medium" | "large";
}

export const Button: React.FC<ButtonProps> = ({
  children,
  isActive = true,
  variant = "primary",
  size = "medium",
  className,
  ...props
}) => {
  const baseClasses =
    "flex items-center justify-center rounded-md font-bold cursor-pointer transition duration-300 transform ease-in-out";

  const variantClasses = {
    primary: "bg-green-600 text-white hover:bg-green-700",
    secondary: "bg-blue-500 text-white hover:bg-blue-600",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };

  const sizeClasses = {
    small: "px-2 py-1 text-sm",
    medium: "px-4 py-2 text-base",
    large: "px-6 py-3 text-lg",
  };

  const activeClasses = isActive
    ? "hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0.5 active:scale-95"
    : "cursor-not-allowed bg-gray-300";

  return (
    <button
      className={clsx(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        activeClasses,
        className
      )}
      disabled={!isActive}
      {...props}
    >
      {children}
    </button>
  );
};
