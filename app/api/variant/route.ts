import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const variant = await prismadb.variant.create({
      data: {
        ...body,
      },
    });
    return NextResponse.json(variant);
  } catch (error) {
    console.log("Error at /api/variant POST", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
