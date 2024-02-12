import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  { params }: { params: { variantId: string } }
) {
  try {
    const body = await request.json();
    if (!params.variantId) {
      return new NextResponse("VariantID is required", { status: 400 });
    }
    const variant = await prismadb.variant.update({
      where: {
        id: params.variantId,
      },
      data: { ...body },
    });
    return NextResponse.json(variant);
  } catch (error) {
    console.log("Error at /api/variant/variantId PATCH", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

// export async function DELETE(
//   request: Request,
//   { params }: { params: { roomId: string } }
// ) {
//   try {
//     const { userId } = auth();
//     if (!params.roomId) {
//       return new NextResponse("Room ID is required", { status: 400 });
//     }
//     if (!userId) {
//       return new NextResponse("Unauthorized", { status: 401 });
//     }
//     const room = await prismadb.room.delete({
//       where: {
//         id: params.roomId,
//       },
//     });
//     return NextResponse.json(room);
//   } catch (error) {
//     console.log("Error at /api/room/roomId DELETE", error);
//     return new NextResponse("Internal server error", { status: 500 });
//   }
// }
