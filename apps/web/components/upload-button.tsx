import { Upload } from "lucide-react";
import { useCSVReader } from "react-papaparse";

import { Button } from "./ui/button";

export const UploadButton = ({
    onUpload
} : { onUpload: (results: any) => void }) => {
    const { CSVReader} = useCSVReader();

    // TODO: Add a paywall

    return (
        <CSVReader>
            {({getRootProps}: any) => (
                <Button
                    size="sm"
                    className="w-full lg:w-auto"
                    {...getRootProps()}
                >
                    <Upload className="size-4 mr-2" />
                    Import
                </Button>
            )}
        </CSVReader>
    )
}