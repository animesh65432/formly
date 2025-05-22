import React from 'react'
import { Button } from "../../components/ui/button"
import { Icons } from "../../components"
import { useNavigate } from 'react-router-dom'

const MobileSidebar: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className='font-semibold flex flex-col gap-6 p-3 sm:w-[50vw] w-[70vw] bg-white rounded-md'>
            <div >
                <a href='#Features'>Features
                </a>
            </div>
            <div>
                <a href='#contact'>Contact
                </a>
            </div>
            <Button onClick={() => navigate('/singin')} className='bg-green-900 hover:bg-green-700  text-white rounded-full lg:p-6 p-4'>
                Get Started
                <span className='bg-white text-black rounded-full font-bold p-1 ml-2'>
                    <Icons.arrowRight className='h-10 w-10' />
                </span>
            </Button>
        </div>
    )
}

export default MobileSidebar