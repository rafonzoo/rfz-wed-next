import type { FFC, Tag } from '@/type'
import { forwardRef } from 'react'
import { tw } from '@/lib'

interface iButton extends Tag<'button'> {
  variant?: 'default' | 'action' | 'icon'
}

const className = {
  default: {
    base: 'relative inline-flex items-center justify-center',
    focus: 'focus-visible:outline focus-visible:outline-[3px] focus-visible:-outline-offset-0 focus-visible:outline-amber-500', // prettier-ignore
  },
  variant: {
    default: 'h-8 px-2 rounded-lg',
    icon: 'rounded-full text-icon text-zinc-300 dark:text-zinc-600',
    action: 'px-2 bg-primary font-semibold text-white active:bg-blue-700 rounded-lg', // prettier-ignore
  },
}

const Button: FFC<HTMLButtonElement, iButton> = (
  { variant = 'default', ...props },
  ref
) => {
  return (
    <button
      {...props}
      ref={ref}
      className={tw(
        props.className,
        className.variant[variant],
        className.default.base,
        className.default.focus
      )}
    />
  )
}

export default forwardRef(Button)
