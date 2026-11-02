import { Link as RouterLink } from "react-router-dom";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
  children: ReactNode;
};

export default function Link({ href, children, ...props }: LinkProps) {
  if (/^(https?:|mailto:|tel:)/.test(href)) return <a href={href} {...props}>{children}</a>;
  return <RouterLink to={href} {...props}>{children}</RouterLink>;
}
