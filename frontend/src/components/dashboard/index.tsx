import Sidebar from "./Sidebar"
import React from "react"
// import { useGetFroms } from "../../actions/from"
// import { useAuth } from "../../store/auth"
const Dashboard: React.FC = () => {
    // const { token } = useAuth()
    // const { data } = useGetFroms(token)
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
