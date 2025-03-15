"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [cveId, setCveId] = useState<string>("");

  const handleChange = (event: any) => {
    setCveId(event.target.value);
  };

  return (
    <Card className="flex flex-col gap-2 items-center justify-center p-10">
      <div className="flex flex-row items-center gap-2">
        <Label className="text-nowrap">CVE ID</Label>
        <Input
          required
          type="text"
          value={cveId}
          onChange={handleChange}
        ></Input>
      </div>
      <Button
        className="w-full cursor-pointer"
        onClick={() => {
          redirect(`/cve/${cveId}`);
        }}
      >
        Look Up
      </Button>
    </Card>
  );
}
