import React from 'react'
import { formElements } from "../../../lib/constant"
import Element from './Element'

const FormElements: React.FC = () => {
    return (
        <div className='col-span-1 h-[90vh] bg-white scrollbar-custom-x flex flex-col gap-2 p-3'>
            {
                formElements.map((element) => <Element key={element.id} element={element} />)
            }
        </div>
    )
}

export default FormElements