import prismadb from "@/lib/prismadb";
import { ObjectId } from "mongodb";

export const getVariantById = async (variantId: string) => {
  const newVariantId = new ObjectId().toHexString();
  try {
    const variant = await prismadb.variant.findUnique({
      where: {
        id: variantId,
      },
    });

    if (!variant) return null;

    return variant;
  } catch (error: any) {
    throw new Error(error);
  }
};
