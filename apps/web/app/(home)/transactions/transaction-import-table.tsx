import { 
    Table,
    TableRow,
    TableCell,
    TableBody,
    TableHead,
    TableHeader,
} from "@/components/ui/table";
import { TableHeadSelect } from "./table-head-select";


type TransactionImportTableProps = {
    body: string[][],
    headers: string[],
    selectedColumn: Record<string, string | null>,
    onTableHeadSelectChange: (columnIndex: number, value: string | null) => void
}

export const TransactionImportTable = ({
    body,
    headers,
    selectedColumn,
    onTableHeadSelectChange
} : TransactionImportTableProps ) => {
    return (
        <section className="rounded-md border overfow-hidden">
            <Table>
                <TableHeader>
                    <TableRow className="bg-muted">
                        {headers.map((header, index) => (
                            <TableHead
                                key={index}
                                className="cursor-pointer"
                                onPointerDown={() => onTableHeadSelectChange(index, null)}
                            >
                                <TableHeadSelect
                                    columnIndex={index}
                                    selectedColumn={selectedColumn}
                                    onChange={onTableHeadSelectChange}
                                />
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {body.map((row: string[], rowIndex) => (
                        <TableRow key={rowIndex}>
                            {row.map((cell, cellIndex) => (
                                <TableCell
                                    key={cellIndex}
                                    className="cursor-pointer"
                                    onPointerDown={() => onTableHeadSelectChange(cellIndex, cell)}
                                >
                                    {cell}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </section>
    )
}