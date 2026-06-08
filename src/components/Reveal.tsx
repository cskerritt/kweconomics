import type { ElementType, ReactNode } from "react";
import { useReveal } from "@/hooks/use-reveal";

export type RevealVariant = "up" | "left" | "right" | "scale";

const VARIANT_CLASS: Record<RevealVariant, string> = {
  up: "",
  left: "kw-reveal--left",
  right: "kw-reveal--right",
  scale: "kw-reveal--scale",
};

interface RevealProps {
  children: ReactNode;
  delay?: number;
  variant?: RevealVariant;
  as?: ElementType;
  className?: string;
}

export default function Reveal({
  children,
  delay = 0,
  variant = "up",
  as: Tag = "div",
  className = "",
}: RevealProps) {
  const ref = useReveal<HTMLElement>();
  return (
    <Tag
      ref={ref}
      className={`kw-reveal ${VARIANT_CLASS[variant]} ${className}`.trim()}
      style={delay ? { ["--kw-reveal-delay" as string]: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
