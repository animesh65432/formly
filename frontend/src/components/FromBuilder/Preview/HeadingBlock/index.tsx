import React, { useState } from 'react';
import { FormItem, FormField, FormLabel } from '../../../ui/form';
import type { FormBlock } from "../../../../types";
import Icons from '../../../Icons';
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

const HeadingBlock: React.FC<Props> = ({ block, setSelectElementId, form }) => {
    const { removeBlock } = useFormBuilderStore();
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
                <FormItem className="w-[60vw] lg:w-[30vw] m-auto flex justify-around" onClick={() => handleClick(block.id)} >
                    <FormLabel className="text-green-800 font-semibold mb-1 md:text-3xl text-xl lg:text-3xl">
                        {block?.label || "Heading"}
                    </FormLabel>
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
                </FormItem >
            )}
        />)
};

export default HeadingBlock;
