import { routes } from "@/config/routes";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { SiInstagram, SiFacebook, SiX, SiYoutube, SiWhatsapp } from "@icons-pack/react-simple-icons";
import NewsLetterForm from "./NewsLetterForm";
const socialLinks = [
  { id: 1, link: "https://facebook.com",
    icon: <SiFacebook size={24} />
   },
  { id: 2, link: "https://twitter.com",
    icon: <SiX size={24} />
   },
  { id: 3, link: "https://instagram.com",
    icon: <SiInstagram size={24} />
   },
  { id: 4, link: "https://wa.me/2348161163069?text=Hello%20STBN%20AUTOS,%20I%20am%20interested%20in%20your%20available%20cars",
    icon: <SiWhatsapp size={24} className="hover:text-[#25D366]" />
   },
  { id: 5, link: "https://youtube.com",
    icon: <SiYoutube size={24} />
   },
];
const navLinks = [
  { id: 1, href: routes.home, label: "Home" },
  { id: 2, href: routes.inventory, label: "Inventory" },
  { id: 3, href: routes.sellSwap, label: "Sell / Trade" },
  { id: 4, href: routes.favourites, label: "Favourites" },
  { id: 5, href: routes.contact, label: "Contact" },
];
const PublicFooter = () => {
  return (
    <footer className="border-t border-[#0757A6] bg-[#031B3D] px-8 py-10 text-white lg:px-0">
			<div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
				<div className="flex flex-col space-y-3">
					<Link className="flex items-center" href={routes.home}>
						<Image
							width={160}
							height={80}
							alt="STBN AUTOS logo"
							className="relative h-16 w-auto object-contain"
							src="/logo.png"
						/>
					</Link>
          <div className="space-y-1 text-sm text-[#D9ECFA]">
            <p className="font-semibold text-white">Drive With Confidence!</p>
            <p>We Sell • We Buy • We Swap</p>
            <p>
              Call / WhatsApp:{" "}
              <a href="tel:08161163069" className="font-bold text-white hover:text-[#FFC400] hover:underline">
                08161163069
              </a>
            </p>
          </div>
					<div className="flex space-x-4 pt-1 text-[#D9ECFA]">
						{socialLinks.map((link) => {
							return (
								<Link href={link.link} key={link.id} target="_blank" rel="noopener noreferrer">
									{link.icon}
								</Link>
							);
						})}
					</div>
				</div>

				<ul className="space-y-2">
          <li className="mb-1 font-bold text-white">Quick Links</li>
					{navLinks.map((link) => (
						<li key={link.id}>
							<Link
								href={link.href}
								className="text-[#D9ECFA] transition-colors hover:text-white"
							>
								{link.label}
							</Link>
						</li>
					))}
					{/* TODO: Re-enable admin link when Supabase auth is implemented
					<li>
						<Link
							href={routes.signIn}
							className="text-foreground hover:text-primary"
						>
							Admin
						</Link>
					</li>
					*/}
          <li className="pt-2">
            <a
              href="https://wa.me/2348161163069?text=Hello%20STBN%20AUTOS"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#25D366] text-white text-xs font-bold hover:bg-[#20ba5a] transition-colors"
            >
              <SiWhatsapp size={16} />
              <span>Order on WhatsApp</span>
            </a>
          </li>
				</ul>

				<NewsLetterForm />
			</div>
			<div className="container mx-auto mt-8 border-t border-white/15 pt-6 text-center text-sm text-[#D9ECFA]">
				<h4 className="text-lg font-bold text-white">STBN AUTOS</h4>
				<p>Drive Your Dreams Today • Quality Cars • Great Deals • Trusted Service</p>
				<p className="mt-1">
					© {new Date().getFullYear()} STBN AUTOS. All rights reserved.
				</p>
			</div>
		</footer>
  );
};

export default PublicFooter;
