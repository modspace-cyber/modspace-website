import { cn } from "@/lib/cn";
import { VariantType } from "@/types";
import { ButtonHTMLAttributes, forwardRef } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: VariantType | "outline";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "solid", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-full px-8 py-3 text-sm font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-gold)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 font-manrope",
          variant === "solid" && "bg-[var(--color-dark-primary)] text-[var(--color-light-primary)] hover:bg-neutral-800",
          variant === "glassmorph" && "glassmorph text-[var(--color-text-dark)] hover:bg-white/30",
          variant === "outline" && "border border-[var(--color-accent-gold)] text-[var(--color-text-dark)] hover:bg-[var(--color-accent-gold)] hover:text-white",
          variant === "outlinebg" && "border border-[var(--color-accent-gold)] text-white hover:bg-[var(--color-accent-gold)] hover:text-white",
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
