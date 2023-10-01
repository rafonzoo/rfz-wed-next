'use client'

import type { WeddingEditorSheet } from '@/wedding/schema'
import { type FC, useState, useRef } from 'react'
import EditorSheet from '@/wedding/components/partials/EditorSheet'
import SheetAPI from '@/components/Sheet'

const Sheet = SheetAPI('editor')

const WeddingPage: FC = () => {
  const [show, setShow] = useState(false)
  const [state, setState] = useState<WeddingEditorSheet>({
    image: {
      url: '',
      orientation: {
        portrait: 'center',
      },
    },
  })

  const sheetTrigger = useRef<HTMLButtonElement | null>(null)

  return (
    <main>
      <Sheet
        show={show}
        title='Tambah item'
        triggerRef={sheetTrigger}
        onClose={setShow.bind(null, false)}
        onSave={setState}
        // closeAfterSave
      >
        <EditorSheet />
      </Sheet>
      <div className='p-6'>
        {state.image?.orientation?.landscape ? 'Landscape' : 'Portrait'}:{' '}
        {state.image?.orientation?.landscape ?? 'center'}
        <br />
        <button ref={sheetTrigger} onClick={() => setShow((prev) => !prev)}>
          {show ? 'Hide' : 'Show'}
        </button>
      </div>
    </main>
  )
}

export default WeddingPage
