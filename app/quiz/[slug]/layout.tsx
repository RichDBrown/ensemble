import { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false },
};

export default function QuizLayout({
  children,
}: Readonly<{
  children?: React.ReactNode;
}>) {
  return <main className="flex flex-col items-center px-4">{children}</main>;
}
