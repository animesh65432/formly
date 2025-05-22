import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "../../../ui/sheet"
import { Atom } from "lucide-react"
import Elements from './Elements'


const Mobile: React.FC = () => {
    return (
        <Sheet  >
            <SheetTrigger>
                <div className='flex gap-2'>
                    <Atom className='text-green-800 font-bold' />
                    <span className='text-green-800 font-bold md:text-xl text-sm'>Elements</span>
                </div>
            </SheetTrigger>
            <SheetContent>
                <Elements />
            </SheetContent>
        </Sheet>

    )
}

export default Mobile