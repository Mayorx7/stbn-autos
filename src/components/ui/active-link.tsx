"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

interface ActiveLinkProps {
	href: string;
	children: ReactNode;
	className?: string;
}
const ActiveLink = (props: ActiveLinkProps) => {
    const { href, children, className } = props;
	const pathname = usePathname();
	const isActive = href === pathname;
  return (
		<Link
			href={href}
			className={cn(
				className,
				isActive
					? "bg-[#0757A6] text-white hover:bg-[#FFC400] hover:text-[#031B3D]"
					: "text-muted hover:bg-white/10",
			)}
		>
			{children}
		</Link>
	);
}

export default ActiveLink
