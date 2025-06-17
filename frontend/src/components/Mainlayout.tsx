import React from 'react'
import Sidebar from './dashboard/Sidebar'
import MobileSidebar from './dashboard/Sidebar/Mobile'

type Props = {
    children: React.ReactNode
}

const Mainlayout: React.FC<Props> = ({ children }) => {
    return (
        <div className="bg-slate-100 w-screen h-screen flex">
            {/* Sidebar Section */}
            <div className="w-16 lg:w-64 h-full flex-shrink-0">
                <div className="hidden lg:block h-full">
                    <Sidebar />
                </div>
                <div className="block lg:hidden h-full">
                    <MobileSidebar />
                </div>
            </div>

            {/* Main Content Section */}
            <div className="flex-1 h-full overflow-hidden">
                {children}
            </div>
        </div>
    )
}

export default Mainlayout