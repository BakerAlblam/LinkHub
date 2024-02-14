import { sql } from "drizzle-orm";
import { db } from "~/server/db";
import { users } from "~/server/db/schema";

export default async function Page(context: { params: { authId: any } }) {
  const { authId } = context.params;
  const usersData = await db.execute(
    sql`SELECT * FROM ${users} WHERE ${users.authId} = ${authId}`,
  );
}
