"use client";
import {
  ApiResponse,
  emptyResponseArray as EmptyApiResponseArray,
} from "./cveTypes";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import CveInfoTable from "@/app/cve/[cve]/cveInfoTable";
import { Card } from "@/components/ui/card";
import LoadingSpinner from "@/components/ui/loading-spinner";
import CveProductsTable from "@/app/cve/[cve]/cveProductsTable";
import CveRatingsTable from "@/app/cve/[cve]/cveRatingsTable";

export default function Page() {
  const cveId = useParams().cve;

  const [cveData, setCveData] = useState<ApiResponse>(EmptyApiResponseArray);
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
      return (
        <div className="flex flex-col w-full items-center justify-center mt-6 gap-2">
          <p className="font-bold">Loading...</p>
          <LoadingSpinner />
        </div>
      );
    } else {
      return (
        <div className="flex flex-col w-full items-center justify-center mt-6 gap-2">
          <p className="tableHeading">CVE Scores/Metrics</p>
          <CveRatingsTable
            data={{
              cnaData: cveData.containers.cna,
              adpData: cveData.containers.adp,
            }}
          />
          <p className="tableHeading">CVE Information</p>
          <CveInfoTable
            data={{
              providerMetadata: cveData.containers.cna.providerMetadata,
              problemTypes: cveData.containers.cna.problemTypes,
              descriptions: cveData.containers.cna.descriptions,
              references: cveData.containers.cna.references,
            }}
          />
          <p className="tableHeading">Affected Products</p>
          <CveProductsTable data={cveData.containers.cna.affected} />
        </div>
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
