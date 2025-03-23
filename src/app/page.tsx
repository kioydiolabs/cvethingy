"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AlertTriangle } from "lucide-react";
import LoadingSpinner from "@/components/ui/loading-spinner";

export default function Home() {
  const [cveId, setCveId] = useState<string>("");
  const [valid, setValid] = useState<boolean>(false);
  const [notFound, setNotFound] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setCveId(event.target.value);
    setValid(!!event.target.value.match("CVE-[0-9]{4}-[0-9]+"));
    setNotFound(false);
  };

  const router = useRouter();

  const checkAndRedir = async (cveId: string) => {
    try {
      setNotFound(false);
      setLoading(true);
      const result = await fetch(`https://cveawg.mitre.org/api/cve/${cveId}`);
      setLoading(false);

      if (result.status !== 200) {
        setNotFound(true);
      } else {
        router.push(`/cve/${cveId}`);
      }
    } catch (e) {
      console.log(e);
      setNotFound(true);
    }
  };

  return (
    <Card className="flex flex-col gap-2 items-center justify-center p-10">
      <div
        className="flex flex-row items-center gap-2"
        onKeyDown={async (e) => {
          if (e.key === "Enter") {
            await checkAndRedir(cveId);
          }
        }}
      >
        <Label className="text-nowrap">CVE ID</Label>
        <Input
          required
          type="text"
          value={cveId}
          onChange={handleChange}
        ></Input>
      </div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger
            asChild
            className={`w-full ${valid ? "cursor-pointer" : "cursor-not-allowed"}`}
          >
            <Button
              className="w-full cursor-pointer"
              onClick={async () => {
                await checkAndRedir(cveId);
              }}
              disabled={!valid}
            >
              Look Up
            </Button>
          </TooltipTrigger>
          {!valid ? (
            <TooltipContent
              side="bottom"
              className="font-bold flex flex-row items-center gap-2"
            >
              <AlertTriangle height={20} width={20} color="red" /> Enter a valid
              CVE ID (eg. CVE-2025-24531)
            </TooltipContent>
          ) : null}
        </Tooltip>
      </TooltipProvider>
      {notFound ? (
        <Card className="font-bold flex flex-row items-center gap-2 text-xs w-full bg-red-200 p-1 text-black ">
          <AlertTriangle height={20} width={20} color="red" />
          CVE not found
        </Card>
      ) : null}
      {loading ? <LoadingSpinner /> : null}
    </Card>
  );
}
