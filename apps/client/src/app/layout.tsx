import { Toaster } from "@/components/ui/sonner";
import "../styles/globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      // className="dark"
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
