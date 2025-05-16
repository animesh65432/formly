import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { CheckIcon } from "lucide-react"

import { cn } from "../../lib/utils"

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      className={cn(
        // Base styling - applied to all states
        "peer size-4 shrink-0 rounded-[4px] border-2 border-green-800",
        // Initial state: explicitly set white background
        "bg-white text-green-800",
        // Checked state: green bg, white icon, maintain green border
        "data-[state=checked]:bg-green-800 data-[state=checked]:text-white data-[state=checked]:border-green-800",
        // Focus & interaction states with higher specificity
        "focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-1",
        "disabled:cursor-not-allowed disabled:opacity-50",
        // Ensure smooth transitions
        "transition-all duration-200",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        className="flex items-center justify-center text-current"
        forceMount
      >
        <CheckIcon className="size-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }