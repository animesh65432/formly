import React from 'react'
import Icons from '../../../Icons'
import { Button } from '../../../ui/button'
import { useFormBuilderStore } from '../../../../store/frombuilder'
import type { FormBlock } from "../../../../types"


type Props = {
    block: FormBlock;
}
const ButtonBlock: React.FC<Props> = ({ block }) => {
    const { removeBlock } = useFormBuilderStore()
    return (
        <div className='w-[100%] flex justify-center items-center gap-2'>
            <Button type="submit" className="bg-green-800 lg:w-[7vw] sm:w-[15vw] w-[25vw]  hover:bg-green-700 rounded-2xl p-3 md:p-5">
                {block.props?.label || 'Submit'}
            </Button>
            <Icons.delete className='text-red-800' onClick={() => removeBlock(block.id)} />
        </div>
    )
}

export default ButtonBlock