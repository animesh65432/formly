import React, { useState } from 'react'
import Icons from '../../../Icons'
import { Button } from '../../../ui/button'
import { useFormBuilderStore } from '../../../../store/frombuilder'
import type { FormBlock } from "../../../../types"
import { Popover, PopoverContent, PopoverTrigger } from "../../../ui/popover"
import { Pencil } from "lucide-react";
import ForSmallScreen from "../../Edit/ForSmallScreen";

type Props = {
    block: FormBlock;
    setSelectElementId: React.Dispatch<React.SetStateAction<string | null>>;

}
const ButtonBlock: React.FC<Props> = ({ block, setSelectElementId }) => {
    const { removeBlock } = useFormBuilderStore();
    const [selectedIdforsmallscreen, SetselectedIdforsmallscreen] = useState<string | null>(null)
    const [isclickedSmallScreen, SetisClickedSmallScreen] = useState<boolean>(false)

    const handleClick = (id: string) => {
        setSelectElementId(id);
        SetselectedIdforsmallscreen(id)
        SetisClickedSmallScreen((prev) => !prev)
    };
    return (
        <div className='w-[100%] flex justify-center items-center gap-2'>
            <Button type="submit" className="bg-green-800 lg:w-[7vw] sm:w-[15vw] w-[25vw]  hover:bg-green-700 rounded-2xl p-3 md:p-5">
                {block.props?.label || 'Submit'}
            </Button>
            <Icons.delete className='text-red-800' onClick={() => removeBlock(block.id)} />
            <Popover open={isclickedSmallScreen} >
                <PopoverTrigger asChild>
                    <Pencil className='lg:hidden block' onClick={() => handleClick(block.id)} />
                </PopoverTrigger>
                <PopoverContent className='lg:hidden block mt-6 sm:mr-[26vw] md:mr-[30vw] mr-[25vw]'>
                    <ForSmallScreen selectElementId={selectedIdforsmallscreen} />
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default ButtonBlock