import React from 'react'
import { Loader } from "lucide-react"


const Loading: React.FC = () => {
    return (
        <div className='h-[100vh] w-[100vw] overflow-hidden flex justify-center items-center'>
            <div>
                <Loader className='h-10 w-10 animate-spin' />
            </div>
        </div>
    )
}

export default Loading