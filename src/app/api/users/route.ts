import { NextRequest, NextResponse } from "next/server";
import { db } from "~/server/db";
import { users } from "~/server/db/schema";
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
  const { name, authId, email } = await request.json();
  if (!name || !authId || !email) {
    return NextResponse.json(
      { message: "Invalid input data" },
      { status: 400 },
    );
  }

  try {
    const existingUser = await db.query.users.findFirst({
      where: eq(users.authId, authId),
    });

    if (existingUser) {
      return NextResponse.json({ message: "user already exists" });
    }

    const newUser = await db
      .insert(users)
      .values({ authId, name, email })
      .execute();
    return NextResponse.json(newUser);
  } catch (error) {
    return NextResponse.json(error);
  }
}
