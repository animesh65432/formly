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
        if (element.id === "email") {
            addBlock({ id: uuidv4(), type: element.id, props: { label: "Email", placeholder: "example@gmail.com", required: false } })
        }
        else if (element.id === "text") {
            addBlock({ id: uuidv4(), type: element.id, props: { label: "label", placeholder: "", required: false } })
        }
        else if (element.id === "button") {
            console.log(element.id)
            addBlock({ id: uuidv4(), type: element.id, props: { label: "button", placeholder: "", required: true } })
        }
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