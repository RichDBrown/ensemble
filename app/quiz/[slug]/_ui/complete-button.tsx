import { createClient } from "@/app/_utils/supabase/browser-client";
import { useRouter } from "next/navigation";

type CompleteButtonProps = {
  slug: string;
};

export default function CompleteButton({ slug }: CompleteButtonProps) {
  const router = useRouter();

  return (
    <button
      onClick={async () => {
        const supabase = createClient();
        const { error } = await supabase
          .from("quizzes")
          .update({ is_complete: true })
          .eq("id", slug);
        if (!error) {
          router.replace("/dashboard");
        }
      }}
      className="w-full h-14 font-medium text-on-primary bg-primary hover:bg-[#AFCFFB] active:bg-[#AFCFFB] rounded-2xl cursor-pointer transition-colors"
    >
      Complete
    </button>
  );
}
