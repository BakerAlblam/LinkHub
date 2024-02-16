import { NextRequest, NextResponse } from "next/server";
import { db } from "~/server/db";
import { users } from "~/server/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
export async function POST(request: NextRequest) {
  const { password, email, username } = await request.json();

  if (!username || !password || !email) {
    return NextResponse.json(
      { message: "Invalid input data" },
      { status: 400 },
    );
  }

  try {
    const existingEmail = await db.query.users.findFirst({
      where: eq(users.email, email),
    });
    const existingUser = await db.query.users.findFirst({
      where: eq(users.username, username),
    });

    if (existingUser) {
      return NextResponse.json({ message: "username already exists" });
    }
    if (existingEmail) {
      return NextResponse.json({ message: "Email already exists" });
    }
  } catch (error) {
    return NextResponse.json(error);
  }

  const saltRounds = 10;
  const hashedPass = await bcrypt.hash(password, saltRounds);

  try {
    const newUser = await db
      .insert(users)
      .values({
        username,
        email,
        password: hashedPass,
      })
      .execute();
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.log(error);
  }
}
