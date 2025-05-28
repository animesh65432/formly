import React, { useState } from 'react'
import FormElements from './Elements'
import FromEdit from './Edit'
import Preview from "./Preview/main"
import Fromheader from './Fromheader'

const Frombuilder: React.FC = () => {
    const [selectElementId, setSelectElementId] = useState<string | null>("")
    return (
        <div className='h-[100vh] flex flex-col'>
            <div className='w-[100vw] flex justify-end p-3 h-[5vh]'>
                <Fromheader />
            </div>
            <div className="w-[100vw] h-[95vh] grid grid-cols-7 overflow-hidden    lg:grid-cols-5  p-4 gap-4">
                <div className="lg:col-span-1 lg:block hidden">
                    <FormElements />
                </div>
                <div className="col-span-7 lg:col-span-3">
                    <Preview setSelectElementId={setSelectElementId} />
                </div>
                <div className="lg:block hidden lg:col-span-1 h-[90vh]">
                    <FromEdit selectElementId={selectElementId} />
                </div>
            </div>
        </div>
    )
}

export default Frombuilder
