"use client";

import React from "react";
import { SiWhatsapp } from "@icons-pack/react-simple-icons";

export const FloatingWhatsApp = () => {
  return (
    <aside
      aria-label="Contact options"
      className="fixed bottom-6 right-6 z-50 hidden items-center group lg:flex"
    >
      <a
        href="https://wa.me/2348161163069?text=Hello%20STBN%20AUTOS,%20I%20am%20interested%20in%20checking%20available%20cars%20and%20placing%20an%20order."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with STBN AUTOS on WhatsApp"
        className="flex items-center gap-2.5 px-4 py-3 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
      >
        <SiWhatsapp size={22} className="text-white shrink-0" />
        <span className="text-xs sm:text-sm font-bold tracking-wide hidden sm:inline-block">
          WhatsApp 08161163069
        </span>
      </a>
    </aside>
  );
};
