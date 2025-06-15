import React, { useState } from 'react';
import { FormItem, FormField, FormLabel } from '../../ui/form';
import type { FormBlock } from "../../../types";
import Icons from '../../Icons';
import { useFormBuilderStore } from "../../../store/frombuilder";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../../ui/popover"
import ForSmallScreen from "../../FromBuilder/Edit/ForSmallScreen";

type Props = {
    block: FormBlock;
    form: any;
    isTemplates: boolean
};

const HeadingBlock: React.FC<Props> = ({ block, form, isTemplates }) => {
    const { removeBlock, setSelectElementId } = useFormBuilderStore();
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
            render={() => (
                <FormItem className={` m-auto flex ${isTemplates ? "m-auto w-[20vw] lg:w-[30vw]" : "justify-around w-[60vw] lg:w-[30vw]"} `} onClick={() => handleClick(block.id)} >
                    <FormLabel className={`text-green-800 font-semibold mb-1  text-center ${isTemplates ? "text-sm  md:text-xl xl:text-2xl flex" : "md:text-3xl text-xl lg:text-3xl"}`}>
                        {block?.label || "Heading"}
                    </FormLabel>
                    {!isTemplates &&
                        <div className='flex gap-2'>
                            <Icons.delete className="text-red-800 w-5 h-5 sm:w-6 sm:h-6" onClick={() => removeBlock(block.id)} />
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
                </FormItem >
            )}
        />)
};

export default HeadingBlock;
