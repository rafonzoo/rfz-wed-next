import type { z } from 'zod'
import { useParams, useSearchParams } from 'next/navigation'

// export const useWedding = () => useContext(WeddingContext)

// export const useTemplate = () => {
//   const [{ template }] = useWedding()

//   return () => template
// }

export const useParsedParam = <T extends z.ZodType>(type: T) => {
  const param: z.infer<T> = useParams()
  return type.parse(param)
}

export const useParsedQuery = <T extends z.ZodType, K extends keyof z.infer<T>>(
  type: T,
  key: K
) => {
  const query = useSearchParams()
  const parsed = query.get(key as string)

  return type.parse({ [key]: parsed })[key] as z.infer<T>[K]
}
