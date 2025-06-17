import React from 'react'
import { formElements } from "../../../../../lib/constant"
import Element from '../../Element'

const Elements: React.FC = () => {
    return (
        <div className='flex mt-15 flex-col h-[100vh] overflow-x-auto bg-white gap-4'>
            {formElements.map((element, index) => <Element key={index} element={element} />)}
        </div>
    )
}

export default Elements