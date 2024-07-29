
import { cn } from "@/lib/utils";
import CurrencyInput from "react-currency-input-field";
import { Info, MinusCircle, PlusCircle } from "lucide-react";

import {
    Tooltip,
    TooltipTrigger,
    TooltipContent,
    TooltipProvider,
} from "./ui/tooltip";

type AmountInputProps = {
    value: string;
    disabled?: boolean;
    placeholder?: string;
    onChange: (value: string | undefined) => void;
}

export const AmountInput = ({
    value,
    disabled,
    placeholder,
    onChange
}: AmountInputProps) => {
    const parsedValue = parseFloat(value);
    const isIncome = parsedValue > 0;
    const isExpense = parsedValue < 0;

    const onReverse = () => {
        if (!value) return;
        const newValue = parseFloat(value) * -1;
        onChange(newValue.toString());
    }
    
    return (
        <section className="relative">
            <TooltipProvider>
                <Tooltip delayDuration={100}>
                    <TooltipTrigger asChild>
                        <button
                            type="button"
                            onClick={onReverse}
                            className={cn("bg-slate-400 hover:bg-slate-500 absolute top-1.5 left-1.5 rounded-md p-2 flex items-center justify-center transition",
                                isIncome && "bg-emerald-500 hover:bg-emerald-600",
                                isExpense && "bg-rose-500 hover:bg-rose-600"
                            )}
                        >
                            {!parsedValue && <Info className="size-3 text-zinc-50" />}
                            {isIncome && <PlusCircle className="size-3 text-zinc-50" />}
                            {isExpense && <MinusCircle className="size-3 text-zinc-50" />}
                        </button>
                    </TooltipTrigger>
                    <TooltipContent>
                        Use the [+/-] button to reverse the amount
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <CurrencyInput
                prefix="$"
                className="flex h-10 w-full pl-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder={placeholder}
                value={value}
                decimalScale={2}
                decimalsLimit={2}
                disabled={disabled}
                onValueChange={onChange}
            />
            <p className="text-xs text-muted-foreground mt-2">
                {isIncome && "This is an income"}
                {isExpense && "This is an expense"}
            </p>
        </section>
    )
}