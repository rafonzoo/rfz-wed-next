'use client'

import type { WeddingEditorSheet } from '@/wedding/schema'
import { type FC, useState, useRef } from 'react'
import { isObjectEqual } from '@/tools/helper'
import EditorSheet from '@/wedding/components/partials/EditorSheet'
import SheetAPI from '@/components/Sheet'

const Sheet = SheetAPI('editor')

const WeddingPage: FC = () => {
  const [show, setShow] = useState(false)
  const [state, setState] = useState<WeddingEditorSheet>({
    url: '',
    orientation: {
      portrait: 'center',
    },
  })

  const sheetTrigger = useRef<HTMLButtonElement | null>(null)

  function handleSaving(sheet: WeddingEditorSheet) {
    if (isObjectEqual(sheet, state)) {
      return setShow(false)
    }

    setShow(false)
    setState(sheet)
  }

  return (
    <main>
      <Sheet
        show={show}
        title='Tambah item'
        triggerRef={sheetTrigger}
        onClose={setShow.bind(null, false)}
        onSave={handleSaving}
      >
        <EditorSheet />
      </Sheet>
      <div className='p-6'>
        {state.orientation?.landscape ? 'Landscape' : 'Portrait'}:{' '}
        {state.orientation?.landscape ?? 'center'}
        <br />
        <button ref={sheetTrigger} onClick={() => setShow((prev) => !prev)}>
          {show ? 'Hide' : 'Show'}
        </button>
      </div>
    </main>
  )
}

export default WeddingPage
