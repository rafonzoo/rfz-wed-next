import type { MouseEvent } from 'react'
import type { RFC, Tag } from '@/type'
import { useEffect, useRef, useState } from 'react'
import { tw } from '@/lib'
import Button from '@/components/Button'

interface iSwitch extends Omit<Tag<'button'>, 'onChange'> {
  active?: boolean
  altText?: string
  onChange?: (value: boolean) => void
}

const Switch: RFC<iSwitch> = ({ active, altText, onChange, ...props }) => {
  const [activate, setActivate] = useState(active)
  const isTouched = useRef(false)

  useEffect(() => {
    if (isTouched.current) {
      onChange?.(!!activate)
    }

    return () => {
      if (!isTouched.current) {
        isTouched.current = false
      }
    }
  }, [activate, onChange])

  function handleActivation(e: MouseEvent<HTMLButtonElement>) {
    setActivate((prev) => !prev)

    onChange?.(!activate)
    props.onClick?.(e)
  }

  return (
    <Button
      {...props}
      onClick={handleActivation}
      className={tw(props.className, {
        'w-14 !rounded-full transition-colors': true,
        'bg-zinc-200 dark:bg-zinc-600': !activate,
        'bg-green-500': activate,
      })}
    >
      <span className='sr-only'>{altText ?? 'icon'}</span>
      <span
        className={tw({
          'absolute left-1 top-1 h-6 w-6 rounded-full bg-white transition-transform': true, // prettier-ignore
          'translate-x-6': activate,
        })}
      ></span>
    </Button>
  )
}

export default Switch
