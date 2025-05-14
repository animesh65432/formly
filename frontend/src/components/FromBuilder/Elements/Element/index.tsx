import React from 'react'
import type { FormElement } from "../../../../types"
import Icons from '../../../Icons'
import { useFormBuilderStore } from "../../../../store/frombuilder"
import { v4 as uuidv4 } from 'uuid';

type Props = {
    element: FormElement
}

const Element: React.FC<Props> = ({ element }) => {
    const { addBlock } = useFormBuilderStore()

    const add = (element: FormElement) => {
        addBlock({ id: uuidv4(), type: element.id, props: { label: "", placeholder: "", required: false } })
    }
    return (
        <div onClick={() => add(element)} className='flex bg-green-50 text-green-800 items-center hover:bg-green-300 font-medium text-xl gap-3 px-4 py-2 rounded-md transition-colors cursor-pointer'>
            <element.icon />
            <span className="flex-grow">{element.name}</span>
            <Icons.add className="ml-auto h-5 w-5" />
        </div>
    )
}
export default Element