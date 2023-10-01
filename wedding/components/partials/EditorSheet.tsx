import type { RFC } from '@/type'
import { useRef } from 'react'
import { useSheet } from '@/tools/hook'
import { tw } from '@/lib'
import { GroupFieldItem, GroupFieldMain } from '@/components/Form/GroupField'
import Tabs from '@/components/Tabs'
import Switch from '@/components/Switch'
import Button from '@/components/Button'

const EditorSheetImage: RFC = () => {
  const [{ image }, setState] = useSheet('editor')
  const placement = useRef<'center' | 'left' | 'right'>(
    image?.orientation?.landscape ?? 'center'
  )

  function handleOrientation(val: boolean) {
    setState((prev) =>
      !prev.image
        ? { ...prev }
        : {
            ...prev,
            image: {
              ...prev.image,
              orientation: val
                ? {
                    landscape:
                      prev.image.orientation?.landscape ?? placement.current,
                  }
                : { portrait: 'center' },
            },
          }
    )
  }

  function handlePlacement(key: typeof placement.current) {
    if (!isMatchedPlacement(key)) {
      placement.current = key

      setState((prev) =>
        !prev.image
          ? { ...prev }
          : {
              ...prev,
              image: {
                ...prev.image,
                orientation: { landscape: key },
              },
            }
      )
    }
  }

  function isMatchedPlacement(key: typeof placement.current) {
    // prettier-ignore
    return (
      image?.orientation?.landscape &&
      image?.orientation.landscape === key
    )
  }

  return (
    <div className='space-y-2'>
      <GroupFieldMain>
        <GroupFieldItem label='Landscape' className='flex items-center'>
          <Switch
            active={!image?.orientation?.portrait}
            onChange={handleOrientation}
          />
        </GroupFieldItem>
        <GroupFieldItem hide={!!image?.orientation?.portrait}>
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
  console.log('ssss')
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
