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
        <Mainlayout>
            <div className="h-full w-full overflow-y-auto">
                {isLoading && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-6">
                        <SkeletonFrom />
                        <SkeletonFrom />
                        <SkeletonFrom />
                        <SkeletonFrom />
                    </div>
                )}

                {!isLoading && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-6">
                        {blocks?.map((block, index) => (
                            <div
                                key={index}
                                onClick={() => handleclick(block.form_blocks)}
                                className="cursor-pointer"
                            >
                                <Templates block={block} isDashboard={true} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Mainlayout>
    )
}

export default Dashboard
