"use client";
import { routes } from "@/config/routes";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { CarWithImages } from "@/config/types";
import { ArrowRight, GaugeCircle } from "lucide-react";
import { formatNumber, formatOdometerUnit, formatPrice } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import FavButton from "./fav-button";
import { usePathname } from "next/navigation";
import { getFavouriteIds } from "@/lib/favourites";
interface CarCardProps {
  car: CarWithImages;
  favourites: number[];
}

const CarCard = ({ car, favourites }: CarCardProps) => {
  const [isFav, setIsFav] = useState(favourites.includes(car.id));
  const [isVisible, setIsVisible] = useState(true);
  const pathname = usePathname();
  useEffect(() => {
    setIsFav(getFavouriteIds().includes(car.id));
  }, [car.id]);
  useEffect(() => {
    if (!isFav && pathname === routes.favourites) {
      setIsVisible(false);
    }
  }, [isFav, pathname]);
  return (
    <AnimatePresence>
      {isVisible && (
         <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          key={car.id}
          id={car.slug || "slug"}
         className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#D7DEE8] bg-white p-2.5 shadow-[0_12px_28px_-24px_rgba(3,27,61,0.55)] transition duration-200 hover:-translate-y-1 hover:border-[#1689E8] hover:shadow-lg">
        <Link href={routes.singleClassified(car.slug || "slug")} className="block">
        <div className="relative aspect-[4/2.55] overflow-hidden rounded-xl bg-[#F3F6FA]">
            <Image
              placeholder={car.images[0]?.blurhash ? "blur" : "empty"}
              blurDataURL={car.images[0]?.blurhash || undefined}
              src={car.images[0]?.src || "/placeholder.png"}
              alt={car.images[0]?.alt || "Car Image"}
              fill={true}
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
              quality={25}
              className="object-cover transition duration-500 group-hover:scale-105"
            />
            {car.featured && <span className="absolute bottom-2 left-2 rounded-full bg-[#0757A6] px-2 py-1 text-[9px] font-bold uppercase tracking-wide text-white">Featured</span>}
          <FavButton 
          setIsFav={setIsFav}
          isFav={isFav}
          id={car.id}
          />
        </div>
        <div className="px-1 pb-1 pt-3">
          <p className="line-clamp-1 text-xs font-extrabold uppercase tracking-tight text-[#031B3D] sm:text-sm">{car.title}</p>
          <p className="mt-1 flex items-center gap-1 text-[10px] font-medium text-[#53657A] sm:text-xs"><GaugeCircle className="h-3 w-3" /> {car.year} · {formatNumber(car.odoReading)} {formatOdometerUnit(car.odoUnit)}</p>
          <div className="mt-3 flex items-center justify-between gap-3">
            <span className="text-sm font-extrabold tracking-wide text-[#062A5E] sm:text-base">{formatPrice({ price: car.price, currency: "NGN" })}</span>
            <span aria-label={`View ${car.title} details`} className="grid h-7 w-7 place-items-center rounded-full text-[#0757A6] transition group-hover:bg-[#D9ECFA]"><ArrowRight className="h-4 w-4" /></span>
          </div>
        </div>
        </Link>
      </motion.div>
      )}
     
    </AnimatePresence>
  );
};

export default CarCard;
