import React from 'react'
import { Button } from "../../components/ui/button"
import { Icons } from "../../components"

const MobileSidebar: React.FC = () => {
    return (
        <div className='font-semibold flex flex-col gap-6 p-3 w-[50vw] bg-white rounded-md'>
            <div >Features</div>
            <div>Contact</div>
            <Button className='bg-green-900 hover:bg-green-700  text-white rounded-full p-6'>
                Get Started
                <span className='bg-white text-black rounded-full font-bold p-1 ml-2'>
                    <Icons.arrowRight className='h-10 w-10' />
                </span>
            </Button>
        </div>
    )
}

export default MobileSidebar