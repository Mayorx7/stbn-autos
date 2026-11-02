import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { routes } from '@/config/routes';
import { MOCK_BRANDS, MOCK_CARS } from '@/lib/mock-data';

const BrandLogo = ({ image, name }: { image: string; name: string }) => {
  const [hasFailed, setHasFailed] = useState(false);

  return (
    <div className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl border border-[#D7DEE8] bg-white p-2 shadow-[0_12px_22px_-18px_#031B3D] transition-all duration-300 group-hover:border-[#FFC400] group-hover:shadow-[0_16px_28px_-16px_#031B3D]">
      {hasFailed ? (
        <span aria-label={`${name} logo`} className="grid h-full w-full place-items-center rounded-xl border border-white/20 bg-white/10 text-sm font-black text-white">
          {name.slice(0, 2).toUpperCase()}
        </span>
      ) : (
        <Image
          src={image}
          alt={`${name} logo`}
          fill
          sizes="(max-width: 640px) 40vw, (max-width: 1024px) 25vw, 180px"
          className="object-contain transition-transform duration-300 group-hover:scale-110"
          onError={() => setHasFailed(true)}
        />
      )}
    </div>
  );
};

const OurBrandSection = () => {
  const brands = MOCK_BRANDS;
  const count = MOCK_CARS.length;

  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-12">
        <div className="px-2 sm:text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#0757A6]">
            STBN AUTOS Inventory
          </p>

          <h2 className="mt-2 uppercase text-2xl font-bold tracking-tight text-[#062A5E] sm:text-4xl">
            Quality Cars Ready To Drive Today
          </h2>

          <p className="mt-4 text-base md:text-lg leading-7 text-[#53657A]">
            Explore our collection of {count} premium vehicles from top global
            makers. Whether you want to buy, sell, or swap, we guarantee trusted
            service and great deals.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {brands.map(({ id, image, name }) => (
            <Link
              key={id}
              href={`${routes.inventory}?make=${encodeURIComponent(id)}`}
              className="group flex min-h-40 flex-col items-center justify-center gap-4 rounded-xl border border-[#D7DEE8] bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#FFC400] hover:bg-[#F3F6FA] hover:shadow-[0_18px_30px_-18px_#031B3D] sm:p-6"
            >
              <BrandLogo image={image} name={name} />

              <span className="text-center text-sm font-semibold text-[#062A5E] transition-colors group-hover:text-[#0757A6]">
                {name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurBrandSection;
