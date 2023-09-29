import type { FFC, Tag } from '@/type'
import { forwardRef } from 'react'
import { tw } from '@/lib'

interface iButton extends Tag<'button'> {
  model?: 'default' | 'action' | 'icon'
}

const Button: FFC<HTMLButtonElement, iButton> = (
  { model = 'default', ...props },
  ref
) => {
  return (
    <button
      {...props}
      ref={ref}
      className={tw(props.className, {
        'inline-flex items-center justify-center rounded-lg relative': true, // prettier-ignore
        'focus-visible:outline focus-visible:outline-[3px] focus-visible:-outline-offset-0 focus-visible:outline-amber-500': true, // prettier-ignore
        'bg-primary font-semibold text-white active:bg-blue-700': model === 'action', // prettier-ignore
        'h-8': model === 'default',
        'h-14 items-center px-2': model !== 'icon',
      })}
    />
  )
}

export default forwardRef(Button)
