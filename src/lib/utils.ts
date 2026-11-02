import { AwaitedPageProps } from "@/config/types";
import { OdoUnit, Transmission, FuelType, Colour, BodyType, CarStatus } from "@/config/constants";
import prettyBytes from "pretty-bytes";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, parse } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface FormatPriceArgs {
  price: number | null;
  currency?: string | null;
}

export function formatPrice({ price, currency }: FormatPriceArgs) {
  if (!price) return "₦0";

  const formatter = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: currency || "NGN",
    currencyDisplay: "narrowSymbol",
    maximumFractionDigits: 0,
  });

  return formatter.format(price / 100);
}

export function formatNumber(
  num: number | null,
  options?: Intl.NumberFormatOptions
) {
  if (!num) return "0";
  return new Intl.NumberFormat("en-GB", options).format(num);
}

export function formatOdometerUnit(unit: string) {
  return unit === OdoUnit.MILES ? "miles" : "km";
}

export function formatTransmission(transmission: string) {
  return transmission === Transmission.AUTOMATIC ? "Automatic" : "Manual";
}

export function formatFuelType(fuelType: string) {
  switch (fuelType) {
    case FuelType.PETROL:
      return "Petrol";
    case FuelType.DIESEL:
      return "Diesel";
    case FuelType.ELECTRIC:
      return "Electric";
    case FuelType.HYBRID:
      return "Hybrid";
    default:
      return "Unknown";
  }
}

export function formatColour(colour: string) {
  switch (colour) {
    case Colour.BLACK: return "Black";
    case Colour.WHITE: return "White";
    case Colour.SILVER: return "Silver";
    case Colour.RED: return "Red";
    case Colour.BLUE: return "Blue";
    case Colour.BROWN: return "Brown";
    case Colour.GOLD: return "Gold";
    case Colour.GREEN: return "Green";
    case Colour.GREY: return "Grey";
    case Colour.ORANGE: return "Orange";
    case Colour.PINK: return "Pink";
    case Colour.PURPLE: return "Purple";
    case Colour.YELLOW: return "Yellow";
    default: return "Unknown";
  }
}

export function formatBodyType(bodyType: string) {
  switch (bodyType) {
    case BodyType.CONVERTIBLE: return "Convertible";
    case BodyType.COUPE: return "Coupe";
    case BodyType.HATCHBACK: return "Hatchback";
    case BodyType.SUV: return "SUV";
    case BodyType.WAGON: return "Wagon";
    case BodyType.SEDAN: return "Sedan";
    default: return "Unknown";
  }
}

export function formatCarStatus(status: string) {
  switch (status) {
    case CarStatus.LIVE: return "Live";
    case CarStatus.SOLD: return "Sold";
    case CarStatus.DRAFT: return "Draft";
    default: return "Unknown";
  }
}

export const buildMockFilterQuery = (
  searchParams: AwaitedPageProps["searchParams"] | undefined,
) => {
  return searchParams || {};
};

export const generataTimeOptions = () => {
  const times = [];
  const startHour = 8;
  const endHours = 20;
  for (let hour = startHour; hour <= endHours; hour++) {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    date.setHours(hour);
    date.setMinutes(0);
    const formattedTime = date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    times.push({ value: formattedTime, label: formattedTime });
  }
  return times;
};

export const generateDateOptions = () => {
  const today = new Date();
  const dates = [];
  for (let i = 0; i < 30; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    dates.push({
      label: format(date, "dd MMMM yyyy"),
      value: format(date, "yyyy-MM-dd"),
    });
  }
  return dates;
};

export const formatDate = (date: string, time: string) => {
  const parsedDate = parse(date, "yyyy-MM-dd", new Date());
  const parsedTime = parse(time, "HH:mm", new Date());
  parsedDate.setHours(parsedTime.getHours(), parsedTime.getMinutes(), 0, 0);
  return parsedDate;
};

export function calculatePercentageChange(current: number, previous: number) {
  if (previous === 0) return current > 0 ? 100 : current < 0 ? -100 : 0;
  return ((current - previous) / Math.abs(previous)) * 100;
}

export function generateYears(minYear: number, maxYear?: number): string[] {
  const currentYear = maxYear ? maxYear : new Date().getFullYear();
  const years: string[] = [];
  for (let year = currentYear; year >= minYear; year--) {
    years.push(`${year}`);
  }
  return years;
}

export function formatCustomerStatus(status: string) {
  switch (status) {
    case "COLD": return "Cold";
    case "CONTACTED": return "Contacted";
    case "INTERESTED": return "Interested";
    case "PURCHASED": return "Purchased";
    case "SUBSCRIBER": return "Subscriber";
    default: return status;
  }
}

export const convertToMb = (bytes: number) => {
  return prettyBytes(bytes, {
    bits: false,
    maximumFractionDigits: 1,
    space: false,
  });
};