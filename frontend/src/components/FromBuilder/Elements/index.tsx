import React from 'react'
import { formElements } from "../../../lib/constant"
import Element from './Element'

const FormElements: React.FC = () => {
    return (
        <div className='
            h-full bg-white scrollbar-custom-x p-3
               overflow-y-auto
               md:sticky md:top-0'>
            <div className='grid grid-cols-3 grid-rows-3 text-xl space-y-1 gap-1 md:grid-cols-1 md:gap-3'>
                {
                formElements.map((element) => <Element key={element.id} element={element} />)
                }
            </div>
            
        </div>
    )
}

export default FormElements