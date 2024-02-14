"use client";
import { useUser } from "@clerk/nextjs";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation"; // Use 'next/router' instead of 'next/navigation'

const Page = () => {
  const router = useRouter();
  const user = useUser();
  const authId = user?.user?.id;
  console.log(authId);

  useEffect(() => {
    const redir = () => {
      if (authId) {
        router.push(`/settings/${authId}`);
      } else {
        console.warn(
          "User ID is not available yet. Redirect will not be triggered.",
        );
      }
    };

    redir();
  }, [authId]);

  return <div>Loading...</div>;
};

export default Page;
