import React from 'react'
import { Button } from "../../../components/ui/button"
import { useCreateFrom } from "../../../actions/from"

const Fromheader: React.FC = () => {
    return (
        <div>
            <Button className='bg-green-800 rounded-md hover:bg-green-700'>SAVE</Button>
        </div>
    )
}

export default Fromheader