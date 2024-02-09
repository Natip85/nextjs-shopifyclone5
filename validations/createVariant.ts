import { z } from "zod";

export const createVariantSchema = z.object({
  title: z.string().min(2, {
    message: "Option name be at least 2 characters long",
  }),
  options: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      values: z.array(z.object({})),
    })
  ),
});
