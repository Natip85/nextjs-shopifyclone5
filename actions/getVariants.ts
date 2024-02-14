import prismadb from "@/lib/prismadb";

export default async function getVariants() {
  try {
    const variants = await prismadb.variant.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return variants;
  } catch (error: any) {
    throw new Error(`Error fetching variants: ${error.message}`);
  } finally {
    await prismadb.$disconnect();
  }
}
