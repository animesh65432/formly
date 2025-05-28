import React, { useState } from "react";
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
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../../../ui/popover"
import ForSmallScreen from "../../Edit/ForSmallScreen";
import { useFormBuilderStore } from "../../../../store/frombuilder";

type Props = {
    block: FormBlock;
    form: any;
};

const DropdownBlock: React.FC<Props> = ({ block, form }) => {
    const { removeBlock, setSelectElementId } = useFormBuilderStore();
    const [selectedIdforsmallscreen, SetselectedIdforsmallscreen] = useState<string | null>(null)
    const [isclickedSmallScreen, SetisClickedSmallScreen] = useState<boolean>(false)

    const handleClick = (id: string) => {
        setSelectElementId(id);
        SetselectedIdforsmallscreen(id)
    };

    const options = block?.options || []
    return (
        <div >
            <FormField
                control={form.control}
                name={block.id}
                render={({ field }) => (
                    <FormItem className="w-[60vw] lg:w-[30vw] m-auto" onClick={() => handleClick(block.id)}>
                        <FormLabel className="text-green-800 font-semibold text-sm lg:text-xl">
                            {block?.label}
                        </FormLabel>
                        <FormControl>
                            <div className="flex justify-between items-center">
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger className="border-2 border-grey-100 text-green-800 bg-white w-full rounded-md">
                                        <SelectValue
                                            placeholder={block?.placeholder}
                                            className="text-sm lg:text-xl"
                                        />
                                    </SelectTrigger>
                                    <SelectContent className="border border-green-800 bg-white text-green-800 z-50">
                                        {options.map((option: any, index: number) => (
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
                                <div className="flex gap-2">
                                    <Icons.delete
                                        className="text-red-800 h-5 w-5 sm:h-8 sm:w-8 ml-2"
                                        onClick={() => removeBlock(block.id)}
                                    />
                                    <Popover open={isclickedSmallScreen} >
                                        <PopoverTrigger asChild>
                                            {!isclickedSmallScreen ? <Icons.edit className='lg:hidden block  h-5 w-5 sm:h-8 sm:w-8 text-green-800' onClick={() => SetisClickedSmallScreen(true)} /> : <Icons.close className='lg:hidden block text-red-800  h-5 w-5 sm:h-8 sm:w-8' onClick={() => SetisClickedSmallScreen(false)} />}
                                        </PopoverTrigger>
                                        <PopoverContent className='lg:hidden block mt-6 sm:mr-[26vw] md:mr-[30vw] mr-[25vw]'>
                                            <ForSmallScreen selectElementId={selectedIdforsmallscreen} />
                                        </PopoverContent>
                                    </Popover>
                                </div>
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
