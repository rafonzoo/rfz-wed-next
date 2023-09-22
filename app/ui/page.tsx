'use client'

import type { WeddingImageOrientation } from '@/wedding/schema'
import { useState, useRef, type FC } from 'react'
import { Switch } from '@/components/Base'
import { cn } from '@/tools/helper'
import { useForm } from 'react-hook-form'
import TableField from '@/components/form/TableField'
import GroupField from '@/components/form/GroupField'

const RFZUIComponent: FC = () => {
  const { register } = useForm()
  const [orientation, setOrientation] = useState<WeddingImageOrientation>({
    portrait: 'center',
  })

  const landscape = useRef<'left' | 'right' | 'center'>('left')

  function updatePlacement(placement: 'left' | 'right' | 'center') {
    setOrientation((prev) => {
      landscape.current = placement

      if (prev.landscape === placement) {
        return prev
      }

      return { landscape: placement }
    })
  }

  return (
    <div>
      <div className='p-5'>
        <p className='mb-2'>ListItem</p>
        <div className='space-y-2'>
          <TableField
            items={[
              {
                ...register('ukuran'),
                placeholder: 'Cover (optional)',
              },
              {
                ...register('posisi'),
                placeholder: 'Center (optional)',
              },
            ]}
          />
          <GroupField.Main>
            <GroupField.Item
              label='Landscape'
              className={{ wrapper: 'flex items-center' }}
            >
              <Switch
                checked={'landscape' in orientation}
                onCheckedChange={(value) => {
                  setOrientation(
                    value
                      ? { landscape: landscape.current }
                      : { portrait: 'center' }
                  )
                }}
              />
            </GroupField.Item>
            <GroupField.Item
              hide={'portrait' in orientation}
              className={{
                wrapper: 'flex h-[100px] flex-col justify-center',
              }}
            >
              <button
                onClick={() => updatePlacement('left')}
                className={cn('text-left', {
                  'text-blue-500': orientation?.landscape === 'left',
                })}
              >
                left
              </button>
              <button
                onClick={() => updatePlacement('center')}
                className={cn('text-left', {
                  'text-blue-500': orientation?.landscape === 'center',
                })}
              >
                center
              </button>
              <button
                onClick={() => updatePlacement('right')}
                className={cn('text-left', {
                  'text-blue-500': orientation?.landscape === 'right',
                })}
              >
                right
              </button>
            </GroupField.Item>
          </GroupField.Main>
        </div>
        <br />
        <div>
          Orientation: {'landscape' in orientation ? 'landscape' : 'portrait'}
          <br />
          placement: {orientation.landscape ?? 'center'}
        </div>
      </div>
    </div>
  )
}

export default RFZUIComponent
