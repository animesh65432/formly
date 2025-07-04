import React, { useState } from 'react'
import Icons from '../../Icons'
import { Button } from '../../ui/button'
import { useFormBuilderStore } from '../../../store/frombuilder'
import type { FormBlock } from "../../../types"
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover"
import ForSmallScreen from "../../FromBuilder/Edit/ForSmallScreen";


type Props = {
    block: FormBlock;
    isTemplates: boolean;
    isSharefrom: boolean;
    isLoading: boolean
}
const ButtonBlock: React.FC<Props> = ({ block, isTemplates, isSharefrom = false, isLoading }) => {
    const { removeBlock, setSelectElementId } = useFormBuilderStore();
    const [selectedIdforsmallscreen, SetselectedIdforsmallscreen] = useState<string | null>(null)
    const [isclickedSmallScreen, SetisClickedSmallScreen] = useState<boolean>(false)

    const handleClick = (id: string) => {
        setSelectElementId(id);
        SetselectedIdforsmallscreen(id)
        SetisClickedSmallScreen(true)
    };
    return (
        <div className='w-[100%] flex justify-center items-center gap-2' >
            <Button
                type="submit"
                onClick={() => handleClick(block.id)}
                disabled={isTemplates && !isSharefrom}
                className=" bg-green-800  hover:bg-green-700 rounded-2xl px-4 py-2 md:px-6 md:py-4 min-w-[120px]  max-w-full text-center whitespace-nowrap"
            >
                {!isLoading ? block?.label || 'Submit' : (
                    <Icons.spinner className="animate-spin h-6 w-6" />
                )}
            </Button>

            {!isTemplates &&
                <>
                    <Icons.delete className='text-red-800' onClick={() => removeBlock(block.id)} />
                    <Popover open={isclickedSmallScreen} >
                        <PopoverTrigger asChild>
                            {!isclickedSmallScreen ? <Icons.edit className='lg:hidden block  h-5 w-5 sm:h-8 sm:w-8 text-green-800' onClick={() => handleClick(block.id)} /> : <Icons.close className='lg:hidden block text-red-800  h-5 w-5 sm:h-8 sm:w-8' onClick={() => SetisClickedSmallScreen(false)} />}
                        </PopoverTrigger>
                        <PopoverContent className='lg:hidden block mt-6 sm:mr-[26vw] md:mr-[30vw] mr-[25vw]'>
                            <ForSmallScreen selectElementId={selectedIdforsmallscreen} />
                        </PopoverContent>
                    </Popover>
                </>
            }
        </div>
    )
}

export default ButtonBlock