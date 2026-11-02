const questions = [
  ["Can I inspect a car before buying?", "Please contact STBN AUTOS to arrange an inspection and confirm the vehicle’s current availability."],
  ["How do I enquire about a vehicle?", "Use the WhatsApp or Call Now options on a vehicle listing, or contact the team directly with the vehicle you are interested in."],
  ["Do you accept trade-ins?", "Contact the STBN AUTOS team to discuss your current vehicle and the options that may be available."],
  ["Can I negotiate a vehicle’s price?", "For the latest pricing and any available options, please speak directly with the STBN AUTOS team."],
  ["How can I learn more about a vehicle’s condition?", "Each listing includes the available details. Contact the team for further information or to arrange an inspection."],
  ["What payment methods do you accept?", "Please contact STBN AUTOS directly to confirm the payment options available for your selected vehicle."],
];

export function FaqSection() {
  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-24">
      <div className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-[#D9ECFA]/60 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-[#D9ECFA]/45 blur-3xl" />
      <div className="container relative mx-auto max-w-6xl px-6">
        <div className="grid items-start gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="lg:sticky lg:top-24">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#D7DEE8] bg-[#F3F6FA] px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#0757A6]">
              <CircleHelp className="h-4 w-4" aria-hidden="true" />
              Helpful answers
            </div>
            <h2 className="mt-5 text-3xl font-bold leading-tight text-[#062A5E] sm:text-4xl lg:text-5xl">Frequently asked questions</h2>
            <p className="mt-5 max-w-md text-sm leading-7 text-[#53657A] sm:text-base">Everything you need to know before choosing your next vehicle from STBN AUTOS.</p>
            <a href="https://wa.me/2348161163069" target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#FFC400] px-5 py-3 text-sm font-bold text-[#031B3D] shadow-[0_12px_24px_-14px_#0757A6] transition-colors hover:bg-[#FFD34D]">
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Ask us on WhatsApp
            </a>
          </div>

          <div className="space-y-3">
            {questions.map(([question, answer], index) => (
              <details key={question} className="group overflow-hidden rounded-2xl border border-[#D7DEE8] bg-white shadow-[0_12px_30px_-24px_#031B3D] transition-all duration-300 hover:border-[#FFC400]/60 hover:shadow-[0_16px_34px_-22px_#062A5E] open:border-[#FFC400] open:bg-[#F3F6FA]">
                <summary className="flex cursor-pointer list-none items-center gap-4 px-5 py-5 text-left marker:hidden sm:px-6">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#D9ECFA] text-xs font-bold text-[#0757A6]">0{index + 1}</span>
                  <span className="flex-1 text-sm font-bold leading-6 text-[#062A5E] sm:text-base">{question}</span>
                  <span aria-hidden="true" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FFC400] text-[#031B3D] transition-all duration-300 group-open:rotate-45 group-open:bg-[#FFD34D]"><Plus className="h-4 w-4" /></span>
                </summary>
                <div className="mx-5 border-t border-[#D7DEE8] pb-5 pt-4 sm:mx-6">
                  <p className="pl-12 text-sm leading-6 text-[#53657A] sm:text-base">{answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
import { CircleHelp, MessageCircle, Plus } from "lucide-react";

