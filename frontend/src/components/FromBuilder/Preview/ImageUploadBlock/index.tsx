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
    setSelectElementId: React.Dispatch<React.SetStateAction<string | null>>;
    form: any;
};

const ImageUploadBlock: React.FC<Props> = ({ block, form, setSelectElementId }) => {
    const [selectedIdforsmallscreen, SetselectedIdforsmallscreen] = useState<string | null>(null)
    const [isclickedSmallScreen, SetisClickedSmallScreen] = useState<boolean>(false)
    const { removeBlock } = useFormBuilderStore();

    const handleClick = (blockId: string) => {
        SetselectedIdforsmallscreen(blockId)
        setSelectElementId(blockId);
    };
    return (
        <FormField
            control={form.control}
            name={block.id}
            render={({ field }) => (
                <FormItem className="w-[60vw] lg:w-[30vw] m-auto" onClick={() => handleClick(block.id)}>
                    <FormLabel className="text-sm lg:text-xl font-semibold text-green-800">
                        {block.props?.label || "Upload Image"}
                    </FormLabel>
                    <FormControl>
                        <div className="flex justify-between items-center">
                            <div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            const reader = new FileReader();
                                            reader.onloadend = () => field.onChange(reader.result);
                                            reader.readAsDataURL(file);
                                        }
                                    }}
                                    className="block w-[53vw] lg:w-[29vw] bg-white p-2 text-sm lg:text-xl text-green-800 rounded-md shadow-md placeholder:text-sm lg:placeholder:text-xl file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-green-800 file:text-white hover:file:bg-green-700 cursor-pointer"

                                />
                            </div>
                            <div className="flex gap-2">
                                <Icons.delete className="text-red-800 font-semibold h-5 w-5 sm:h-7 sm:w-7" onClick={() => removeBlock(block.id)} />
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
    );
};

export default ImageUploadBlock;
