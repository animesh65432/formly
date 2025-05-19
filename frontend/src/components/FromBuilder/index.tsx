import React, { useState } from 'react'
import FormElements from './Elements'
import FromEdit from './Edit'
import Preview from "./Preview/main"

const Frombuilder: React.FC = () => {
    const [selectElementId, setSelectElementId] = useState<string | null>("")
    return (
        <div className='w-full min-h-[90vh] p-4'>
            {/* Main grid container */}
            <div className='grid grid-cols-1 md:grid-cols-5 gap-4 max-w-7xl mx-auto'>
                {/* Form Elements - Left sidebar */}
                <div className='md:col-span-1 h-full overflow-y-auto'>
                    <FormElements />
                </div>

                {/* Preview - Main content */}
                <div className='md:col-span-3 h-full overflow-y-auto'>
                    <Preview setSelectElementId={setSelectElementId} />
                </div>

                {/* Edit - Right sidebar */}
                <div className='md:col-span-1 h-full overflow-y-auto'>
                    <FromEdit selectElementId={selectElementId} />
                </div>
            </div>
        </div>
    )
}

export default Frombuilder
