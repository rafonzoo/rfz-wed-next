'use client'

import type { RFC, Tag } from '@/type'
import { useId } from 'react'
import { cn } from '@/tools/helper'

interface ListItemProps extends Tag<'div'> {
  label: string
  icon?: boolean
  devider?: boolean
  classes?: { wrapper?: string }
  input?: Omit<Tag<'input'>, 'id'> & {
    type?: 'text' | 'number'
  }
}

const ListInput: RFC<Tag<'input'>> = (props) => {
  return (
    <input
      {...props}
      autoComplete={props.autoComplete ?? 'off'}
      className={cn(props.className, 'h-full w-full px-3')}
      onKeyDown={(e) => {
        const target = e.target as HTMLInputElement
        const isActive = document.activeElement === target

        if (e.key === 'Escape') {
          isActive && target.blur()
        }

        props.onKeyDown?.(e)
      }}
    />
  )
}

const ListItem: RFC<ListItemProps> = ({
  children,
  classes,
  devider,
  icon,
  input,
  label,
  ...props
}) => {
  const inputId = useId()

  return (
    <div
      {...props}
      className={cn(
        props.className,
        'flex h-11 w-full items-center border-zinc-200',
        'group overflow-hidden rounded-xl border'
      )}
    >
      <div
        onClick={() => input && document.getElementById(inputId)?.focus()}
        className={cn(
          'flex h-full items-center space-x-3 pl-3',
          classes?.wrapper
        )}
      >
        {icon && <div className={cn('h-6 w-6 rounded bg-blue-500')}></div>}
        {label && (
          <div>
            {label}
            {input?.required ? <span className='text-red-500'>*</span> : ''}
          </div>
        )}
        {(devider || input) && <div className='h-7 w-[1px] bg-gray-200'></div>}
      </div>
      {!input ? children : <ListInput {...input} id={inputId} />}
    </div>
  )
}

export default ListItem
