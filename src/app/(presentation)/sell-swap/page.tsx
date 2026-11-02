"use client";

import { ArrowRight, BadgeCheck, CarFront, RefreshCw, ShieldCheck } from "lucide-react";
import { FormEvent, useState } from "react";
import Link from "next/link";
import { routes } from "@/config/routes";

export default function SellSwapPage() {
  const [submitted, setSubmitted] = useState(false);

  function submitEnquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const intent = form.get("intent");
    const car = `${form.get("year")} ${form.get("make")} ${form.get("model")}`.trim();
    const message = `Hello STBN AUTOS, I would like to ${intent === "swap" ? "trade" : "sell"} my car. Vehicle: ${car}. Mileage: ${form.get("mileage")} km. My phone: ${form.get("phone")}.`;
    setSubmitted(true);
    window.open(`https://wa.me/2348161163069?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="bg-[#F3F6FA] py-8 sm:py-12">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
        <section className="rounded-3xl bg-[#062A5E] p-7 text-white sm:p-9">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D9ECFA]">STBN AUTOS</p>
          <h1 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl">Ready to sell or trade your car?</h1>
          <p className="mt-4 text-sm leading-6 text-[#D9ECFA]">Tell us about your vehicle and the team will get back to you with the next steps.</p>
          <div className="mt-8 space-y-5">
            <div className="flex gap-3"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/10 text-[#1689E8]"><BadgeCheck className="h-5 w-5" /></span><div><h2 className="font-bold">Fair vehicle assessment</h2><p className="mt-1 text-sm text-[#D9ECFA]">A straightforward review based on your car’s condition and market demand.</p></div></div>
            <div className="flex gap-3"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/10 text-[#1689E8]"><RefreshCw className="h-5 w-5" /></span><div><h2 className="font-bold">Trade into your next car</h2><p className="mt-1 text-sm text-[#D9ECFA]">Use the value of your current car toward a vehicle in our collection.</p></div></div>
            <div className="flex gap-3"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/10 text-[#1689E8]"><ShieldCheck className="h-5 w-5" /></span><div><h2 className="font-bold">Guidance from our team</h2><p className="mt-1 text-sm text-[#D9ECFA]">We will explain the process before you make any decision.</p></div></div>
          </div>
        </section>

        <section className="rounded-3xl border border-[#D7DEE8] bg-white p-6 shadow-[0_22px_55px_-38px_rgba(3,27,61,0.5)] sm:p-8">
          <div className="flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-xl bg-[#D9ECFA] text-[#0757A6]"><CarFront className="h-5 w-5" /></span><div><h2 className="text-xl font-bold text-[#031B3D]">Your car details</h2><p className="text-sm text-[#53657A]">We’ll use these to start your enquiry.</p></div></div>
          <form className="mt-7 grid gap-4 sm:grid-cols-2" onSubmit={submitEnquiry}>
            <label className="text-sm font-semibold text-[#062A5E]">I want to <select name="intent" className="mt-1.5 block w-full rounded-xl border border-[#D7DEE8] bg-white px-3 py-3 text-[#031B3D] outline-none focus:border-[#0757A6] focus:ring-2 focus:ring-[#D9ECFA]"><option value="sell">Sell my car</option><option value="swap">Trade my car</option></select></label>
            <label className="text-sm font-semibold text-[#062A5E]">Phone number <input required name="phone" type="tel" placeholder="e.g. 0800 000 0000" className="mt-1.5 block w-full rounded-xl border border-[#D7DEE8] px-3 py-3 text-[#031B3D] outline-none placeholder:text-[#53657A] focus:border-[#0757A6] focus:ring-2 focus:ring-[#D9ECFA]" /></label>
            <label className="text-sm font-semibold text-[#062A5E]">Year <input required name="year" type="number" min="1980" max="2030" placeholder="e.g. 2020" className="mt-1.5 block w-full rounded-xl border border-[#D7DEE8] px-3 py-3 text-[#031B3D] outline-none placeholder:text-[#53657A] focus:border-[#0757A6] focus:ring-2 focus:ring-[#D9ECFA]" /></label>
            <label className="text-sm font-semibold text-[#062A5E]">Make <input required name="make" placeholder="e.g. Toyota" className="mt-1.5 block w-full rounded-xl border border-[#D7DEE8] px-3 py-3 text-[#031B3D] outline-none placeholder:text-[#53657A] focus:border-[#0757A6] focus:ring-2 focus:ring-[#D9ECFA]" /></label>
            <label className="text-sm font-semibold text-[#062A5E]">Model <input required name="model" placeholder="e.g. Camry" className="mt-1.5 block w-full rounded-xl border border-[#D7DEE8] px-3 py-3 text-[#031B3D] outline-none placeholder:text-[#53657A] focus:border-[#0757A6] focus:ring-2 focus:ring-[#D9ECFA]" /></label>
            <label className="text-sm font-semibold text-[#062A5E]">Mileage (km) <input name="mileage" type="number" min="0" placeholder="e.g. 45000" className="mt-1.5 block w-full rounded-xl border border-[#D7DEE8] px-3 py-3 text-[#031B3D] outline-none placeholder:text-[#53657A] focus:border-[#0757A6] focus:ring-2 focus:ring-[#D9ECFA]" /></label>
            <label className="sm:col-span-2 text-sm font-semibold text-[#062A5E]">Anything else we should know? <textarea name="notes" rows={3} placeholder="Condition, location, or a car you would like to swap into…" className="mt-1.5 block w-full resize-y rounded-xl border border-[#D7DEE8] px-3 py-3 text-[#031B3D] outline-none placeholder:text-[#53657A] focus:border-[#0757A6] focus:ring-2 focus:ring-[#D9ECFA]" /></label>
            <div className="sm:col-span-2">
              <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#0757A6] px-4 py-3.5 text-sm font-bold text-white transition hover:bg-[#1689E8]">
                Send enquiry on WhatsApp <ArrowRight className="h-4 w-4" />
              </button>
              {submitted && (
                <div className="mt-4 p-4 rounded-2xl bg-[#D9ECFA]/50 border border-[#D7DEE8] text-center">
                  <p className="text-sm font-semibold text-[#062A5E]">Your WhatsApp enquiry is launched!</p>
                  <p className="mt-1 text-xs text-[#53657A]">
                    You can also track vehicle appraisal and trade status in your{" "}
                    <Link href={routes.customerDashboard} className="font-bold text-[#0757A6] underline hover:text-[#1689E8]">
                      Customer Dashboard &rarr;
                    </Link>
                  </p>
                </div>
              )}
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
