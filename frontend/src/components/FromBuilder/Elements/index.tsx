import React from 'react'
import { formElements } from "../../../lib/constant"
import Element from './Element'

const FormElements: React.FC = () => {
    return (
        <div className='flex  flex-col gap-4 h-[90vh] scrollbar-custom-x '>
            {
                formElements.map((element) => <Element key={element.id} element={element} />)
            }
        </div>

    )
}

export default FormElements