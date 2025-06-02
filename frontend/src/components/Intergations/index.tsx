import React from 'react'
import Mainlayout from '../Mainlayout'
import GoogleSheets from './GoogleSheets'
import Notion from './Notion'
const Intergations: React.FC = () => {
    return (
        <Mainlayout>
            <div className='w-[78vw] flex gap-4  mt-6 sm:mt-10 md:p-5 lg:p-8 justify-end'>
                <GoogleSheets />
                <Notion />
            </div>
        </Mainlayout>
    )
}

export default Intergations