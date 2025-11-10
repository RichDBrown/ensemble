import { Dispatch, SetStateAction } from "react";

type ConfirmEmailDialogProps = {
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
};

export default function ConfirmEmailDialog({
  setIsDialogOpen,
}: ConfirmEmailDialogProps) {
  return (
    <div className="fixed flex justify-center items-center z-20 px-4 top-0 w-full h-screen bg-scrim/32">
      <div
        role="dialog"
        className="flex flex-col w-full px-6 pt-6 pb-5 bg-surface-container-high rounded-3xl"
      >
        <h2 className="text-2xl">Confirm email</h2>
        <p className="mt-4 text-sm text-on-surface-variant">
          An email has been sent to your address. Please confirm to continue.
        </p>
        <button
          onClick={() => setIsDialogOpen(false)}
          className="self-end h-12 px-4 text-sm font-medium text-primary cursor-pointer"
        >
          Close
        </button>
      </div>
    </div>
  );
}
