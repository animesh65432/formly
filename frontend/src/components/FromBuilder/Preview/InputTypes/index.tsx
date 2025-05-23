import React from 'react'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../../ui/form';
import { Input } from '../../../ui/input';
import type { FormBlock } from "../../../../types"
import Icons from '../../../Icons';
import { useFormBuilderStore } from '../../../../store/frombuilder';

type Props = {
    block: FormBlock;
    form: any;
    setSelectElementId: React.Dispatch<React.SetStateAction<string | null>>
}

const RenderField: React.FC<Props> = ({ block, form, setSelectElementId }) => {
    const { removeBlock } = useFormBuilderStore()
    const handleClick = (blockId: string) => {
        console.log(blockId)
        setSelectElementId(blockId);
    };
    return (

        <FormField
            control={form.control}
            name={block.id}
            render={({ field }) => (
                <FormItem className='w-[60vw] lg:w-[30vw] m-auto'>
                    <FormLabel className="text-green-800 font-semibold md:text-xl text-sm">
                        {block.props?.label}
                    </FormLabel>
                    <FormControl>
                        <div className='flex gap-2 items-center'>
                            <Input
                                onClick={() => handleClick(block.id)}
                                placeholder={block.props?.placeholder || ""}
                                {...field}
                                className="bg-white text-green-800 p-2 placeholder:text-green-800 placeholder:text-sm lg:placeholder:text-xl"
                            />
                            <Icons.delete className='text-red-800 h-5 w-5 sm:h-8 sm:w-8' onClick={() => removeBlock(block.id)} />
                        </div>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />


    );
};

export default RenderField