import { useEffect, useState } from "react";

export default function AppBar() {
  const [isScrolling, setIsScrolling] = useState<boolean>(false);

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
      className={`fixed flex justify-center w-full pb-4.5 pt-10.5 top-0 z-10 transition-colors ${
        isScrolling && "bg-surface-container"
      }`}
    >
      <h1 className="text-xl">Profile</h1>
    </header>
  );
}
