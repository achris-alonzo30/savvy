"use client";

import { useMemo } from "react";
import { SingleValue } from "react-select";
import CreatableSelect from "react-select/creatable";

type SelectProps = {
    onChange: (value?: string) => void;
    onCreate?: (value: string) => void;
    options?: { label: string, value: string }[];
    value?: string | null | undefined;
    disabled?: boolean;
    placeholder?: string;
}

export const Select = ({
    onChange,
    onCreate,
    options,
    value,
    disabled,
    placeholder
} : SelectProps) => {
    const onSelect = (option: SingleValue<{label: string, value: string}>) => {
        onChange(option?.value)
    };

    const formattedValue = useMemo(() => {
        return options?.find(option => option.value === value); 
    }, [options, value]);


    return (
        <CreatableSelect 
            placeholder={placeholder}
            className="text-sm h-10"
            styles= {{
                control: (base) => ({
                    ...base,
                    borderColor: "#e2e8fo",
                    "&:hover": {
                        borderColor: "#e2e8fo",
                    },
                    "&:focus": {
                        borderColor: "#e2e8fo",
                    },
                })
            }}
            value={formattedValue}
            onChange={onSelect}
            options={options}
            onCreateOption={onCreate}
            isDisabled={disabled}
        />
    )
}