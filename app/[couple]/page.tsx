import type { Metadata } from 'next'
import type { WeddingPage } from '@/wedding/schema'
import { notFound } from 'next/navigation'
import { getWeddingByName } from '@/wedding/query'
import { img } from '@/lib'

const generateMetadata = async (option: WeddingPage): Promise<Metadata> => {
  const { params, searchParams } = option
  const wedding = await getWeddingByName(params.couple, searchParams.to)

  // Possible not found
  if (!wedding) return {}

  const { couple, meta } = wedding
  const { title, image } = meta

  const images = image ? [img.url({ path: `/${couple + image}` })] : void 0
  const description = 'The best app to create your wedding invitation.'

  return {
    title,
    description,
    openGraph: { title, images, description },
    metadataBase: new URL('http://localhost'),
  }
}

const WeddingCouple = async (option: WeddingPage) => {
  const { params, searchParams } = option
  const wedding = await getWeddingByName(params.couple, searchParams.to)

  if (!wedding) {
    notFound()
  }

  return null
}

export { generateMetadata }

export default WeddingCouple
