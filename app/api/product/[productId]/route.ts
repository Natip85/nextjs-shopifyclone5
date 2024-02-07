import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const body = await request.json();

    if (!params.productId) {
      return new NextResponse("ProductID is required", { status: 400 });
    }

    const product = await prismadb.product.update({
      where: {
        id: params.productId,
      },
      data: { ...body },
    });
    return NextResponse.json(product);
  } catch (error) {
    console.log("Error at /api/product/productId PATCH", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
