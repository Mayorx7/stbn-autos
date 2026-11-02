"use client";

import { Heart, Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import CarsList from "@/components/inventory/cars-list";
import { routes } from "@/config/routes";
import { getFavouriteIds } from "@/lib/favourites";
import { MOCK_CARS } from "@/lib/mock-data";

export default function FavouritesPage() {
  const [favouriteIds, setFavouriteIds] = useState<number[]>([]);

  useEffect(() => {
    const refresh = () => setFavouriteIds(getFavouriteIds());
    refresh();
    window.addEventListener("stbn-favourites-changed", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("stbn-favourites-changed", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  const cars = MOCK_CARS.filter((car) => favouriteIds.includes(car.id));

  return (
    <div className="min-h-[65vh] bg-[#F3F6FA] py-8 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-7 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#0757A6]"><Heart className="h-4 w-4 fill-current" /> Your shortlist</div>
            <h1 className="mt-2 text-3xl font-bold text-[#031B3D] sm:text-4xl">Favourite cars</h1>
            <p className="mt-2 text-sm text-[#53657A]">Keep the cars you love in one easy-to-find place.</p>
          </div>
          {cars.length > 0 && <p className="text-sm font-semibold text-[#53657A]">{cars.length} saved {cars.length === 1 ? "car" : "cars"}</p>}
        </div>

        {cars.length > 0 ? <CarsList cars={cars} favourites={favouriteIds} /> : (
          <div className="grid min-h-72 place-items-center rounded-3xl border border-dashed border-[#D7DEE8] bg-white p-8 text-center">
            <div>
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-[#D9ECFA] text-[#0757A6]"><Heart className="h-6 w-6" /></span>
              <h2 className="mt-4 text-xl font-bold text-[#031B3D]">No saved cars yet</h2>
              <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#53657A]">Tap the heart on any vehicle to build your shortlist and compare your options later.</p>
              <Link href={routes.inventory} className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#0757A6] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#1689E8]"><Search className="h-4 w-4" /> Browse cars</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
