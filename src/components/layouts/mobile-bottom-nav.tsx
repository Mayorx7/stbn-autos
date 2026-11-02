import Link from "next/link";
import { CarFront, Handshake, House, UserRound } from "lucide-react";
import { useLocation } from "react-router-dom";
import { routes } from "@/config/routes";

const items = [
  { label: "Home", href: routes.home, icon: House },
  { label: "Browse", href: routes.inventory, icon: CarFront, primary: true },
  { label: "Sell / Trade", href: routes.sellSwap, icon: Handshake },
  { label: "Account", href: routes.auth, icon: UserRound },
];

export function MobileBottomNav() {
  const { pathname } = useLocation();

  return (
    <nav
      aria-label="Mobile navigation"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-[#D7DEE8] bg-white/95 px-3 pb-[max(env(safe-area-inset-bottom),0.65rem)] pt-3 shadow-[0_-10px_30px_rgba(3,27,61,0.14)] backdrop-blur lg:hidden"
    >
      <div className="mx-auto grid max-w-md grid-cols-4">
        {items.map(({ label, href, icon: Icon, external, primary }) => {
          const active = !external && (href === routes.home ? pathname === href : pathname.startsWith(href));

          return (
            <Link
              key={label}
              href={href}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className={`flex min-h-12 flex-col items-center justify-center gap-1 text-[10px] font-bold transition-colors ${
                primary
                  ? "relative -mt-8 text-[#0757A6]"
                  : active
                    ? "text-[#0757A6]"
                    : "text-[#53657A]"
              }`}
            >
              <span
                className={`grid place-items-center transition-all ${
                  primary
                    ? "h-14 w-14 rounded-2xl border-4 border-white bg-[#FFC400] text-[#031B3D] shadow-[0_10px_22px_rgba(255,196,0,0.35)]"
                    : active
                      ? "h-9 w-9 rounded-xl bg-[#D9ECFA]"
                      : "h-9 w-9 rounded-xl"
                }`}
              >
                <Icon className={primary ? "h-6 w-6" : "h-5 w-5"} strokeWidth={primary ? 2.5 : 2} aria-hidden="true" />
              </span>
              <span className="truncate max-w-[64px] text-center">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
