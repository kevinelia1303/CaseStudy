import { z } from "zod"

export const createItemSchema = z.object({
  name: z.string().trim().nonempty("Required"),
  category: z.string().trim().nonempty("Required"),
  stock: z.number().nonnegative("Must be positive integer"),
})
