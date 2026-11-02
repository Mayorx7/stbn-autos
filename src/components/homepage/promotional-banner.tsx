import Link from "next/link";
import { ArrowRight, Megaphone } from "lucide-react";
import { MOCK_CAMPAIGNS } from "@/lib/mock-data";

export function PromotionalBanner() {
  const campaign = MOCK_CAMPAIGNS.find((item) => item.active);

  if (!campaign) return null;

  return (
    <section className="bg-[#F3F6FA] px-6 py-5 sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 rounded-xl border border-[#D7DEE8] bg-white px-5 py-4 sm:flex-row sm:items-center sm:px-6">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 rounded-full bg-[#D9ECFA] p-2 text-[#0757A6]">
            <Megaphone className="h-4 w-4" aria-hidden="true" />
          </span>
          <div>
            <p className="font-bold text-[#062A5E]">{campaign.title}</p>
            <p className="mt-0.5 text-sm text-[#53657A]">{campaign.description}</p>
          </div>
        </div>
        <Link
          href={campaign.href}
          className="inline-flex shrink-0 items-center gap-2 rounded-md bg-[#FFC400] px-4 py-2 text-sm font-semibold text-[#031B3D] transition-colors hover:bg-[#FFD34D]"
        >
          {campaign.ctaLabel}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
