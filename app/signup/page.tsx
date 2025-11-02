import Image from "next/image";
import Logo from "@/public/logo.png";
import Link from "next/link";

export default function SignUpPage() {
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
        <form className="mt-8 space-y-6" action="#" method="POST">
          <div className="rounded-md space-y-4">
            <input
              id="name"
              name="name"
              type="text"
              required
              className="appearance-none relative block w-full px-3 py-2 border border-outline placeholder:text-on-surface-variant text-on-surface bg-surface-container rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="Full name"
            />
            <div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-outline placeholder:text-on-surface-variant text-on-surface bg-surface-container rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="Email"
              />
            </div>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              className="appearance-none relative block w-full px-3 py-2 border border-outline placeholder:text-on-surface-variant text-on-surface bg-surface-container rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="Password"
            />
            <input
              id="confirm-password"
              name="confirm-password"
              type="password"
              autoComplete="new-password"
              required
              className="appearance-none relative block w-full px-3 py-2 border border-outline placeholder:text-on-surface-variant text-on-surface bg-surface-container rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary sm:text-sm"
              placeholder="Re-enter password"
            />
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-on-primary bg-primary hover:bg-primary-container focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-background"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
