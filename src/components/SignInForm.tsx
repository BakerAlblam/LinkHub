"use client";
import React, { useRef, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import axios from "axios";
import { FieldValues, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type FormData = {
  password: string;
  email: string;
};

const SignInForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormData>();

  const sendData = async (data: FieldValues) => {
    try {
      isSubmitting;
      const res = await axios.post("/api/users/login", {
        email: data.email,
        password: data.password,
      });
      console.log(res);
      if (res.data?.user) {
        router.push("/");
      } else {
        toast("invalid!");
      }
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };
  return (
    <form className="space-y-6" onSubmit={handleSubmit(sendData)}>
      <div>
        <Label htmlFor="email" className="block text-xl font-medium leading-6 ">
          Email
        </Label>
        <div className="mt-2">
          <Input
            {...register("email", {
              required: "Password is required",
            })}
            type="text"
            placeholder="Enter email..."
            className="text-large block w-full rounded-md border-0  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset  sm:leading-6"
          />
        </div>
      </div>
      <div>
        <Label className="block text-xl font-medium leading-6 ">Password</Label>
        <div className="mt-2">
          <Input
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            placeholder="Enter password..."
            type="text"
            className="text-large block w-full rounded-md border-0  py-1.5 text-gray-900 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset  sm:leading-6"
          />
        </div>
      </div>

      <Button
        type="submit"
        className="flex w-full justify-center rounded-md bg-black text-white"
        variant="outline"
        disabled={isSubmitting}
      >
        Sign in
      </Button>
    </form>
  );
};

export default SignInForm;
