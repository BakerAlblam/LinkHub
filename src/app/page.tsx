import Link from "next/link";
import { db } from "~/server/db";
import Form from "./components/form";

export default async function HomePage() {
  const data = await db.query.posts.findMany();
  const users = data;
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
          <h1>
            {users?.map((u: any) => (
              <div className="flex">
                <li> {u?.name} </li>
                <li> {u?.content} </li>
              </div>
            ))}
          </h1>
        </div>
        <Form />
      </div>
    </main>
  );
}
