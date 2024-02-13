import { NextRequest, NextResponse } from "next/server";
import { db } from "~/server/db";
import { posts } from "~/server/db/schema";

export async function POST(request: NextRequest) {
  try {
    const { name, content } = await request.json();
    const users = await db.insert(posts).values({ name, content });
    return NextResponse.json(users);
  } catch (error) {
    console.log(error);
  }
}
