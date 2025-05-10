import Sidebar from "./Sidebar"
import React from "react"
const Dashboard: React.FC = () => {
    return (
        <div className="bg-slate-100 w-[100vw] h-dvh grid grid-cols-11 gap-5">
            <div className="col-span-2">
                <Sidebar />
            </div>
            <div className="col-span-9">

            </div>
        </div>
    )
}

export default Dashboard
