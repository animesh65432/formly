import React, { useState } from 'react'
import FormElements from './Elements'
import FromEdit from './Edit'
import Preview from './Preview'

const Frombuilder: React.FC = () => {
    const [selectElementId, setSelectElementId] = useState<string | null>("")
    console.log(selectElementId)
    return (
        <div className='grid grid-cols-5 w-[100vw] h-[90vh]'>
            <FormElements />
            <Preview setSelectElementId={setSelectElementId} />
            <FromEdit selectElementId={selectElementId} />
        </div>
    )
}

export default Frombuilder
