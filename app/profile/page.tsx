"use client";

import { useEffect, useState } from "react";
import AppBar from "./_ui/app-bar";
import { createClient } from "../_utils/supabase/browser-client";
import { useRouter } from "next/navigation";

const supabase = createClient();

export default function ProfilePage() {
  const [initial, setUserInitial] = useState<string>();
  const [isSigningOut, setIsSigningOut] = useState<boolean>(false);
  const [isErrorSigningOut, setIsErrorSigningOut] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    async function getUserName() {
      let initial: string;
      const {
        data: { user },
      } = await supabase.auth.getUser();
      //Redirect to sign-in if not authenticated
      if (!user) {
        router.replace("/auth/signin");
        return;
      } else {
        initial = user?.user_metadata.firstName[0];
        setUserInitial(initial);
      }
    }

    getUserName();
  }, [router, isSigningOut]);

  return (
    <>
      <AppBar />
      <div className="flex justify-center items-center h-30 w-30 text-6xl text-on-tertiary bg-tertiary rounded-full">
        {initial}
      </div>
      <div className="px-4 mt-12 w-full">
        <button
          onClick={async () => {
            let { error } = await supabase.auth.signOut();
            if (error) {
              setIsErrorSigningOut(true);
            } else {
              setIsSigningOut(true);
            }
          }}
          className="w-full h-12 text-sm font-medium text-on-primary bg-primary rounded-2xl hover:bg-[#AFCFFB] active:bg-[#AFCFFB] cursor-pointer transition-colors"
        >
          Log out
        </button>
      </div>
      {isErrorSigningOut && (
        <p className="self-center mt-4 text-sm text-error">
          An error has occurred please try again later.
        </p>
      )}
    </>
  );
}
