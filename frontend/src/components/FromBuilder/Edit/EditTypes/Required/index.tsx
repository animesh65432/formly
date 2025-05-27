import React from 'react'
import type { FormBlock } from "../../../../../types"
type Props = {
    block: FormBlock,
    handleChange: (field: string, value: string | boolean | string[]) => void,
}

const Required: React.FC<Props> = ({ block, handleChange }) => {
    return (
        <div className="flex items-center gap-2 mt-2">
            <div
                onClick={() => handleChange('required', !block?.required)}
                className={`h-4 w-4 border-2 border-green-800 cursor-pointer ${block?.required ? "bg-green-800" : "bg-white"}`}
            />
            <label htmlFor="required" className="text-green-700 font-semibold bg-white">Required</label>
        </div>
    )
}

export default Required