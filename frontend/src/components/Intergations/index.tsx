import React from 'react'
import Mainlayout from '../Mainlayout'
import GoogleSheets from './GoogleSheets'
import Notion from './Notion'
const Intergations: React.FC = () => {
    return (
        <Mainlayout>
            <div className='w-[80vw] ml-10 sm:ml-0 flex gap-1 sm:gap-4  mt-6 sm:mt-10  justify-end'>
                <GoogleSheets />
                <Notion />
            </div>
        </Mainlayout>
    )
}

export default Intergations