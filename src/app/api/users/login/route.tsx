import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import { db } from "~/server/db";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();
  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.email, email),
  });
  if (!email || !password) {
    return NextResponse.json(
      { message: "Invalid input data" },
      { status: 400 },
    );
  }

  try {
    if (user && (await bcrypt.compare(password, user.password as string))) {
      return NextResponse.json({ user });
    } else {
      return NextResponse.json({ message: "incorrect!" });
    }
  } catch (error) {
    console.log(error);
  }
}
