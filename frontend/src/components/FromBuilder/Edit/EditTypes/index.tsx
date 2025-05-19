import React from 'react'
import type { FormBlock } from '../../../../types'

type Props = {
    handleChange: (field: string, value: string | boolean) => void,
    block: FormBlock
}

const EditTypes: React.FC<Props> = ({ handleChange, block, }) => {
    return (
        <div className='flex flex-col gap-4 px-4 sm:px-0 max-w-md mx-auto w-full'>
            <div>
                <label className='text-sm  md:text-base  text-green-700 font-semibold block mb-2 md:mb-1'>Label</label>
                <input
                    type="text"
                    value={block.props?.label || ''}
                    className='
                    border border-green-700 
                    rounded p-2 w-full text-green-800 
                    placeholder:text-green-800 hover:text-green-800 hover:placeholder:text-green-800
                    text-sm md:text-base focus:ring-2 
                    focus:ring-green-200 transition-colors
                    '
                    onChange={(e) => handleChange('label', e.target.value)}
                />
            </div>

            {block.type === "heading" ? null :
                <div>
                    <label className='text-sm md:text-base text-green-700 font-semibold block mb-2 md:mb-1'>Placeholder</label>
                    <input
                        type="text"
                        value={block.props?.placeholder || ''}
                        className='
                        border border-green-700 
                        rounded-lg p-2 w-full text-sm md:text-base 
                         text-green-800 placeholder:text-green-800
                          hover:text-green-800 hover:placeholder:text-green-800
                          focus:border-green-500 focus:ring-2 
                         focus:ring-green-200 transition-colors
                          '
                        onChange={(e) => handleChange('placeholder', e.target.value)}
                    />
                </div>
            }
            {block.type === "heading" ? null :
                <div className="flex items-center gap-2 mt-2">
                    <div
                        onClick={() => handleChange('required', !block.props?.required)}
                        className={`h-4 w-4 border-2 border-green-800 cursor-pointer ${block.props?.required ? "bg-green-800" : "bg-white"
                            }`}
                    />

                    <label htmlFor="required" className="text-green-700 font-semibold bg-white hover:text-green-800">Required</label>
                </div>}

        </div>
    )
}

export default EditTypes
