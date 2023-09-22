import { weddingType } from '@/wedding/schema'
import { db } from '@/lib'

export const getAllWedding = async () => {
  try {
    const response = await db.wedding.findMany()
    const weddings = await weddingType.array().parseAsync(response)

    return weddings
  } catch (e) { console.log(e); return [] } // prettier-ignore
}

export const getWeddingByName = async (couple: string, guest?: string) => {
  if (!guest) return null

  try {
    const response = await db.wedding.findFirst({
      where: {
        couple: {
          equals: couple,
        },
        AND: {
          guest: {
            has: guest,
          },
        },
      },
    })

    return weddingType.nullable().parse(response)
  } catch (e) { console.log(e); return null } // prettier-ignore
}
