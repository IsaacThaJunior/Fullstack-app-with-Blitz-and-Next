import { string, z } from "zod"

export const CreatePostSchema = z.object({
  title: z.string().min(5),
  content: z.string().min(10),
  // template: __fieldName__: z.__zodType__(),
})
export const UpdatePostSchema = z.object({
  id: z.number(),
  title: z.string().min(5),
  content: z.string().min(10),

  // template: __fieldName__: z.__zodType__(),
})

export const DeletePostSchema = z.object({
  id: z.number(),
})
