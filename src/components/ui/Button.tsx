import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "danger" | "outline";
}

export const Button = ({
  className,
  variant = "primary",
  ...props
}: ButtonProps) => {
  const connectionColors = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    danger: "bg-red-600 text-white hover:bg-red-700",
    outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50",
  };

  return (
    <button
      className={`cursor-pointer rounded-md px-4 py-2 font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${connectionColors[variant]} ${className}`}
      {...props}
    />
  );
};
