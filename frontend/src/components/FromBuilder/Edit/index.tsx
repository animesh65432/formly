import React from 'react'
import { useFormBuilderStore } from '../../../store/frombuilder'
import InputTypes from './InputTypes'

type Props = {
    selectElementId: string | null
}

const FormEdit: React.FC<Props> = ({ selectElementId }) => {
    if (!selectElementId) {
        return (
            <div className='col-span-1 flex flex-col items-center justify-center border-l-4 border-green-700 h-[90vh] p-3'>
                <p className="text-green-700 text-xl font-semibold">
                    No element selected
                </p>
            </div>
        )
    }

    const block = useFormBuilderStore((state) =>
        state.blocks.find((block) => block.id === selectElementId)
    );

    const updateBlock = useFormBuilderStore((state) => state.updateBlock);

    if (!block) {
        return (
            <div className='col-span-1 flex flex-col items-center justify-center border-l-4 border-green-700 h-[90vh] p-3'>
                <p className="text-green-700 text-xl font-semibold">
                    Element not found
                </p>
            </div>
        )
    }

    const handleChange = (field: string, value: string | boolean) => {
        updateBlock(block.id, {
            ...block,
            props: {
                ...block.props,
                [field]: value
            }
        });
    };

    return (
        <div className='col-span-1 h-[90vh] border-l-4 border-green-700 p-3 overflow-y-auto'>
            <p className='text-green-700 text-xl font-semibold text-center mb-4'>Settings</p>
            {(block.type === "text" || block.type === "email" || block.type === "phone" || block.type === "number" || block.type === "password" || block.type === "url") && <InputTypes handleChange={handleChange} block={block} />}
        </div>
    )
}

export default FormEdit