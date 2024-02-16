import axios from "axios";
import { eq } from "drizzle-orm";
import { db } from "~/server/db";
import { users } from "~/server/db/schema";

export default async function Page({ params }: { params: { username: any } }) {
  const user = await db.query.users.findFirst({
    where: (user, { eq }) => eq(user.username, params.username),
  });
  console.log(user);
  return <h1>hi</h1>;
}
