import { EndButtons } from "@/components/shared/end-buttons";
import { CircleCheck, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import { routes } from "@/config/routes";

const ReserveSuccessPage = () => {
  return (
    <div className="flex min-h-[80dvh] flex-col items-center justify-center bg-[#F3F6FA] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg text-center bg-white border border-[#D7DEE8] p-8 sm:p-10 rounded-3xl shadow-sm">
        <div className="mx-auto w-16 h-16 rounded-full bg-[#D9ECFA] flex items-center justify-center text-[#0757A6]">
          <CircleCheck className="w-10 h-10 text-[#0757A6]" />
        </div>
        <h1 className="mt-5 text-2xl sm:text-3xl font-extrabold tracking-tight text-[#062A5E]">
          Booking Confirmed!
        </h1>
        <p className="mt-2 text-sm text-[#53657A] leading-relaxed">
          Thanks for reserving your vehicle with STBN AUTOS. Your appointment pass and inspection details are now active in your customer dashboard.
        </p>

        {/* Highlighted Dashboard Link Card */}
        <div className="mt-6 p-4 rounded-2xl bg-[#F3F6FA] border border-[#D7DEE8] text-left">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-[#D9ECFA] text-[#0757A6] flex items-center justify-center shrink-0">
              <Calendar className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold uppercase tracking-wider text-[#0757A6]">Your Customer Hub</p>
              <p className="text-sm font-semibold text-[#062A5E] truncate">View Appointment Pass & Status</p>
            </div>
            <Link
              href={routes.customerDashboard}
              className="inline-flex items-center gap-1 text-xs font-bold text-[#0757A6] hover:text-[#1689E8] hover:underline"
            >
              Open <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        <EndButtons />
      </div>
    </div>
  );
};

export default ReserveSuccessPage;
