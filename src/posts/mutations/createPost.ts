import { resolver } from "@blitzjs/rpc"
import db from "db"
import { CreatePostSchema } from "../schemas"

export default resolver.pipe(
  resolver.zod(CreatePostSchema),
  resolver.authorize(),
  async ({ title, content }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const post = await db.post.create({ data: { title, content } })

    return post
  }
)
