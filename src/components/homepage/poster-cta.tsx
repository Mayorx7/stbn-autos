import Link from "next/link";
import React from "react";
import { routes } from "@/config/routes";
import { SiWhatsapp } from "@icons-pack/react-simple-icons";
import { Phone, ArrowRight } from "lucide-react";

export const PosterCTA = () => {
  return (
    <section className="bg-[#F3F6FA] py-12 sm:py-16">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="rounded-2xl border border-[#0757A6] bg-gradient-to-r from-[#031B3D] to-[#0757A6] p-6 shadow-xl sm:p-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Contact Information */}
            <div className="text-center lg:text-left">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.15em] text-[#FFC400] sm:text-sm">
                Get in Touch
              </p>

              <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                Contact STBN AUTOS
              </h2>

              <a
                href="tel:08161163069"
                className="mt-3 inline-flex items-center gap-2 text-2xl font-extrabold text-white transition-colors hover:text-[#D9ECFA] sm:text-3xl"
              >
                <Phone size={23} />
                08161163069
              </a>

              <p className="mt-2 text-sm text-[#D9ECFA]">
                Call or WhatsApp us to enquire about available cars.
              </p>
            </div>

            {/* Contact Actions */}
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <a
                href="https://wa.me/2348161163069?text=Hello%20STBN%20AUTOS%2C%20I%20would%20like%20to%20enquire%20about%20your%20available%20cars."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-6 py-3.5 text-sm font-bold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-[#20ba5a]"
              >
                <SiWhatsapp size={19} />
                WhatsApp Us
              </a>

              <Link
                href={routes.inventory}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/25 bg-white px-6 py-3.5 text-sm font-bold text-[#062A5E] shadow-md transition-all hover:-translate-y-0.5 hover:bg-[#D9ECFA]"
              >
                Browse Cars
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
