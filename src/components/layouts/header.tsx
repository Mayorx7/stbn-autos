import { routes } from "@/config/routes";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { MenuIcon, SearchIcon, PhoneIcon, MessageCircle, X, UserRound, Heart, LogOut, LayoutDashboard } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { id: 1, href: routes.home, label: "Home" },
  { id: 2, href: routes.inventory, label: "Inventory" },
  { id: 3, href: routes.sellSwap, label: "Sell / Trade" },
  { id: 4, href: routes.contact, label: "Contact" },
];

const NavLink = ({ href, label, light }: { href: string; label: string; light?: boolean }) => {
  return (
    <Link
      href={href}
      className={`relative px-5 py-2 text-sm font-semibold transition-colors duration-200 group ${light ? "text-[#D9ECFA] hover:text-white" : "text-[#53657A] hover:text-[#062A5E]"}`}
    >
      {label}
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#0757A6] to-[#FFC400] transition-all duration-300 group-hover:w-full" />
    </Link>
  );
};

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountName, setAccountName] = useState<string | null>(null);
  const isDarkNavbar = true;

  useEffect(() => {
    const stored = window.localStorage.getItem("stbn-autos-session");
    const account = window.localStorage.getItem("stbn-autos-account");
    if (stored && account) setAccountName(JSON.parse(account).name);
  }, []);

  function signOut() {
    window.localStorage.removeItem("stbn-autos-session");
    setAccountName(null);
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-[#062A5E] shadow-sm">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex h-16 items-center justify-between lg:h-20">
          {/* Logo */}
          <Link href={routes.home} className="flex items-center gap-3 group">
            <Image
              src="/logo.png"
              alt="STBN AUTOS"
              width={70}
              height={60}
              className="h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-105 lg:h-14"
              priority
            />
            <div className="hidden sm:block">
              <h1 className={`text-xl font-bold leading-tight ${isDarkNavbar ? "text-white" : "text-[#062A5E]"}`}>STBN AUTOS</h1>
              <p className={`text-xs font-medium tracking-wide ${isDarkNavbar ? "text-[#D9ECFA]" : "text-[#53657A]"}`}>Drive Your Dreams</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink key={link.id} href={link.href} label={link.label} light={isDarkNavbar} />
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {/* Search Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className={`hidden md:flex items-center justify-center w-10 h-10 rounded-full transition-colors ${isDarkNavbar ? "hover:bg-white/10" : "hover:bg-[#F3F6FA]"}`}
            >
              <SearchIcon className={`w-5 h-5 ${isDarkNavbar ? "text-white" : "text-[#53657A]"}`} />
            </Button>

            <div className={`hidden 2xl:flex items-center gap-3 ${isDarkNavbar ? "text-white" : "text-[#062A5E]"}`}>
              <a href="tel:08161163069" className="group flex items-center gap-2 transition-colors hover:text-[#FFC400]" aria-label="Call STBN Autos">
                <span className={`grid h-8 w-8 place-items-center rounded-full transition-colors ${isDarkNavbar ? "bg-white/10 group-hover:bg-white/20" : "bg-[#F3F6FA] group-hover:bg-[#D9ECFA]"}`}><PhoneIcon className="h-3.5 w-3.5" /></span>
                <span className="leading-tight"><span className={`block text-[9px] font-semibold uppercase tracking-[0.16em] ${isDarkNavbar ? "text-[#D9ECFA]" : "text-[#53657A]"}`}>Enquiries</span><span className="text-xs font-semibold">0816 116 3069</span></span>
              </a>
              <span className={`h-7 w-px ${isDarkNavbar ? "bg-white/25" : "bg-[#D7DEE8]"}`} />
            </div>

            <details className="group relative hidden sm:block">
              <summary className="flex h-10 cursor-pointer list-none items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 text-xs font-bold text-white transition hover:bg-white/20 [&::-webkit-details-marker]:hidden">
                <UserRound className="h-4 w-4 text-[#D9ECFA]" />
                <span>{accountName ? accountName.split(" ")[0] : "Account"}</span>
              </summary>
              <div className="absolute right-0 top-12 w-56 rounded-xl border border-[#D7DEE8] bg-white p-2 text-[#062A5E] shadow-xl">
                {accountName ? <>
                  <p className="px-3 pb-2 pt-1 text-xs text-[#53657A]">Your account</p>
                  <Link href={routes.customerDashboard} className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold hover:bg-[#F3F6FA]"><LayoutDashboard className="h-4 w-4" /> My Garage</Link>
                  <Link href={routes.favourites} className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold hover:bg-[#F3F6FA]"><Heart className="h-4 w-4" /> Saved vehicles</Link>
                  <button type="button" onClick={signOut} className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-[#53657A] hover:bg-[#F3F6FA]"><LogOut className="h-4 w-4" /> Sign out</button>
                </> : <>
                  <p className="px-3 pb-2 pt-1 text-xs text-[#53657A]">Save cars and manage test drives.</p>
                  <Link href={routes.auth} className="block rounded-lg bg-[#0757A6] px-3 py-2.5 text-center text-sm font-bold text-white hover:bg-[#1689E8]">Sign in or sign up</Link>
                </>}
              </div>
            </details>

            {/* Mobile Menu Trigger */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`lg:hidden flex items-center justify-center w-10 h-10 rounded-full transition-colors ${isDarkNavbar ? "hover:bg-white/10" : "hover:bg-[#F3F6FA]"}`}
                >
                  {mobileMenuOpen ? (
                    <X className={`w-6 h-6 ${isDarkNavbar ? "text-white" : "text-[#062A5E]"}`} />
                  ) : (
                    <MenuIcon className={`w-6 h-6 ${isDarkNavbar ? "text-white" : "text-[#062A5E]"}`} />
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-full max-w-sm p-0 bg-white border-l border-[#D7DEE8]"
              >
                <div className="flex flex-col h-full">
                  {/* Mobile Header */}
                  <div className="flex items-center justify-between p-6 border-b border-[#D7DEE8]">
                    <div className="flex items-center gap-3">
                      <Image
                        src="/logo.png"
                        alt="STBN AUTOS"
                        width={50}
                        height={40}
                        className="h-10 w-auto object-contain"
                      />
                      <div>
                        <h2 className="text-lg font-bold text-[#062A5E]">STBN AUTOS</h2>
                        <p className="text-xs text-[#53657A]">Drive Your Dreams</p>
                      </div>
                    </div>
                  </div>

                  {/* Account Mobile Card */}
                  <div className="p-4 mx-6 mt-4 rounded-2xl bg-[#F3F6FA] border border-[#D7DEE8] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#0757A6] text-white flex items-center justify-center font-bold text-xs">
                        <UserRound className="w-4 h-4 text-[#D9ECFA]" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#062A5E]">{accountName ? "My Garage" : "Your account"}</p>
                        <p className="text-[11px] text-[#53657A]">Saved cars & test drives</p>
                      </div>
                    </div>
                    <Link
                      href={accountName ? routes.customerDashboard : routes.auth}
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-3 py-1.5 rounded-lg bg-[#0757A6] text-white text-xs font-bold hover:bg-[#1689E8] transition"
                    >
                      {accountName ? "Open" : "Sign in"}
                    </Link>
                  </div>


                  {/* Mobile Navigation */}
                  <nav className="flex-1 p-6 space-y-2">
                    {navLinks.map((link) => (
                      <Link
                        key={link.id}
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-4 py-3 text-base font-semibold text-[#53657A] hover:text-[#062A5E] hover:bg-[#F3F6FA] rounded-lg transition-all duration-200"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>

                  {/* Mobile Footer Actions */}
                  <div className="p-6 border-t border-[#D7DEE8] space-y-3">
                    <a
                      href="tel:08161163069"
                      className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg border-2 border-[#D7DEE8] text-sm font-semibold text-[#062A5E] hover:border-[#FFC400] hover:bg-[#FFC400] transition-all duration-300"
                    >
                      <PhoneIcon className="w-4 h-4" />
                      <span>08161163069</span>
                    </a>
                    <a
                      href="https://wa.me/2348161163069?text=Hello%20STBN%20AUTOS"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg bg-gradient-to-r from-[#25D366] to-[#20ba5a] text-white text-sm font-bold hover:shadow-lg transition-all duration-300"
                    >
                      <span>💬</span>
                      <span>WhatsApp Us</span>
                    </a>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="py-4 border-t border-[#D7DEE8]">
                <div className="relative">
                  <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#53657A]" />
                  <input
                    type="text"
                    placeholder="Search for cars, makes, models..."
                    className="w-full pl-12 pr-4 py-3 bg-[#F3F6FA] border border-[#D7DEE8] rounded-lg text-sm text-[#062A5E] placeholder:text-[#53657A] focus:outline-none focus:ring-2 focus:ring-[#0757A6] focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;
