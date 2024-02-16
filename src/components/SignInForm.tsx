"use client";
import React, { useRef, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import axios from "axios";
import { FieldValues, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";

type FormData = {
  password: string;
  email: string;
};

const SignInForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<FormData>();

  const getCookie = (name: string) => {
    const cookies = document.cookie.split("; ");
    const cookie = cookies.find((c) => c.startsWith(`${name}=`));
    return cookie ? cookie.split("=")[1] : null;
  };

  const signIn = async (data: FieldValues) => {
    try {
      isSubmitting;
      const res = await axios.post("/api/users/login", {
        email: data.email,
        password: data.password,
      });
      if (res.data?.token) {
        getCookie("accessToken");
      } else {
        toast.error("Invalid credentials", {
          style: {
            border: "4px solid black",
            width: "700px",
          },
        });
      }
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };
  return (
    <div className="">
      <form className="space-y-6" onSubmit={handleSubmit(signIn)}>
        <div>
          <Label
            htmlFor="email"
            className="block text-xl font-medium leading-6 "
          >
            Email
          </Label>
          <div className="mt-2">
            <Input
              {...register("email", {
                required: "Password is required",
              })}
              type="text"
              placeholder="Enter email..."
              className="text-large block w-full rounded-md border-0  py-1.5 text-slate-950 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:leading-6"
            />
            {errors.email && (
              <p className="text-red-500"> {`${errors.email.message}`} </p>
            )}
          </div>
        </div>
        <div>
          <Label className="block text-xl font-medium leading-6 ">
            Password
          </Label>
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
              className="text-large block w-full rounded-md border-0  py-1.5 text-slate-950 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset sm:leading-6"
            />
            {errors.password && (
              <p className="text-red-500"> {`${errors.password.message}`} </p>
            )}
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
      <div className="flex justify-between">
        <p>Dont have an account?</p>
        <Link href={"/signup"}>Sign up</Link>
      </div>
    </div>
  );
};

export default SignInForm;
function getCookie() {
  throw new Error("Function not implemented.");
}
