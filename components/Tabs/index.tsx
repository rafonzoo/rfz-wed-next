'use client'

import type { KeyboardEvent } from 'react'
import type { RFC } from '@/type'
import { useEffect, useId, useRef, useState } from 'react'
import Button from '@/components/Button'

interface iTabs {
  startAt?: number
  items: {
    label: string
    content: React.JSX.Element
  }[]
}

const Tabs: RFC<iTabs> = ({ startAt = 0, items }) => {
  const [activeIndex, setActiveIndex] = useState(
    startAt > items.length || startAt < 0 ? 0 : startAt
  )

  const state = useRef<{
    ref: (HTMLButtonElement | null)[]
    tabsId: string
    isInit: boolean
  }>({
    ref: [],
    tabsId: useId(),
    isInit: false,
  })

  // Accessibility effect
  useEffect(() => {
    const current = state.current

    if (current.isInit) {
      current.ref[activeIndex]?.focus()
    }

    return () => {
      current.ref[activeIndex]?.blur()
    }
  }, [activeIndex])

  /**
   * Follow WAI-Aria tabs design pattern.
   *
   * {@link} https://www.w3.org/WAI/ARIA/apg/patterns/tabs/
   */
  function handleAccessibility(e: KeyboardEvent<HTMLButtonElement>) {
    state.current.isInit = true

    switch (e.key) {
      case 'ArrowRight': {
        setActiveIndex((prev) => (prev + 1 > items.length - 1 ? 0 : prev + 1))
        break
      }
      case 'ArrowLeft': {
        setActiveIndex((prev) => (prev - 1 < 0 ? items.length - 1 : prev - 1))
        break
      }
    }
  }

  return (
    <div className='flex w-full flex-col space-y-3'>
      <div className='rounded-xl bg-zinc-100 p-1 dark:bg-zinc-700'>
        <div role='tablist' className='relative flex flex-nowrap items-center'>
          {items.map((item, index) => (
            <Button
              key={index}
              role='tab'
              id={`tab-${state.current.tabsId}-${index}`}
              tabIndex={activeIndex === index ? 0 : -1}
              aria-selected={activeIndex === index}
              aria-controls={`tabpanel-${state.current.tabsId}-${index}`}
              ref={(ref) => (state.current.ref = [...state.current.ref, ref])}
              className='relative z-10 grow text-sm font-semibold'
              onClick={() => activeIndex !== index && setActiveIndex(index)}
              onKeyDown={(ev) => handleAccessibility(ev)}
            >
              {item.label}
            </Button>
          ))}
          <div
            className='absolute left-0 top-0 h-full rounded-lg bg-white transition-transform ease-transform dark:bg-zinc-500/50'
            style={{
              width: `calc(100% / ${items.length})`,
              transform: `translateX(calc(100% * ${activeIndex}))`,
            }}
          ></div>
        </div>
      </div>
      <div
        className='w-full'
        role='tabpanel'
        id={`tabpanel-${state.current.tabsId}-${activeIndex}`}
        aria-labelledby={`tab-${state.current.tabsId}-${activeIndex}`}
      >
        {items[activeIndex].content}
      </div>
    </div>
  )
}

export default Tabs
