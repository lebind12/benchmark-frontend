import type { Metadata } from 'next';
import '@/app/globals.css';

export const metadata = {
  title: '스트리밍 화면',
  description: 'Generated by Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className='"h-lvh min-h-lvh w-screen'>
      <body className="h-lvh min-h-lvh w-screen bg-[#00ff00]">{children}</body>
    </html>
  );
}
