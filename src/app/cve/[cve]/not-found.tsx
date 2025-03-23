import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Card className="flex h-full flex-col items-center justify-center gap-2 p-5">
      <h2 className="text-xl font-semibold">Oops!</h2>
      <p>Could not find the requested CVE ID.</p>
      <Link href="/">
        <Button className="hover: cursor-pointer">Back</Button>
      </Link>
    </Card>
  );
}
