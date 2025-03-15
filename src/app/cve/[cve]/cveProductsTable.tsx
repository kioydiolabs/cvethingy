import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import "./cveTypes";

import { AffectedProduct } from "@/app/cve/[cve]/cveTypes";

const CveProductsTable = (props: { data: AffectedProduct[] }) => {
  return (
    <Table className="text-wrap">
      <TableHeader>
        <TableRow>
          <TableHead>Vendor</TableHead>
          <TableHead>Product</TableHead>
          <TableHead>Versions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="text-wrap">
        {props.data.map((product, id) => (
          <TableRow key={id}>
            <TableCell>{product.vendor}</TableCell>
            <TableCell>{product.product}</TableCell>
            <TableCell className="flex flex-col gap-2">
              {product.versions.map((version, id) => (
                <li key={id} className="text-wrap">
                  From <strong>{version.version}</strong> until before{" "}
                  <strong>
                    {version.lessThan ? version.lessThan : "[not provided]"}
                  </strong>{" "}
                  ({version.status}){" "}
                  {version.versionType == "git"
                    ? "(Version numbers are git commit hashes)"
                    : ""}
                </li>
              ))}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CveProductsTable;
