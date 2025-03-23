export async function generateMetadata({
  params,
}: {
  params: { cve: string };
}) {
  const res = await fetch(`https://cveawg.mitre.org/api/cve/${params.cve}`, {
    cache: "no-store",
  });
  const cveData = await res.json();

  // Basic metadata
  return {
    title: `${params.cve} | KioydioLabs CVEThingy`,
    description:
      cveData?.containers?.cna?.descriptions?.[0]?.value || "CVE details",
  };
}

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { cve: string };
}>) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full">
      {children}
    </div>
  );
}
