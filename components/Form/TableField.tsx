'use client'

import type { RFC, Tag } from '@/type'
import { capitalize } from '@/tools/helper'
import { tw } from '@/lib'

interface TableFieldItem extends Tag<'input'> {
  icon?: boolean
  name: string
}

interface TableFieldProps {
  items: Array<TableFieldItem>
}

const TableField: RFC<TableFieldProps> = ({ items }) => {
  return (
    <TableFieldContainer>
      {items.map(({ icon, required, ...input }, index) => (
        <tr className='h-11 border-zinc-200 dark:border-zinc-800' key={index}>
          <td className='p-0'>
            <label
              htmlFor={`:${input.name}:`}
              className='flex h-11 items-center pl-3 pr-2'
            >
              <span className='mr-3 block h-6 w-6 rounded bg-blue-500'></span>
              <span className='flex'>
                {capitalize(input.name)}
                {required && <span className='block text-red-500'>*</span>}
              </span>
            </label>
          </td>
          <td className='p-0'>
            <span className='block h-7 w-[1px] bg-zinc-200 dark:bg-zinc-800'></span>
          </td>
          <td className='w-full p-0'>
            <input
              {...input}
              type={input.type ?? 'text'}
              id={input.id ?? `:${input.name}:`}
              autoComplete={input.autoComplete ?? 'off'}
              className={tw(
                index === 0 && 'rounded-tr-xl',
                index === items.length - 1 && 'rounded-br-xl',
                input.className + ' h-11 w-full px-3',
                'appearance-none bg-transparent outline-blue-300 focus:outline focus:outline-[3px] focus:-outline-offset-[3px]'
              )}
            />
          </td>
        </tr>
      ))}
    </TableFieldContainer>
  )
}

const TableFieldContainer: RFC = ({ children }) => {
  return (
    <table className='block table-auto overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800'>
      <tbody className='divide-y'>{children}</tbody>
    </table>
  )
}

export default TableField
