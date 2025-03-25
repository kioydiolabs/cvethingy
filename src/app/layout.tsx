import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Toaster } from "@/components/ui/sonner";

const geist = Geist({ subsets: ["latin"] });

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
            height={28}
            width={28}
            alt="The CVEThingy logo."
          />
          <p className="text-xl text-center">
            KioydioLabs <strong>CVEThingy</strong>
          </p>
        </Link>
      </div>
    </div>
  );
};

const Footer = () => {
  return (
    <div className="flex flex-col items-center justify-between w-full text-xs text-gray-400 bg-black p-3 mb-4">
      <p>KioydioLabs © 2025 | All Rights Reserved</p>
      <p>All data is provided by the MITRE CVE™ API</p>
      <p>
        CVE™ is sponsored by the U.S. Department of Homeland Security (DHS) and
        the Cybersecurity and Infrastructure Security Agency (CISA)
      </p>
      <p>
        CVE™ and the CVE™ logo are registered trademarks of The MITRE
        Corporation
      </p>
      <div className="mt-4 flex flex-row items-center justify-center gap-2">
        <Badge className="text-[10px] py-0.5">Alpha</Badge>
        <div className="flex flex-col justify-center">
          <div className="flex flex-row gap-1">
            <p>Version 0.1.2</p>
            <Link
              href="https://kioydiolabs.youtrack.cloud/newIssue?project=CVE"
              className="underline"
            >
              Submit a bug report
            </Link>
          </div>
          <p>This version has known issues.</p>
        </div>
      </div>
      {process.env.NODE_ENV === "development" ? (
        <div className="mt-4 flex flex-row items-center justify-center gap-2">
          <Badge className="text-[10px] py-0.5">IDV</Badge>
          <div className="flex flex-col justify-center">
            <div className="flex flex-row gap-1">
              <p>Internal Development Version</p>
            </div>
          </div>
        </div>
      ) : null}
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
      <body className={`${geist.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex w-full flex-col mt-0 gap-10 items-center justify-center">
            <Navbar />
            {children}
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
