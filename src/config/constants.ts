export const imageSources = {
    classifiedPlaceholder: `/placeholder.jpg`,
    carPlaceholer: `/placeholder.jpg`,
    features: `/placeholder.jpg`,
    carLineup: `/placeholder.jpg`,
}

export const CARS_PER_PAGE = 6;
export const SESSION_MAX_AGE = 7 * 24 * 60 * 60 * 1000;
export const MAX_IMAGE_SIZE = 20 * 1024 * 1024; // 20 MB
export const MAX_IMAGES = 8;

export const sortOrder = ["asc", "desc"] as const;

// Car status values (replaces Prisma ClassifiedStatus)
export const CarStatus = {
  DRAFT: "DRAFT",
  LIVE: "LIVE",
  SOLD: "SOLD",
} as const;
export type CarStatusType = keyof typeof CarStatus;

// Customer status values (replaces Prisma CustomerStatus)
export const CustomerStatus = {
  COLD: "COLD",
  CONTACTED: "CONTACTED",
  INTERESTED: "INTERESTED",
  PURCHASED: "PURCHASED",
  SUBSCRIBER: "SUBSCRIBER",
} as const;
export type CustomerStatusType = keyof typeof CustomerStatus;

// Enum maps for sidebar filters
export const OdoUnit = { MILES: "MILES", KM: "KM" } as const;
export const Transmission = { AUTOMATIC: "AUTOMATIC", MANUAL: "MANUAL" } as const;
export const FuelType = {
  PETROL: "PETROL",
  DIESEL: "DIESEL",
  ELECTRIC: "ELECTRIC",
  HYBRID: "HYBRID",
} as const;
export const BodyType = {
  SEDAN: "SEDAN",
  SUV: "SUV",
  HATCHBACK: "HATCHBACK",
  COUPE: "COUPE",
  CONVERTIBLE: "CONVERTIBLE",
  WAGON: "WAGON",
} as const;
export const Colour = {
  BLACK: "BLACK",
  WHITE: "WHITE",
  SILVER: "SILVER",
  RED: "RED",
  BLUE: "BLUE",
  GREY: "GREY",
  BROWN: "BROWN",
  GOLD: "GOLD",
  GREEN: "GREEN",
  ORANGE: "ORANGE",
  PINK: "PINK",
  PURPLE: "PURPLE",
  YELLOW: "YELLOW",
} as const;
export const ULEZCompliance = { COMPLIANT: "COMPLIANT", EXEMPT: "EXEMPT", NON_COMPLIANT: "NON_COMPLIANT" } as const;
export const CurrencyCode = { NGN: "NGN" } as const;

// Badge variant maps
export const CarBadgeMap: Record<string, string> = {
  DRAFT: "secondary",
  LIVE: "default",
  SOLD: "destructive",
};

export const CustomerBadgeMap: Record<string, string> = {
  COLD: "secondary",
  CONTACTED: "default",
  INTERESTED: "destructive",
  PURCHASED: "warning",
  SUBSCRIBER: "info",
};
