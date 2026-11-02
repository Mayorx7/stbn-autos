import { useLocation, useNavigate, useSearchParams as useRouterSearchParams } from "react-router-dom";

export function useRouter() {
  const navigate = useNavigate();
  return { push: (to: string) => navigate(to), replace: (to: string) => navigate(to, { replace: true }), back: () => navigate(-1), refresh: () => window.dispatchEvent(new PopStateEvent("popstate")) };
}

export function usePathname() { return useLocation().pathname; }
export function useSearchParams() { return useRouterSearchParams()[0]; }
export function notFound(): never { throw new Error("Not found"); }
export function redirect(to: string): never { window.location.assign(to); throw new Error("Redirecting"); }
