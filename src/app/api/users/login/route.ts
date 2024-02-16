import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import { db } from "~/server/db";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();
  const jwtSecret = process.env.JWT_SECRET_KEY;
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
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        `${jwtSecret}`,
        {
          expiresIn: "1h",
        },
      );

      return NextResponse.json(
        { userId: user.id, username: user.username },
        {
          headers: {
            "Set-Cookie": [
              `userData=${encodeURIComponent(
                JSON.stringify(
                  { userId: user.id, username: user.username } || {},
                ),
              )}; HttpOnly; Secure; SameSite=None; Path=/; Max-Age=3600`,
              `accessToken=${token}; HttpOnly; Secure; SameSite=None; Path=/; Max-Age=3600` ||
                "",
            ].filter(Boolean), // Filter out empty strings or undefined values
          } as any,
        },
      );
    } else {
      return NextResponse.json(
        { message: "Incorrect email or password" },
        { status: 401 },
      );
    }
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json(
      { message: "An error occurred during login" },
      { status: 500 },
    );
  }
}
