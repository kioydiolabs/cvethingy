export async function generateMetadata({
  params,
  _searchParams,
}: {
  params: { cve: string };
  _searchParams: { [key: string]: string | string[] | undefined };
}) {
  // Fetch data server-side; note that you might want to handle errors/404s here too.
  const res = await fetch(`https://cveawg.mitre.org/api/cve/${params.cve}`, {
    cache: "no-store",
  });
  const cveData = await res.json();

  // Customize these properties based on your CVE API response structure
  return {
    title: params.cve
      ? `${params.cve} | KioydioLabs CVEThingy`
      : "KioydioLabs CVEThingy",
    description: `${cveData?.containers?.cna?.descriptions?.[0]?.value}`,
    openGraph: {
      title: params.cve
        ? `${params.cve} | KioydioLabs CVEThingy`
        : "KioydioLabs CVEThingy",
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
