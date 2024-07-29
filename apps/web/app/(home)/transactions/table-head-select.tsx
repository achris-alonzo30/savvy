
import { cn } from "@/lib/utils";
import {
    Select,
    SelectItem,
    SelectValue,
    SelectContent,
    SelectTrigger,
} from "@/components/ui/select";

type TableHeadSelectProps = {
    columnIndex: number,
    selectedColumn: Record<string, string | null>,
    onChange: (columnIndex: number, value: string | null) => void
}

const options = [
    "amount", "date", "payee"
]

export const TableHeadSelect = ({
    columnIndex,
    selectedColumn,
    onChange
}: TableHeadSelectProps) => {
    const currentSelected = selectedColumn[`column_${columnIndex}`];

    return (
        <Select
            value={currentSelected || ""}
            onValueChange={(value) => onChange(columnIndex, value)}
        >
            <SelectTrigger
                className={cn("focus:ring-offset-0 focus:ring-transparent outline-none border-none bg-transparent capitalize", currentSelected && "text-teal-500")}
            >
                <SelectValue placeholder="Skip" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="Skip">Skip</SelectItem>
                {options.map((o, i) => {
                    const disabled = Object.values(selectedColumn).includes(o) && selectedColumn[`column_${columnIndex}`] !== o;
                    return (
                        <SelectItem
                            key={i}
                            value={o}
                            disabled={disabled}
                        >
                            {o}
                        </SelectItem>
                    )

                })}
            </SelectContent>
        </Select>
    )
}