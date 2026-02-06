"use client";

import React from "react";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "danger"
  | "outline";

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  isLoading?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-[#F59E0B] hover:bg-[#D97706] text-black",
  secondary:
    "bg-[#92400E] hover:bg-[#78350F] text-white",
  danger:
    "bg-[#DC2626] hover:bg-[#B91C1C] text-white",
  outline:
    "border border-[#92400E] text-[#92400E] hover:bg-[#FEF3E2] items-center",
};


export const Button = React.forwardRef<
  HTMLButtonElement,
  ButtonProps
>(
  (
    {
      children,
      variant = "primary",
      isLoading = false,
      disabled = false,
      className = "",
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`
          px-4 py-2 rounded-md font-medium
          transition-all duration-200
          ${variantStyles[variant]}
          ${disabled || isLoading ? "opacity-50 cursor-not-allowed" : ""}
          ${className}
        `}
        {...props}
      >
        {isLoading ? "Loading..." : children}
      </button>
    );
  }
);

Button.displayName = "Button";
