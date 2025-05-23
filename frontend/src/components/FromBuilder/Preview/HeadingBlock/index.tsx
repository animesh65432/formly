import React from 'react';
import { FormItem, FormField, FormLabel } from '../../../ui/form';
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
    const handleClick = (id: string) => {
        setSelectElementId(id);
    };

    return (
        <FormField
            control={form.control}
            name={block.id}
            render={() => (
                <FormItem className="w-[60vw] lg:w-[30vw] m-auto flex justify-around">
                    <FormLabel onClick={() => handleClick(block.id)} className="text-green-800 font-semibold mb-1 md:text-3xl text-xl lg:text-3xl">
                        {block.props?.label || "Heading"}
                    </FormLabel>
                    <div> <Icons.delete className="text-red-800 w-5 h-5 sm:w-6 sm:h-6" onClick={() => removeBlock(block.id)} /></div>
                </FormItem>
            )}
        />)
};

export default HeadingBlock;
