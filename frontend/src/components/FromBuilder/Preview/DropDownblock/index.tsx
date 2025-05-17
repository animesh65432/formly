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
import Icons from "../../../Icons";
import { useFormBuilderStore } from "../../../../store/frombuilder";

type Props = {
    block: FormBlock;
    setSelectElementId: React.Dispatch<React.SetStateAction<string | null>>;
    form: any;
};

const DropdownBlock: React.FC<Props> = ({ block, form, setSelectElementId }) => {
    const { removeBlock } = useFormBuilderStore()
    return (
        <FormField
            control={form.control}
            name={block.id}
            render={({ field }) => (
                <FormItem onClick={() => setSelectElementId(block.id)} className="space-y-2">
                    <FormLabel className="text-green-800 font-semibold text-sm md:text-lg">
                        {block.props?.label}
                    </FormLabel>
                    <FormControl>
                        <Select onValueChange={field.onChange} value={field.value}>
                            <div className="flex justify-between items-center">
                                <SelectTrigger className="border-2 border-grey-100 text-green-800 bg-white md:text-lg text-sm w-full rounded-md">
                                    <SelectValue placeholder={block.props?.placeholder} />
                                </SelectTrigger>
                                <div>
                                    <SelectContent className="border border-green-800 bg-white text-green-800 z-50">
                                        {block.props?.options?.map((option: any, index: number) => (
                                            <SelectItem key={index} value={option.value}>
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </div>
                                <div>
                                    <Icons.delete className="text-red-800" onClick={() => removeBlock(block.id)} />
                                </div>
                            </div>
                        </Select>
                    </FormControl>
                    <FormMessage />

                </FormItem>
            )}
        />
    );
};

export default DropdownBlock;
