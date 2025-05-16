import React from 'react';
import { FormItem } from '../../../ui/form';
import type { FormBlock } from "../../../../types";

type Props = {
    block: FormBlock;
    setSelectElementId: React.Dispatch<React.SetStateAction<string | null>>;
};

const HeadingBlock: React.FC<Props> = ({ block, setSelectElementId }) => {
    const handleClick = () => {
        setSelectElementId(block.id);
    };

    return (
        <FormItem onClick={handleClick} className="cursor-pointer">
            <h2 className="text-green-900 font-bold text-xl">
                {block.props?.label || "Heading Title"}
            </h2>
        </FormItem>
    );
};

export default HeadingBlock;
