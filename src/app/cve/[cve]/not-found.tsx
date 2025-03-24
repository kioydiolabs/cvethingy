import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Card className="flex h-full flex-col items-center justify-center gap-2 p-5">
      <h2 className="text-xl font-semibold">404 Error</h2>
      <p>Could not find the requested CVE ID.</p>
      <Link
        href="https://kioydiolabs.youtrack.cloud/newIssue?project=CVE"
        className="underline text-sm text-gray-200"
      >
        Submit a bug report
      </Link>
      <Link href="/">
        <Button className="hover: cursor-pointer">Back</Button>
      </Link>
    </Card>
  );
}
