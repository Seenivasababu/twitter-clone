import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { cookies } from "next/headers";

import { TRPCReactProvider } from "~/trpc/react";
import SideNav from "./_components/SideNav";
import AuthProvider from "./_components/Provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Twitter clone",
  description: "This is twitter clone for development",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <TRPCReactProvider cookies={cookies().toString()}>
          <AuthProvider>
            <div className="container mx-auto flex items-start sm:pr-4">
              <SideNav />
              <div className="min-h-screen flex-grow border-x">{children}</div>
            </div>
          </AuthProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
