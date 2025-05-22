import React, { useState } from 'react'
import FormElements from './Elements'
import FromEdit from './Edit'
import Preview from "./Preview/main"

const Frombuilder: React.FC = () => {
    const [selectElementId, setSelectElementId] = useState<string | null>("")
    return (
        <div className='w-[100vw] h-[90vh] p-4 grid grid-cols-5'>
            <div className="col-span-1">
                <FormElements />
            </div>
            <div className="col-span-3">
                <Preview setSelectElementId={setSelectElementId} />
            </div>
            <div className="col-span-1">
                <FromEdit selectElementId={selectElementId} />
            </div>
        </div>
    )
}

export default Frombuilder
