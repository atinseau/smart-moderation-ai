import Link from "next/link";
import "../styles/globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <div className="pt-8">
          <Link href="/">home</Link>
        </div>
      </body>
    </html>
  );
}
