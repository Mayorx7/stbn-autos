import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  CarFront,
  Users,
  Settings,
  Menu,
  X,
  TrendingUp,
  TrendingDown,
  Eye,
  Sparkles,
  ArrowRight,
  Plus,
  Search,
  Bell,
  ChevronRight,
  Star,
  BarChart2,
  Activity,
  DollarSign,
  Package,
  AlertCircle,
  CheckCircle2,
  Clock,
  ExternalLink,
  RefreshCw,
} from "lucide-react";
import { MOCK_CARS, MockCar } from "@/lib/mock-data";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  CartesianGrid,
  AreaChart,
  Area,
  TooltipProps,
} from "recharts";
import { cn } from "@/lib/utils";

// ─── helpers ──────────────────────────────────────────────────────────────────

const fmt = (n: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(n);

const fmtCompact = (n: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(n);

// ─── derived data ──────────────────────────────────────────────────────────────

const liveCars = MOCK_CARS.filter((c) => c.status === "LIVE");
const soldCars = MOCK_CARS.filter((c) => c.status === "SOLD");
const draftCars = MOCK_CARS.filter((c) => c.status === "DRAFT");
const featuredCars = MOCK_CARS.filter((c) => c.featured);
const totalViews = MOCK_CARS.reduce((s, c) => s + c.views, 0);
const stockValue = liveCars.reduce((s, c) => s + c.price, 0);
const avgPrice =
  liveCars.length > 0 ? Math.round(stockValue / liveCars.length) : 0;
const topCar = [...MOCK_CARS].sort((a, b) => b.views - a.views)[0];
const recentCars = [...MOCK_CARS]
  .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt))
  .slice(0, 6);

// body-type breakdown for pie chart
const bodyTypeCounts = MOCK_CARS.reduce<Record<string, number>>((acc, car) => {
  acc[car.bodyType] = (acc[car.bodyType] ?? 0) + 1;
  return acc;
}, {});
const pieData = Object.entries(bodyTypeCounts).map(([name, value]) => ({
  name,
  value,
}));

// monthly views trend (simulated from createdAt months)
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const viewsByMonth = MOCK_CARS.reduce<Record<number, number>>((acc, car) => {
  const m = new Date(car.createdAt).getMonth();
  acc[m] = (acc[m] ?? 0) + car.views;
  return acc;
}, {});
const viewsTrend = monthNames.map((month, i) => ({
  month,
  views: viewsByMonth[i] ?? 0,
  revenue: (viewsByMonth[i] ?? 0) * 8500, // simulated revenue
}));

// price range distribution
const priceRanges = [
  { label: "< ₦1M", min: 0, max: 1_000_000 },
  { label: "₦1M–2M", min: 1_000_000, max: 2_000_000 },
  { label: "₦2M–3M", min: 2_000_000, max: 3_000_000 },
  { label: "₦3M–4M", min: 3_000_000, max: 4_000_000 },
  { label: "> ₦4M", min: 4_000_000, max: Infinity },
];
const priceDistData = priceRanges.map((r) => ({
  label: r.label,
  count: MOCK_CARS.filter((c) => c.price >= r.min && c.price < r.max).length,
}));

// fuel type breakdown
const fuelTypeCounts = MOCK_CARS.reduce<Record<string, number>>((acc, c) => {
  acc[c.fuelType] = (acc[c.fuelType] ?? 0) + 1;
  return acc;
}, {});
const fuelData = Object.entries(fuelTypeCounts).map(([name, value]) => ({
  name,
  value,
}));

// PIE colours (with brand signature yellow #FFC400 leading)
const PIE_COLORS = ["#FFC400", "#1689E8", "#0757A6", "#D9ECFA", "#53657A", "#031B3D"];

// ─── nav links ─────────────────────────────────────────────────────────────────
const NAV = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/admin/dashboard" },
  { label: "Inventory", icon: CarFront, href: "/inventory" },
  { label: "Customers", icon: Users, href: "/" },
  { label: "Settings", icon: Settings, href: "/" },
];

// ─── CustomTooltip for charts ──────────────────────────────────────────────────
const ChartTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-[#0757A6]/40 bg-[#031B3D] px-4 py-3 shadow-xl">
      <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-[#D9ECFA]">
        {label}
      </p>
      {payload.map((p) => (
        <p
          key={p.dataKey}
          className={cn(
            "text-sm font-bold",
            p.dataKey === "revenue" ? "text-[#FFC400]" : "text-white"
          )}
        >
          {p.dataKey === "revenue"
            ? `Revenue: ${fmtCompact(p.value as number)}`
            : p.dataKey === "count"
            ? `${p.value} vehicles`
            : `${p.value?.toLocaleString()} views`}
        </p>
      ))}
    </div>
  );
};

// ─── KPI Card ──────────────────────────────────────────────────────────────────
interface KpiProps {
  label: string;
  value: string;
  sub: string;
  icon: React.ElementType;
  trend?: number | null;
  accent?: string;
  isYellow?: boolean;
}
function KpiCard({ label, value, sub, icon: Icon, trend, accent = "#1689E8", isYellow = false }: KpiProps) {
  const up = trend !== null && trend !== undefined && trend >= 0;
  return (
    <article className="relative overflow-hidden rounded-2xl bg-[#062A5E] p-6 shadow-lg ring-1 ring-white/10 transition-all duration-300 hover:ring-white/20">
      {/* accent top border bar */}
      <div
        className="absolute left-0 top-0 h-1 w-full"
        style={{ background: `linear-gradient(90deg,${accent},transparent)` }}
      />
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D9ECFA]/70">
            {label}
          </p>
          <p
            className={cn(
              "mt-2 truncate text-3xl font-bold tracking-tight",
              isYellow ? "text-[#FFC400]" : "text-white"
            )}
          >
            {value}
          </p>
          <p className="mt-1 truncate text-xs text-[#D9ECFA]/60">{sub}</p>
        </div>
        <span
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
          style={{ background: isYellow ? "#FFC40026" : `${accent}22` }}
        >
          <Icon className="h-6 w-6" style={{ color: accent }} />
        </span>
      </div>
      {trend !== null && trend !== undefined && (
        <div
          className={cn(
            "mt-4 flex items-center gap-1.5 text-xs font-semibold",
            up ? "text-emerald-400" : "text-red-400"
          )}
        >
          {up ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
          <span>{Math.abs(trend)}% vs last month</span>
        </div>
      )}
    </article>
  );
}

// ─── Status Badge ───────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    LIVE: "bg-emerald-500/15 text-emerald-400 ring-emerald-500/30",
    SOLD: "bg-[#1689E8]/15 text-[#1689E8] ring-[#1689E8]/30",
    DRAFT: "bg-[#FFC400]/15 text-[#FFC400] ring-[#FFC400]/30",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ring-1",
        map[status] ?? "bg-white/10 text-white ring-white/20"
      )}
    >
      {status}
    </span>
  );
}

// ─── Section header ─────────────────────────────────────────────────────────────
function SectionHeader({ label, title, action }: { label: string; title: string; action?: React.ReactNode }) {
  return (
    <div className="mb-5 flex items-end justify-between">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#FFC400]">{label}</p>
        <h2 className="mt-0.5 text-xl font-bold uppercase tracking-tight text-white">{title}</h2>
      </div>
      {action}
    </div>
  );
}

// ─── Main Dashboard ─────────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("Dashboard");

  return (
    <div className="flex min-h-screen bg-[#031B3D] text-white">
      {/* ── SIDEBAR ─────────────────────────────────────── */}
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-[#062A5E] shadow-2xl transition-transform duration-300 lg:static lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo with Yellow Accent */}
        <div className="flex h-16 items-center gap-3 border-b border-white/10 px-5">
          <img src="/logo.png" alt="STBN AUTOS" className="h-9 w-9 object-contain" />
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em]">
              STBN AUTOS
            </p>
            <p className="text-[10px] font-semibold text-[#FFC400] uppercase tracking-wider">
              Admin Panel
            </p>
          </div>
          <button
            className="ml-auto rounded-md p-1 text-[#D9ECFA]/60 hover:text-white lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav with Yellow Indicator */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          <p className="mb-2 px-2 text-[9px] font-bold uppercase tracking-[0.22em] text-[#D9ECFA]/40">
            Main Menu
          </p>
          {NAV.map(({ label, icon: Icon, href }) => {
            const active = label === activeNav;
            return (
              <Link
                key={label}
                to={href}
                onClick={() => setActiveNav(label)}
                className={cn(
                  "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all relative",
                  active
                    ? "bg-[#0757A6] text-white shadow-lg border-l-4 border-[#FFC400]"
                    : "text-[#D9ECFA]/70 hover:bg-white/10 hover:text-white"
                )}
              >
                <Icon
                  size={18}
                  className={cn(
                    "shrink-0 transition-colors",
                    active ? "text-[#FFC400]" : "text-[#1689E8] group-hover:text-white"
                  )}
                />
                {label}
                {active && (
                  <span className="ml-auto h-2 w-2 rounded-full bg-[#FFC400] shadow-[0_0_8px_#FFC400]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Quick stats with Yellow Highlights */}
        <div className="border-t border-white/10 p-4">
          <div className="rounded-xl bg-[#031B3D]/70 p-4 border border-[#FFC400]/20 shadow-[0_4px_16px_-8px_#FFC40020]">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#FFC400]">
                Live Stock
              </p>
              <span className="h-2 w-2 rounded-full bg-[#FFC400] animate-pulse" />
            </div>
            <p className="mt-1 text-2xl font-bold text-white">{liveCars.length}</p>
            <p className="text-xs text-[#D9ECFA]/60">
              <span className="text-[#FFC400] font-semibold">{featuredCars.length}</span> featured · {draftCars.length} draft
            </p>
            <Link
              to="/inventory"
              className="mt-3 flex items-center gap-1 text-xs font-bold text-[#FFC400] hover:text-[#FFD34D] transition-colors"
            >
              View all inventory <ChevronRight size={12} />
            </Link>
          </div>
        </div>
      </aside>

      {/* ── MAIN CONTENT ─────────────────────────────────── */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Top header */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-white/10 bg-[#031B3D]/95 px-5 backdrop-blur">
          <button
            className="rounded-md p-2 text-[#D9ECFA]/60 hover:bg-white/10 hover:text-white lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={20} />
          </button>

          <div className="flex-1">
            <p className="text-xs text-[#D9ECFA]/50">
              {new Date().toLocaleDateString("en-NG", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <h1 className="text-sm font-bold text-white flex items-center gap-2">
              Dashboard Overview
              <span className="rounded bg-[#FFC400]/15 px-2 py-0.5 text-[10px] font-bold text-[#FFC400] border border-[#FFC400]/30 uppercase">
                Active
              </span>
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {/* Signature Brand Yellow CTA */}
            <Link
              to="/inventory"
              className="hidden items-center gap-2 rounded-lg bg-[#FFC400] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#031B3D] transition hover:bg-[#FFD34D] shadow-md shadow-[#FFC400]/20 sm:flex"
            >
              <Plus size={14} className="stroke-[2.5]" /> Add Car
            </Link>
            <button className="relative rounded-lg p-2 text-[#D9ECFA]/60 hover:bg-white/10 hover:text-white">
              <Bell size={18} />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[#FFC400] ring-2 ring-[#031B3D]" />
            </button>
            <Link
              to="/"
              className="rounded-lg p-2 text-[#D9ECFA]/60 hover:bg-white/10 hover:text-[#FFC400] transition-colors"
              title="View public website"
            >
              <ExternalLink size={18} />
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-5 lg:p-7 space-y-7">

          {/* ── KPI CARDS ─────────────────────────────────── */}
          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold uppercase tracking-tight text-white">
                At a Glance
              </h2>
              <span className="flex items-center gap-1.5 rounded-full bg-white/5 border border-[#FFC400]/20 px-3 py-1 text-[10px] text-[#D9ECFA]/80">
                <RefreshCw size={10} className="text-[#FFC400]" /> Live data
              </span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <KpiCard
                label="Live Stock Value"
                value={fmtCompact(stockValue)}
                sub={`${liveCars.length} vehicles on sale`}
                icon={DollarSign}
                trend={12}
                accent="#FFC400"
                isYellow={true}
              />
              <KpiCard
                label="Total Inventory"
                value={String(MOCK_CARS.length)}
                sub={`${soldCars.length} sold · ${draftCars.length} draft`}
                icon={Package}
                trend={5}
                accent="#1689E8"
              />
              <KpiCard
                label="Total Views"
                value={totalViews.toLocaleString()}
                sub="Across all listings"
                icon={Eye}
                trend={8}
                accent="#FFC400"
              />
              <KpiCard
                label="Avg. List Price"
                value={fmtCompact(avgPrice)}
                sub={`${featuredCars.length} featured vehicles`}
                icon={Sparkles}
                trend={-2}
                accent="#0757A6"
              />
            </div>
          </section>

          {/* ── CHARTS ROW ────────────────────────────────── */}
          <section className="grid gap-5 lg:grid-cols-3">
            {/* Views & Revenue trend */}
            <div className="lg:col-span-2 rounded-2xl bg-[#062A5E] p-5 shadow-lg ring-1 ring-white/10">
              <SectionHeader
                label="Performance Trends"
                title="Views & Revenue (NGN)"
                action={
                  <div className="flex items-center gap-3 text-xs">
                    <span className="flex items-center gap-1.5 text-xs text-[#D9ECFA]/70">
                      <span className="h-2 w-2 rounded-full bg-[#1689E8]" /> Views
                    </span>
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-[#FFC400]">
                      <span className="h-2 w-2 rounded-full bg-[#FFC400]" /> Revenue
                    </span>
                  </div>
                }
              />
              <ResponsiveContainer width="100%" height={260}>
                <AreaChart data={viewsTrend} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="viewsGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1689E8" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#1689E8" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FFC400" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#FFC400" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="month" stroke="#D9ECFA40" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#D9ECFA40" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => v > 999 ? `${(v / 1000).toFixed(0)}k` : v} />
                  <Tooltip content={<ChartTooltip />} cursor={{ stroke: "#FFC40040", strokeWidth: 1 }} />
                  <Area type="monotone" dataKey="views" stroke="#1689E8" strokeWidth={2} fill="url(#viewsGrad)" dot={false} />
                  <Area type="monotone" dataKey="revenue" stroke="#FFC400" strokeWidth={2.5} fill="url(#revenueGrad)" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Body type breakdown */}
            <div className="rounded-2xl bg-[#062A5E] p-5 shadow-lg ring-1 ring-white/10">
              <SectionHeader label="Inventory Composition" title="Body Types" />
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {pieData.map((_, i) => (
                      <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    content={({ active, payload }) =>
                      active && payload?.length ? (
                        <div className="rounded-lg border border-[#FFC400]/40 bg-[#031B3D] px-3 py-2 text-xs text-white">
                          <strong className="text-[#FFC400]">{payload[0].name}</strong>: {payload[0].value} vehicles
                        </div>
                      ) : null
                    }
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-2 space-y-2">
                {pieData.map((d, i) => (
                  <div key={d.name} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ background: PIE_COLORS[i % PIE_COLORS.length] }}
                      />
                      <span className="text-[#D9ECFA]/70">{d.name}</span>
                    </div>
                    <span className={cn("font-bold", i === 0 ? "text-[#FFC400]" : "text-white")}>
                      {d.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── SECOND CHARTS ROW ─────────────────────────── */}
          <section className="grid gap-5 lg:grid-cols-2">
            {/* Price distribution */}
            <div className="rounded-2xl bg-[#062A5E] p-5 shadow-lg ring-1 ring-white/10">
              <SectionHeader label="Price Analytics" title="Price Distribution" />
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={priceDistData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="label" stroke="#D9ECFA40" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#D9ECFA40" fontSize={11} tickLine={false} axisLine={false} allowDecimals={false} />
                  <Tooltip content={<ChartTooltip />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
                  <Bar dataKey="count" fill="#0757A6" radius={[6, 6, 0, 0]} name="count">
                    {priceDistData.map((d, i) => {
                      const isPeak = d.count === Math.max(...priceDistData.map((p) => p.count));
                      return (
                        <Cell
                          key={i}
                          fill={isPeak ? "#FFC400" : "#0757A6"}
                        />
                      );
                    })}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-2 flex items-center justify-end gap-2 text-[11px] text-[#D9ECFA]/60">
                <span className="h-2 w-2 rounded-full bg-[#FFC400]" /> Peak bracket highlighted in brand yellow
              </div>
            </div>

            {/* Fuel type + Status overview */}
            <div className="flex flex-col gap-5">
              {/* Fuel type */}
              <div className="flex-1 rounded-2xl bg-[#062A5E] p-5 shadow-lg ring-1 ring-white/10">
                <SectionHeader label="Power & Efficiency" title="Fuel Types" />
                <div className="space-y-3">
                  {fuelData.map((d, i) => {
                    const pct = Math.round((d.value / MOCK_CARS.length) * 100);
                    const isTop = i === 0;
                    return (
                      <div key={d.name}>
                        <div className="mb-1 flex items-center justify-between text-xs">
                          <span className="font-medium text-[#D9ECFA]/80 capitalize">
                            {d.name.charAt(0) + d.name.slice(1).toLowerCase()}
                          </span>
                          <span className={cn("font-bold", isTop ? "text-[#FFC400]" : "text-white")}>
                            {d.value} ({pct}%)
                          </span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-white/10">
                          <div
                            className="h-full rounded-full transition-all duration-700"
                            style={{
                              width: `${pct}%`,
                              background: isTop ? "#FFC400" : PIE_COLORS[i % PIE_COLORS.length],
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Status summary */}
              <div className="rounded-2xl bg-[#062A5E] p-5 shadow-lg ring-1 ring-white/10">
                <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.24em] text-[#FFC400]">
                  Status Overview
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Live", count: liveCars.length, icon: CheckCircle2, color: "text-emerald-400" },
                    { label: "Sold", count: soldCars.length, icon: Activity, color: "text-[#1689E8]" },
                    { label: "Draft", count: draftCars.length, icon: Clock, color: "text-[#FFC400]" },
                  ].map(({ label, count, icon: Icon, color }) => (
                    <div key={label} className="rounded-xl bg-[#031B3D]/70 p-3 text-center border border-white/5">
                      <Icon className={cn("mx-auto mb-1.5 h-5 w-5", color)} />
                      <p className="text-2xl font-bold text-white">{count}</p>
                      <p className="text-[10px] text-[#D9ECFA]/50">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ── INVENTORY TABLE ───────────────────────────── */}
          <section className="rounded-2xl bg-[#062A5E] shadow-lg ring-1 ring-white/10 overflow-hidden">
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#FFC400]">
                  Inventory
                </p>
                <h2 className="mt-0.5 text-xl font-bold uppercase tracking-tight text-white">
                  Recent Listings
                </h2>
              </div>
              <Link
                to="/inventory"
                className="flex items-center gap-1.5 rounded-lg bg-[#FFC400] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#031B3D] transition hover:bg-[#FFD34D] shadow-sm shadow-[#FFC400]/20"
              >
                View All <ArrowRight size={13} />
              </Link>
            </div>

            {/* Search bar */}
            <div className="border-b border-white/10 px-6 py-3">
              <div className="relative max-w-xs">
                <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#D9ECFA]/40" />
                <input
                  placeholder="Search vehicles…"
                  className="w-full rounded-lg border border-white/10 bg-[#031B3D]/60 py-2 pl-9 pr-4 text-xs text-white placeholder-[#D9ECFA]/30 focus:border-[#FFC400] focus:ring-1 focus:ring-[#FFC400] focus:outline-none"
                  readOnly
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px]">
                <thead>
                  <tr className="border-b border-white/10">
                    {["Vehicle", "VRM", "Price", "Fuel", "Mileage", "Views", "Status"].map(
                      (h) => (
                        <th
                          key={h}
                          className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-[0.18em] text-[#D9ECFA]/40"
                        >
                          {h}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {recentCars.map((car) => (
                    <CarTableRow key={car.id} car={car} />
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* ── BOTTOM ROW: Top Car + Quick Actions ───────── */}
          <section className="grid gap-5 lg:grid-cols-3">
            {/* Top performer */}
            <div className="lg:col-span-2 rounded-2xl bg-[#062A5E] p-5 shadow-lg ring-1 ring-white/10">
              <SectionHeader label="Highlight Performer" title="Most Viewed Vehicle" />
              {topCar && (
                <div className="flex flex-col gap-5 sm:flex-row">
                  <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-[#031B3D] sm:w-60 sm:aspect-auto sm:h-36">
                    <img
                      src={topCar.images[0]?.src || "/placeholder.jpg"}
                      alt={topCar.title}
                      className="h-full w-full object-cover"
                    />
                    {topCar.featured && (
                      <span className="absolute left-2 top-2 flex items-center gap-1 rounded bg-[#FFC400] px-2 py-0.5 text-[10px] font-bold text-[#031B3D] shadow-md">
                        <Star size={10} className="fill-[#031B3D]" /> Featured
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#FFC400]">
                      {topCar.year} · {topCar.make.name}
                    </p>
                    <h3 className="mt-1 text-lg font-bold uppercase text-white">
                      {topCar.title}
                    </h3>
                    <p className="mt-1 text-2xl font-bold text-[#FFC400]">
                      {fmt(topCar.price)}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {[
                        topCar.bodyType,
                        topCar.transmission,
                        topCar.fuelType,
                        `${topCar.odoReading.toLocaleString()} ${topCar.odoUnit}`,
                      ].map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-[#031B3D]/70 border border-white/5 px-3 py-1 text-[10px] font-semibold uppercase text-[#D9ECFA]/70"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center gap-4">
                      <span className="flex items-center gap-1.5 text-sm font-bold text-white">
                        <Eye size={14} className="text-[#FFC400]" /> {topCar.views.toLocaleString()} views
                      </span>
                      <StatusBadge status={topCar.status} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick actions with Yellow CTA */}
            <div className="rounded-2xl bg-[#062A5E] p-5 shadow-lg ring-1 ring-white/10">
              <SectionHeader label="Admin Operations" title="Quick Actions" />
              <div className="space-y-2.5">
                {[
                  {
                    label: "Add New Vehicle",
                    icon: Plus,
                    href: "/inventory",
                    primary: true,
                  },
                  {
                    label: "Browse Inventory",
                    icon: Search,
                    href: "/inventory",
                    primary: false,
                  },
                  {
                    label: "View Public Website",
                    icon: ExternalLink,
                    href: "/",
                    primary: false,
                  },
                  {
                    label: "Featured Vehicles",
                    icon: Star,
                    href: "/inventory",
                    primary: false,
                    hasYellowIcon: true,
                  },
                  {
                    label: "Performance Analytics",
                    icon: BarChart2,
                    href: "/admin/dashboard",
                    primary: false,
                  },
                ].map(({ label, icon: Icon, href, primary, hasYellowIcon }) => (
                  <Link
                    key={label}
                    to={href}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all",
                      primary
                        ? "bg-[#FFC400] text-[#031B3D] hover:bg-[#FFD34D] shadow-md shadow-[#FFC400]/20 font-bold"
                        : "bg-[#031B3D]/60 text-[#D9ECFA]/80 hover:bg-[#0757A6]/20 hover:text-white"
                    )}
                  >
                    <Icon
                      size={16}
                      className={cn(
                        hasYellowIcon ? "text-[#FFC400] fill-[#FFC400]" : primary ? "stroke-[2.5]" : ""
                      )}
                    />
                    {label}
                    <ChevronRight size={14} className="ml-auto opacity-50" />
                  </Link>
                ))}
              </div>

              {/* Alert with Yellow Border */}
              {draftCars.length > 0 && (
                <div className="mt-4 flex items-start gap-3 rounded-xl bg-[#031B3D]/70 p-3 border border-[#FFC400]/30">
                  <AlertCircle size={16} className="mt-0.5 shrink-0 text-[#FFC400]" />
                  <div>
                    <p className="text-xs font-bold text-white">
                      {draftCars.length} draft{draftCars.length > 1 ? "s" : ""} pending
                    </p>
                    <p className="text-[10px] text-[#D9ECFA]/50">
                      Unpublished cars ready for review
                    </p>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* ── FOOTER ────────────────────────────────────── */}
          <footer className="border-t border-white/10 pt-4 text-center">
            <p className="text-[10px] text-[#D9ECFA]/40">
              STBN AUTOS Admin · <span className="text-[#FFC400]">Inventory Command Centre</span> · {new Date().getFullYear()}
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
}

// ─── Car table row ─────────────────────────────────────────────────────────────
function CarTableRow({ car }: { car: MockCar }) {
  return (
    <tr className="group transition-colors hover:bg-white/5">
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <img
            src={car.images[0]?.src || "/placeholder.jpg"}
            alt={car.title}
            className="h-10 w-14 rounded-md object-cover ring-1 ring-white/10"
          />
          <div className="min-w-0">
            <p className="truncate text-xs font-bold text-white">{car.title}</p>
            <p className="text-[10px] text-[#D9ECFA]/50">
              {car.make.name} · {car.year}
            </p>
          </div>
        </div>
      </td>
      <td className="px-4 py-3">
        {/* Authentic vehicle registration badge with subtle yellow glow */}
        <span className="rounded bg-[#031B3D]/80 border border-[#FFC400]/30 px-2 py-0.5 font-mono text-[10px] font-bold text-[#FFC400]">
          {car.vrm}
        </span>
      </td>
      <td className="px-4 py-3 text-xs font-bold text-[#FFC400]">{fmt(car.price)}</td>
      <td className="px-4 py-3 text-xs text-[#D9ECFA]/70 capitalize">
        {car.fuelType.charAt(0) + car.fuelType.slice(1).toLowerCase()}
      </td>
      <td className="px-4 py-3 text-xs text-[#D9ECFA]/70">
        {car.odoReading.toLocaleString()} {car.odoUnit}
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-1 text-xs text-[#D9ECFA]/70">
          <Eye size={12} className="text-[#1689E8]" />
          {car.views}
        </div>
      </td>
      <td className="px-4 py-3">
        <StatusBadge status={car.status} />
      </td>
    </tr>
  );
}
