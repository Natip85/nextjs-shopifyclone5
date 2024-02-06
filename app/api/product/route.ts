import getCurrentUser from "@/actions/getCurrentUser";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const userId = getCurrentUser();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const product = await prismadb.product.create({
      data: {
        ...body,
        userId,
      },
    });
    return NextResponse.json(product);
  } catch (error) {
    console.log("Error at /api/hotel POST", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
