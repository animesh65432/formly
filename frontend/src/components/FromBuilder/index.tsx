import React, { useState } from 'react'
import FormElements from './Elements'
import FromEdit from './Edit'
import Preview from "./Preview/main"

const Frombuilder: React.FC = () => {
    const [selectElementId, setSelectElementId] = useState<string | null>("")
    return (
        <div className="w-[100vw] grid grid-cols-7 lg:grid-cols-5  h-[90vh] p-4 gap-4">
            <div className="lg:col-span-1 lg:block hidden">
                <FormElements />
            </div>
            <div className="col-span-7 lg:col-span-3">
                <Preview setSelectElementId={setSelectElementId} />
            </div>
            <div className="lg:block hidden lg:col-span-1">
                <FromEdit selectElementId={selectElementId} />
            </div>
        </div>

    )
}

export default Frombuilder
