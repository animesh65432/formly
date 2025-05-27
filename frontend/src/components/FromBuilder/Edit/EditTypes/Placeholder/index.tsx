import React from 'react'
import type { FormBlock } from "../../../../../types"
type Props = {
    block: FormBlock,
    handleChange: (field: string, value: string | boolean | string[]) => void,
}

const Placeholder: React.FC<Props> = ({ block, handleChange }) => {
    return (
        < div >
            <label className='text-sm md:text-base text-green-700 font-semibold block mb-2 md:mb-1'>Placeholder</label>
            <input
                type="text"
                value={block?.placeholder || ''}
                className='
                            border border-green-700 
                            rounded-lg p-2 w-full text-sm md:text-base 
                            text-green-800 placeholder:text-green-800
                        '
                onChange={(e) => handleChange('placeholder', e.target.value)}
            />
        </div>
    )
}

export default Placeholder