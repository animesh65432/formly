import React from 'react';
import { FormItem, FormField, FormLabel, FormControl } from '../../../ui/form';
import type { FormBlock } from "../../../../types";
import Icons from '../../../Icons';
import { useFormBuilderStore } from "../../../../store/frombuilder";
import { Input } from '../../../ui/input';

type Props = {
    block: FormBlock;
    setSelectElementId: React.Dispatch<React.SetStateAction<string | null>>;
    form: any;
};

const HeadingBlock: React.FC<Props> = ({ block, setSelectElementId, form }) => {
    const { removeBlock } = useFormBuilderStore();
    const handleClick = (id: string) => {
        setSelectElementId(id);
    };

    return (
        <FormField
            control={form.control}
            name={block.id}
            render={({ field }) => (
                <FormItem className="w-[30vw] m-auto">
                    <FormLabel className="text-green-800 font-semibold mb-1 md:text-xl text-sm">
                        {block.props?.label}
                    </FormLabel>
                    <FormControl>
                        <div className='flex gap-2 items-center'>
                            <Input
                                onClick={() => handleClick(block.id)}
                                placeholder={block.props?.placeholder || ""}
                                {...field}
                                className="bg-white text-green-800 placeholder:text-green-800 placeholder:text-xl"
                            />
                            <Icons.delete className='text-red-800' onClick={() => removeBlock(block.id)} />
                        </div>
                    </FormControl>
                </FormItem>
            )}
        />)
};

export default HeadingBlock;
