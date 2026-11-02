import { MockCar } from "@/lib/mock-data";
import React from "react";
import CarCarousel from "./car-carousel";
import Image from "next/image";
import { formatBodyType, formatColour, formatFuelType, formatNumber, formatOdometerUnit, formatPrice, formatTransmission } from "@/lib/utils";
import HtmlParser from "../shared/htmlParser";
import { Button } from "../ui/button";
import Link from "next/link";
import { routes } from "@/config/routes";
import { MultiStepFormEnum } from "@/config/types";
import { CheckIcon, XIcon, MessageCircle, Phone, ArrowLeft, CalendarDays, Heart, Share2 } from "lucide-react";
import {
	CarFrontIcon,
	CarIcon,
	Fingerprint,
	FuelIcon,
	GaugeIcon,
	PowerIcon,
	UsersIcon,
} from "lucide-react";
type CarWithImagesAndMake = MockCar;

const features = (props: CarWithImagesAndMake) => [
	{
		id: 1,
		icon:
			props.ulezCompliance === "EXEMPT" ? (
				<CheckIcon className="w-6 h-6 mx-auto text-[#FFC400]" />
			) : (
				<XIcon className="w-6 h-6 mx-auto text-[#0757A6]" />
			),
		label: (props.ulezCompliance),
	},
	{
		id: 2,
		icon: <Fingerprint className="w-6 h-6 mx-auto text-[#062A5E]" />,
		label: props.vrm,
	},
	{
		id: 3,
		icon: <CarIcon className="w-6 h-6 mx-auto text-[#062A5E]" />,
		label: formatBodyType(props.bodyType),
	},
	{
		id: 4,
		icon: <FuelIcon className="w-6 h-6 mx-auto text-[#062A5E]" />,
		label: formatFuelType(props.fuelType),
	},
	{
		id: 5,
		icon: <PowerIcon className="w-6 h-6 mx-auto text-[#062A5E]" />,
		label: formatTransmission(props.transmission),
	},
	{
		id: 6,
		icon: <GaugeIcon className="w-6 h-6 mx-auto text-[#062A5E]" />,
		label: `${formatNumber(props.odoReading)} ${formatOdometerUnit(props.odoUnit)}`,
	},
	{
		id: 7,
		icon: <UsersIcon className="w-6 h-6 mx-auto text-[#062A5E]" />,
		label: props.seats,
	},
	{
		id: 8,
		icon: <CarFrontIcon className="w-6 h-6 mx-auto text-[#062A5E]" />,
		label: props.doors,
	},
];

const CarView = (props: CarWithImagesAndMake & { currency?: string | null }) => {
  return (
    <div className="bg-white py-5 sm:py-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Link href={routes.inventory} className="mb-4 inline-flex items-center gap-2 text-sm font-bold text-[#0757A6] transition hover:text-[#1689E8]"><ArrowLeft className="h-4 w-4" /> Back to inventory</Link>
        <div className="grid gap-7 lg:grid-cols-[minmax(0,1.1fr)_minmax(360px,0.9fr)] lg:gap-10">
          <div className="overflow-hidden rounded-3xl bg-[#F3F6FA]">
            <CarCarousel images={props.images} />
          </div>
          <div>
            <div className="flex items-start justify-between gap-4">
              <div className="flex min-w-0 items-center gap-3">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-[#D7DEE8] bg-[#F3F6FA]">
                  <Image src={props.make.image} alt={props.make.name} fill sizes="48px" className="object-contain p-1.5" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#0757A6]">{props.year} {props.make.name}</p>
                  <h1 className="mt-1 text-2xl font-bold leading-tight text-[#031B3D] sm:text-3xl">{props.title}</h1>
                </div>
              </div>
              <div className="flex gap-2 text-[#0757A6]"><span className="grid h-9 w-9 place-items-center rounded-full border border-[#D7DEE8]"><Heart className="h-4 w-4" /></span><span className="grid h-9 w-9 place-items-center rounded-full border border-[#D7DEE8]"><Share2 className="h-4 w-4" /></span></div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#D9ECFA] px-3 py-1.5 text-xs font-bold text-[#062A5E]"><CalendarDays className="h-3.5 w-3.5" /> {props.year}</span>
              <span className="rounded-full bg-[#D9ECFA] px-3 py-1.5 text-xs font-bold text-[#062A5E]">{formatNumber(props.odoReading)} {formatOdometerUnit(props.odoUnit)}</span>
              <span className="rounded-full bg-[#D9ECFA] px-3 py-1.5 text-xs font-bold text-[#062A5E]">{formatFuelType(props.fuelType)}</span>
              <span className="rounded-full bg-[#D9ECFA] px-3 py-1.5 text-xs font-bold text-[#062A5E]">{formatColour(props.colour)}</span>
            </div>
            {props.description && <div className="mt-5 text-sm leading-6 text-[#53657A]"><HtmlParser html={props.description} /></div>}

            <div className="mt-6 rounded-2xl border border-[#D7DEE8] bg-[#F3F6FA] p-5">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#53657A]">Our price</p>
              <p className="mt-1 text-3xl font-extrabold text-[#062A5E]">{formatPrice({ price: props.price, currency: props.currency })}</p>
              <Button className="mt-4 h-12 w-full rounded-xl bg-[#0757A6] font-bold text-white hover:bg-[#1689E8]" asChild><Link href={routes.reserve(props.slug, MultiStepFormEnum.WELCOME)}>Reserve this car</Link></Button>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <a href={`https://wa.me/2348161163069?text=${encodeURIComponent(`Hello, I am interested in the ${props.title}. Please provide more details.`)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#0757A6] bg-white px-3 py-3 text-sm font-bold text-[#0757A6] transition hover:bg-[#D9ECFA]"><MessageCircle className="h-4 w-4" /> Chat</a>
                <a href="tel:08161163069" className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#0757A6] bg-white px-3 py-3 text-sm font-bold text-[#0757A6] transition hover:bg-[#D9ECFA]"><Phone className="h-4 w-4" /> Call</a>
              </div>
            </div>

            <section className="mt-6" aria-labelledby="car-specifications-heading">
              <h2 id="car-specifications-heading" className="text-lg font-bold text-[#031B3D]">Car details</h2>
              <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {features(props).slice(2).map(({ id, icon, label }) => (
                  <div key={id} className="flex min-h-24 flex-col items-center justify-center rounded-xl border border-[#D7DEE8] bg-white p-3 text-center">
                    {icon}<p className="mt-2 text-xs font-semibold text-[#53657A]">{label}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarView;
