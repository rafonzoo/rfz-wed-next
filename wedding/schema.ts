import { z } from 'zod'

export type WeddingIcon = z.infer<typeof weddingIcon>
export const weddingIcon = z.enum([
  'cake',
  'couple',
  'bride',
  'groom',
  'quotes',
  'ceremony',
  'ring',
  'location',
])

export type WeddingText = z.infer<typeof weddingText>
export const weddingText = z.object({
  body: z.string(),
  icon: z.string().optional(),
})

export type WeddingCaption = z.infer<typeof weddingCaption>
export const weddingCaption = z.object({
  text: z.string().min(3).max(60),
  placement: z
    .enum(['top left', 'top right', 'bottom left', 'bottom right'])
    .optional(),
})

export type WeddingImageOrientation = z.infer<typeof weddingImageOrientation>
export const weddingImageOrientation = z.object({
  portrait: z.enum(['center']).optional(),
  landscape: z.enum(['center', 'left', 'right']).optional(),
})

export type WeddingImageType = z.infer<typeof weddingImageType>
export const weddingImageType = z.object({
  url: z.string(),
  size: z.string().optional(),
  position: z.string().optional(),
  orientation: weddingImageOrientation.optional(),
  caption: weddingCaption.optional(),
})

export type WeddingEntity = z.infer<typeof weddingEntity>
export const weddingEntity = z.object({
  label: z.string().startsWith('attributes-'),
  image: weddingImageType.optional(),
  text: weddingText.optional(),
})

export type WeddingAttributes = z.infer<typeof weddingAttributes>
export const weddingAttributes = z.object({
  cover: weddingEntity.omit({ label: true }),
  section: z.object({
    intro: weddingEntity.array(),
  }),
})

export type WeddingMeta = z.infer<typeof weddingMetaType>
export const weddingMetaType = z.object({
  image: z.string().optional(),
  title: z.string().optional(),
})

export type WeddingType = z.infer<typeof weddingType>
export const weddingType = z.object({
  id: z.string().uuid(),
  couple: z.string(),
  status: z.enum(['paid', 'pending', 'unpaid']),
  template: z.enum(['default']),
  guest: z.string().array(),
  userId: z.string().uuid(),
  meta: weddingMetaType,
  attributes: weddingAttributes,
})

export type WeddingPage = z.infer<typeof weddingPage>
export const weddingPage = z.object({
  params: z.object({ couple: z.string() }),
  searchParams: z.object({ to: z.string().optional() }),
})

export type WeddingEditorSheet = z.infer<typeof weddingEditorSheet>
export const weddingEditorSheet = z.object({
  image: weddingImageType.nullable(),
})
