"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "./provider";
import { Bounce, ToastContainer } from "react-toastify";
import Header from "@/components/Header";
import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: "Cleaning service",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const hideHeader =
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/login-staff" ||
    pathname === "/staff" ||
    pathname.startsWith("/dashboard");
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Cleaning Service</title>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
        <ReduxProvider>
          {!hideHeader && <Header />}
          <main className="min-h-screen bg-gray-50">
            {" "}
            <AuthProvider />
            {children}
          </main>
          {!hideHeader && <Footer />}
        </ReduxProvider>
      </body>
    </html>
  );
}
