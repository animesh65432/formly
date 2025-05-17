import React from 'react'
import type { FormBlock } from '../../../../types'

type Props = {
    handleChange: (field: string, value: string | boolean) => void,
    block: FormBlock
}

const EditTypes: React.FC<Props> = ({ handleChange, block, }) => {
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
            {block.type === "heading" ? null :
                <div>
                    <label className='text-green-700 font-semibold block mb-1'>Placeholder</label>
                    <input
                        type="text"
                        value={block.props?.placeholder || ''}
                        className='border border-green-700 rounded p-2 w-full text-green-800 placeholder:text-green-800 hover:text-green-800 hover:placeholder:text-green-800'
                        onChange={(e) => handleChange('placeholder', e.target.value)}
                    />
                </div>
            }
            <div className="flex items-center gap-2 mt-2">
                <div
                    onClick={() => handleChange('required', !block.props?.required)}
                    className={`h-4 w-4 border-2 border-green-800 cursor-pointer ${block.props?.required ? "bg-green-800" : "bg-white"
                        }`}
                />

                <label htmlFor="required" className="text-green-700 font-semibold bg-white hover:text-green-800">Required</label>
            </div>
            <button className='flex w-[40%] justify-end md:text-xl text-white font-semibold bg-green-800'>add opitons</button>
        </div>
    )
}

export default EditTypes
