import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: Promise<{ cve: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { cve } = await params;

  // Fetch data server-side; note that you might want to handle errors/404s here too.
  const res = await fetch(`https://cveawg.mitre.org/api/cve/${cve}`, {
    cache: "no-store",
  });
  const cveData = await res.json();

  // Customize these properties based on your CVE API response structure
  return {
    title: cve ? `${cve} | KioydioLabs CVEThingy` : "KioydioLabs CVEThingy",
    description: `${cveData?.containers?.cna?.descriptions?.[0]?.value}`,
    openGraph: {
      title: cve ? `${cve} | KioydioLabs CVEThingy` : "KioydioLabs CVEThingy",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full">
      {children}
    </div>
  );
}
