import React, { useState } from 'react';
import { FormItem, FormLabel, FormField, FormControl, FormMessage } from '../../../ui/form';
import type { FormBlock } from "../../../../types";
import Icons from '../../../Icons';
import { useFormBuilderStore } from '../../../../store/frombuilder';
import { Input } from '../../../ui/input';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../../../ui/popover"
import ForSmallScreen from '../../Edit/ForSmallScreen';


type Props = {
    block: FormBlock;
    form: any;
    setSelectElementId: React.Dispatch<React.SetStateAction<string | null>>;
};

const ParagraphBlock: React.FC<Props> = ({ block, setSelectElementId, form }) => {
    const { removeBlock } = useFormBuilderStore()
    const [selectedIdforsmallscreen, SetselectedIdforsmallscreen] = useState<string | null>(null)
    const [isclickedSmallScreen, SetisClickedSmallScreen] = useState<boolean>(false)
    const handleClick = (id: string) => {
        setSelectElementId(id);
        console.log(id)
        SetselectedIdforsmallscreen(id)
    };

    console.log(selectedIdforsmallscreen)
    return (
        <FormField
            control={form.control}
            name={block.id}
            render={(field) => (
                <FormItem className="w-[60vw] lg:w-[30vw] m-auto" onClick={() => handleClick(block.id)}>
                    <FormLabel className="text-green-800 font-semibold mb-1 md:text-xl text-sm">
                        {block.props?.label}
                    </FormLabel>
                    <FormControl>
                        <div className='flex gap-2 items-center'>
                            <Input
                                placeholder={block.props?.placeholder || ""}
                                {...field}
                                className="bg-white text-green-800 placeholder:text-green-800 placeholder:text-sm lg:placeholder:text-xl"
                            />
                            <Icons.delete className='text-red-800 h-5 w-5 sm:h-8 sm:w-8' onClick={() => removeBlock(block.id)} />
                            <Popover open={isclickedSmallScreen} >
                                <PopoverTrigger asChild>
                                    {!isclickedSmallScreen ? <Icons.edit className='lg:hidden block  h-5 w-5 sm:h-8 sm:w-8 text-green-800' onClick={() => SetisClickedSmallScreen(true)} /> : <Icons.close className='lg:hidden block text-red-800  h-5 w-5 sm:h-8 sm:w-8' onClick={() => SetisClickedSmallScreen(false)} />}
                                </PopoverTrigger>
                                <PopoverContent className='lg:hidden block mt-6 sm:mr-[26vw] md:mr-[30vw] mr-[25vw]'>
                                    <ForSmallScreen selectElementId={selectedIdforsmallscreen} />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />

    );
};

export default ParagraphBlock;
