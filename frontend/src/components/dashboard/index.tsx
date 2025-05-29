import React from "react"
import { useGetFroms } from "../../actions/from"
import { useAuth } from "../../store/auth"
import Templates from "./Templates"
import Mainlayout from "../Mainlayout"
import SkeletonFrom from "../SkeletonFrom"
const Dashboard: React.FC = () => {
    const { token } = useAuth()
    const { data: blocks, isLoading } = useGetFroms(token)
    return (
        <Mainlayout >
            {isLoading && <div className="grid grid-cols-1 md:grid-cols-2 gap-2 lg:gap-4 p-4">

                <SkeletonFrom />
                <SkeletonFrom />
                <SkeletonFrom />
                <SkeletonFrom />
            </div>}
            {!isLoading &&
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 lg:gap-4 p-4">
                    {blocks?.map((block, index) => <Templates block={block} key={index} />)}
                </div>
            }
        </Mainlayout >
    )
}

export default Dashboard
