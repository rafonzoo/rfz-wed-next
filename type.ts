import type { ReactNode } from 'react'

export type Nullable<T> = T | null

export type Nullish<T> = Nullable<T | undefined>

export type IElement = React.JSX.IntrinsicElements

export type Child<T = {}> = T & { children?: React.ReactNode }

export type Tag<T extends keyof IElement> = IElement[T]

export type RFC<T = {}> = (props: Child<T>) => ReactNode | Promise<ReactNode>
