import Sidebar from "./Sidebar"
import React from "react"
import { useGetFroms } from "../../actions/from"
import { useAuth } from "../../store/auth"
import Templates from "./Templates"
const Dashboard: React.FC = () => {
    const { token } = useAuth()
    const { data: blocks } = useGetFroms(token)
    return (
        <div className="bg-slate-100 w-[100vw] h-dvh grid grid-cols-11 gap-5">
            <div className="col-span-2">
                <Sidebar />
            </div>
            <div className="col-span-9">
                {blocks?.map((block, index) => <Templates block={block} key={index} />)}
            </div>
        </div>
    )
}

export default Dashboard
