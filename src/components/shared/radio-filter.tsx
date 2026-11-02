"use client";
import { AwaitedPageProps } from "@/config/types";
import type { CarStatusType } from "@/config/constants";
import { useRouter } from "next/navigation";
import React from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";

interface RadioFilterProps extends AwaitedPageProps {
  items: string[];
}

const RadioFilter = (props: RadioFilterProps) => {
  const { searchParams, items } = props;
  const router = useRouter();
  const status = (searchParams?.status as string) || "all";

  const handleStatus = (status: string) => {
    const currentUrlParams = new URLSearchParams(window.location.search);
    currentUrlParams.set("status", status.toUpperCase());
    const url = new URL(window.location.href);
    url.search = currentUrlParams.toString();
    router.push(url.toString());
  };

  return (
    <RadioGroup
      defaultValue="all"
      value={status}
      onValueChange={handleStatus}
      className="flex items-center gap-4"
    >
      {items.map((item) => (
        <Label
          htmlFor={item.toLowerCase()}
          className={cn(
            "flex-1 rounded-md px-4 py-2 text-center text-muted text-sm font-medium transition-colors hover:bg-[#FFC400] hover:text-[#031B3D] cursor-pointer",
            status?.toLowerCase() === item.toLowerCase() &&
              "text-[#031B3D] bg-[#FFC400]"
          )}
          key={item}
        >
          <RadioGroupItem
            id={item.toLowerCase()}
            value={item.toLowerCase()}
            checked={status?.toLowerCase() === item.toLowerCase()}
            className="peer sr-only"
          />
          {item}
        </Label>
      ))}
    </RadioGroup>
  );
};

export default RadioFilter;
