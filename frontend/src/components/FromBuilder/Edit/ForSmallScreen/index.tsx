import React from 'react'
import { useFormBuilderStore } from '../../../../store/frombuilder'
import EditTypes from '../EditTypes'
type Props = {
    selectElementId: string | null
}


const ForSmallScreen: React.FC<Props> = ({ selectElementId }) => {
    console.log("hello form small screen")
    if (!selectElementId) {
        return (
            <div className="fixed inset-0 bg-transparent bg-opacity-40 flex justify-center items-center z-50">
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
            <div className=' flex flex-col items-center justify-center border-l-4 border-green-700 h-[30vh] lg:h-[90vh] p-3'>
                <p className="text-green-700 text-xl font-semibold">
                    Element not found
                </p>
            </div>
        )
    }

    const handleChange = (field: string, value: string | boolean | string[]) => {
        updateBlock(block.id, {
            ...block,
            props: {
                ...block.props,
                [field]: value
            }
        });
    };
    return (
        <div className='bg-white shadow-md p-4 rounded-md' >
            <EditTypes block={block} handleChange={handleChange} />
        </div>
    )
}

export default ForSmallScreen