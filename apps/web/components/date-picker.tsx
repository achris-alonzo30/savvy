
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { SelectSingleEventHandler } from "react-day-picker";

import { Calendar as CalendarIcon } from "lucide-react";

import { 
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "./ui/popover";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";

type DatePickerProps = {
    value?: Date;
    onChange?: SelectSingleEventHandler;
    disabled?: boolean;
}

export const DatePicker = ({
    value,
    onChange,
    disabled
}: DatePickerProps) => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    disabled={disabled}
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", !value && "text-muted-foreground")}
                >
                    <CalendarIcon className="size-4 mr-2" />
                    {value ? format(value, "PPP") : "Select date"}
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <Calendar 
                    initialFocus
                    mode="single"
                    selected={value}
                    onSelect={onChange}
                    disabled={disabled}
                />
            </PopoverContent>
        </Popover>
    )
}