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
            <div className="flex items-center gap-3 mt-2">
                <div
                    onClick={() => handleChange('required', !block.props?.required)}
                    className={`h-5 w-5 border-2 border-green-800 rounded-sm cursor-pointer transition-colors 
                        ${block.props?.required ? "bg-green-800" : "bg-white hover:bg-green-50"
                    }`}
                    role='checkbox'
                    aria-checked={block.props?.required}
                />

                <label htmlFor="required" 
                className="text-green-700 
                font-semibold text-sm md:text-base
                bg-white hover:text-green-800 cursor-pointer">Required</label>
            </div>
            <button 
            className='
                w-full md:w-auto self-end px-6 py-2 text-sm md:text-base font-semibold text-white 
                bg-green-800 hover:bg-green-700 active:bg-green-900 rounded-lg transition-colors 
                transform hover:scale-105 active:scale-95
                '
            type='button'
            >
                Add Options
            </button>
        </div>
    )
}

export default EditTypes
