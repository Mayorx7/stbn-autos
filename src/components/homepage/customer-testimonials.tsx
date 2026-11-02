import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { useEffect, useState } from "react";

const testimonials = [
  { quote: "STBN AUTOS made my first car purchase feel effortless. The vehicle was exactly as described, clean, and ready to drive the same day.", name: "Chinedu Okafor", detail: "Toyota Camry owner", initials: "CO" },
  { quote: "The team gave me a fair value for my old car and helped me find a Lexus that fits my family perfectly. Honest service from start to finish.", name: "Amaka Nwosu", detail: "Lexus RX owner", initials: "AN" },
  { quote: "I needed a clean BMW quickly and STBN AUTOS delivered. They were responsive on WhatsApp and the entire process was smooth.", name: "Tunde Adeyemi", detail: "BMW 3 Series owner", initials: "TA" },
];

export function CustomerTestimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => setActiveIndex((current) => (current + 1) % testimonials.length), 6000);
    return () => window.clearInterval(interval);
  }, []);

  const showPrevious = () => setActiveIndex((current) => (current - 1 + testimonials.length) % testimonials.length);
  const showNext = () => setActiveIndex((current) => (current + 1) % testimonials.length);
  const testimonial = testimonials[activeIndex];

  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="container mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#0757A6]">Customer voices</p>
          <h2 className="mt-3 text-3xl font-bold text-[#062A5E] sm:text-4xl">Testimonials</h2>
          <p className="mt-4 text-sm leading-6 text-[#53657A] sm:text-base">A few words from people who found the right car with STBN AUTOS.</p>
        </div>

        <div className="mt-10 grid overflow-hidden rounded-3xl border border-[#D7DEE8] bg-white shadow-[0_24px_50px_-36px_#031B3D] md:grid-cols-[0.8fr_1.7fr]">
          <div className="relative overflow-hidden bg-[#062A5E] p-8 text-white sm:p-10">
            <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full border border-white/15" />
            <p className="relative text-xs font-bold uppercase tracking-[0.2em] text-[#D9ECFA]">Verified customer</p>
            <Quote className="relative mt-12 h-14 w-14 text-[#FFC400]" aria-hidden="true" />
            <p className="relative mt-8 text-sm leading-6 text-[#D9ECFA]">We’re proud to make buying, selling, and swapping cars feel simple.</p>
            <p className="relative mt-12 text-4xl font-bold tracking-tight">0{activeIndex + 1}<span className="text-[#FFC400]">/0{testimonials.length}</span></p>
          </div>

          <div key={testimonial.name} className="flex min-h-[22rem] flex-col p-8 sm:p-10">
            <div className="flex gap-1" aria-label="5 out of 5 stars">
              {Array.from({ length: 5 }).map((_, index) => <Star key={index} className="h-4 w-4 fill-[#FFC400] text-[#FFC400]" aria-hidden="true" />)}
            </div>
            <blockquote className="mt-6 max-w-2xl text-xl font-medium leading-relaxed text-[#062A5E] sm:text-2xl">“{testimonial.quote}”</blockquote>
            <div className="mt-auto flex items-end justify-between gap-5 border-t border-[#D7DEE8] pt-6">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#D9ECFA] text-sm font-bold text-[#0757A6]">{testimonial.initials}</span>
                <div><p className="font-bold text-[#062A5E]">{testimonial.name}</p><p className="mt-0.5 text-sm text-[#53657A]">{testimonial.detail}</p></div>
              </div>
              <div className="hidden gap-2 sm:flex">
                <button type="button" onClick={showPrevious} aria-label="Show previous testimonial" className="rounded-full border border-[#D7DEE8] p-2.5 text-[#0757A6] transition-colors hover:border-[#FFC400] hover:bg-[#D9ECFA]"><ChevronLeft className="h-4 w-4" /></button>
                <button type="button" onClick={showNext} aria-label="Show next testimonial" className="rounded-full border border-[#D7DEE8] p-2.5 text-[#0757A6] transition-colors hover:border-[#FFC400] hover:bg-[#D9ECFA]"><ChevronRight className="h-4 w-4" /></button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-center gap-3" aria-label="Choose a testimonial">
          {testimonials.map((item, index) => <button key={item.name} type="button" onClick={() => setActiveIndex(index)} aria-label={`Show testimonial from ${item.name}`} aria-current={index === activeIndex ? "true" : undefined} className={`h-2 rounded-full transition-all ${index === activeIndex ? "w-9 bg-[#FFC400]" : "w-2 bg-[#D7DEE8] hover:bg-[#FFC400] hover:text-[#031B3D]"}`} />)}
          <button type="button" onClick={showPrevious} aria-label="Show previous testimonial" className="ml-2 rounded-full p-2 text-[#0757A6] sm:hidden"><ChevronLeft className="h-4 w-4" /></button>
          <button type="button" onClick={showNext} aria-label="Show next testimonial" className="rounded-full p-2 text-[#0757A6] sm:hidden"><ChevronRight className="h-4 w-4" /></button>
        </div>
      </div>
    </section>
  );
}
