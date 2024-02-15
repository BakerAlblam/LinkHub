"use client";
import React, { useRef, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import axios from "axios";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";
import Link from "next/link";

type FormData = {
  password: string;
  confirmPassword: string;
  username: string;
  email: string;
};

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
    reset,
  } = useForm<FormData>();

  const sendData = async (data: FieldValues) => {
    if (data.password !== data.confirmPassword) {
      console.log("pass does not match");
    } else {
      try {
        isSubmitting;
        const res = await axios.post("/api/users", {
          username: data.username,
          email: data.email,
          password: data.password,
        });
        if (res.status === 201) {
          reset();
          toast("Registerd!");
        }
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
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit(sendData)}>
          <div>
            <Label className="block text-xl font-medium leading-6 ">
              Username
            </Label>
            <div className="mt-2">
              <Input
                {...register("username", {
                  required: "Username is required",
                  value: `@`,
                  minLength: {
                    value: 6,
                    message: "Username must be at least 6 characters",
                  },
                })}
                type="text"
                placeholder="Enter username..."
                className="text-large block w-full rounded-md border-0  py-1.5  text-slate-950 shadow-sm ring-1 ring-inset focus:ring-2  focus:ring-inset sm:leading-6"
              />
              {errors.username && (
                <p className="text-red-500"> {`${errors.username.message}`} </p>
              )}
            </div>
          </div>
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
          <div>
            <Label className="block text-xl font-medium leading-6 ">
              Confirm passowrd
            </Label>
            <div className="mt-2">
              <Input
                {...register("confirmPassword", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                  validate: (value) =>
                    value === getValues("password") || "Password must match",
                })}
                type="text"
                placeholder="Confirm password..."
                className="text-large block w-full rounded-md border-0  py-1.5  text-slate-950 shadow-sm ring-1 ring-inset focus:ring-2  focus:ring-inset sm:leading-6"
              />
              {errors.confirmPassword && (
                <p className="text-red-500">
                  {" "}
                  {`${errors.confirmPassword.message}`}{" "}
                </p>
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
        <Link className="mt-2 text-white underline" href={"/signin"}>
          Login
        </Link>
      </div>
    </div>
  );
};

export default SignUpForm;
