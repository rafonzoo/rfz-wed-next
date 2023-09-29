import type {
  Dispatch,
  ElementType,
  LegacyRef,
  MutableRefObject,
  ReactNode,
  SetStateAction,
} from 'react'

export type State<T> = [T, Dispatch<SetStateAction<T>>]

export type Ref<T> = MutableRefObject<T>

export type Nullable<T> = T | null

export type Nullish<T> = Nullable<T | undefined>

export type IElement<T extends ElementType> = React.ComponentPropsWithoutRef<T>

export type Child<T = {}> = T & { children?: React.ReactNode }

export type Tag<T extends ElementType> = IElement<T>

export type RFC<T = {}> = (props: Child<T>) => ReactNode

export type FFC<R, T = {}> = (props: Child<T>, ref: LegacyRef<R>) => ReactNode
