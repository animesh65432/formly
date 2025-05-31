import React from 'react'
import Mainlayout from '../Mainlayout'

import GoogleSheets from './GoogleSheets'
const Intergations: React.FC = () => {
    return (
        <Mainlayout>
            <div className='w-[78vw] flex p-8 justify-end'>
                <GoogleSheets />
            </div>
        </Mainlayout>
    )
}

export default Intergations