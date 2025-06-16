import React from 'react'
import Sidebar from './dashboard/Sidebar'
import MobileSidebar from './dashboard/Sidebar/Mobile'

type Props = {
    children: React.ReactNode
}

const Mainlayout: React.FC<Props> = ({ children }) => {
    return (
        <div className="bg-slate-100 w-[100vw] h-[100vh] overflow-hidden grid grid-cols-11 gap-5">
            <div className="col-span-1 lg:col-span-2">
                <div className=" hidden lg:block">
                    <Sidebar />
                </div>
                <div className=" block lg:hidden col-span-3">
                    <MobileSidebar />
                </div>
            </div>
            <div className="min-h-screen scrollbar-custom-x flex justify-center col-span-9  w-full">
                {children}
            </div>
        </div>
    )
}

export default Mainlayout