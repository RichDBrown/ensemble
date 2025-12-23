import { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false },
};

export default function ProfileLayout({
  children,
}: Readonly<{
  children?: React.ReactNode;
}>) {
  return <main className="flex flex-col items-center pt-27">{children}</main>;
}
