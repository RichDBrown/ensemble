import Image from "next/image";

export default function SignUpPage() {
  return (
    <main className="flex flex-col items-center pt-16 px-4">
      <div className="flex items-center gap-x-4">
        <Image
          src="/logo.png"
          width={10}
          height={10}
          alt="Logo."
          className="h-10 w-auto"
          priority={true}
        />
        <h1 className="text-2xl font-medium">Ensemble</h1>
      </div>
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-3xl font-extrabold text-on-surface text-left">
            Sign Up
          </h2>
          <p className="mt-2 text-sm text-on-surface-variant text-left">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-medium text-primary hover:text-primary-fixed-dim"
            >
              Sign in
            </a>
          </p>
        </div>
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
