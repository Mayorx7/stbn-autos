import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[#0757A6] text-white [a&]:hover:bg-[#FFC400] hover:text-[#031B3D]",
        secondary:
          "border-transparent bg-[#D9ECFA] text-[#062A5E] [a&]:hover:bg-[#D9ECFA]/80",
        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        warning:
          "border-transparent bg-[#53657A] text-white [a&]:hover:bg-[#53657A]/90 focus-visible:ring-[#53657A]/20 dark:focus-visible:ring-[#53657A]/40 dark:bg-[#53657A]",
        info: "border-transparent bg-[#FFC400] text-[#031B3D] [a&]:hover:bg-[#0757A6] focus-visible:ring-[#FFC400]/20 dark:focus-visible:ring-[#FFC400]/40 dark:bg-[#FFC400]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export { Badge, badgeVariants };
