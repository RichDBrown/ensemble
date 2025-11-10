"use client";

import Image from "next/image";
import Logo from "@/public/logo.svg";
import Link from "next/link";
import { createClient } from "@/app/_utils/supabase/browser-client";
import { FormEvent, useState } from "react";
import ConfirmEmailDialog from "../_ui/confirm-email-dialog";

export default function SignInPage() {
  const [isErrorSigningIn, setIsErrorSigningIn] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  async function signInWithEmail(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        shouldCreateUser: false,
        data: {
          email: email,
        },
        emailRedirectTo: process.env.NEXT_PUBLIC_SIGNUP_REDIRECT,
      },
    });
    if (error) {
      setIsErrorSigningIn(true);
    } else {
      setIsDialogOpen(true);
      form.reset();
    }
  }

  return (
    <main className="flex flex-col items-center pt-16 px-4">
      <div className="flex items-center gap-x-4">
        <Image
          src={Logo}
          alt="Logo."
          className="h-10 w-auto"
          priority={true}
          unoptimized={true}
        />
        <h1 className="text-2xl font-medium">Ensemble</h1>
      </div>
      <div className="flex flex-col mt-16 w-full">
        <h2 className="text-3xl font-medium">Sign In</h2>
        <p className="mt-1 text-sm text-on-surface-variant">
          Don&apos;t have an account?{" "}
          <Link href="/auth/signup" className="text-primary">
            Sign up
          </Link>
        </p>
        <form
          onSubmit={signInWithEmail}
          className="flex flex-col mt-6 w-full"
          aria-label="Email form"
        >
          <input
            name="email"
            type="email"
            placeholder="Email"
            autoComplete="email"
            required
            className="appearance-none w-full mt-4 p-4 border border-outline outline-none rounded-sm focus:ring-3 focus:ring-primary focus:border-transparent"
          />
          <button className="mt-4 w-full h-12 text-sm font-medium text-on-primary bg-primary rounded-2xl hover:bg-[#AFCFFB] active:bg-[#AFCFFB] cursor-pointer transition-colors">
            Sign in
          </button>
          {isErrorSigningIn && (
            <p className="self-center text-sm text-error mt-4">
              An error has occurred. Please check your email is correct.
            </p>
          )}
        </form>
      </div>
      {isDialogOpen && <ConfirmEmailDialog setIsDialogOpen={setIsDialogOpen} />}
    </main>
  );
}
