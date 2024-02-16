"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
const Links = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/");
  }, []);
  return <div></div>;
};

export default Links;
