"use client";

import { ApiResponse } from "./cveTypes";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import CveTable from "@/app/cve/[cve]/cveTable";
import { Card } from "@/components/ui/card";

export default function Page() {
  const cveId = useParams().cve;

  const [cveData, setCveData] = useState<ApiResponse>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCve = async () => {
      const result = await fetch(`https://cveawg.mitre.org/api/cve/${cveId}`);
      const json = await result.json();
      setCveData(json);
      console.log(json);
      setLoading(false);
    };

    fetchCve();
  }, []);

  const OuterTable = () => {
    if (loading) {
      return <p>Loading...</p>;
    } else {
      return (
        <CveTable
          data={{
            id: cveData?.cveMetadata.cveId,
            description: cveData?.containers.cna.descriptions[0].value,
            rating: cveData?.containers.cna.metrics[0].cvssV3_1?.baseScore,
          }}
        />
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <Card className="w-[75%] p-10 flex flex-col gap-4">
        <p className="text-2xl font-bold text-center">{cveId}</p>
        <OuterTable />
      </Card>
    </div>
  );
}
