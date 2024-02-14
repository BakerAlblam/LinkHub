import UsernameForm from "~/components/UsernameForm";
import { db } from "~/server/db";

export default async function Page(context: { params: { authId: any } }) {
  const { authId } = context.params;
  const res = await db.query.users.findFirst(authId);

  console.log(res);
  const user = res;
  if (user?.username === null)
    return (
      <div>
        {" "}
        <UsernameForm />{" "}
      </div>
    );
}
