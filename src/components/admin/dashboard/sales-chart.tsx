"use client";
// ChartDataType removed - dashboard is now self-contained
// This component is kept for reference but not currently used
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatPrice } from "@/lib/utils";
import React, { use } from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  type TooltipProps,
  XAxis,
  YAxis,
} from "recharts";

interface SalesChartsProps {
  data: Promise<unknown[]>;
}
const SalesCharts = (props: SalesChartsProps) => {
  const { data } = props;
  const chartData = (data as unknown as { then: unknown }) instanceof Promise ? [] : (data as unknown[]);
  return (
    <div>
      <Card className="mbb-6 bg-[#062A5E] border-[#0757A6]/30">
        <CardHeader>
          <CardTitle className="text-white">
            Monthly sales {new Date().getFullYear() - 1} /{" "}
            {new Date().getFullYear()}
          </CardTitle>
          <CardDescription className="text-[#D7DEE8]">
            Number of cars sold per month
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={500}>
            <BarChart data={chartData}>
              <XAxis
              dataKey="month"
              stroke="#D7DEE8"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              />
              <YAxis
              stroke="#D7DEE8"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) =>
                formatPrice({ price: value, currency: "NGN" })
              }
              />
              <Tooltip
                    content={<CustomTooltip />}
                    cursor={{ fill: "transparent" }}
                  />
                  <Bar
                    dataKey="sales"
                    fill="#FFC400"
                    radius={[4, 4, 0, 0]}
                  />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

const CustomTooltip = ({
	active,
	payload,
	label,
}: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
		return (
			<div className="bg-[#031B3D] border border-[#0757A6]/30 p-2 rounded">
				<p className="text-white">
					{`${label}: ${formatPrice({ price: payload[0].value as number, currency: "NGN" })}`}
				</p>
			</div>
		);
	}
}

export default SalesCharts;
