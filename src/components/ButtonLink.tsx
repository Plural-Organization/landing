import { buttonVariants } from "@heroui/styles";
import type { AnchorHTMLAttributes } from "react";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: "primary" | "secondary" | "tertiary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
};

// A real <a> that looks like a HeroUI Button: navigation stays a link for crawlers, middle-click and screen readers.
export default function ButtonLink({ variant = "primary", size = "md", className = "", ...rest }: Props) {
  return <a className={`${buttonVariants({ variant, size })} no-underline ${className}`} {...rest} />;
}
