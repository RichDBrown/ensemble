import { createClient } from "@/app/_utils/supabase/browser-client";
import { useEffect, useState } from "react";

export default function AppBar() {
  const [isScrolling, setIsScrolling] = useState<boolean>(false);
  const [initial, setUserInitial] = useState<string>();

  useEffect(() => {
    async function getUserName() {
      const supabase = createClient();

      let initial: string;
      const {
        data: { user },
      } = await supabase.auth.getUser();
      initial = user?.user_metadata.firstName[0];
      setUserInitial(initial);
    }

    getUserName();
  }, []);

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 0) {
        setIsScrolling(true);
      } else {
        setIsScrolling(false);
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed grid grid-cols-3 items-center w-full pb-4.5 pt-10.5 top-0 z-10 transition-colors ${
        isScrolling && "bg-surface-container"
      }`}
    >
      <div />
      <h1 className="justify-self-center text-xl">Study plans</h1>
      <div className="flex justify-center items-center justify-self-end mr-3 w-8 h-8 text-xl text-on-tertiary rounded-full bg-tertiary">
        {initial}
      </div>
    </header>
  );
}
