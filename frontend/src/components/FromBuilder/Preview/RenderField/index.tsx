import React from 'react'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../../../ui/form';
import { Input } from '../../../ui/input';

const RenderField: React.FC<{
    block: any;
    form: any;
    setSelectElementId: React.Dispatch<React.SetStateAction<string | null>>
}> = ({ block, form, setSelectElementId }) => {
    console.log(block)
    const handleClick = (blockId: string) => {
        console.log(blockId)
        setSelectElementId(blockId);
    };
    return (
        <FormField
            control={form.control}
            name={block.id}
            render={({ field }) => (
                <FormItem onClick={() => handleClick(block.id)}>
                    <FormLabel className="text-green-800 font-semibold">
                        {block.props?.label}
                    </FormLabel>
                    <FormControl>
                        <Input
                            placeholder={block.props?.placeholder || ""}
                            {...field}
                            className="text-green-800 placeholder:text-green-800 "
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default RenderField