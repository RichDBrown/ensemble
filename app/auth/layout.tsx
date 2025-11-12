import Image from "next/image";
import Logo from "@/public/logo.svg";

export default function AuthLayout({
  children,
}: Readonly<{
  children?: React.ReactNode;
}>) {
  return (
    <main className="flex flex-col items-center pt-16 px-4">
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
      {children}
    </main>
  );
}
