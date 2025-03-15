import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Description,
  ProblemType,
  ProviderMetadata,
  Reference,
} from "@/app/cve/[cve]/cveTypes";

interface Data {
  providerMetadata: ProviderMetadata;
  problemTypes: ProblemType[];
  descriptions: Description[];
  references: Reference[];
}

const CveInfoTable = (props: { data: Data }) => {
  return (
    <Table className="text-wrap">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px]">Attribute</TableHead>
          <TableHead>Value</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="text-wrap">
        {/*<TableRow>*/}
        {/*  <TableCell className="w-[200px]">ID</TableCell>*/}
        {/*  <TableCell>{props.data.id}</TableCell>*/}
        {/*</TableRow>*/}
        <TableRow>
          <TableCell className="w-[200px]">Name</TableCell>
          <TableCell>-</TableCell>
        </TableRow>
        <TableRow className="text-wrap">
          <TableCell className="w-[200px]">Description</TableCell>
          <TableCell className="text-wrap whitespace-normal flex flex-col gap-4">
            {props.data.descriptions.map((item, id) => (
              <p key={id}>
                <strong>{item.lang}</strong>: {item.value}
              </p>
            ))}
          </TableCell>
        </TableRow>
        <TableRow className="text-wrap">
          <TableCell className="w-[200px]">References</TableCell>
          <TableCell className="text-wrap whitespace-normal">
            {props.data.references.map((reference, id) => (
              <li key={id}>
                <a
                  target="_blank"
                  href={reference.url}
                  className="referenceUrl"
                >
                  {reference.url}
                </a>
              </li>
            ))}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default CveInfoTable;
