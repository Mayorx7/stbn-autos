import { MultiStepFormEnum } from "./types";

export const routes = {
    home: "/",
    singleClassified: (slug: string) => `/inventory/${slug}`,
    reserve: (slug: string, step: MultiStepFormEnum) => `/inventory/${slug}/reserve?step=${step}`,
    reserveSuccess: (slug: string) => `/inventory/${slug}/success`,
    favourites: "/favourites",
    contact: "/contact",
    sellSwap: "/sell-swap",
    inventory: "/inventory",
    notAvailable: (slug: string) => `/inventory/${slug}/not-available`,
    customerDashboard: "/customer/dashboard",
    auth: "/auth",
}
