import { z } from "zod";

export const createVariantSchema = z.object({
  name: z.string().min(2, {
    message: "Option name be at least 2 characters long",
  }),
  values: z.string(),
});
