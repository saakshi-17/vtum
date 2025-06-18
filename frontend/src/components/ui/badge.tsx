import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "bg-primary border-transparent text-primary-foreground",
        secondary:
          "bg-secondary border-transparent text-secondary-foreground",
        destructive:
          "bg-destructive border-transparent text-destructive-foreground",
        outline: "text-foreground",
        success:
          "bg-green-100 border-transparent text-green-800 dark:bg-green-900 dark:text-green-100",
        warning:
          "bg-yellow-100 border-transparent text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100",
        info:
          "bg-blue-100 border-transparent text-blue-800 dark:bg-blue-900 dark:text-blue-100",
      },
      size: {
        sm: "text-xs px-2 py-0.5",
        md: "text-sm px-3 py-1",
        lg: "text-base px-4 py-1.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
