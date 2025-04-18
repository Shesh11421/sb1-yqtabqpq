import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
        cuisine: "border-transparent bg-blue-100 text-blue-800 shadow hover:bg-blue-200 dark:bg-blue-800 dark:text-blue-100 dark:hover:bg-blue-700",
        location: "border-transparent bg-green-100 text-green-800 shadow hover:bg-green-200 dark:bg-green-800 dark:text-green-100 dark:hover:bg-green-700",
        open: "border-transparent bg-emerald-100 text-emerald-800 shadow hover:bg-emerald-200 dark:bg-emerald-800 dark:text-emerald-100 dark:hover:bg-emerald-700",
        closed: "border-transparent bg-rose-100 text-rose-800 shadow hover:bg-rose-200 dark:bg-rose-800 dark:text-rose-100 dark:hover:bg-rose-700",
        dietary: "border-transparent bg-purple-100 text-purple-800 shadow hover:bg-purple-200 dark:bg-purple-800 dark:text-purple-100 dark:hover:bg-purple-700",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }