import bcrypt from "bcryptjs";
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const { firstName, lastName, name, email, password } = body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      hashedPassword,
      name,
      email,
      firstName: name,
      lastName,
    },
  });

  return NextResponse.json(user);
}
