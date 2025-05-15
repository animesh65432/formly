import React from 'react'
import type { FormBlock } from '../../../../store/frombuilder'

type Props = {
    handleChange: (field: string, value: string | boolean) => void,
    block: FormBlock
}

const Text: React.FC<Props> = ({ handleChange, block }) => {
    return (
        <div className='flex flex-col gap-4'>
            <div>
                <label className='text-green-700 font-semibold block mb-1'>Label</label>
                <input
                    type="text"
                    value={block.props?.label || ''}
                    className='border border-green-700 rounded p-2 w-full text-green-800 placeholder:text-green-800 hover:text-green-800 hover:placeholder:text-green-800'
                    onChange={(e) => handleChange('label', e.target.value)}
                />
            </div>

            <div>
                <label className='text-green-700 font-semibold block mb-1'>Placeholder</label>
                <input
                    type="text"
                    value={block.props?.placeholder || ''}
                    className='border border-green-700 rounded p-2 w-full text-green-800 placeholder:text-green-800 hover:text-green-800 hover:placeholder:text-green-800'
                    onChange={(e) => handleChange('placeholder', e.target.value)}
                />
            </div>



            <div className="flex items-center mt-2">
                <input
                    type="checkbox"
                    id="required"
                    checked={block.props?.required || false}
                    className="mr-2 h-5 w-5 bg-white border border-green-700 text-green-800"
                    onChange={(e) => handleChange('required', e.target.checked)}
                />
                <label htmlFor="required" className="text-green-700 font-semibold bg-white hover:text-green-800">Required</label>
            </div>
        </div>
    )
}

export default Text
