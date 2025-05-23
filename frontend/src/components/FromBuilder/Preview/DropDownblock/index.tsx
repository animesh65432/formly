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
    const { removeBlock } = useFormBuilderStore();
    console.log(block.props?.options)
    return (
        <div onClick={() => setSelectElementId(block.id)}>
            <FormField
                control={form.control}
                name={block.id}
                render={({ field }) => (
                    <FormItem className="w-[60vw] lg:w-[30vw] m-auto">
                        <FormLabel className="text-green-800 font-semibold text-sm lg:text-xl">
                            {block.props?.label}
                        </FormLabel>
                        <FormControl>
                            <div className="flex justify-between items-center">
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger className="border-2 border-grey-100 text-green-800 bg-white w-full rounded-md">
                                        <SelectValue
                                            placeholder={block.props?.placeholder}
                                            className="text-sm lg:text-xl"
                                        />
                                    </SelectTrigger>
                                    <SelectContent className="border border-green-800 bg-white text-green-800 z-50">
                                        {block.props?.options?.map((option: any, index: number) => (
                                            <SelectItem
                                                key={index}
                                                value={option}
                                                className="text-sm lg:text-xl"
                                            >
                                                {option}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <Icons.delete
                                    className="text-red-800 h-5 w-5 sm:h-8 sm:w-8 ml-2"
                                    onClick={() => removeBlock(block.id)}
                                />
                            </div>
                        </FormControl>
                        <div className="text-sm lg:text-xl">
                            <FormMessage />
                        </div>
                    </FormItem>
                )}
            />
        </div>
    );
};

export default DropdownBlock;
