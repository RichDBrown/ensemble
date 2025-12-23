import { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false },
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children?: React.ReactNode;
}>) {
  return <main className="flex flex-col items-center">{children}</main>;
}
