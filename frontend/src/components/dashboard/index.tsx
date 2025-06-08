import React from "react"
import { useGetFroms } from "../../actions/from"
import { useAuth } from "../../store/auth"
import Templates from "../Templates"
import Mainlayout from "../Mainlayout"
import SkeletonFrom from "../SkeletonFrom"
import { useNavigate } from "react-router-dom"
import type { FormBlock } from "../../types"
const Dashboard: React.FC = () => {
    const { token } = useAuth()
    const navigate = useNavigate()
    const { data: blocks, isLoading } = useGetFroms(token)
    const handleclick = (block: FormBlock[]) => {
        navigate('/build', {
            state: { templateblock: block }
        });

    }
    return (
        <Mainlayout >
            {isLoading && <div className="grid grid-cols-1 md:grid-cols-2 gap-2 lg:gap-4 p-4">

                <SkeletonFrom />
                <SkeletonFrom />
                <SkeletonFrom />
                <SkeletonFrom />
            </div>}
            {!isLoading &&
                <div className="grid  grid-cols-1 lg:grid-cols-2  gap-2 lg:gap-4 p-4">
                    {blocks?.map((block, index) =>
                        <div onClick={() => handleclick(block.form_blocks)}>
                            <Templates block={block} key={index} isDashboard={true} />
                        </div>
                    )}
                </div>
            }
        </Mainlayout >
    )
}

export default Dashboard
