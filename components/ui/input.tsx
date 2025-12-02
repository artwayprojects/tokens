import * as React from 'react'

import { cn } from '@/lib/utils'

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
    return (
        <input
            type={type}
            data-slot="input"
            className={cn(
                'file:text-foreground placeholder:text-muted selection:bg-primary/30 selection:text-foreground',
                'border-border bg-background/80 h-11 w-full min-w-0 rounded-xl border px-4 py-2 text-base shadow-sm',
                'transition-all duration-300 outline-none',
                'file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium',
                'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
                'md:text-sm',
                // Focus styles with cyan glow
                'focus:border-primary focus:ring-2 focus:ring-primary/20 focus:shadow-[0_0_20px_rgba(0,240,255,0.15)]',
                // Error states
                'aria-invalid:ring-2 aria-invalid:ring-error/20 aria-invalid:border-error aria-invalid:shadow-[0_0_15px_rgba(255,51,102,0.1)]',
                className
            )}
            {...props}
        />
    )
}

export { Input }
