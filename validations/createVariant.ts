import { z } from "zod";

export const createVariantSchema = z.object({
  title: z.string().min(2, {
    message: "Option name be at least 2 characters long",
  }),
  secondTitle: z
    .string()
    .min(2, {
      message: "Option name be at least 2 characters long",
    })
    .optional(),
  options: z.array(
    z.object({
      id: z.string().nullable(),
      name: z.string().nullable(),
      values: z.array(z.object({})),
    })
  ),
  secondOptions: z
    .array(
      z.object({
        id: z.string().nullable(),
        name: z.string().nullable(),
        values: z.array(z.object({})),
      })
    )
    .optional()
    .nullable(),
});
