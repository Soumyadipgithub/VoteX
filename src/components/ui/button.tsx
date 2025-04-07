import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "relative font-doto border-0 bg-transparent overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-[#ea384c] before:to-[#ac1528] before:z-[-1] before:skew-x-[-6deg] after:absolute after:inset-[0] after:z-[-1] after:skew-x-[-6deg] hover:before:brightness-125 hover:before:animate-pulse hover:scale-105 transition-transform duration-300 text-white uppercase tracking-wider [clip-path:polygon(0_0,95%_0,100%_20%,100%_100%,5%_100%,0_80%)]",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "relative font-doto border-0 bg-transparent overflow-hidden before:absolute before:inset-0 before:bg-black before:z-[-1] before:skew-x-[-6deg] after:absolute after:inset-[0] after:z-[-1] after:skew-x-[-6deg] hover:before:brightness-125 hover:before:animate-pulse hover:scale-105 transition-transform duration-300 border border-[#ea384c] text-white uppercase tracking-wider [clip-path:polygon(0_0,95%_0,100%_20%,100%_100%,5%_100%,0_80%)]",
        secondary:
          "relative font-doto border-0 bg-transparent overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-[#7928CA] before:to-[#5a1e96] before:z-[-1] before:skew-x-[-6deg] after:absolute after:inset-[0] after:z-[-1] after:skew-x-[-6deg] hover:before:brightness-125 hover:before:animate-pulse hover:scale-105 transition-transform duration-300 text-white uppercase tracking-wider [clip-path:polygon(0_0,95%_0,100%_20%,100%_100%,5%_100%,0_80%)]",
        ghost: "relative font-doto border-0 bg-transparent overflow-hidden hover:before:opacity-20 before:opacity-0 before:absolute before:inset-0 before:bg-[#ea384c] before:z-[-1] before:skew-x-[-6deg] after:absolute after:inset-[0] after:z-[-1] after:skew-x-[-6deg] hover:before:animate-pulse hover:scale-105 transition-transform duration-300 text-white uppercase tracking-wider [clip-path:polygon(0_0,95%_0,100%_20%,100%_100%,5%_100%,0_80%)]",
        link: "relative font-doto underline-offset-4 hover:underline text-[#ea384c] uppercase tracking-wider",
        cyberpunk: "relative font-doto border-0 bg-transparent overflow-hidden before:absolute before:inset-0 before:bg-[#ea384c] before:z-[-1] before:skew-x-[-6deg] after:absolute after:inset-[0] after:z-[-1] after:skew-x-[-6deg] hover:before:brightness-125 hover:before:animate-pulse hover:scale-105 transition-transform duration-300 text-white uppercase tracking-wider [clip-path:polygon(0_0,95%_0,100%_20%,100%_100%,5%_100%,0_80%)]",
        metamask: "relative font-doto border-0 bg-transparent overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-[#ea384c] before:to-[#ffd700] before:z-[-1] before:skew-x-[-6deg] after:absolute after:inset-[0] after:z-[-1] after:skew-x-[-6deg] hover:before:brightness-125 hover:before:animate-pulse hover:scale-105 transition-transform duration-300 text-white uppercase tracking-wider [clip-path:polygon(0_0,95%_0,100%_20%,100%_100%,5%_100%,0_80%)]",
        connect: "relative font-doto border-0 bg-transparent overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-[#ea384c] before:to-[#ac1528] before:z-[-1] before:skew-x-[-6deg] after:absolute after:inset-[0] after:z-[-1] after:skew-x-[-6deg] hover:before:brightness-125 hover:before:animate-pulse hover:scale-105 transition-transform duration-300 text-white uppercase tracking-wider [clip-path:polygon(0_0,95%_0,100%_20%,100%_100%,5%_100%,0_80%)]",
        learn: "relative font-doto border-0 bg-transparent overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-[#00C6CF] before:to-[#0070F3] before:z-[-1] before:skew-x-[-6deg] after:absolute after:inset-[0] after:z-[-1] after:skew-x-[-6deg] hover:before:brightness-125 hover:before:animate-pulse hover:scale-105 transition-transform duration-300 text-white uppercase tracking-wider [clip-path:polygon(0_0,95%_0,100%_20%,100%_100%,5%_100%,0_80%)]",
        explore: "relative font-doto border-0 bg-transparent overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-[#7928CA] before:to-[#FF0080] before:z-[-1] before:skew-x-[-6deg] after:absolute after:inset-[0] after:z-[-1] after:skew-x-[-6deg] hover:before:brightness-125 hover:before:animate-pulse hover:scale-105 transition-transform duration-300 text-white uppercase tracking-wider [clip-path:polygon(0_0,95%_0,100%_20%,100%_100%,5%_100%,0_80%)]",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

