import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "inverse";
type ButtonSize = "sm" | "md";

type ButtonProps = {
  children: ReactNode;
  className?: string;
  href?: string;
  showArrow?: boolean;
  size?: ButtonSize;
  variant?: ButtonVariant;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-zinc-950 text-white shadow-[0_16px_30px_rgba(9,9,11,0.28)] hover:bg-black",
  secondary:
    "bg-white/12 text-white ring-1 ring-white/25 backdrop-blur-xl hover:bg-white/18",
  ghost: "bg-transparent text-zinc-900 ring-1 ring-zinc-300 hover:bg-zinc-100",
  inverse: "bg-white text-zinc-950 shadow-[0_18px_35px_rgba(255,255,255,0.22)] hover:bg-zinc-100",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-6 text-sm",
};

function getClasses({
  className,
  size = "md",
  variant = "primary",
}: Pick<ButtonProps, "className" | "size" | "variant">) {
  return [
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition duration-300 hover:scale-[1.02] hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent",
    sizeStyles[size],
    variantStyles[variant],
    className,
  ]
    .filter(Boolean)
    .join(" ");
}

function ButtonInner({ children, showArrow }: Pick<ButtonProps, "children" | "showArrow">) {
  return (
    <>
      <span>{children}</span>
      {showArrow ? <ArrowUpRight className="h-4 w-4" /> : null}
    </>
  );
}

export function Button({
  children,
  className,
  href,
  showArrow = false,
  size = "md",
  type = "button",
  variant = "primary",
  ...props
}: ButtonProps) {
  const classes = getClasses({ className, size, variant });

  if (href) {
    return (
      <Link className={classes} href={href}>
        <ButtonInner showArrow={showArrow}>{children}</ButtonInner>
      </Link>
    );
  }

  return (
    <button className={classes} type={type} {...props}>
      <ButtonInner showArrow={showArrow}>{children}</ButtonInner>
    </button>
  );
}
