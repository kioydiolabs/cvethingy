import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KioydioLabs CVEThingy",
  description:
    "Get all information about a CVE in single, organized, pretty page.",
  icons:
    "https://n81z99pp0m.ufs.sh/f/spsDoPJObyQ3zLIx4sYujVSGk75FBRzCAZ9vMbn13pYQrhKW",
};

const Navbar = () => {
  return (
    <div className="flex items-center justify-between w-full text-white bg-black p-3">
      {/* Left-aligned button */}
      <div className="flex-none text-black dark:text-white">
        <ThemeToggle />
      </div>

      {/* Centered text container */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <Link href={"/"} className="flex flex-row items-center gap-2">
          <img
            src="https://n81z99pp0m.ufs.sh/f/spsDoPJObyQ3gpS5GmHCrfca4S1MYWDm5FiZ3bHN9EdIvhyj"
            height={35}
            width={35}
          />
          <p className="text-2xl text-center">
            KioydioLabs <strong>CVEThingy</strong>
          </p>
        </Link>
      </div>
    </div>
  );
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex w-full flex-col mt-0 gap-10 items-center justify-center">
            <Navbar />
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
