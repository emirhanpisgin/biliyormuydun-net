"use client";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import React from "react";

interface MultipleInputProps extends React.HTMLAttributes<HTMLDivElement> {
    inputProps?: React.ComponentProps<typeof Input>;
    inputs: string[];
    setInputs: React.Dispatch<React.SetStateAction<string[]>>;
    emptyDescription?: string;
}

export default function MultipleInput({ className, inputProps: { className: inputClassName, ...inputProps } = {}, inputs, setInputs, emptyDescription = "Hiçbir veri girilmedi. Eklemek için \"Enter\" tuşuna basın.", ...props }: MultipleInputProps) {

    function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Enter") {
            event.preventDefault();
            event.stopPropagation();
            const value = event.currentTarget.value;
            if (value) {
                setInputs([...inputs, value]);
                event.currentTarget.value = "";
            }
        }
    }

    return (
        <div {...props} className={cn("flex flex-col gap-2", className)}>
            <Input {...inputProps} className={cn("", inputClassName)} onKeyDown={(event) => handleKeyDown(event)} />
            {inputs.length === 0 && <div className="text-muted-foreground text-sm">{emptyDescription}</div>}
            <div className="flex flex-wrap gap-2 w-full">
                {inputs.map((input, index) => (
                    <div key={index} className="flex items-center gap-2 w-min max-w-md text-sm border rounded-full px-2 py-1">
                        <span className="text-muted-foreground w-min line-clamp-1 flex-1">
                            {input}
                        </span>
                        <X className="cursor-pointer size-5" onClick={() => setInputs(inputs.filter((_, i) => i !== index))} />
                    </div>
                ))}
            </div>
        </div>
    );
}
