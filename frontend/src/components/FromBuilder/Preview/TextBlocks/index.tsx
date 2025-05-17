import React from 'react'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../../ui/form';
import type { FormBlock } from "../../../../types"
import Icons from '../../../Icons';
import { useFormBuilderStore } from '../../../../store/frombuilder';
import { Textarea } from "../../../ui/textarea"
type Props = {
    block: FormBlock;
    form: any;
    setSelectElementId: React.Dispatch<React.SetStateAction<string | null>>
}

const TextBolck: React.FC<Props> = ({ setSelectElementId, block, form }) => {
    const { removeBlock } = useFormBuilderStore()
    const handleClick = (blockId: string) => {
        setSelectElementId(blockId);
    };

    return (
        <FormField
            control={form.control}
            name={block.id}
            render={({ field }) => (
                <FormItem >
                    <FormLabel className="text-green-800 font-semibold md:text-xl text-sm">
                        {block.props?.label}
                    </FormLabel>
                    <FormControl>
                        <div className='flex gap-2 items-center'>
                            <Textarea
                                onClick={() => handleClick(block.id)}
                                placeholder={block.props?.placeholder || ""}
                                {...field}
                                className="text-green-800 placeholder:text-green-800 "
                            />
                            <Icons.delete className='text-red-800' onClick={() => removeBlock(block.id)} />
                        </div>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

export default TextBolck