import React from 'react'
import { LatestArrivalsCarousel } from './LatestArrivalCarousel'
import { MOCK_CARS } from '@/lib/mock-data'
import Link from 'next/link'
import { ArrowUpRight, Sparkles } from 'lucide-react'
import { routes } from '@/config/routes'

const LastestArrival = () => {
  const featuredCars = MOCK_CARS.filter(
    (car) => car.status === "LIVE" && car.featured
  );
  const cars = (featuredCars.length ? featuredCars : MOCK_CARS.filter((car) => car.status === "LIVE")).slice(0, 6);

  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="container mx-auto max-w-7xl px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-[#031B3D] via-[#062A5E] to-[#0757A6] px-7 py-9 text-white shadow-[0_24px_50px_-30px_#031B3D] sm:px-10 sm:py-11">
          <div className="flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#D9ECFA]"><Sparkles className="h-4 w-4 text-[#FFC400]" aria-hidden="true" /> Selected inventory</div>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Featured Cars</h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-[#D9ECFA] sm:text-base">Hand-picked vehicles that are inspected, ready, and waiting for their next owner.</p>
            </div>
            <Link href={routes.inventory} className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-[#062A5E] transition-colors hover:bg-[#D9ECFA]">View all cars <ArrowUpRight className="h-4 w-4" /></Link>
          </div>
        </div>
        <div className="-mt-3 rounded-b-3xl bg-[#F3F6FA] px-4 pb-7 pt-6 sm:px-7 sm:pb-10">
          <LatestArrivalsCarousel cars={cars} favourites={[]} />
        </div>
      </div>
    </section>
  )
}

export default LastestArrival
