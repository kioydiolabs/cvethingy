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
            <TableCell>
              {product.versions.map((version, id) => (
                <li key={id}>
                  From {version.version} until before {version.lessThan} (
                  {version.status})
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
