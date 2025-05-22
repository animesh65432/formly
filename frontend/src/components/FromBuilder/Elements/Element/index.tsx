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
        if (element) {
            addBlock({ id: uuidv4(), type: element.id, props: { label: element.id, placeholder: element.name, required: false } })
        }

    }
    return (
        <div onClick={() => add(element)}
            className='
        flex bg-green-50 text-green-800 
        items-center hover:bg-green-300
        active:bg-green-400  
        font-medium md:text-xl 
        text-base gap-2 px-1 py-3 rounded-md transition-colors cursor-pointer w-full'>
            <element.icon className='flex-shrink-0 text-2xl md:w-8 md:h-8 md:text-3xl w-3' />
            <span className="truncate text-sm md:text-base">{element.name}</span>
            <Icons.add className="ml-auto flex-shrink-0 w-6 h-6 md:w-8 md:h-8" />
        </div>
    )
}
export default Element