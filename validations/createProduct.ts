import { z } from "zod";

export const createProductSchema = z.object({
  title: z.string().min(3, {
    message: "Title must be at least 3 characters long",
  }),
  description: z.string().optional(),
  price: z.coerce.number().int().optional(),
  weight: z.coerce.number().int().optional(),
  totalInventory: z.coerce.number().int().optional(),
  comparePriceAt: z.coerce.number().int().optional(),
  taxable: z.boolean().default(true),
  // weight: z
  //   .string()
  //   .refine((val) => !isNaN(parseFloat(val)), {
  //     message: "Price must be a valid number",
  //   })
  //   .transform((val) => parseFloat(val)),
  // weightUnit: z.string().optional(),
  // totalInventory: z
  //   .string()
  //   .refine((val) => !isNaN(parseFloat(val)), {
  //     message: "Price must be a valid number",
  //   })
  //   .transform((val) => parseFloat(val)),
  images: z
    .array(
      z.object({
        src: z.string(),
        id: z.number(),
        alt: z.string(),
        productId: z.string(),
        image: z.string(),
        path: z.string(),
      })
    )
    .optional(),
});
