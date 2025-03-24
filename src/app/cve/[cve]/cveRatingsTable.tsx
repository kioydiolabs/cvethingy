import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import "./cveTypes";

import { AdpData, CnaData } from "@/app/cve/[cve]/cveTypes";
import { Badge } from "@/components/ui/badge";
import { TriangleAlert } from "lucide-react";

interface Data {
  cnaData: CnaData;
  adpData: AdpData[];
}

const CveSeverityBadge = (props: { severity: string }) => {
  try {
    const severity = props.severity.toUpperCase();

    switch (severity) {
      case "LOW":
        return <Badge className="bg-green-600 text-white">LOW</Badge>;
      case "MEDIUM":
        return <Badge className="bg-blue-600 text-white">MEDIUM</Badge>;
      case "HIGH":
        return <Badge className="bg-orange-400 text-white">HIGH</Badge>;
      case "CRITICAL":
        return <Badge className="bg-red-600 text-white">CRITICAL</Badge>;
    }
  } catch {
    return <Badge>Unknown</Badge>;
  }
};

const CveRatingsTable = (props: { data: Data }) => {
  const hasNonEmptyMetrics = props.data.adpData.some(
    (item: AdpData) => Array.isArray(item.metrics) && item.metrics.length > 0,
  );

  if (
    (props.data.cnaData.metrics?.length == 0 || !props.data.cnaData.metrics) &&
    !hasNonEmptyMetrics
  ) {
    return (
      <div className="w-full flex flex-col items-center justify-center gap-2 text-lg">
        <TriangleAlert /> This CVE has not been rated.
      </div>
    );
  } else {
    return (
      <Table className="text-wrap">
        <TableHeader>
          <TableRow>
            <TableHead>From</TableHead>
            <TableHead>Score</TableHead>
            <TableHead>Severity</TableHead>
            <TableHead>Version</TableHead>
            <TableHead>Vector String</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-wrap">
          {props.data.cnaData.metrics?.map((rating, id) => (
            <TableRow key={id}>
              <TableCell>
                The CNA (&quot;{props.data.cnaData.providerMetadata.shortName}
                &quot;)
              </TableCell>
              <TableCell key="base-score">
                {rating.cvssV3_1?.baseScore}
              </TableCell>
              <TableCell key="base-severity">
                <CveSeverityBadge severity={rating.cvssV3_1?.baseSeverity} />
              </TableCell>
              <TableCell key="version">{rating.cvssV3_1?.version}</TableCell>
              <TableCell key="vector-string">
                {rating.cvssV3_1?.vectorString}
              </TableCell>
            </TableRow>
          ))}
          {props.data.adpData?.map((adp) =>
            adp.metrics
              ?.filter((val) => !val.hasOwnProperty("other"))
              .map((rating, id) => (
                <TableRow key={id}>
                  <TableCell>An ADP (&quot;{adp.title}&quot;)</TableCell>
                  <TableCell key="base-score">
                    {rating.cvssV3_1?.baseScore}
                  </TableCell>
                  <TableCell key="base-severity">
                    <CveSeverityBadge
                      severity={
                        rating.cvssV3_1?.baseSeverity
                          ? rating.cvssV3_1?.baseSeverity
                          : "-"
                      }
                    />
                  </TableCell>
                  <TableCell key="version">
                    {rating.cvssV3_1?.version}
                  </TableCell>
                  <TableCell key="vector-string">
                    {rating.cvssV3_1?.vectorString}
                  </TableCell>
                </TableRow>
              )),
          )}
        </TableBody>
      </Table>
    );
  }
};

export default CveRatingsTable;
