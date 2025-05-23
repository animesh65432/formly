import React from 'react'
import type { FormBlock } from '../../../../types'
import Label from './Label'
import Placeholder from './Placeholder'
import DropDown from './DropDown'
import Required from './Required'

type Props = {
    handleChange: (field: string, value: string | boolean | string[]) => void,
    block: FormBlock
}

const EditTypes: React.FC<Props> = ({ handleChange, block }) => {
    console.log(block)
    return (
        <div className='flex flex-col gap-4 px-4 sm:px-0 max-w-md mx-auto w-full'>
            <Label block={block} handleChange={handleChange} />

            {block.type === "heading" || block.type === "image" || block.type === "file" ? null : (
                <Placeholder block={block} handleChange={handleChange} />
            )
            }
            {
                block.type === "heading" ? null : (
                    <Required block={block} handleChange={handleChange} />
                )
            }

            {block.type === "dropdown" && <DropDown block={block} handleChange={handleChange} />}

        </div >
    )
}

export default EditTypes
