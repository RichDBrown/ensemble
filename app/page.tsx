import Link from "next/link";
import UserProfile from "./components/UserProfile";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 font-sans dark:bg-black">
      <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-black dark:text-zinc-50">Ensemble</h1>
          </div>
          <UserProfile />
        </div>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-4 py-16">
        <div className="w-full max-w-3xl space-y-8 text-center">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-black dark:text-zinc-50 sm:text-5xl">
              Welcome to Ensemble
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              Full-stack authentication with Supabase
            </p>
          </div>

          <div className="rounded-lg border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="mb-4 text-xl font-semibold text-black dark:text-zinc-50">
              Authentication Features
            </h2>
            <div className="grid gap-4 text-left sm:grid-cols-2">
              <div className="space-y-2">
                <h3 className="font-medium text-black dark:text-zinc-50">Sign Up</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Create a new account with email and password
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium text-black dark:text-zinc-50">Sign In</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Access your account securely
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium text-black dark:text-zinc-50">Session Management</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Automatic session refresh and secure cookies
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium text-black dark:text-zinc-50">User Profile</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  View and manage your account
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/sign-up"
              className="inline-flex items-center justify-center rounded-md bg-zinc-950 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
            >
              Get Started
            </Link>
            <Link
              href="/sign-in"
              className="inline-flex items-center justify-center rounded-md border border-zinc-300 bg-white px-6 py-3 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              Sign In
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
