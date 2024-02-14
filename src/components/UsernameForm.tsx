"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import axios from "axios";
import { useUser } from "@clerk/nextjs";

const UsernameForm = () => {
  const [username, setUsername] = useState("");
  const user = useUser();
  const authId = user?.user?.id;
  const name = user?.user?.fullName;
  const email = user?.user?.primaryEmailAddress?.emailAddress;

  const sendData = async () => {
    if (authId) {
      try {
        await axios.post("/api/users", {
          name,
          email,
          authId,
          username,
        });
      } catch (error) {
        console.error("Error sending data:", error);
      }
    }
  };
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          {`@${username}`}
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onClick={sendData}>
          <div>
            <Label
              htmlFor="email"
              className="block text-xl font-medium leading-6 text-gray-900"
            >
              Username
            </Label>
            <div className="mt-2">
              <Input
                id="username"
                name="username"
                type="text"
                onChange={(e) => setUsername(e.target.value.replace(/^@/, ""))}
                value={username.startsWith("@") ? username : `@${username}`}
                required
                className="text-large block w-full rounded-md border-0  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset  sm:leading-6"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="flex w-full justify-center rounded-md bg-black text-white"
            variant="outline"
          >
            Sign in
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UsernameForm;
