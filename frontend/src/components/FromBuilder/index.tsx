import React from 'react'
import FormElements from './FromElements'
import FromPreview from './FromPreview'
import FromEdit from './FromEdit'

const Frombuilder: React.FC = () => {
    return (
        <div className='grid grid-cols-5 w-[100vw] h-[90vh]'>
            <FormElements />
            <FromPreview />
            <FromEdit />
        </div>
    )
}

export default Frombuilder