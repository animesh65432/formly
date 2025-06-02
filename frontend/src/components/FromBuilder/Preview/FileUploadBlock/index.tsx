import React, { useState } from "react";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../../../ui/form";
import type { FormBlock } from "../../../../types";
import Icons from "../../../Icons";
import { useFormBuilderStore } from "../../../../store/frombuilder";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../../../ui/popover"
import ForSmallScreen from "../../Edit/ForSmallScreen";

type Props = {
    block: FormBlock;
    form: any;
    isTemplates: boolean;
    isSharefrom: boolean
};

const FileUploadBlock: React.FC<Props> = ({ block, form, isTemplates, isSharefrom }) => {
    const { removeBlock, setSelectElementId } = useFormBuilderStore()
    const [selectedIdforsmallscreen, SetselectedIdforsmallscreen] = useState<string | null>(null)
    const [isclickedSmallScreen, SetisClickedSmallScreen] = useState<boolean>(false)

    const handleClick = (id: string) => {
        setSelectElementId(id);
        SetselectedIdforsmallscreen(id)
    };

    return (
        <FormField
            control={form.control}
            name={block.id}
            render={({ field }) => (
                <FormItem className={`${isSharefrom
                    ? "w-[80vw] md:w-[30vw] m-auto"
                    : isTemplates
                        ? "w-[30vw] lg:w-[30vw] m-auto"
                        : "w-[60vw] lg:w-[30vw] m-auto"
                    }`} onClick={() => handleClick(block.id)}>
                    <FormLabel className="md:text-xl text-sm text-green-800">

                        {block?.label || "Upload File"}
                    </FormLabel>
                    <FormControl className="flex items-center justify-between">
                        <div className="relative w-[100%] flex gap-2">
                            <input
                                type="file"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        field.onChange(file.name);
                                    }
                                }}

                                className="block w-full bg-white px-3 py-2 text-sm text-green-800 rounded-md border-2 border-gray-100 shadow-md file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-green-800 file:text-white hover:file:bg-green-700 cursor-pointer"
                            />
                            {!isTemplates &&
                                <div className="flex gap-2">
                                    <Icons.delete className="text-red-800 w-5 h-5 sm:w-8 sm:h-8" onClick={() => removeBlock(block.id)} />
                                    <Popover open={isclickedSmallScreen} >
                                        <PopoverTrigger asChild>
                                            {!isclickedSmallScreen ? <Icons.edit className='lg:hidden block  h-5 w-5 sm:h-8 sm:w-8 text-green-800' onClick={() => SetisClickedSmallScreen(true)} /> : <Icons.close className='lg:hidden block text-red-800  h-5 w-5 sm:h-8 sm:w-8' onClick={() => SetisClickedSmallScreen(false)} />}
                                        </PopoverTrigger>
                                        <PopoverContent className='lg:hidden block mt-6 sm:mr-[26vw] md:mr-[30vw] mr-[25vw]'>
                                            <ForSmallScreen selectElementId={selectedIdforsmallscreen} />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            }
                        </div>

                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default FileUploadBlock;
