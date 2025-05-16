import React from "react";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../../../ui/form";
import type { FormBlock } from "../../../../types";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../../ui/select";
type Props = {
    block: FormBlock;
    setSelectElementId: React.Dispatch<React.SetStateAction<string | null>>;
    form: any;
};

const DropdownBlock: React.FC<Props> = ({ block, form, setSelectElementId }) => {
    return (
        <FormField
            control={form.control}
            name={block.id}
            render={({ field }) => (
                <FormItem onClick={() => setSelectElementId(block.id)}>
                    <FormLabel>{block.props?.label}</FormLabel>
                    <FormControl>
                        <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select option" />
                            </SelectTrigger>
                            <SelectContent>
                                {block.props?.options?.map((option: any, index: number) => (
                                    <SelectItem key={index} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};
export default DropdownBlock;