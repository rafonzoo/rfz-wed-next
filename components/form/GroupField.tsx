import type { RFC } from '@/type'
import { tw } from '@/lib'

interface GroupFieldItemProps {
  hide?: boolean
  label?: string
  className?: string
}

export const GroupFieldItem: RFC<GroupFieldItemProps> = (props) => {
  const { hide = false, label, className, children } = props

  if (hide) {
    return null
  }

  return (
    <div className='flex flex-nowrap border-zinc-200 px-3 dark:border-zinc-700'>
      {label && (
        <div className='mr-auto flex h-11 items-center pr-3'>
          <div className='mr-3 h-6 w-6 rounded bg-blue-500'></div>
          <div>{label}</div>
        </div>
      )}
      <div className={tw(className)}>{children}</div>
    </div>
  )
}

export const GroupFieldMain: RFC = ({ children }) => {
  return (
    <div className='overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-700'>
      <div className='divide-y'>{children}</div>
    </div>
  )
}
