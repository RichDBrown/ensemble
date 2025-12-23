import Image from "next/image";
import Logo from "@/public/logo.svg";
import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="flex flex-col gap-y-21 pt-16 pb-6 px-4">
      <section className="flex flex-col items-center w-full">
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
        <h2 className="mt-16 text-3xl font-medium">Never Cram Again</h2>
        <p className="mt-4 text-center text-on-surface-variant">
          A smarter way to study, built on learning science, not last-minute
          stress.
        </p>
        <Link
          href="/dashboard"
          className="flex items-center justify-center mt-6 w-full h-12 text-sm font-medium text-on-primary bg-primary rounded-2xl hover:bg-[#AFCFFB] active:bg-[#AFCFFB] transition-colors"
        >
          Get started
        </Link>
      </section>
      <section className="flex flex-col items-center w-full">
        <h2 className="text-center text-3xl font-medium">
          The Problems Students Face
        </h2>
        <div className="flex flex-col w-full gap-y-4 p-6 mt-6 border border-outline-variant rounded-xl">
          <p className="text-xl">You&apos;ve been here before:</p>
          <ul className="list-disc list-inside text-on-surface-variant">
            <li>You understand the material until exam week</li>
            <li>You reread notes for hours, but nothing sticks</li>
            <li>
              You cram the night before and forget everything a week later
            </li>
          </ul>
          <p className="font-medium">
            Cramming feels productive in the moment, but it does not lead to
            real learning.
          </p>
        </div>
      </section>
      <section className="flex flex-col items-center w-full">
        <h2 className="text-center text-3xl font-medium">The Promise</h2>
        <div className="flex flex-col w-full gap-y-4 p-6 mt-6 border border-outline-variant rounded-xl">
          <p className="text-xl">Never cram again.</p>
          <p className="text-on-surface-variant">
            Ensemble helps you study a little at a time, in the right order, and
            at the right moments. The result is stronger memory, better
            understanding, and far less stress.
          </p>
        </div>
      </section>
      <section className="flex flex-col items-center w-full">
        <h2 className="text-center text-3xl font-medium">How It Works</h2>
        <p className="self-start mt-6 text-xl">1. Enter your course info</p>
        <p className="self-start mt-2 text-on-surface-variant">
          Add your subject, exam date, and topics.
        </p>
        <p className="self-start mt-4 text-xl">2. Get a smart study plan</p>
        <p className="self-start mt-2 text-on-surface-variant">
          Ensemble generates a clear, day-by-day plan that tells you exactly
          what to study and when.
        </p>
        <p className="self-start mt-4 text-xl">3. Study smarter, not longer</p>
        <p className="self-start mt-2 text-on-surface-variant">
          Each session is short and focused, helping you make steady progress
          without burnout.
        </p>
        <Link
          href="/dashboard"
          className="flex items-center justify-center mt-6 w-full h-12 text-sm font-medium text-on-primary bg-primary rounded-2xl hover:bg-[#AFCFFB] active:bg-[#AFCFFB] transition-colors"
        >
          Build my study plan
        </Link>
      </section>
      <section className="flex flex-col items-center w-full">
        <h2 className="text-center text-3xl font-medium">Why It Works</h2>
        <p className="self-start mt-6 text-xl">🧠 Spaced repetition</p>
        <p className="self-start mt-2 text-on-surface-variant">
          You review material at carefully chosen intervals so it moves into
          long-term memory.
        </p>
        <p className="self-start mt-4 text-xl">🧩 Chunking</p>
        <p className="self-start mt-2 text-on-surface-variant">
          Large or complex topics are broken into smaller pieces that are easier
          to understand and master.
        </p>
        <p className="self-start mt-4 text-xl">🔀 Interleaved Practice</p>
        <p className="self-start mt-2 text-on-surface-variant">
          Related topics are mixed together so you build deeper understanding
          and perform better on exams.
        </p>
        <p className="self-start mt-4 font-medium">
          This approach is not a shortcut. It reflects how the brain actually
          learns.
        </p>
      </section>
      <section className="flex flex-col items-center w-full">
        <h2 className="text-center text-3xl font-medium">
          Start Studying the Way Your Brain is Designed to Learn
        </h2>
        <p className="mt-4 text-xl text-on-surface-variant">
          Never cram again.
        </p>
        <Link
          href="/dashboard"
          className="flex items-center justify-center mt-6 w-full h-12 text-sm font-medium text-on-primary bg-primary rounded-2xl hover:bg-[#AFCFFB] active:bg-[#AFCFFB] transition-colors"
        >
          Create my study plan
        </Link>
      </section>
    </main>
  );
}
