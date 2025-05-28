import React from 'react'
import { useFormBuilderStore } from '../../../store/frombuilder'
import EditTypes from './EditTypes'


const FormEdit: React.FC = () => {
    const { selectElementId } = useFormBuilderStore()
    if (!selectElementId) {
        return (
            <div className=' flex flex-col items-center justify-center border-l-4 border-green-700 h-[90vh] p-3'>
                <p className="text-green-700 text-xl font-semibold">
                    No element selected
                </p>
            </div>
        )
    }

    console.log(selectElementId)

    const block = useFormBuilderStore((state) =>
        state.block.find((block) => block.id === selectElementId)
    );

    const updateBlock = useFormBuilderStore((state) => state.updateBlock);

    if (!block) {
        return (
            <div className=' flex flex-col items-center justify-center border-l-4 border-green-700 h-[90vh] p-3'>
                <p className="text-green-700 text-xl font-semibold">
                    Element not found
                </p>
            </div>
        )
    }

    const handleChange = (field: string, value: string | boolean | string[]) => {
        updateBlock(block.id, {
            ...block,
            [field]: value
        });
    };

    return (
        <>
            <div className=' h-[90vh] border-l-4 border-green-700 p-3 overflow-y-auto'>
                <p className='text-green-700 text-xl font-semibold text-center mb-4'>Settings</p>
                <EditTypes handleChange={handleChange} block={block} />
            </div>

        </>
    )
}

export default FormEdit