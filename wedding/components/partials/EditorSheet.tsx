import type { RFC } from '@/type'
import { useRef } from 'react'
import { useSheet } from '@/tools/hook'
import { tw } from '@/lib'
import { GroupFieldItem, GroupFieldMain } from '@/components/Form/GroupField'
import Tabs from '@/components/Tabs'
import Switch from '@/components/Switch'
import Button from '@/components/Button'

const EditorSheetImage: RFC = () => {
  const [state, setState] = useSheet('editor')
  const placement = useRef<'center' | 'left' | 'right'>(
    state.orientation?.landscape ?? 'center'
  )

  function handleOrientation(val: boolean) {
    setState((prev) => ({
      ...prev,
      orientation: val
        ? { landscape: prev.orientation?.landscape ?? placement.current }
        : { portrait: 'center' },
    }))
  }

  function handlePlacement(key: typeof placement.current) {
    if (!isMatchedPlacement(key)) {
      placement.current = key

      setState((prev) => ({
        ...prev,
        orientation: { landscape: key },
      }))
    }
  }

  function isMatchedPlacement(key: typeof placement.current) {
    // prettier-ignore
    return (
      state.orientation?.landscape &&
      state.orientation.landscape === key
    )
  }

  return (
    <div className='space-y-2'>
      <GroupFieldMain>
        <GroupFieldItem label='Landscape' className='flex items-center'>
          <Switch
            active={!state.orientation?.portrait}
            onChange={handleOrientation}
          />
        </GroupFieldItem>
        <GroupFieldItem hide={!!state.orientation?.portrait}>
          <div className={tw('flex flex-col justify-center')}>
            {[
              {
                key: 'left' as const,
                label: 'Left',
              },
              {
                key: 'center' as const,
                label: 'Center',
              },
              {
                key: 'right' as const,
                label: 'Right',
              },
            ].map(({ key, label }) => (
              <Button
                key={key}
                className={tw({ 'text-blue-500': isMatchedPlacement(key) })}
                onClick={handlePlacement.bind(null, key)}
              >
                {label}
              </Button>
            ))}
          </div>
        </GroupFieldItem>
      </GroupFieldMain>
    </div>
  )
}

const EditorSheet: RFC = () => {
  return (
    <div className='px-4'>
      <Tabs
        items={[
          {
            label: 'Foto',
            content: <EditorSheetImage />,
          },
          {
            label: 'Teks',
            content: <p>Yeaa</p>,
          },
        ]}
      />
    </div>
  )
}

export default EditorSheet
