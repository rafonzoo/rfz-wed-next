'use client'

import type { MutableRefObject, ReactNode } from 'react'
import type { WeddingEditorSheet } from '@/wedding/schema'
import type { RFC } from '@/type'
import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react'
import { contextCreator, freezeWindow, isObjectEqual } from '@/tools/helper'
import { tw } from '@/lib'
import { GoXCircleFill } from 'react-icons/go'
import { createPortal } from 'react-dom'
import Button from '@/components/Button'

interface Sheet<T = {}> {
  show: boolean
  children?: ReactNode
  title?: string
  triggerRef?: MutableRefObject<HTMLElement | null>
  onClose?: () => void
  onSave?: (state: T) => void
}

const CONTEXT_SHEET = {
  editor: contextCreator<WeddingEditorSheet>({
    url: '',
    orientation: { portrait: 'center' },
  }),
}

const SheetAPI = <T extends keyof typeof CONTEXT_SHEET>(ctx: T) => {
  const CurrentContext = CONTEXT_SHEET[ctx].context
  const defaultValue = CONTEXT_SHEET[ctx].value

  type SheetState = (typeof CONTEXT_SHEET)[T]['value']
  const ActualSheet: RFC<Sheet<SheetState>> = ({
    show,
    title,
    children,
    triggerRef,
    onClose,
    onSave,
  }) => {
    const [state, setState] = useState<SheetState>(defaultValue)
    const [unmount, setUnmount] = useState(!show)

    const sheetElement = useRef<HTMLDivElement | null>(null)
    const mutable = useRef<{
      sheetId: string
      initial: SheetState
      onload: boolean
      overlay: HTMLButtonElement | null
      focusableItems: HTMLElement[]
    }>({
      sheetId: useId(),
      initial: state,
      onload: false,
      overlay: null,
      focusableItems: [],
    })

    const handleSave = () => {
      onSave?.(state)

      // Record...
      mutable.current.initial = state
      triggerRef?.current?.focus()
    }

    const handleUnmount = () => {
      if (!show) {
        setUnmount(true)
      }
    }

    const handleClose = () => {
      if (!isObjectEqual(state, mutable.current.initial)) {
        setState(mutable.current.initial)
      }

      onClose?.()
      triggerRef?.current?.focus()
    }

    const handleFocus = (e: KeyboardEvent) => {
      if (!sheetElement.current) return

      const current = document.activeElement as HTMLElement
      mutable.current.focusableItems = Array.from(
        sheetElement.current.querySelectorAll<HTMLElement>(
          [
            'button:not([disabled]):not([tabindex="-1"])',
            'input:not([disabled]):not([tabindex="-1"])',
            'select:not([disabled]):not([tabindex="-1"])',
            'textarea:not([disabled]):not([tabindex="-1"])',
            'iframe:not([disabled]):not([tabindex="-1"])',
            'a:not([disabled]):not([tabindex="-1"])',
            '[tabindex]:not([tabindex="-1"])',
            '[contentEditable=true]:not([tabindex="-1"])',
          ].join(',')
        )
      )

      const items = mutable.current.focusableItems
      const { isFirstFocus, isLastFocus } = {
        isFirstFocus: current === items[0],
        isLastFocus: current === items[items.length - 1],
      }

      if (isLastFocus && !e.shiftKey) {
        items[0].focus()

        e.preventDefault()
      }

      if (isFirstFocus && e.shiftKey) {
        items[items.length - 1].focus()

        e.preventDefault()
      }
    }

    // prettier-ignore
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleAccessibility = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape': return handleClose()
        case 'Tab':    return handleFocus(e)
      }
    }

    useEffect(() => {
      freezeWindow(show)

      if (show) {
        setUnmount(false)
      }

      return () => {
        freezeWindow(false)

        if (!show) {
          setUnmount(true)
        }
      }
    }, [show])

    // Mounting effect
    useEffect(() => {
      const current = mutable.current

      if (show) {
        current.onload = true
      }

      return () => {
        if (current.onload) {
          current.onload = false
        }
      }
    }, [show])

    useEffect(() => {
      window.addEventListener('keydown', handleAccessibility)

      return () => {
        window.removeEventListener('keydown', handleAccessibility)
      }
    }, [handleAccessibility])

    // Accessibility effect
    useLayoutEffect(() => {
      const currentTrigger = triggerRef?.current
      const current = mutable.current

      // Skip focus on client load
      if (current.onload) {
        ;(unmount ? currentTrigger : current.overlay)?.focus()
      }

      return () => {
        if (!current.onload) {
          ;[current.overlay, currentTrigger].forEach((curr) => curr?.blur())
        }
      }
    }, [triggerRef, unmount])

    if (unmount) {
      return null
    }

    return (
      <CurrentContext.Provider value={[state, setState]}>
        {createPortal(
          <div
            role='dialog'
            id={mutable.current.sheetId}
            ref={sheetElement}
            className='fixed left-0 top-0 z-30 h-full w-full'
          >
            <div
              className={tw({
                'absolute left-0 top-0 z-0 h-full w-full bg-black/30 outline-none': true, // prettier-ignore
                'animate-fade-in opacity-100': show,
                'animate-fade-out opacity-0': !show,
              })}
            ></div>
            <div
              onAnimationEnd={handleUnmount}
              className={tw({
                'flex h-[75%] flex-col overflow-hidden rounded-tl-3xl rounded-tr-3xl': true, // prettier-ignore
                'absolute bottom-0 left-0 z-[1] w-full bg-white dark:bg-zinc-800': true, // prettier-ignore
                'translate-y-0 animate-slide-up': show,
                'translate-y-full animate-slide-down': !show,
              })}
            >
              <div className='w-full bg-white p-4 dark:bg-zinc-800'>
                <div className='relative grid grid-cols-[1fr_auto_1fr]'>
                  <div className='relative'>
                    <div className='absolute -left-1.5 top-1/2 flex -translate-y-1/2 items-center'>
                      <Button
                        model='icon'
                        ref={(ref) => (mutable.current.overlay = ref)}
                        onClick={handleClose}
                        className='!rounded-full text-icon text-zinc-300'
                      >
                        <GoXCircleFill />
                      </Button>
                    </div>
                  </div>
                  <p className='text-center font-semibold'>{title}</p>
                  <div className='text-right'>
                    <button
                      onClick={handleSave}
                      className={tw('text-blue-600', {
                        invisible: isObjectEqual(
                          state,
                          mutable.current.initial
                        ),
                      })}
                    >
                      Simpan
                    </button>
                  </div>
                </div>
              </div>
              <div className='relative h-full overflow-y-auto overflow-x-hidden'>
                {children}
              </div>
            </div>
          </div>,
          document.body
        )}
      </CurrentContext.Provider>
    )
  }

  return ActualSheet
}

export { CONTEXT_SHEET }
export default SheetAPI
