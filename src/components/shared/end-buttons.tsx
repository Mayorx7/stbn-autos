import { routes } from "@/config/routes";
import { CarIcon, HomeIcon, LayoutDashboardIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

export const EndButtons = () => {
	return (
		<div className="mt-6 flex flex-wrap items-center justify-center gap-3">
			<Button
				variant="outline"
				className="border-[#D7DEE8] text-[#062A5E] hover:bg-[#F3F6FA]"
				asChild
			>
				<Link href={routes.home}>
					<HomeIcon className="mr-2 h-4 w-4" /> Go to Homepage
				</Link>
			</Button>
			<Button
				variant="outline"
				className="border-[#D7DEE8] text-[#062A5E] hover:bg-[#F3F6FA]"
				asChild
			>
				<Link href={routes.inventory}>
					<CarIcon className="mr-2 h-4 w-4" /> View other whips
				</Link>
			</Button>
			<Button
				className="bg-[#0757A6] hover:bg-[#1689E8] text-white font-semibold shadow-sm"
				asChild
			>
				<Link href={routes.customerDashboard}>
					<LayoutDashboardIcon className="mr-2 h-4 w-4" /> View in My Dashboard
				</Link>
			</Button>
		</div>
	);
};