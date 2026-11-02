// Static mock data replacing Prisma/database queries
// All car data is served from this file after backend removal

export type MockImage = {
  id: number;
  src: string;
  alt: string;
  blurhash: string;
};

export type MockCar = {
  id: number;
  slug: string;
  title: string;
  description: string;
  price: number;
  year: number;
  colour: string;
  transmission: string;
  fuelType: string;
  bodyType: string;
  odoReading: number;
  odoUnit: string;
  doors: number;
  seats: number;
  vrm: string;
  status: string;
  featured?: boolean;
  views: number;
  createdAt: string;
  images: MockImage[];
  make: { id: number; name: string; image: string };
};

export type MockCustomerFull = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  status: string;
  bookingDate: string | null;
  createdAt: string;
  updatedAt: string;
  slug: string | null;
  classified: { title: string; vrm: string } | null;
};

export const MOCK_CUSTOMERS: MockCustomerFull[] = [
  {
    id: 1,
    firstName: "Emeka",
    lastName: "Nwosu",
    email: "emeka.nwosu@example.com",
    mobile: "+234 803 111 2222",
    status: "PURCHASED",
    bookingDate: "2024-03-10T10:00:00Z",
    createdAt: "2024-01-05T09:00:00Z",
    updatedAt: "2024-03-10T10:00:00Z",
    slug: "2021-bmw-x5-xdrive40i",
    classified: { title: "2021 BMW X5 xDrive40i", vrm: "LAG-321-MN" },
  },
  {
    id: 2,
    firstName: "Fatima",
    lastName: "Musa",
    email: "fatima.musa@example.com",
    mobile: "+234 806 333 4444",
    status: "INTERESTED",
    bookingDate: "2024-03-15T11:00:00Z",
    createdAt: "2024-01-10T10:00:00Z",
    updatedAt: "2024-03-01T12:00:00Z",
    slug: "2023-toyota-rav4-hybrid",
    classified: { title: "2023 Toyota RAV4 Hybrid", vrm: "OYO-123-GH" },
  },
  {
    id: 3,
    firstName: "Ngozi",
    lastName: "Balogun",
    email: "ngozi.balogun@example.com",
    mobile: "+234 701 555 6666",
    status: "CONTACTED",
    bookingDate: "2024-04-01T09:00:00Z",
    createdAt: "2024-01-20T08:00:00Z",
    updatedAt: "2024-03-20T14:00:00Z",
    slug: "2022-ford-explorer-xlt",
    classified: { title: "2022 Ford Explorer XLT", vrm: "FCT-789-KL" },
  },
  {
    id: 4,
    firstName: "Chukwudi",
    lastName: "Eze",
    email: "chukwudi.eze@example.com",
    mobile: "+234 809 777 8888",
    status: "COLD",
    bookingDate: null,
    createdAt: "2024-02-01T07:00:00Z",
    updatedAt: "2024-02-01T07:00:00Z",
    slug: null,
    classified: null,
  },
  {
    id: 5,
    firstName: "Adaeze",
    lastName: "Okonkwo",
    email: "adaeze.okonkwo@example.com",
    mobile: "+234 802 999 0000",
    status: "SUBSCRIBER",
    bookingDate: null,
    createdAt: "2024-02-05T09:30:00Z",
    updatedAt: "2024-02-05T09:30:00Z",
    slug: null,
    classified: null,
  },
  {
    id: 6,
    firstName: "Tunde",
    lastName: "Adeyemi",
    email: "tunde.adeyemi@example.com",
    mobile: "+234 808 121 3434",
    status: "PURCHASED",
    bookingDate: "2024-02-20T10:00:00Z",
    createdAt: "2024-01-12T11:00:00Z",
    updatedAt: "2024-02-20T10:00:00Z",
    slug: "2022-toyota-camry-xle",
    classified: { title: "2022 Toyota Camry XLE", vrm: "LAG-234-AB" },
  },
  {
    id: 7,
    firstName: "Amaka",
    lastName: "Obi",
    email: "amaka.obi@example.com",
    mobile: "+234 705 232 4545",
    status: "INTERESTED",
    bookingDate: "2024-03-25T12:00:00Z",
    createdAt: "2024-02-10T10:00:00Z",
    updatedAt: "2024-03-10T10:00:00Z",
    slug: "2020-mercedes-benz-c300",
    classified: { title: "2020 Mercedes-Benz C300", vrm: "KAN-890-EF" },
  },
  {
    id: 8,
    firstName: "Seun",
    lastName: "Fadahunsi",
    email: "seun.fadahunsi@example.com",
    mobile: "+234 810 456 7890",
    status: "CONTACTED",
    bookingDate: null,
    createdAt: "2024-02-14T08:00:00Z",
    updatedAt: "2024-02-20T09:00:00Z",
    slug: null,
    classified: null,
  },
  {
    id: 9,
    firstName: "Kemi",
    lastName: "Lawson",
    email: "kemi.lawson@example.com",
    mobile: "+234 704 321 6543",
    status: "SUBSCRIBER",
    bookingDate: null,
    createdAt: "2024-02-18T10:00:00Z",
    updatedAt: "2024-02-18T10:00:00Z",
    slug: null,
    classified: null,
  },
  {
    id: 10,
    firstName: "Ife",
    lastName: "Ogundimu",
    email: "ife.ogundimu@example.com",
    mobile: "+234 803 654 3210",
    status: "COLD",
    bookingDate: null,
    createdAt: "2024-02-22T07:00:00Z",
    updatedAt: "2024-02-22T07:00:00Z",
    slug: null,
    classified: null,
  },
  {
    id: 11,
    firstName: "Bola",
    lastName: "Adekunle",
    email: "bola.adekunle@example.com",
    mobile: "+234 802 765 4321",
    status: "INTERESTED",
    bookingDate: "2024-03-30T09:00:00Z",
    createdAt: "2024-03-01T11:00:00Z",
    updatedAt: "2024-03-15T10:00:00Z",
    slug: "2019-lexus-rx350",
    classified: { title: "2019 Lexus RX350", vrm: "ENU-456-IJ" },
  },
  {
    id: 12,
    firstName: "Chisom",
    lastName: "Ikenna",
    email: "chisom.ikenna@example.com",
    mobile: "+234 706 876 5432",
    status: "PURCHASED",
    bookingDate: "2024-03-05T10:00:00Z",
    createdAt: "2024-01-25T09:00:00Z",
    updatedAt: "2024-03-05T10:00:00Z",
    slug: "2021-honda-accord-sport",
    classified: { title: "2021 Honda Accord Sport", vrm: "ABI-567-CD" },
  },
];

export type MockBrand = {
  id: number;
  name: string;
  image: string;
};

export type MockCampaign = {
  id: number;
  title: string;
  description: string;
  ctaLabel: string;
  href: string;
  active: boolean;
};

export const MOCK_CAMPAIGNS: MockCampaign[] = [
  {
    id: 1,
    title: "Featured vehicle offers",
    description: "Explore our hand-picked vehicles and speak with the team to find the right fit.",
    ctaLabel: "View featured cars",
    href: "/inventory",
    active: true,
  },
];

export const MOCK_BRANDS: MockBrand[] = [
  { id: 1, name: "Toyota", image: "/brands/toyota-logo.png" },
  { id: 2, name: "Honda", image: "/brands/honda-logo.png" },
  { id: 3, name: "Mercedes-Benz", image: "/brands/mercedes-logo.png" },
  { id: 4, name: "BMW", image: "/brands/bmw-logo.png" },
  { id: 5, name: "Lexus", image: "/brands/lexus-logo.png" },
  { id: 6, name: "Ford", image: "/brands/ford-logo.png" },
  { id: 7, name: "Hyundai", image: "/brands/hyundai-logo.png" },
  { id: 8, name: "Kia", image: "/brands/kia-logo.png" },
  { id: 9, name: "Volkswagen", image: "/brands/volkswagen-logo.png" },
  { id: 10, name: "Audi", image: "/brands/audi-logo.png" },
  { id: 11, name: "Nissan", image: "/brands/nissan-logo.png" },
  { id: 12, name: "Chevrolet", image: "/brands/chevrolet-logo.png" },
  { id: 13, name: "Tesla", image: "/brands/tesla-logo.png" },
];

export const MOCK_CARS: MockCar[] = [
  {
    id: 1,
    slug: "2022-toyota-camry-xle",
    title: "2022 Toyota Camry XLE",
    description: "<p>Elegant and fuel-efficient sedan. Well maintained, single owner. Full service history available.</p>",
    price: 1850000,
    year: 2022,
    colour: "WHITE",
    transmission: "AUTOMATIC",
    fuelType: "PETROL",
    bodyType: "SEDAN",
    odoReading: 32000,
    odoUnit: "KM",
    doors: 4,
    seats: 5,
    vrm: "LAG-234-AB",
    status: "LIVE",
    featured: true,
    views: 245,
    createdAt: "2024-01-15T10:00:00Z",
    images: [
      { id: 1, src: "/placeholder.jpg", alt: "2022 Toyota Camry XLE", blurhash: "" },
    ],
    make: { id: 1, name: "Toyota", image: "/brands/toyota.png" },
  },
  {
    id: 2,
    slug: "2021-honda-accord-sport",
    title: "2021 Honda Accord Sport",
    description: "<p>Sporty and reliable. Excellent fuel economy. Perfect family car with advanced safety features.</p>",
    price: 1650000,
    year: 2021,
    colour: "BLACK",
    transmission: "AUTOMATIC",
    fuelType: "PETROL",
    bodyType: "SEDAN",
    odoReading: 45000,
    odoUnit: "KM",
    doors: 4,
    seats: 5,
    vrm: "ABI-567-CD",
    status: "LIVE",
    views: 189,
    createdAt: "2024-01-20T10:00:00Z",
    images: [
      { id: 2, src: "/placeholder.jpg", alt: "2021 Honda Accord Sport", blurhash: "" },
    ],
    make: { id: 2, name: "Honda", image: "/brands/honda.png" },
  },
  {
    id: 3,
    slug: "2020-mercedes-benz-c300",
    title: "2020 Mercedes-Benz C300",
    description: "<p>Luxury at its finest. Premium interior, panoramic roof, and cutting-edge tech. Must see!</p>",
    price: 2800000,
    year: 2020,
    colour: "SILVER",
    transmission: "AUTOMATIC",
    fuelType: "PETROL",
    bodyType: "SEDAN",
    odoReading: 55000,
    odoUnit: "KM",
    doors: 4,
    seats: 5,
    vrm: "KAN-890-EF",
    status: "LIVE",
    views: 312,
    createdAt: "2024-02-01T10:00:00Z",
    images: [
      { id: 3, src: "/placeholder.jpg", alt: "2020 Mercedes-Benz C300", blurhash: "" },
    ],
    make: { id: 3, name: "Mercedes-Benz", image: "/brands/mercedes.png" },
  },
  {
    id: 4,
    slug: "2023-toyota-rav4-hybrid",
    title: "2023 Toyota RAV4 Hybrid",
    description: "<p>Brand new RAV4 Hybrid. Zero emissions in city. Advanced AWD system. Top of the range spec.</p>",
    price: 3200000,
    year: 2023,
    colour: "BLUE",
    transmission: "AUTOMATIC",
    fuelType: "HYBRID",
    bodyType: "SUV",
    odoReading: 8000,
    odoUnit: "KM",
    doors: 4,
    seats: 5,
    vrm: "OYO-123-GH",
    status: "LIVE",
    featured: true,
    views: 420,
    createdAt: "2024-02-10T10:00:00Z",
    images: [
      { id: 4, src: "/placeholder.jpg", alt: "2023 Toyota RAV4 Hybrid", blurhash: "" },
    ],
    make: { id: 1, name: "Toyota", image: "/brands/toyota.png" },
  },
  {
    id: 5,
    slug: "2019-lexus-rx350",
    title: "2019 Lexus RX350",
    description: "<p>Premium Japanese luxury SUV. Mark Levinson sound system. Loaded with features. Drives like new.</p>",
    price: 2400000,
    year: 2019,
    colour: "RED",
    transmission: "AUTOMATIC",
    fuelType: "PETROL",
    bodyType: "SUV",
    odoReading: 67000,
    odoUnit: "KM",
    doors: 4,
    seats: 5,
    vrm: "ENU-456-IJ",
    status: "LIVE",
    views: 278,
    createdAt: "2024-02-15T10:00:00Z",
    images: [
      { id: 5, src: "/placeholder.jpg", alt: "2019 Lexus RX350", blurhash: "" },
    ],
    make: { id: 5, name: "Lexus", image: "/brands/lexus.png" },
  },
  {
    id: 6,
    slug: "2022-ford-explorer-xlt",
    title: "2022 Ford Explorer XLT",
    description: "<p>Powerful 7-seater SUV. Spacious interior, great towing capacity. Ideal for big families.</p>",
    price: 2100000,
    year: 2022,
    colour: "GREY",
    transmission: "AUTOMATIC",
    fuelType: "PETROL",
    bodyType: "SUV",
    odoReading: 28000,
    odoUnit: "KM",
    doors: 4,
    seats: 7,
    vrm: "FCT-789-KL",
    status: "LIVE",
    views: 195,
    createdAt: "2024-02-20T10:00:00Z",
    images: [
      { id: 6, src: "/placeholder.jpg", alt: "2022 Ford Explorer XLT", blurhash: "" },
    ],
    make: { id: 6, name: "Ford", image: "/brands/ford.png" },
  },
  {
    id: 7,
    slug: "2021-bmw-x5-xdrive40i",
    title: "2021 BMW X5 xDrive40i",
    description: "<p>Thrilling performance meets ultimate luxury. M-Sport package. Panoramic sunroof. Low mileage.</p>",
    price: 3900000,
    year: 2021,
    colour: "BLACK",
    transmission: "AUTOMATIC",
    fuelType: "PETROL",
    bodyType: "SUV",
    odoReading: 41000,
    odoUnit: "KM",
    doors: 4,
    seats: 5,
    vrm: "LAG-321-MN",
    status: "LIVE",
    featured: true,
    views: 501,
    createdAt: "2024-03-01T10:00:00Z",
    images: [
      { id: 7, src: "/placeholder.jpg", alt: "2021 BMW X5 xDrive40i", blurhash: "" },
    ],
    make: { id: 4, name: "BMW", image: "/brands/bmw.png" },
  },
  {
    id: 8,
    slug: "2023-hyundai-tucson-n-line",
    title: "2023 Hyundai Tucson N-Line",
    description: "<p>Striking design with sporty N-Line touches. Loaded tech features. Android Auto &amp; Apple CarPlay.</p>",
    price: 1950000,
    year: 2023,
    colour: "ORANGE",
    transmission: "AUTOMATIC",
    fuelType: "PETROL",
    bodyType: "SUV",
    odoReading: 12000,
    odoUnit: "KM",
    doors: 4,
    seats: 5,
    vrm: "RIV-654-OP",
    status: "LIVE",
    views: 167,
    createdAt: "2024-03-05T10:00:00Z",
    images: [
      { id: 8, src: "/placeholder.jpg", alt: "2023 Hyundai Tucson N-Line", blurhash: "" },
    ],
    make: { id: 7, name: "Hyundai", image: "/brands/hyundai.png" },
  },
];
