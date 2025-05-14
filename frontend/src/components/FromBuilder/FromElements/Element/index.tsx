import React from 'react'
import type { FormElement } from "../../../../types"
import Icons from '../../../Icons'

type Props = {
    element: FormElement
}

const Element: React.FC<Props> = ({ element }) => {
    return (
        <div className='flex bg-green-50 text-green-800 items-center hover:bg-green-300 font-medium text-xl gap-3 px-4 py-2 rounded-md transition-colors cursor-pointer'>
            <element.icon />
            <span className="flex-grow">{element.name}</span>
            <Icons.add className="ml-auto h-5 w-5" />
        </div>
    )
}
export default Element