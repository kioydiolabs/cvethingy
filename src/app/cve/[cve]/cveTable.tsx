import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface CveTableProps {
  id?: string;
  name?: string;
  description?: string;
  rating?: number;
}

const CveTable = (props: { data: CveTableProps }) => {
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
          <TableCell>{props.data.name || "-"}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="w-[200px]">Rating</TableCell>
          <TableCell>{props.data.rating}</TableCell>
        </TableRow>
        <TableRow className="text-wrap">
          <TableCell className="w-[200px]">Description</TableCell>
          <TableCell className="text-wrap whitespace-normal">
            {props.data.description}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default CveTable;
