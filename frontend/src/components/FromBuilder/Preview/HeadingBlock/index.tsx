import React from 'react';
import { FormItem, FormField } from '../../../ui/form';
import type { FormBlock } from "../../../../types";
import Icons from '../../../Icons';
import { useFormBuilderStore } from "../../../../store/frombuilder";

type Props = {
    block: FormBlock;
    setSelectElementId: React.Dispatch<React.SetStateAction<string | null>>;
    form: any;
};

const HeadingBlock: React.FC<Props> = ({ block, setSelectElementId, form }) => {
    const { removeBlock } = useFormBuilderStore();
    const handleClick = () => {
        setSelectElementId(block.id);
    };

    return (
        <FormField
            control={form.control}
            name={block.id}
            render={() => (
                <FormItem onClick={handleClick} className="cursor-pointer flex justify-between">
                    <h2 className="text-green-900 font-bold text-2xl">
                        {block.props?.label || "Heading Title"}
                    </h2>
                    <Icons.delete className='text-red-800' onClick={() => removeBlock(block.id)} />
                </FormItem>
            )}
        />)
};

export default HeadingBlock;
