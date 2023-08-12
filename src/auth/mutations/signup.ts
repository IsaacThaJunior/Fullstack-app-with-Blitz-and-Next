import { SecurePassword } from "@blitzjs/auth/secure-password"
import { resolver } from "@blitzjs/rpc"
import db from "db"
import { Role } from "types"
import { Signup } from "../schemas"

export default resolver.pipe(resolver.zod(Signup), async ({ email, name, password }, ctx) => {
  const hashedPassword = await SecurePassword.hash(password.trim())

  // Code added by me starts here
  let newRole: Role = "USER"

  if (email === "okoro669@gmail.com") {
    newRole = "ADMIN"
  }

  const user = await db.user.create({
    data: {
      email: email.toLowerCase().trim(),
      hashedPassword,
      name,

      // Pass the created role here
      role: newRole,
    },
    select: { id: true, name: true, email: true, role: true },
  })

  await ctx.session.$create({ userId: user.id, role: user.role as Role, name: user.name as string })
  return user
})
