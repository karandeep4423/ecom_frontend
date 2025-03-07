'use client'

import React, { FC, useState, FormEvent, ChangeEvent } from "react";
import Input from "@/shared/Input/Input";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { forgetUserAsync } from "@/lib/features/userSlice"; // Assuming you have this action defined

interface FormData {
  email: string;
}

const PageForgotPass: FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
  });
  const dispatch = useDispatch();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(formData);
    dispatch(forgetUserAsync(formData)).then(() => {
      setFormData({
        email: "",
      });
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="container mb-24 lg:mb-32">
      <header className="text-center max-w-2xl mx-auto mb-14 sm:mb-16 lg:mb-20">
        <h2 className="mt-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Forgot password
        </h2>
        <span className="block text-sm mt-4 text-neutral-700 sm:text-base dark:text-neutral-200">
          Welcome to our Community
        </span>
      </header>

      <div className="max-w-md mx-auto space-y-6">
        {/* FORM */}
        <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
          <label className="block">
            <span className="text-neutral-800 dark:text-neutral-200">
              Email address
            </span>
            <Input
              type="email"
              name="email"
              placeholder="example@example.com"
              className="mt-1"
              value={formData.email}
              onChange={handleChange}
            />
          </label>
          <ButtonPrimary type="submit">Continue</ButtonPrimary>
        </form>

        {/* ==== */}
        <span className="block text-center text-neutral-700 dark:text-neutral-300">
          Go back for{" "}
          <Link href="/login" className="text-green-600">
            Sign in
          </Link>
          {" / "}
          <Link href="/signup" className="text-green-600">
            Sign up
          </Link>
        </span>
      </div>
    </div>
  );
};

export default PageForgotPass;
