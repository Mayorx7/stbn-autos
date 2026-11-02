import CarsList from "@/components/inventory/cars-list";
import DialogFilters from "@/components/inventory/DialogFilters";
import { InventorySkeleton } from "@/components/inventory/inventory-skeleton";
import Sidebar from "@/components/inventory/sidebar";
import CustomPagination from "@/components/shared/custom-pagination";
import { CARS_PER_PAGE } from "@/config/constants";
import { routes } from "@/config/routes";
import { MOCK_BRANDS, MOCK_CARS } from "@/lib/mock-data";
import React, { Suspense } from "react";
import { useSearchParams } from "react-router-dom";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Search } from "lucide-react";
import FeaturedCarsCarousel from "@/components/inventory/featured-cars-carousel";

const InventoryPage = () => {
  const [params] = useSearchParams();
  const searchParams = Object.fromEntries(params.entries());

  // Filter cars from mock data based on search params
  let cars = [...MOCK_CARS];

  // Basic text search
  const q = searchParams?.q as string | undefined;
  if (q) {
    cars = cars.filter(
      (c) =>
        c.title.toLowerCase().includes(q.toLowerCase()) ||
        c.description.toLowerCase().includes(q.toLowerCase())
    );
  }

  // Filter by make
  const makeId = searchParams?.make as string | undefined;
  if (makeId) {
    cars = cars.filter((c) => c.make.name.toLowerCase() === makeId.toLowerCase());
  }

  const model = searchParams?.model as string | undefined;
  if (model) cars = cars.filter((c) => c.title.toLowerCase().includes(model.toLowerCase()));

  const bodyType = searchParams?.bodyType as string | undefined;
  if (bodyType) cars = cars.filter((c) => c.bodyType === bodyType);

  const minPrice = Number(searchParams?.minPrice || 0);
  const maxPrice = Number(searchParams?.maxPrice || Number.MAX_SAFE_INTEGER);
  cars = cars.filter((c) => c.price >= minPrice && c.price <= maxPrice);

  const count = cars.length;

  // Pagination
  const page = Math.max(Number(searchParams?.page || 1), 1);
  const offset = (page - 1) * CARS_PER_PAGE;
  const paginatedCars = cars.slice(offset, offset + CARS_PER_PAGE);

  const totalPages = Math.ceil(count / CARS_PER_PAGE);

  const prices = MOCK_CARS.map((c) => c.price).filter(Boolean);
  const years = MOCK_CARS.map((c) => c.year).filter(Boolean);
  const readings = MOCK_CARS.map((c) => c.odoReading).filter(Boolean);

  const minMaxResult = {
    _min: {
      year: Math.min(...years),
      price: Math.min(...prices),
      odoReading: Math.min(...readings),
    },
    _max: {
      year: Math.max(...years),
      price: Math.max(...prices),
      odoReading: Math.max(...readings),
    },
  };

  const featuredCars = MOCK_CARS.filter((car) => car.featured);
  const showBrowseIntro = !q && !makeId && !model && !bodyType && !searchParams?.minPrice && !searchParams?.maxPrice && !searchParams?.page;
  const availableBrands = Array.from(new Map(MOCK_CARS.map((car) => [car.make.name, car.make])).values());

  return (
    <div className="bg-[#F3F6FA]">
      {showBrowseIntro && (
        <div className="mx-auto max-w-7xl px-4 pb-8 pt-7 sm:px-6 lg:px-8 lg:pt-10">
          <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0757A6]">STBN AUTOS</p>
              <h1 className="mt-1 text-3xl font-bold text-[#031B3D] sm:text-4xl">Explore our cars</h1>
              <p className="mt-2 max-w-xl text-sm text-[#53657A]">Discover quality vehicles selected for every kind of journey.</p>
            </div>
            <a href="#all-inventory" className="inline-flex items-center gap-2 text-sm font-bold text-[#0757A6] transition hover:text-[#1689E8]">Browse all inventory <ArrowRight className="h-4 w-4" /></a>
          </div>

          <FeaturedCarsCarousel cars={featuredCars} />

          <section aria-labelledby="brands-heading" className="mt-8">
            <div className="mb-4 flex items-center justify-between">
              <h2 id="brands-heading" className="text-xl font-bold text-[#031B3D]">Popular brands</h2>
              <span className="text-xs font-medium text-[#53657A]">Choose a make</span>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none]">
              {availableBrands.map((brand) => {
                const logo = MOCK_BRANDS.find((item) => item.name === brand.name)?.image || "/placeholder.png";
                return (
                  <Link key={brand.id} href={`${routes.inventory}?make=${encodeURIComponent(brand.name)}`} className="group flex w-24 shrink-0 flex-col items-center gap-2 rounded-2xl border border-[#D7DEE8] bg-white px-3 py-3 text-center shadow-[0_10px_26px_-24px_rgba(3,27,61,0.7)] transition hover:-translate-y-0.5 hover:border-[#1689E8] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#1689E8]">
                    <div className="relative grid h-12 w-12 place-items-center overflow-hidden rounded-xl bg-[#F3F6FA]">
                      <Image src={logo} alt={`${brand.name} logo`} fill sizes="48px" className="object-contain p-1.5" />
                    </div>
                    <span className="line-clamp-1 w-full text-xs font-bold text-[#062A5E] group-hover:text-[#0757A6]">{brand.name}</span>
                  </Link>
                );
              })}
            </div>
          </section>
        </div>
      )}

      <div id="all-inventory" className="flex scroll-mt-24 bg-white">
        <Sidebar minMaxValue={minMaxResult} searchParams={searchParams} />
        <div className="flex-1 p-4 sm:p-6">
        <div className="mb-5 flex flex-col justify-between gap-4 border-b border-[#D7DEE8] pb-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#0757A6]">Browse collection</p>
            <h2 className="mt-1 text-2xl font-bold text-[#031B3D]">All inventory</h2>
            <p className="mt-1 text-sm text-[#53657A]">{count} {count === 1 ? "vehicle" : "vehicles"} available{makeId ? ` from ${makeId}` : ""}</p>
          </div>
          <a href="#inventory-results" className="inline-flex items-center gap-2 rounded-xl border border-[#D7DEE8] bg-[#F3F6FA] px-3 py-2 text-xs font-bold text-[#062A5E] sm:hidden"><Search className="h-4 w-4" /> View results</a>
        </div>
        <div id="inventory-results" className="flex space-y-2 flex-col items-center justify-center pb-4 -mt-1">
          <div className="flex justify-between items-center w-full">
            <h2 className="text-sm md:text-base lg:text-xl font-semibold min-w-fit">
              {count} Cars Available
            </h2>
            <DialogFilters
              searchParams={searchParams}
              minMaxValue={minMaxResult}
              count={count}
            />
          </div>
          <CustomPagination
            baseURL={routes.inventory}
            totalPages={totalPages}
            styles={{
              paginationRoot: "justify-end hidden lg:flex",
              paginationPrevious: "",
              paginationNext: "",
              paginationLink: "border active:border",
              paginationLinkActive: "bg-[#0757A6] text-white",
            }}
          />
          <Suspense fallback={<InventorySkeleton />}>
            {count > 0 ? <CarsList cars={paginatedCars} favourites={[]} /> : (
              <div className="rounded-xl border border-[#D7DEE8] bg-[#F3F6FA] px-6 py-16 text-center">
                <h3 className="text-xl font-semibold text-[#062A5E]">No cars match these filters</h3>
                <p className="mt-2 text-sm text-[#53657A]">Try widening your budget or clearing one of the selected filters.</p>
                <a href={routes.inventory} className="mt-5 inline-flex rounded-md bg-[#0757A6] px-4 py-2 text-sm font-semibold text-white hover:bg-[#1689E8]">Clear filters</a>
              </div>
            )}
          </Suspense>
        </div>

        <CustomPagination
          baseURL={routes.inventory}
          totalPages={totalPages}
          styles={{
            paginationRoot: "justify-center lg:hidden pt-12",
            paginationPrevious: "",
            paginationNext: "",
            paginationLink: "border active:border",
            paginationLinkActive: "bg-[#0757A6] text-white",
          }}
        />
      </div>
    </div>
    </div>
  );
};

export default InventoryPage;
