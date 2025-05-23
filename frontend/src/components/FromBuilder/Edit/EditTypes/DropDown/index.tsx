import React from 'react'
import type { FormBlock } from "../../../../../types"
import Icons from "../../../../Icons";

type Props = {
    block: FormBlock,
    handleChange: (field: string, value: string | boolean | string[]) => void,
}

const DropDown: React.FC<Props> = ({ block, handleChange }) => {
    const addOption = () => {
        const currentOptions = block.props?.options || [];
        const newOptions = [...currentOptions, `Option ${currentOptions.length + 1}`];
        handleChange('options', newOptions);
    };


    const removeOption = (index: number) => {
        const currentOptions = block.props?.options || [];
        const newOptions = currentOptions.filter((_, i) => i !== index);
        handleChange('options', newOptions);
    };


    const updateOption = (index: number, value: string) => {
        const currentOptions = block.props?.options || [];
        const newOptions = [...currentOptions];
        newOptions[index] = value;
        handleChange('options', newOptions);
    };

    return (
        <div>
            <label className=' text-sm md:text-base text-green-700 font-semibold block mb-2 md:mb-1'>Options</label>
            <div className="flex flex-col gap-2">
                {(block.props?.options || []).map((option: string, index: number) => (
                    <div key={index} className="flex items-center gap-2">
                        <input
                            type="text"
                            value={option}
                            placeholder={`Option ${index + 1}`}
                            className='
                            border border-green-700 
                            rounded p-2 flex-1 text-green-800
                            placeholder:text-green-600
                            w-[13vw]
                        '
                            onChange={(e) => updateOption(index, e.target.value)}
                        />
                        <Icons.delete className="text-red-800 w-5 h-5 sm:w-6 sm:h-6" onClick={() => removeOption(index)} />
                    </div>
                ))}
                <button
                    onClick={addOption}
                    className="
                    bg-green-700 hover:bg-green-800 
                    text-white px-3 py-2 rounded
                    text-sm font-medium mt-1
                "
                    type="button"
                >
                    + Add Option
                </button>
            </div>
        </div>
    )
}

export default DropDown