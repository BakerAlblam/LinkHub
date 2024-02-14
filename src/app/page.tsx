import { db } from "~/server/db";
import Form from "./components/form";
import { SearchIcon } from "lucide-react";
import { Input } from "~/components/ui/input";

export default async function HomePage() {
  return (
    <main className="flex-1">
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container grid items-center gap-4 px-4 text-center md:px-6 lg:gap-10">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              The complete platform for your links
            </h1>
            <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Share all of your social media profiles and important links with a
              beautiful and customizable page.
            </p>
          </div>
          <div className="mx-auto  space-y-2">
            <form className="flex rounded-md border border-gray-200">
              <div className="relative hidden lg:block">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  className="pl-8 text-sm"
                  placeholder="Search..."
                  type="search"
                />
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
