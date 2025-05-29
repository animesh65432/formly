import Sidebar from "./Sidebar"
import React from "react"
import { useGetFroms } from "../../actions/from"
import { useAuth } from "../../store/auth"
import Templates from "./Templates"
import MobileSidebar from "./Sidebar/Mobile"
const Dashboard: React.FC = () => {
    const { token } = useAuth()
    const { data: blocks } = useGetFroms(token)
    return (
        <div className="bg-slate-100 w-[100vw] h-dvh grid grid-cols-11 gap-5">
            <div className="col-span-1 lg:col-span-2">
                <div className=" hidden lg:block">
                    <Sidebar />
                </div>
                <div className=" block lg:hidden">
                    <MobileSidebar />
                </div>
            </div>
            <div className="col-span-10 lg:col-span-9 grid grid-cols-1 md:grid-cols-2 lg:gap-4 p-4">
                {blocks?.map((block, index) => <Templates block={block} key={index} />)}
            </div>
        </div>
    )
}

export default Dashboard
