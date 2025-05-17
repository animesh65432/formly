import React from 'react';
import { FormItem, FormLabel, FormField } from '../../../ui/form';
import type { FormBlock } from "../../../../types";
import Icons from '../../../Icons';
import { useFormBuilderStore } from '../../../../store/frombuilder';

type Props = {
    block: FormBlock;
    form: any;
    setSelectElementId: React.Dispatch<React.SetStateAction<string | null>>;
};

const ParagraphBlock: React.FC<Props> = ({ block, setSelectElementId, form }) => {
    const { removeBlock } = useFormBuilderStore()
    const handleClick = () => {
        setSelectElementId(block.id);
    };

    return (
        <FormField
            control={form.control}
            name={block.id}
            render={() => (
                <FormItem className="cursor-pointer">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                        <div onClick={handleClick} className="flex flex-col gap-1 w-[90%]">
                            <FormLabel className="text-green-800 font-semibold mb-1 md:text-xl text-sm">
                                {block.props?.label}
                            </FormLabel>
                            <p className="text-green-700 text-sm md:text-xl break-words">
                                {block.props?.placeholder || "Paragraph text here..."}
                            </p>
                        </div>
                        <Icons.delete
                            className="text-red-800"
                            onClick={() => removeBlock(block.id)}
                        />
                    </div>
                </FormItem>
            )}
        />

    );
};

export default ParagraphBlock;
