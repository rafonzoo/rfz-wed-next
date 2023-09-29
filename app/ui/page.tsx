'use client'

import type { WeddingEditorSheet } from '@/wedding/schema'
import { type FC, useState } from 'react'
import { isObjectEqual } from '@/tools/helper'
import EditorSheet from '@/wedding/components/partials/EditorSheet'
import SheetAPI from '@/components/Sheet'

const Sheet = SheetAPI('editor')

const RFZUIComponent: FC = () => {
  const [show, setShow] = useState(false)
  const [state, setState] = useState<WeddingEditorSheet>({
    url: '',
    orientation: {
      portrait: 'center',
    },
  })

  const handleSaving = (sheet: WeddingEditorSheet) => {
    if (isObjectEqual(sheet, state)) {
      return setShow(false)
    }

    setShow(false)
    setState(sheet)
  }

  return (
    <div>
      <Sheet
        show={show}
        title='Tambah item'
        onClose={setShow.bind(null, false)}
        onSave={handleSaving}
      >
        <EditorSheet />
      </Sheet>
      <div className='p-6'>
        {state.orientation?.landscape ? 'Landscape' : 'Portrait'}

        <br />
        <button onClick={() => setShow((prev) => !prev)}>
          {show ? 'Hide' : 'Show'}
        </button>
      </div>
    </div>
  )
}

{
  /* <Switch
      checked={'landscape' in orientation}
      onCheckedChange={(value) => {
        setOrientation(
          value
            ? { landscape: landscape.current }
            : { portrait: 'center' }
        )
      }}
    /> */
}
{
  /* <TableField
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
    /> */
}

export default RFZUIComponent
