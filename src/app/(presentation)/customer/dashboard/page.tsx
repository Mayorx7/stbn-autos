"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Calendar,
  Clock,
  CarFront,
  Heart,
  MapPin,
  ChevronRight,
  MessageCircle,
  Search,
  ArrowRight,
} from "lucide-react";
import { routes } from "@/config/routes";
import { MOCK_CARS } from "@/lib/mock-data";
import { getSignedInAccount } from "@/lib/customer-account";

const YELLOW = "#FFC400";

export default function CustomerDashboardPage() {
  const [accountName, setAccountName] = useState("Guest");
  const [accountEmail, setAccountEmail] = useState("Sign in to personalise your garage");

  useEffect(() => {
    const account = getSignedInAccount();
    if (account) {
      setAccountName(account.name);
      setAccountEmail(account.email);
    }
  }, []);
  // Demo customer data (clean & minimal)
  const customer = {
    name: accountName,
    email: accountEmail,
    phone: "+234 803 111 2222",
    booking: {
      carId: 7, // 2021 BMW X5
      date: "Friday, 15 March 2024",
      time: "10:30 AM",
      location: "Victoria Island Showroom, Lagos",
      status: "Confirmed",
    },
    savedCarIds: [7, 4, 1], // BMW X5, RAV4, Camry
    tradeIn: {
      vehicle: "2018 Honda Accord EX-L",
      status: "Inspection Scheduled",
    },
  };

  const bookedCar = MOCK_CARS.find((c) => c.id === customer.booking.carId);
  const savedCars = MOCK_CARS.filter((c) => customer.savedCarIds.includes(c.id));

  const formatPrice = (p: number) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(p);

  return (
    <div className="min-h-screen bg-[#F3F6FA] pb-24 lg:pb-16 pt-6 sm:pt-8">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-8">
        {/* ── Breadcrumb & Clean Header ── */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs text-[#53657A]">
            <Link href={routes.home} className="hover:text-[#0757A6] transition">
              Home
            </Link>
            <ChevronRight size={13} className="text-[#D7DEE8]" />
            <span className="text-[#062A5E] font-semibold">My Account</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#D7DEE8]">
            <div>
              <h1 className="text-2xl font-bold text-[#062A5E]">
                Welcome back, {customer.name}
              </h1>
              <p className="text-xs text-[#53657A] mt-1">
                {customer.phone} · {customer.email}
              </p>
            </div>
            <Link
              href={routes.inventory}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#062A5E] hover:bg-[#0757A6] text-white text-xs font-bold transition shadow-sm self-start sm:self-auto"
            >
              <Search size={14} />
              <span>Browse Showroom</span>
            </Link>
          </div>
        </div>

        {/* ── Active Test-Drive Appointment ── */}
        {bookedCar && (
          <div className="space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#062A5E]">
              Upcoming Appointment
            </h2>

            <div className="rounded-2xl border border-[#D7DEE8] bg-white p-5 sm:p-6 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                {/* Vehicle Thumbnail & Basic Info */}
                <div className="flex gap-4 items-center">
                  <div className="w-28 h-20 sm:w-32 sm:h-24 rounded-xl overflow-hidden bg-[#F3F6FA] flex-shrink-0 border border-[#D7DEE8]">
                    <img
                      src={bookedCar.images[0]?.src || "/placeholder.jpg"}
                      alt={bookedCar.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-1">
                    <span
                      className="text-[11px] font-mono font-bold px-2 py-0.5 rounded border inline-block"
                      style={{
                        color: "#031B3D",
                        borderColor: YELLOW,
                        background: `${YELLOW}33`,
                      }}
                    >
                      {bookedCar.vrm}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-[#062A5E]">
                      {bookedCar.title}
                    </h3>
                    <p className="text-base font-extrabold text-[#0757A6]">
                      {formatPrice(bookedCar.price)}
                    </p>
                  </div>
                </div>

                {/* Appointment Schedule Details */}
                <div className="space-y-2 border-t md:border-t-0 md:border-l border-[#D7DEE8] pt-4 md:pt-0 md:pl-6 text-xs text-[#53657A]">
                  <div className="flex items-center gap-2">
                    <Clock size={15} className="text-[#0757A6] flex-shrink-0" />
                    <span className="font-bold text-[#062A5E]">
                      {customer.booking.date} · {customer.booking.time}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={15} className="text-[#0757A6] flex-shrink-0" />
                    <span>{customer.booking.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#0757A6]" />
                    <span className="font-semibold text-[#0757A6]">
                      Status: {customer.booking.status}
                    </span>
                  </div>
                </div>

                {/* Clean Actions */}
                <div className="flex flex-col sm:flex-row md:flex-col gap-2 flex-shrink-0">
                  <Link
                    href={routes.singleClassified(bookedCar.slug)}
                    className="px-4 py-2.5 rounded-xl bg-[#FFC400] text-[#031B3D] text-xs font-bold text-center hover:bg-[#ffe082] transition"
                  >
                    View Vehicle
                  </Link>
                  <a
                    href="https://wa.me/2348161163069?text=Hello%20STBN%20AUTOS,%20I%20would%20like%20to%20confirm%20my%20test-drive%20appointment."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-xl border border-[#D7DEE8] hover:bg-[#F3F6FA] text-[#062A5E] text-xs font-semibold text-center transition flex items-center justify-center gap-1.5"
                  >
                    <MessageCircle size={14} />
                    <span>Reschedule</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Saved / Shortlisted Cars ── */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#062A5E]">
              Saved Vehicles ({savedCars.length})
            </h2>
            <Link
              href={routes.inventory}
              className="text-xs font-bold text-[#0757A6] hover:underline"
            >
              Browse all cars
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {savedCars.map((car) => (
              <div
                key={car.id}
                className="rounded-2xl border border-[#D7DEE8] bg-white overflow-hidden shadow-sm hover:shadow transition"
              >
                <div className="relative aspect-[16/10] bg-[#F3F6FA]">
                  <img
                    src={car.images[0]?.src || "/placeholder.jpg"}
                    alt={car.title}
                    className="w-full h-full object-cover"
                  />
                  <span
                    className="absolute top-2.5 left-2.5 font-mono text-[10px] font-bold px-1.5 py-0.5 rounded border"
                    style={{
                      color: "#031B3D",
                      borderColor: YELLOW,
                      background: `${YELLOW}ee`,
                    }}
                  >
                    {car.vrm}
                  </span>
                </div>

                <div className="p-4 space-y-2">
                  <h3 className="font-bold text-[#062A5E] text-sm truncate">
                    {car.title}
                  </h3>
                  <p className="text-base font-extrabold text-[#0757A6]">
                    {formatPrice(car.price)}
                  </p>
                  <p className="text-xs text-[#53657A]">
                    {car.year} · {car.transmission} · {car.fuelType}
                  </p>

                  <div className="flex gap-2 pt-2 border-t border-[#D7DEE8]">
                    <Link
                      href={routes.reserve(car.slug, 1)}
                      className="flex-1 py-2 rounded-lg bg-[#FFC400] text-[#031B3D] text-xs font-bold text-center hover:bg-[#ffe082] transition"
                    >
                      Reserve
                    </Link>
                    <Link
                      href={routes.singleClassified(car.slug)}
                      className="px-3 py-2 rounded-lg border border-[#D7DEE8] text-[#53657A] hover:bg-[#F3F6FA] text-xs font-semibold text-center transition"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Trade-In Summary (Compact & Clean) ── */}
        {customer.tradeIn && (
          <div className="rounded-2xl border border-[#D7DEE8] bg-white p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#53657A]">
                Sell / Trade-In Valuation
              </p>
              <p className="text-base font-bold text-[#062A5E] mt-0.5">
                {customer.tradeIn.vehicle}
              </p>
              <p className="text-xs text-[#0757A6] font-semibold mt-0.5">
                Status: {customer.tradeIn.status}
              </p>
            </div>
            <a
              href="https://wa.me/2348161163069?text=Hello%20STBN%20AUTOS,%20I%20am%20following%20up%20on%20my%20trade-in%20request."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[#D7DEE8] hover:bg-[#F3F6FA] text-xs font-bold text-[#062A5E] transition self-start sm:self-auto"
            >
              <MessageCircle size={14} />
              <span>Contact Appraiser</span>
            </a>
          </div>
        )}

        {/* ── Quiet Concierge Support ── */}
        <div className="rounded-2xl bg-[#062A5E] text-white p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
          <p className="text-[#D9ECFA]">
            Questions about an appointment or vehicle delivery? Speak directly with an STBN client advisor.
          </p>
          <a
            href="https://wa.me/2348161163069"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 px-4 py-2 rounded-xl bg-[#FFC400] text-[#031B3D] font-bold hover:bg-[#ffe082] transition flex items-center gap-1.5 self-start sm:self-auto"
          >
            <MessageCircle size={14} />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
