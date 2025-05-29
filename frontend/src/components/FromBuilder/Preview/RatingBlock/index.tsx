import React, { useState } from "react";
import { Star } from "lucide-react";
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
    isTemplates: boolean
};

const RatingBlock: React.FC<Props> = ({ block, form, isTemplates }) => {
    const { removeBlock, setSelectElementId } = useFormBuilderStore()
    const [selectedIdforsmallscreen, SetselectedIdforsmallscreen] = useState<string | null>(null)
    const [isclickedSmallScreen, SetisClickedSmallScreen] = useState<boolean>(false)
    const handleClick = (id: string) => {
        setSelectElementId(id);
        SetselectedIdforsmallscreen(id)
    };
    return (
        <div>
            <FormField
                control={form.control}
                name={block.id}
                render={({ field }) => (
                    <FormItem className="m-auto w-[60vw] lg:w-[30vw]" onClick={() => handleClick(block.id)}>
                        <FormLabel className="text-green-800 font-semibold md:text-xl text-sm">
                            {block?.label || "Rating"}
                        </FormLabel>
                        <FormControl>
                            <div className="flex items-center gap-2 w-[100%]  justify-between">
                                <div className="w-[60%] flex items-center gap-2">
                                    {[1, 2, 3, 4, 5].map((val) => (
                                        <Star
                                            key={val}
                                            onClick={() => {
                                                field.onChange(val);
                                            }}
                                            className={`sm:w-6 sm:h-6 w-5 h-5 cursor-pointer transition ${field.value >= val
                                                ? "fill-yellow-400 text-yellow-500"
                                                : "text-gray-400"
                                                }`}
                                        />
                                    ))}
                                </div>
                                {!isTemplates &&
                                    <div className="flex gap-2">
                                        <Icons.delete className="text-red-900 h-5 w-5 sm:h-8 sm:w-8" onClick={() => removeBlock(block.id)} />
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
        </div>
    );
};

export default RatingBlock;
