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
  title: string
  show?: boolean
  children?: ReactNode
  triggerRef?: MutableRefObject<HTMLElement | null>
  closeAfterSave?: boolean
  onClose?: () => void
  onSave?: (state: T) => void
}

const SHEET_CONTEXT = {
  editor: contextCreator<WeddingEditorSheet>({
    image: {
      url: '',
      orientation: { portrait: 'center' },
    },
  }),
}

const SheetAPI = <T extends keyof typeof SHEET_CONTEXT>(ctx: T) => {
  const CurrentContext = SHEET_CONTEXT[ctx].context
  const defaultValue = SHEET_CONTEXT[ctx].value

  type SheetState = (typeof SHEET_CONTEXT)[T]['value']
  const ActualSheet: RFC<Sheet<SheetState>> = ({
    title,
    show = false,
    closeAfterSave = false,
    triggerRef = null,
    children = null,
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
      closeIcon: HTMLButtonElement | null
      focusableItems: HTMLElement[]
      closeAfterSave: boolean
    }>({
      sheetId: useId(),
      initial: state,
      onload: false,
      closeIcon: null,
      focusableItems: [],
      closeAfterSave,
    })

    const handleSave = () => {
      onSave?.(state)
      mutable.current.initial = state // Record...

      if (mutable.current.closeAfterSave) {
        onClose?.()
        triggerRef?.current?.focus()
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
            '[tabindex]:not([tabindex="-1"]):not([data-aof])',
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
        ;(unmount ? currentTrigger : current.closeIcon)?.focus()
      }

      return () => {
        if (!current.onload) {
          ;[current.closeIcon, currentTrigger].forEach((curr) => curr?.blur())
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
              data-aof // AOF: Avoid Overlay Focus
              tabIndex={0}
              onClick={handleClose}
              className={tw({
                'absolute left-0 top-0 z-0 h-full w-full bg-black/30 outline-none cursor-pointer': true, // prettier-ignore
                'animate-fade-in opacity-100': show,
                'animate-fade-out opacity-0': !show,
              })}
            ></div>
            <div
              onAnimationEnd={() => !show && setUnmount(true)}
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
                        variant='icon'
                        ref={(ref) => (mutable.current.closeIcon = ref)}
                        onClick={handleClose}
                      >
                        <GoXCircleFill />
                      </Button>
                    </div>
                  </div>
                  <p className='text-center font-semibold'>{title}</p>
                  <div className='text-right'>
                    <Button
                      onClick={handleSave}
                      className={tw('text-blue-600', {
                        invisible: isObjectEqual(
                          state,
                          mutable.current.initial
                        ),
                      })}
                    >
                      OK
                    </Button>
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

export { SHEET_CONTEXT as CONTEXT_SHEET }
export default SheetAPI
