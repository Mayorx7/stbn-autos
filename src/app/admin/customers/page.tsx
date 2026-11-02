import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  CarFront,
  Users,
  Settings,
  Menu,
  X,
  Search,
  Bell,
  UserCheck,
  UserX,
  UserPlus,
  Mail,
  Phone,
  Calendar,
  TrendingUp,
  TrendingDown,
  Filter,
  Download,
  MoreVertical,
  Eye,
  Edit2,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Star,
  Clock,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  ArrowUpRight,
  BarChart2,
  PieChart as PieChartIcon,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { cn } from "@/lib/utils";
import { MOCK_CUSTOMERS, MockCustomerFull } from "@/lib/mock-data";

// ─── Brand palette ─────────────────────────────────────────────────────────────
const NAVY = "#062A5E";
const DEEP_NAVY = "#031B3D";
const ROYAL = "#0757A6";
const ACCENT = "#1689E8";
const SKY = "#D9ECFA";
const SILVER = "#D7DEE8";
const MUTED_BG = "#F3F6FA";
const SLATE = "#53657A";
const YELLOW = "#FFC400";

// ─── Sidebar nav ───────────────────────────────────────────────────────────────
const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin/dashboard" },
  { icon: CarFront, label: "Inventory", href: "/inventory" },
  { icon: Users, label: "Customers", href: "/admin/customers", active: true },
  { icon: Settings, label: "Settings", href: "/" },
];

// ─── Status helpers ────────────────────────────────────────────────────────────
const statusConfig: Record<
  string,
  { label: string; bg: string; text: string; dot: string }
> = {
  COLD: { label: "Cold", bg: "#EFF6FF", text: SLATE, dot: SILVER },
  CONTACTED: { label: "Contacted", bg: "#DBEAFE", text: ROYAL, dot: ROYAL },
  INTERESTED: {
    label: "Interested",
    bg: "#FFF9E6",
    text: "#9A7000",
    dot: YELLOW,
  },
  PURCHASED: {
    label: "Purchased",
    bg: "#DCFCE7",
    text: "#166534",
    dot: "#22C55E",
  },
  SUBSCRIBER: { label: "Subscriber", bg: SKY, text: NAVY, dot: ACCENT },
};

function StatusBadge({ status }: { status: string }) {
  const cfg = statusConfig[status] ?? {
    label: status,
    bg: MUTED_BG,
    text: SLATE,
    dot: SILVER,
  };
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
      style={{ background: cfg.bg, color: cfg.text }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
        style={{ background: cfg.dot }}
      />
      {cfg.label}
    </span>
  );
}

// ─── Sidebar ───────────────────────────────────────────────────────────────────
function Sidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <>
      {/* mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "fixed top-0 left-0 h-full z-50 flex flex-col transition-transform duration-300",
          "w-64",
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
        style={{ background: DEEP_NAVY }}
      >
        {/* logo */}
        <div
          className="flex items-center gap-3 px-5 py-5 border-b"
          style={{ borderColor: "rgba(255,255,255,0.08)" }}
        >
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm"
            style={{ background: YELLOW, color: DEEP_NAVY }}
          >
            S
          </div>
          <div>
            <p
              className="text-xs font-bold tracking-widest uppercase"
              style={{ color: YELLOW }}
            >
              Admin Panel
            </p>
            <p className="text-white text-sm font-semibold leading-tight">
              STBN AUTOS
            </p>
          </div>
          <button
            className="ml-auto lg:hidden text-white/60 hover:text-white"
            onClick={onClose}
          >
            <X size={18} />
          </button>
        </div>

        {/* nav */}
        <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                item.active
                  ? "text-white"
                  : "text-white/60 hover:text-white hover:bg-white/8"
              )}
              style={
                item.active
                  ? {
                      background: "rgba(7,87,166,0.4)",
                      borderLeft: `3px solid ${YELLOW}`,
                    }
                  : {}
              }
            >
              <item.icon size={18} />
              {item.label}
              {item.active && (
                <span
                  className="ml-auto w-2 h-2 rounded-full"
                  style={{ background: YELLOW }}
                />
              )}
            </Link>
          ))}
        </nav>

        {/* bottom */}
        <div
          className="px-4 py-4 border-t"
          style={{ borderColor: "rgba(255,255,255,0.08)" }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
              style={{ background: ROYAL }}
            >
              AD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-xs font-semibold truncate">
                Admin User
              </p>
              <p className="text-xs truncate" style={{ color: SLATE }}>
                admin@stbnautos.com
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

// ─── Top header ────────────────────────────────────────────────────────────────
function Header({ onMenuOpen }: { onMenuOpen: () => void }) {
  return (
    <header
      className="sticky top-0 z-30 flex items-center gap-4 px-6 py-4 border-b"
      style={{ background: "#fff", borderColor: SILVER }}
    >
      <button
        className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition"
        onClick={onMenuOpen}
      >
        <Menu size={20} style={{ color: NAVY }} />
      </button>

      {/* breadcrumb */}
      <div className="flex items-center gap-2 text-sm">
        <Link
          to="/admin/dashboard"
          className="font-medium hover:underline"
          style={{ color: SLATE }}
        >
          Dashboard
        </Link>
        <ChevronRight size={14} style={{ color: SILVER }} />
        <span className="font-semibold" style={{ color: NAVY }}>
          Customers
        </span>
      </div>

      <div className="ml-auto flex items-center gap-3">
        {/* date */}
        <span className="hidden md:block text-xs font-medium" style={{ color: SLATE }}>
          {new Date().toLocaleDateString("en-GB", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </span>

        {/* bell */}
        <button className="relative p-2 rounded-lg hover:bg-gray-100 transition">
          <Bell size={18} style={{ color: SLATE }} />
          <span
            className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
            style={{ background: YELLOW }}
          />
        </button>

        {/* export */}
        <button
          className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition hover:opacity-90"
          style={{ background: YELLOW, color: DEEP_NAVY }}
        >
          <Download size={15} />
          Export
        </button>
      </div>
    </header>
  );
}

// ─── KPI Card ─────────────────────────────────────────────────────────────────
interface KpiProps {
  title: string;
  value: string | number;
  delta?: number;
  icon: React.ElementType;
  accent?: string;
  subtitle?: string;
}
function KpiCard({
  title,
  value,
  delta,
  icon: Icon,
  accent = ROYAL,
  subtitle,
}: KpiProps) {
  const positive = delta !== undefined && delta >= 0;
  return (
    <div
      className="rounded-2xl p-5 border flex flex-col gap-3"
      style={{ background: "#fff", borderColor: SILVER }}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: SLATE }}>
            {title}
          </p>
          {subtitle && (
            <p className="text-xs mt-0.5" style={{ color: SILVER }}>
              {subtitle}
            </p>
          )}
        </div>
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: `${accent}18` }}
        >
          <Icon size={20} style={{ color: accent }} />
        </div>
      </div>
      <div className="flex items-end justify-between">
        <span className="text-2xl font-extrabold" style={{ color: NAVY }}>
          {value}
        </span>
        {delta !== undefined && (
          <div
            className="flex items-center gap-1 text-xs font-semibold rounded-full px-2 py-0.5"
            style={{
              background: positive ? "#DCFCE7" : "#FEE2E2",
              color: positive ? "#166534" : "#991B1B",
            }}
          >
            {positive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {Math.abs(delta)}%
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Tooltip helpers ───────────────────────────────────────────────────────────
function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="rounded-xl px-4 py-3 shadow-lg text-sm border"
      style={{ background: "#fff", borderColor: SILVER, color: NAVY }}
    >
      <p className="font-semibold mb-1" style={{ color: SLATE }}>
        {label}
      </p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color }} className="font-bold">
          {p.name}: {p.value}
        </p>
      ))}
    </div>
  );
}

// ─── Main page ─────────────────────────────────────────────────────────────────
export default function CustomersPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCustomer, setSelectedCustomer] =
    useState<MockCustomerFull | null>(null);
  const PER_PAGE = 8;

  // ── derived stats ────────────────────────────────────────────────────────────
  const total = MOCK_CUSTOMERS.length;
  const purchased = MOCK_CUSTOMERS.filter((c) => c.status === "PURCHASED").length;
  const interested = MOCK_CUSTOMERS.filter((c) => c.status === "INTERESTED").length;
  const contacted = MOCK_CUSTOMERS.filter((c) => c.status === "CONTACTED").length;
  const cold = MOCK_CUSTOMERS.filter((c) => c.status === "COLD").length;
  const subscribers = MOCK_CUSTOMERS.filter((c) => c.status === "SUBSCRIBER").length;
  const conversionRate =
    total > 0 ? Math.round((purchased / total) * 100) : 0;
  const activeLeads = interested + contacted;

  // ── chart data ───────────────────────────────────────────────────────────────
  const statusBreakdown = [
    { name: "Cold", value: cold, color: SILVER },
    { name: "Contacted", value: contacted, color: ROYAL },
    { name: "Interested", value: interested, color: YELLOW },
    { name: "Purchased", value: purchased, color: "#22C55E" },
    { name: "Subscriber", value: subscribers, color: ACCENT },
  ];

  const monthlyGrowth = [
    { month: "Jun", new: 4, purchased: 1 },
    { month: "Jul", new: 7, purchased: 2 },
    { month: "Aug", new: 6, purchased: 3 },
    { month: "Sep", new: 9, purchased: 2 },
    { month: "Oct", new: 12, purchased: 4 },
    { month: "Nov", new: 15, purchased: 5 },
  ];

  const leadFunnel = [
    { stage: "Cold", count: cold },
    { stage: "Contacted", count: contacted },
    { stage: "Interested", count: interested },
    { stage: "Purchased", count: purchased },
  ];

  // ── filter + paginate ────────────────────────────────────────────────────────
  const filtered = useMemo(() => {
    return MOCK_CUSTOMERS.filter((c) => {
      const matchStatus =
        statusFilter === "ALL" || c.status === statusFilter;
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        `${c.firstName} ${c.lastName}`.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.mobile.includes(q) ||
        (c.classified?.vrm ?? "").toLowerCase().includes(q);
      return matchStatus && matchSearch;
    });
  }, [search, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paginated = filtered.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE
  );

  const topCustomers = [...MOCK_CUSTOMERS]
    .filter((c) => c.status === "PURCHASED" || c.status === "INTERESTED")
    .slice(0, 4);

  return (
    <div className="min-h-screen" style={{ background: MUTED_BG }}>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* main area pushed right on large screens */}
      <div className="lg:ml-64 flex flex-col min-h-screen">
        <Header onMenuOpen={() => setSidebarOpen(true)} />

        <main className="flex-1 p-6 space-y-6">
          {/* ── page title ── */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl font-extrabold" style={{ color: NAVY }}>
                Customer Management
              </h1>
              <p className="text-sm mt-0.5" style={{ color: SLATE }}>
                Track, manage, and nurture all your customer relationships
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
                style={{ background: `${YELLOW}22`, color: DEEP_NAVY }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ background: YELLOW }}
                />
                {total} Total Customers
              </span>
            </div>
          </div>

          {/* ── KPI cards ── */}
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
            <KpiCard
              title="Total Customers"
              value={total}
              delta={18}
              icon={Users}
              accent={ROYAL}
            />
            <KpiCard
              title="Purchased"
              value={purchased}
              delta={25}
              icon={UserCheck}
              accent="#22C55E"
            />
            <KpiCard
              title="Interested"
              value={interested}
              icon={Star}
              accent={YELLOW}
            />
            <KpiCard
              title="Active Leads"
              value={activeLeads}
              delta={12}
              icon={TrendingUp}
              accent={ACCENT}
            />
            <KpiCard
              title="Subscribers"
              value={subscribers}
              icon={Mail}
              accent={NAVY}
            />
            <KpiCard
              title="Conversion"
              value={`${conversionRate}%`}
              delta={5}
              icon={ArrowUpRight}
              accent={YELLOW}
            />
          </div>

          {/* ── charts row ── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* growth area chart */}
            <div
              className="lg:col-span-2 rounded-2xl p-5 border"
              style={{ background: "#fff", borderColor: SILVER }}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p
                    className="text-xs font-bold uppercase tracking-wider"
                    style={{ color: YELLOW }}
                  >
                    Customer Growth
                  </p>
                  <p className="text-base font-bold" style={{ color: NAVY }}>
                    New Customers & Purchases (Monthly)
                  </p>
                </div>
                <BarChart2 size={18} style={{ color: SLATE }} />
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={monthlyGrowth}>
                  <defs>
                    <linearGradient id="newGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={ACCENT} stopOpacity={0.25} />
                      <stop offset="95%" stopColor={ACCENT} stopOpacity={0} />
                    </linearGradient>
                    <linearGradient
                      id="purchaseGrad"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor={YELLOW}
                        stopOpacity={0.3}
                      />
                      <stop offset="95%" stopColor={YELLOW} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke={SILVER}
                    vertical={false}
                  />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 11, fill: SLATE }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: SLATE }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip content={<ChartTooltip />} />
                  <Legend
                    wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="new"
                    name="New Customers"
                    stroke={ACCENT}
                    strokeWidth={2.5}
                    fill="url(#newGrad)"
                    dot={false}
                  />
                  <Area
                    type="monotone"
                    dataKey="purchased"
                    name="Purchased"
                    stroke={YELLOW}
                    strokeWidth={2.5}
                    fill="url(#purchaseGrad)"
                    dot={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* status donut */}
            <div
              className="rounded-2xl p-5 border"
              style={{ background: "#fff", borderColor: SILVER }}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p
                    className="text-xs font-bold uppercase tracking-wider"
                    style={{ color: YELLOW }}
                  >
                    Status Breakdown
                  </p>
                  <p className="text-base font-bold" style={{ color: NAVY }}>
                    By Status
                  </p>
                </div>
                <PieChartIcon size={18} style={{ color: SLATE }} />
              </div>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie
                    data={statusBreakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={70}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {statusBreakdown.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(v: number, name: string) => [v, name]}
                    contentStyle={{
                      borderRadius: 12,
                      border: `1px solid ${SILVER}`,
                      fontSize: 12,
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-2 space-y-1.5">
                {statusBreakdown.map((s) => (
                  <div key={s.name} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ background: s.color }}
                      />
                      <span style={{ color: SLATE }}>{s.name}</span>
                    </div>
                    <span className="font-bold" style={{ color: NAVY }}>
                      {s.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── lead funnel + top customers ── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* funnel bar */}
            <div
              className="rounded-2xl p-5 border"
              style={{ background: "#fff", borderColor: SILVER }}
            >
              <p
                className="text-xs font-bold uppercase tracking-wider mb-1"
                style={{ color: YELLOW }}
              >
                Sales Funnel
              </p>
              <p className="text-base font-bold mb-4" style={{ color: NAVY }}>
                Lead Progression
              </p>
              <div className="space-y-3">
                {leadFunnel.map((f, i) => {
                  const pct =
                    leadFunnel[0].count > 0
                      ? Math.round((f.count / leadFunnel[0].count) * 100)
                      : 0;
                  const colors = [SILVER, ROYAL, YELLOW, "#22C55E"];
                  return (
                    <div key={f.stage}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-medium" style={{ color: SLATE }}>
                          {f.stage}
                        </span>
                        <span className="font-bold" style={{ color: NAVY }}>
                          {f.count}
                        </span>
                      </div>
                      <div
                        className="h-2.5 rounded-full overflow-hidden"
                        style={{ background: MUTED_BG }}
                      >
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{
                            width: `${pct}%`,
                            background: colors[i],
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* conversion stat */}
              <div
                className="mt-5 p-3 rounded-xl text-center"
                style={{ background: `${YELLOW}18` }}
              >
                <p className="text-xs font-medium" style={{ color: SLATE }}>
                  Overall Conversion Rate
                </p>
                <p
                  className="text-2xl font-extrabold mt-0.5"
                  style={{ color: NAVY }}
                >
                  {conversionRate}%
                </p>
              </div>
            </div>

            {/* top customers */}
            <div
              className="lg:col-span-2 rounded-2xl p-5 border"
              style={{ background: "#fff", borderColor: SILVER }}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p
                    className="text-xs font-bold uppercase tracking-wider"
                    style={{ color: YELLOW }}
                  >
                    Top Leads
                  </p>
                  <p className="text-base font-bold" style={{ color: NAVY }}>
                    High-Value Customers
                  </p>
                </div>
                <UserCheck size={18} style={{ color: SLATE }} />
              </div>
              <div className="space-y-3">
                {topCustomers.map((c, i) => (
                  <div
                    key={c.id}
                    className="flex items-center gap-3 p-3 rounded-xl border"
                    style={{ borderColor: SILVER, background: MUTED_BG }}
                  >
                    {/* rank */}
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-extrabold flex-shrink-0"
                      style={{
                        background: i === 0 ? YELLOW : `${ROYAL}22`,
                        color: i === 0 ? DEEP_NAVY : ROYAL,
                      }}
                    >
                      {i + 1}
                    </div>
                    {/* avatar */}
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                      style={{ background: ROYAL }}
                    >
                      {c.firstName[0]}
                      {c.lastName[0]}
                    </div>
                    {/* info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate" style={{ color: NAVY }}>
                        {c.firstName} {c.lastName}
                      </p>
                      <p className="text-xs truncate" style={{ color: SLATE }}>
                        {c.email}
                      </p>
                    </div>
                    {/* car */}
                    {c.classified && (
                      <span
                        className="hidden sm:block text-xs font-mono font-bold px-2 py-0.5 rounded border flex-shrink-0"
                        style={{
                          color: YELLOW,
                          borderColor: YELLOW,
                          background: `${YELLOW}10`,
                        }}
                      >
                        {c.classified.vrm}
                      </span>
                    )}
                    {/* status */}
                    <StatusBadge status={c.status} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── full customers table ── */}
          <div
            className="rounded-2xl border overflow-hidden"
            style={{ background: "#fff", borderColor: SILVER }}
          >
            {/* table header */}
            <div
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 border-b"
              style={{ borderColor: SILVER }}
            >
              <div>
                <p
                  className="text-xs font-bold uppercase tracking-wider"
                  style={{ color: YELLOW }}
                >
                  All Customers
                </p>
                <p className="text-base font-bold" style={{ color: NAVY }}>
                  {filtered.length} of {total} Records
                </p>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                {/* search */}
                <div
                  className="flex items-center gap-2 px-3 py-2 rounded-xl border text-sm"
                  style={{ borderColor: SILVER, background: MUTED_BG }}
                >
                  <Search size={14} style={{ color: SLATE }} />
                  <input
                    type="text"
                    placeholder="Search name, email, VRM…"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="bg-transparent outline-none w-44 text-sm"
                    style={{ color: NAVY }}
                  />
                </div>

                {/* status filter */}
                <div
                  className="flex items-center gap-1 px-3 py-2 rounded-xl border text-sm"
                  style={{ borderColor: SILVER, background: MUTED_BG }}
                >
                  <Filter size={13} style={{ color: SLATE }} />
                  <select
                    value={statusFilter}
                    onChange={(e) => {
                      setStatusFilter(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="bg-transparent outline-none text-sm cursor-pointer"
                    style={{ color: NAVY }}
                  >
                    <option value="ALL">All Statuses</option>
                    <option value="COLD">Cold</option>
                    <option value="CONTACTED">Contacted</option>
                    <option value="INTERESTED">Interested</option>
                    <option value="PURCHASED">Purchased</option>
                    <option value="SUBSCRIBER">Subscriber</option>
                  </select>
                </div>
              </div>
            </div>

            {/* table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr
                    className="text-xs font-semibold uppercase tracking-wider"
                    style={{ background: MUTED_BG, color: SLATE }}
                  >
                    <th className="px-5 py-3 text-left">Customer</th>
                    <th className="px-5 py-3 text-left">Contact</th>
                    <th className="px-5 py-3 text-left hidden md:table-cell">
                      Interested In
                    </th>
                    <th className="px-5 py-3 text-left hidden lg:table-cell">
                      Booking Date
                    </th>
                    <th className="px-5 py-3 text-left hidden lg:table-cell">
                      Joined
                    </th>
                    <th className="px-5 py-3 text-left">Status</th>
                    <th className="px-5 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y" style={{ borderColor: SILVER }}>
                  {paginated.length === 0 ? (
                    <tr>
                      <td
                        colSpan={7}
                        className="text-center py-12 text-sm"
                        style={{ color: SLATE }}
                      >
                        No customers found for the selected filters.
                      </td>
                    </tr>
                  ) : (
                    paginated.map((c) => (
                      <tr
                        key={c.id}
                        className="hover:bg-blue-50/40 transition-colors"
                      >
                        {/* customer */}
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-3">
                            <div
                              className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                              style={{ background: ROYAL }}
                            >
                              {c.firstName[0]}
                              {c.lastName[0]}
                            </div>
                            <div>
                              <p
                                className="font-semibold"
                                style={{ color: NAVY }}
                              >
                                {c.firstName} {c.lastName}
                              </p>
                              <p className="text-xs" style={{ color: SLATE }}>
                                #{c.id}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* contact */}
                        <td className="px-5 py-3.5">
                          <div className="space-y-0.5">
                            <div
                              className="flex items-center gap-1 text-xs"
                              style={{ color: SLATE }}
                            >
                              <Mail size={11} />
                              <span className="truncate max-w-[140px]">
                                {c.email}
                              </span>
                            </div>
                            <div
                              className="flex items-center gap-1 text-xs"
                              style={{ color: SLATE }}
                            >
                              <Phone size={11} />
                              {c.mobile}
                            </div>
                          </div>
                        </td>

                        {/* classified */}
                        <td className="px-5 py-3.5 hidden md:table-cell">
                          {c.classified ? (
                            <div>
                              <p
                                className="text-xs font-semibold"
                                style={{ color: NAVY }}
                              >
                                {c.classified.title}
                              </p>
                              <span
                                className="inline-block text-xs font-mono font-bold px-1.5 py-0.5 rounded border mt-0.5"
                                style={{
                                  color: YELLOW,
                                  borderColor: YELLOW,
                                  background: `${YELLOW}10`,
                                }}
                              >
                                {c.classified.vrm}
                              </span>
                            </div>
                          ) : (
                            <span className="text-xs" style={{ color: SILVER }}>
                              —
                            </span>
                          )}
                        </td>

                        {/* booking date */}
                        <td className="px-5 py-3.5 hidden lg:table-cell">
                          {c.bookingDate ? (
                            <div
                              className="flex items-center gap-1 text-xs"
                              style={{ color: SLATE }}
                            >
                              <Calendar size={11} />
                              {new Date(c.bookingDate).toLocaleDateString(
                                "en-GB",
                                { day: "numeric", month: "short", year: "numeric" }
                              )}
                            </div>
                          ) : (
                            <span className="text-xs" style={{ color: SILVER }}>
                              Not booked
                            </span>
                          )}
                        </td>

                        {/* joined */}
                        <td className="px-5 py-3.5 hidden lg:table-cell">
                          <div
                            className="flex items-center gap-1 text-xs"
                            style={{ color: SLATE }}
                          >
                            <Clock size={11} />
                            {new Date(c.createdAt).toLocaleDateString("en-GB", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </div>
                        </td>

                        {/* status */}
                        <td className="px-5 py-3.5">
                          <StatusBadge status={c.status} />
                        </td>

                        {/* actions */}
                        <td className="px-5 py-3.5 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              className="p-1.5 rounded-lg hover:bg-blue-50 transition"
                              title="View"
                              onClick={() => setSelectedCustomer(c)}
                            >
                              <Eye size={14} style={{ color: ROYAL }} />
                            </button>
                            <button
                              className="p-1.5 rounded-lg hover:bg-yellow-50 transition"
                              title="Edit"
                            >
                              <Edit2 size={14} style={{ color: YELLOW }} />
                            </button>
                            <button
                              className="p-1.5 rounded-lg hover:bg-red-50 transition"
                              title="Delete"
                            >
                              <Trash2 size={14} style={{ color: "#EF4444" }} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* pagination */}
            <div
              className="flex items-center justify-between px-5 py-4 border-t text-sm"
              style={{ borderColor: SILVER }}
            >
              <p style={{ color: SLATE }}>
                Showing{" "}
                <span className="font-semibold" style={{ color: NAVY }}>
                  {Math.min((currentPage - 1) * PER_PAGE + 1, filtered.length)}
                </span>{" "}
                –{" "}
                <span className="font-semibold" style={{ color: NAVY }}>
                  {Math.min(currentPage * PER_PAGE, filtered.length)}
                </span>{" "}
                of{" "}
                <span className="font-semibold" style={{ color: NAVY }}>
                  {filtered.length}
                </span>
              </p>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg disabled:opacity-40 hover:bg-gray-100 transition"
                >
                  <ChevronLeft size={16} style={{ color: NAVY }} />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (pg) => (
                    <button
                      key={pg}
                      onClick={() => setCurrentPage(pg)}
                      className="w-8 h-8 rounded-lg text-xs font-bold transition"
                      style={
                        pg === currentPage
                          ? { background: YELLOW, color: DEEP_NAVY }
                          : {
                              background: "transparent",
                              color: SLATE,
                            }
                      }
                    >
                      {pg}
                    </button>
                  )
                )}
                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg disabled:opacity-40 hover:bg-gray-100 transition"
                >
                  <ChevronRight size={16} style={{ color: NAVY }} />
                </button>
              </div>
            </div>
          </div>

          {/* ── activity timeline ── */}
          <div
            className="rounded-2xl p-5 border"
            style={{ background: "#fff", borderColor: SILVER }}
          >
            <p
              className="text-xs font-bold uppercase tracking-wider mb-1"
              style={{ color: YELLOW }}
            >
              Recent Activity
            </p>
            <p className="text-base font-bold mb-4" style={{ color: NAVY }}>
              Customer Timeline
            </p>
            <div className="space-y-4">
              {[
                {
                  icon: UserPlus,
                  color: ACCENT,
                  text: "New customer Adaeze Okonkwo registered",
                  time: "2 mins ago",
                },
                {
                  icon: CheckCircle2,
                  color: "#22C55E",
                  text: "Emeka Nwosu completed purchase of 2021 BMW X5",
                  time: "14 mins ago",
                },
                {
                  icon: Star,
                  color: YELLOW,
                  text: "Fatima Musa expressed interest in 2023 RAV4 Hybrid",
                  time: "1 hr ago",
                },
                {
                  icon: Mail,
                  color: ROYAL,
                  text: "Newsletter blast sent to 18 subscribers",
                  time: "3 hrs ago",
                },
                {
                  icon: AlertCircle,
                  color: "#EF4444",
                  text: "Chukwudi Eze booking appointment cancelled",
                  time: "5 hrs ago",
                },
                {
                  icon: Calendar,
                  color: NAVY,
                  text: "Test drive booked by Ngozi Balogun for 2022 Ford Explorer",
                  time: "Yesterday",
                },
              ].map((a, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: `${a.color}18` }}
                  >
                    <a.icon size={15} style={{ color: a.color }} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium" style={{ color: NAVY }}>
                      {a.text}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: SLATE }}>
                      {a.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* footer */}
          <p className="text-center text-xs pb-4" style={{ color: SILVER }}>
            STBN AUTOS — Customer Management Dashboard · {new Date().getFullYear()}
          </p>
        </main>
      </div>

      {/* ── Customer Detail Modal ── */}
      {selectedCustomer && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(3,27,61,0.6)" }}
          onClick={() => setSelectedCustomer(null)}
        >
          <div
            className="rounded-2xl w-full max-w-md p-6 shadow-2xl"
            style={{ background: "#fff" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <p className="text-lg font-bold" style={{ color: NAVY }}>
                Customer Profile
              </p>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="p-1.5 rounded-lg hover:bg-gray-100"
              >
                <X size={16} style={{ color: SLATE }} />
              </button>
            </div>

            {/* avatar row */}
            <div className="flex items-center gap-4 mb-5">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-black text-white"
                style={{ background: ROYAL }}
              >
                {selectedCustomer.firstName[0]}
                {selectedCustomer.lastName[0]}
              </div>
              <div>
                <p className="text-lg font-bold" style={{ color: NAVY }}>
                  {selectedCustomer.firstName} {selectedCustomer.lastName}
                </p>
                <StatusBadge status={selectedCustomer.status} />
              </div>
            </div>

            {/* details */}
            <div className="space-y-3 text-sm">
              {[
                { label: "Email", value: selectedCustomer.email, icon: Mail },
                { label: "Mobile", value: selectedCustomer.mobile, icon: Phone },
                {
                  label: "Joined",
                  value: new Date(selectedCustomer.createdAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  }),
                  icon: Clock,
                },
                ...(selectedCustomer.bookingDate
                  ? [
                      {
                        label: "Booking",
                        value: new Date(selectedCustomer.bookingDate).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        }),
                        icon: Calendar,
                      },
                    ]
                  : []),
                ...(selectedCustomer.classified
                  ? [
                      {
                        label: "Interested In",
                        value: `${selectedCustomer.classified.title} (${selectedCustomer.classified.vrm})`,
                        icon: CarFront,
                      },
                    ]
                  : []),
              ].map((row) => (
                <div
                  key={row.label}
                  className="flex items-center gap-3 p-3 rounded-xl"
                  style={{ background: MUTED_BG }}
                >
                  <row.icon size={15} style={{ color: ROYAL }} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium" style={{ color: SLATE }}>
                      {row.label}
                    </p>
                    <p className="font-semibold truncate" style={{ color: NAVY }}>
                      {row.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* action buttons */}
            <div className="flex gap-2 mt-5">
              <button
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition hover:opacity-90"
                style={{ background: YELLOW, color: DEEP_NAVY }}
              >
                Edit Customer
              </button>
              <button
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold border transition hover:bg-gray-50"
                style={{ borderColor: SILVER, color: SLATE }}
                onClick={() => setSelectedCustomer(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

