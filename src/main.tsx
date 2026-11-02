import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes, useParams, useSearchParams } from "react-router-dom";
import { NuqsAdapter } from "nuqs/adapters/react-router";
import { Toaster } from "@/components/ui/sonner";
import PublicLayout from "@/components/layouts/public-payout";
import Home from "@/app/(presentation)/page";
import InventoryPage from "@/app/(presentation)/inventory/page";
import ContactPage from "@/app/(presentation)/contact/page";
import CarPage from "@/app/(presentation)/inventory/[slug]/(car)/page";
import ReservePage from "@/app/(presentation)/inventory/[slug]/reserve/page";
import ReserveSuccessPage from "@/app/(presentation)/inventory/[slug]/success/page";
import NotAvailablePage from "@/app/(presentation)/inventory/[slug]/not-available/page";
import FavouritesPage from "@/app/(presentation)/favourites/page";
import SellSwapPage from "@/app/(presentation)/sell-swap/page";
import FormHeader from "@/components/reserve/FormHeader";
import CustomerDashboardPage from "@/app/(presentation)/customer/dashboard/page";
import AdminDashboard from "@/app/admin/dashboard/page";
import AdminCustomers from "@/app/admin/customers/page";
import AuthPage from "@/app/auth/page";
import "@/app/globals.css";

function PublicPage({ children }: { children: React.ReactNode }) {
  return <PublicLayout>{children}</PublicLayout>;
}

function ReservationPage() {
  return <main className="max-w-4xl mx-auto p-6 sm:p-8 md:p-10"><FormHeader /><ReservePage /></main>;
}

function App() {
  return (
    <NuqsAdapter>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<PublicPage><Home /></PublicPage>} />
          <Route path="/inventory" element={<PublicPage><InventoryPage /></PublicPage>} />
          <Route path="/contact" element={<PublicPage><ContactPage /></PublicPage>} />
          <Route path="/favourites" element={<PublicPage><FavouritesPage /></PublicPage>} />
          <Route path="/sell-swap" element={<PublicPage><SellSwapPage /></PublicPage>} />
          <Route path="/customer/dashboard" element={<PublicPage><CustomerDashboardPage /></PublicPage>} />
          <Route path="/dashboard" element={<Navigate to="/customer/dashboard" replace />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/customers" element={<AdminCustomers />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/inventory/:slug" element={<PublicPage><CarPage /></PublicPage>} />
          <Route path="/inventory/:slug/reserve" element={<PublicPage><ReservationPage /></PublicPage>} />
          <Route path="/inventory/:slug/success" element={<PublicPage><ReserveSuccessPage /></PublicPage>} />
          <Route path="/inventory/:slug/not-available" element={<PublicPage><NotAvailablePage /></PublicPage>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
      <Toaster />
    </NuqsAdapter>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode><BrowserRouter><App /></BrowserRouter></StrictMode>,
);
