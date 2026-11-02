"use client";

import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper/types";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

import { routes } from "@/config/routes";
import type { CarWithImages } from "@/config/types";
import { formatPrice } from "@/lib/utils";

type FeaturedCarsCarouselProps = {
  cars: CarWithImages[];
};

export default function FeaturedCarsCarousel({ cars }: FeaturedCarsCarouselProps) {
  const swiperRef = useRef<SwiperType | null>(null);

  if (!cars.length) return null;

  return (
    <section aria-labelledby="featured-cars-heading" className="rounded-3xl bg-[#062A5E] p-5 shadow-[0_22px_55px_-30px_rgba(3,27,61,0.8)] sm:p-7">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#D9ECFA]">
            <Sparkles className="h-3.5 w-3.5 text-[#1689E8]" /> Hand-picked for you
          </div>
          <h2 id="featured-cars-heading" className="text-2xl font-bold text-white sm:text-3xl">Featured cars</h2>
        </div>
        {cars.length > 1 && (
          <div className="flex gap-2">
            <button type="button" aria-label="Previous featured car" onClick={() => swiperRef.current?.slidePrev()} className="grid h-9 w-9 place-items-center rounded-full border border-white/25 text-white transition hover:bg-white hover:text-[#062A5E]"><ChevronLeft className="h-4 w-4" /></button>
            <button type="button" aria-label="Next featured car" onClick={() => swiperRef.current?.slideNext()} className="grid h-9 w-9 place-items-center rounded-full border border-white/25 text-white transition hover:bg-white hover:text-[#062A5E]"><ChevronRight className="h-4 w-4" /></button>
          </div>
        )}
      </div>

      <Swiper
        onSwiper={(swiper) => { swiperRef.current = swiper; }}
        modules={[Pagination]}
        pagination={{ clickable: true }}
        loop={cars.length > 1}
        grabCursor={true}
        allowTouchMove={true}
        spaceBetween={16}
        slidesPerView={1}
        breakpoints={{ 640: { slidesPerView: 1.35 }, 1024: { slidesPerView: 2 } }}
        className="!pb-9"
      >
        {cars.map((car) => (
          <SwiperSlide key={car.id} className="h-auto">
            <Link href={routes.singleClassified(car.slug)} className="group flex h-full overflow-hidden rounded-2xl bg-white focus:outline-none focus:ring-2 focus:ring-[#1689E8] focus:ring-offset-2 focus:ring-offset-[#062A5E]">
              <div className="flex min-w-0 flex-1 flex-col sm:flex-row">
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#F3F6FA] sm:aspect-auto sm:w-[52%]">
                  <Image src={car.images[0]?.src || "/placeholder.jpg"} alt={car.images[0]?.alt || car.title} fill sizes="(max-width: 640px) 90vw, 420px" className="object-cover transition duration-500 group-hover:scale-105" />
                  <span className="absolute left-3 top-3 rounded-full bg-[#0757A6] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">Featured</span>
                </div>
                <div className="flex flex-1 flex-col justify-between p-4">
                  <div>
                    <p className="text-xs font-semibold text-[#53657A]">{car.year} · {car.make.name}</p>
                    <h3 className="mt-1 line-clamp-2 text-base font-bold leading-snug text-[#031B3D]">{car.title}</h3>
                  </div>
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <span className="text-sm font-extrabold text-[#0757A6]">{formatPrice({ price: car.price, currency: "NGN" })}</span>
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-[#D9ECFA] text-[#0757A6] transition group-hover:bg-[#0757A6] group-hover:text-white"><ArrowRight className="h-4 w-4" /></span>
                  </div>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
