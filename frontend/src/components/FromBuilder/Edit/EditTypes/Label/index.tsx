import React from 'react'
import type { FormBlock } from "../../../../../types"
type Props = {
    block: FormBlock,
    handleChange: (field: string, value: string | boolean | string[]) => void,
}

const Label: React.FC<Props> = ({ block, handleChange }) => {
    return (
        <div>
            <label className='text-sm md:text-base text-green-700 font-semibold block mb-2 md:mb-1'>Label</label>
            <input
                type="text"
                value={block?.label || ''}
                className='
                border border-green-700 
                rounded p-2 w-full text-green-800 
                placeholder:text-green-800 
            '
                onChange={(e) => handleChange('label', e.target.value)}
            />
        </div>

    )
}

export default Label