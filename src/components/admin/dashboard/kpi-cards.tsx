// DashboardData type removed - dashboard is now self-contained
// This component is kept for reference but not currently used
import React from "react";

type DashboardData = Record<string, unknown>;
interface KPIcardsProps {
  data: Promise<DashboardData>;
}

import {
  CarIcon,
  PoundSterling,
  TrendingUpIcon,
  UsersIcon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn, formatNumber, formatPrice } from "@/lib/utils";

interface DashboardItem {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
  amount: number;
  percentage: number;
  style: Intl.NumberFormatOptions["style"];
}

const KpiCard = (props: DashboardItem[][number]) => {
  const { icon: Icon, ...rest } = props;
  return (
    <Card key={rest.id} className="bg-[#062A5E] border-[#0757A6]/30">
      <CardHeader
        className="flex flex-row items-center justify-between
      space-y-0 pb-2"
      >
        <div className="flex flex-col space-y-1">
          <CardTitle className="text-white">{rest.title}</CardTitle>
          <CardDescription className="text-muted">
            {rest.description}
          </CardDescription>
        </div>
        <Icon className="h-6 w-6 text-[#FFC400]" />
      </CardHeader>
      <CardContent className="flex items-center justify-between">
        <span className="text-2xl font-bold text-white">
          {rest.style === "currency"
            ? formatPrice({ price: rest.amount, currency: "NGN" })
            : formatNumber(rest.amount, {
                style: rest.style,
                currency: "NGN",
                maximumFractionDigits: 0,
              })}
        </span>
        <p
          className={cn(
            "text-xs",
            !rest.percentage && "!text-[#D7DEE8]",
            rest.percentage > 0 ? "text-[#FFC400]" : "text-[#53657A]"
          )}
        >
          {rest.percentage === 0
            ? `${rest.percentage}%`
            : formatNumber(rest.percentage / 100, {
                style: "percent",
                maximumFractionDigits: 0,
              })}
        </p>
      </CardContent>
    </Card>
  );
};
const KPIcards = ({
  data, // This will be the data fetched from the dashboard
}: KPIcardsProps) => {
  // Component disabled - replaced by inline dashboard
  const dashboardData: DashboardItem[] = [];
  return (
    <div className="grid gap-4 md:gap-8 md:grid-cols-2 lg:grid-cols-4">
      {dashboardData.map((item) => (
        <KpiCard key={item.id} {...item} />
      ))}
    </div>
  );
};

export default KPIcards;
