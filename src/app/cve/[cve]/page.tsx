"use client";
import {
  ApiResponse,
  emptyResponseArray as EmptyApiResponseArray,
} from "./cveTypes";

import { useEffect, useState } from "react";
import CveInfoTable from "@/app/cve/[cve]/cveInfoTable";
import { Card } from "@/components/ui/card";
import LoadingSpinner from "@/components/ui/loading-spinner";
import CveProductsTable from "@/app/cve/[cve]/cveProductsTable";
import CveRatingsTable from "@/app/cve/[cve]/cveRatingsTable";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { notFound, useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

export default function Page() {
  const [cveData, setCveData] = useState<ApiResponse>(EmptyApiResponseArray);
  const [status, setStatus] = useState<number>(200);
  const [loading, setloading] = useState<boolean>(true);

  const params = useParams();
  const cveId = params.cve as string;

  useEffect(() => {
    const fetchCve = async () => {
      try {
        const result = await fetch(`https://cveawg.mitre.org/api/cve/${cveId}`);
        const respCode = result.status;
        const json = await result.json();
        setCveData(json);
        console.log(json);
        setloading(false);
        setStatus(respCode);
      } catch (e) {
        console.log(e);
      }
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
          <Accordion
            type="multiple"
            className="w-full"
            defaultValue={["item-1", "item-2"]}
          >
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <p className="tableHeading">CVE Scores/Metrics</p>
              </AccordionTrigger>
              <AccordionContent>
                <Card>
                  <CveRatingsTable
                    data={{
                      cnaData: cveData.containers.cna,
                      adpData: cveData.containers.adp,
                    }}
                  />
                </Card>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                <p className="tableHeading">CVE Information</p>
              </AccordionTrigger>
              <AccordionContent>
                <Card>
                  <CveInfoTable
                    data={{
                      providerMetadata:
                        cveData.containers.cna?.providerMetadata,
                      problemTypes: cveData.containers.cna.problemTypes,
                      descriptions: cveData.containers.cna.descriptions,
                      references: cveData.containers.cna.references,
                    }}
                  />
                </Card>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>
                <p className="tableHeading">Affected Products</p>
              </AccordionTrigger>
              <AccordionContent>
                <Card>
                  <CveProductsTable data={cveData.containers.cna.affected} />
                </Card>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      );
    }
  };

  if (status != 200) {
    // return <Error statusCode={status} />;
    notFound();
  }

  const router = useRouter();

  const handleCopy = async () => {
    await navigator.clipboard.writeText(cveId);
    toast("Copied CVE ID to clipboard.");
  };

  return (
    <div className="flex flex-col items-center justify-center w-full mb-10">
      <Card className="w-[75%] p-10 flex flex-col gap-4">
        <div className="flex items-center justify-between w-full">
          {/* Left-aligned button */}
          <Button
            className="flex-none cursor-pointer"
            onClick={() => {
              router.push("/");
            }}
          >
            <ArrowLeft /> Home
          </Button>

          {/* Centered text container */}
          <div className=" flex flex-row items-center justify-center  gap-2 absolute left-1/2 transform -translate-x-1/2">
            <p className="text-2xl font-bold text-center">{cveId}</p>
            <Button
              className="text-xs px-2 py-1 h-min cursor-pointer"
              onClick={() => {
                handleCopy();
              }}
            >
              Copy
            </Button>
          </div>
        </div>

        <OuterTable />
      </Card>
    </div>
  );
}
