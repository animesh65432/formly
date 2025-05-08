import React, { useState } from 'react'
import { Button } from "../../components/ui/button"
import { Icons } from "../../components"
import MobileSidebar from './MobileSidebar'
import { Popover, PopoverTrigger, PopoverContent } from "../../components/ui/popover"


const Header: React.FC = () => {
    const [isopen, setopen] = useState<boolean>(false)
    return (
        <header className='mt-10 h-[10vh] flex lg:justify-around justify-between items-center w-[80vw] m-auto bg-white p-6 border-white rounded-lg backdrop-blur-md'>
            <div className='lg:text-3xl md:text-2xl text-xl font-bold'>Fromly</div>
            <div className='lg:flex hidden items-center gap-10 text-slate-700  font-semibold text-xl'>
                <ul>Features</ul>
                <ul>Contact</ul>
            </div>
            <div className='lg:block hidden'>
                <Button className='bg-green-900 hover:bg-green-700  text-white rounded-full p-6'>
                    Get Started
                    <span className='bg-white text-black rounded-full font-bold p-1 ml-2'>
                        <Icons.arrowRight className='h-4 w-4' />
                    </span>
                </Button>
            </div>

            <div className='lg:hidden block '>
                <Popover open={isopen} onOpenChange={setopen}>
                    <PopoverTrigger >
                        {!isopen ? <Icons.Menu className='sm:h-8 sm:w-8 h-5 w-5 font-bold' /> : <Icons.close className='sm:h-8 sm:w-8 h-5 w-5 font-bold' />}
                    </PopoverTrigger>
                    <PopoverContent className='mt-14  lg:hidden w-[100vw] flex justify-center border-0 '>
                        <MobileSidebar />
                    </PopoverContent>
                </Popover>
            </div>
        </header>

    )
}

export default Header