"use client";

import Image from "next/image";
import Logo from "@/public/logo.png";
import Link from "next/link";
import { createClient } from "../_utils/_api/supabase-browser-client";
import { FormEvent, useState } from "react";
import ConfirmEmailDialog from "./_ui/confirm-email-dialog";

export default function SignUpPage() {
  const [isErrorSigningUp, setIsErrorSigningUp] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  async function signUpWithEmail(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const firstName = (form.elements.namedItem("firstName") as HTMLInputElement)
      .value;

    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        data: {
          firstName: firstName,
        },
        emailRedirectTo: "https://ensemble-woad.vercel.app/",
      },
    });
    if (error) {
      setIsErrorSigningUp(true);
    } else {
      setIsDialogOpen(true);
      form.reset();
    }
  }

  return (
    <main className="flex flex-col items-center pt-16 px-4">
      <div className="flex items-center gap-x-4">
        <Image src={Logo} alt="Logo." className="h-10 w-auto" priority={true} />
        <h1 className="text-2xl font-medium">Ensemble</h1>
      </div>
      <div className="flex flex-col mt-16 w-full">
        <h2 className="text-3xl font-medium">Sign Up</h2>
        <p className="mt-1 text-sm text-on-surface-variant">
          Already have an account?{" "}
          <Link href="/login" className="text-primary">
            Sign in
          </Link>
        </p>
        <form
          onSubmit={signUpWithEmail}
          className="flex flex-col mt-6 w-full"
          aria-label="Email form"
        >
          <input
            name="firstName"
            placeholder="First name"
            required
            className="appearance-none w-full mt-4 p-4 border border-outline outline-none rounded-sm focus:ring-3 focus:ring-primary focus:border-transparent"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            autoComplete="email"
            required
            className="appearance-none w-full mt-4 p-4 border border-outline outline-none rounded-sm focus:ring-3 focus:ring-primary focus:border-transparent"
          />
          <button className="mt-4 w-full h-12 text-sm font-medium text-on-primary bg-primary rounded-2xl hover:bg-[#AFCFFB] active:bg-[#AFCFFB] cursor-pointer transition-colors">
            Sign up
          </button>
          {isErrorSigningUp && (
            <p className="self-center text-sm text-error mt-4">
              An error has occurred please try again later
            </p>
          )}
        </form>
      </div>
      {isDialogOpen && <ConfirmEmailDialog setIsDialogOpen={setIsDialogOpen} />}
    </main>
  );
}
