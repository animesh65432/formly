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
        if (element.id === "email" || element.id === "text" ||
            element.id === "phone" || element.id === "number" ||
            element.id === "password" || element.id === "url" ||
            element.id === "text" || element.id === "paragraph" ||
            element.id === "textarea") {
            addBlock({ id: uuidv4(), type: element.id, props: { label: element.id, placeholder: element.name, required: false } })
        }
        else if (element.id === "heading") {
            addBlock({ id: uuidv4(), type: element.id, props: { label: "heading" } })
        }
        else if (element.id === "dropdown") {
            addBlock({ id: uuidv4(), type: element.id, props: { label: "dropdown", options: [], required: false } })
        }
        else if (element.id === "button") {
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