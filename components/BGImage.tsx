'use client'

import type { FC } from 'react'
import type { Tag } from '@/type'
import { useState, useEffect, useRef } from 'react'

interface BGImageType extends Tag<'div'> {
  url?: string
  observer?: boolean
}

const BGImage: FC<BGImageType> = ({ url, observer, ...props }) => {
  const element = useRef<HTMLDivElement>(undefined!)
  const [bgUrl, setBgUrl] = useState(!url ? null : observer ? null : url)

  useEffect(() => {
    if (!url || !observer) return

    const current = element.current
    const observe = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          /**
           * Set the actual image
           */
          setBgUrl(url)
          observe.unobserve(entry.target)
        }
      })
    })

    observe.observe(current)
    return () => observe.unobserve(current)
  }, [observer, url])

  return (
    <div
      {...props}
      ref={element}
      style={{
        ...props.style,
        backgroundRepeat: props.style?.backgroundRepeat ?? 'no-repeat',
        backgroundImage: bgUrl ? `url("${bgUrl}")` : 'none',
      }}
    />
  )
}

export default BGImage
