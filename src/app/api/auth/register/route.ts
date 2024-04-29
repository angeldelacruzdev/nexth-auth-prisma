import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prisma";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const findUser = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (findUser) {
      return NextResponse.json(
        {
          message: "Usuario ya existe.",
          code: "USER_FOUND",
        },
        {
          status: 400,
        }
      );
    }

    data.password = await bcrypt.hash(data.password, 10);
    const newUser = await prisma.user.create({
      data: {
        ...data,
        isAdmin: false,
      },
    });

    if (newUser) {
      return NextResponse.json({ message: "Usuario creado con éxito." });
    }
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      {
        error: error.mesage,
      },
      {
        status: 500,
      }
    );
  }
}
