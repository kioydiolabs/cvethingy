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

interface Data {
  cnaData: CnaData;
  adpData: AdpData[];
}

const CveRatingsTable = (props: { data: Data }) => {
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
              The CNA ("{props.data.cnaData.providerMetadata.shortName}")
            </TableCell>
            <TableCell key="base-score">{rating.cvssV3_1?.baseScore}</TableCell>
            <TableCell key="base-severity">
              {rating.cvssV3_1?.baseSeverity}
            </TableCell>
            <TableCell key="version">{rating.cvssV3_1?.version}</TableCell>
            <TableCell key="vector-string">
              {rating.cvssV3_1?.vectorString}
            </TableCell>
          </TableRow>
        ))}
        {props.data.adpData.map((adp) =>
          adp.metrics
            .filter((val) => !val.hasOwnProperty("other"))
            .map((rating, id) => (
              <TableRow key={id}>
                <TableCell>An ADP ("{adp.title}")</TableCell>
                <TableCell key="base-score">
                  {rating.cvssV3_1?.baseScore}
                </TableCell>
                <TableCell key="base-severity">
                  {rating.cvssV3_1?.baseSeverity}
                </TableCell>
                <TableCell key="version">{rating.cvssV3_1?.version}</TableCell>
                <TableCell key="vector-string">
                  {rating.cvssV3_1?.vectorString}
                </TableCell>
              </TableRow>
            )),
        )}
      </TableBody>
    </Table>
  );
};

export default CveRatingsTable;
