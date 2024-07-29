
import { useState } from "react";
import {
    Card,
    CardTitle,
    CardHeader,
    CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const dateFormat = "yyyy-MM-dd HH:mm:ss";
const outputFormat = "yyyy-MM-dd";

interface SelectedColumnStte {
    [key: string]: string | null;
}

type TransactionImportCardProps = {
    data: string[][];
    onCancel: () => void;
    onSubmit: (data: any) => void;
}
export const TransactionImportCard = ({
    data,
    onCancel,
    onSubmit
} : TransactionImportCardProps ) => {
    const [selectedColumn, setSelectedColumn] = useState<SelectedColumnStte>({});

    const headers = data[0];
    const body = data.slice(1);


    return (
        <Card className="border-none drop-shadow-sm">
                <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
                    <CardTitle className="text-xl line-clamp-1">
                        Import Transactions
                    </CardTitle>
                    <Button
                        size="sm"
                        onClick={onCancel}
                    >
                        Cancel
                    </Button>
                </CardHeader>
                <CardContent>
                    <ImportTable 
                        body={body}
                        headers={headers}
                        selectedColumn={selectedColumn}
                        onTableHeadSelectChange={() => {}}
                    />
                </CardContent>
        </Card>
    )
}