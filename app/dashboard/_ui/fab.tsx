import Image from "next/image";
import Add from "@/public/add.svg";
import { Dispatch, SetStateAction } from "react";

type FABProps = {
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
};

export default function FAB({ setIsDialogOpen }: FABProps) {
  return (
    <button
      onClick={() => setIsDialogOpen(true)}
      className="fixed flex justify-center items-center bottom-4 right-4 z-10 w-14 h-14 rounded-2xl bg-primary-container cursor-pointer hover:bg-[#174875] active:bg-[#174875] transition-colors"
    >
      <Image
        src={Add}
        alt="Create new study plan."
        className="w-3.5 h-3.5"
        priority={true}
        unoptimized={true}
      />
    </button>
  );
}
