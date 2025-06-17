import React from 'react'
import { Skeleton } from "../components/ui/skeleton"

const SkeletonFrom: React.FC = () => {
    return (
        <div className="flex flex-col space-y-3">
            <Skeleton className="m-auto h-[40vh] lg:h-[50vh] w-[50vw] lg:w-[28vw] rounded-xl" />
            <div className="flex flex-col gap-5 mt-4 ">
                <Skeleton className="h-4 w-[250px] m-auto" />
                <Skeleton className="h-4 w-[200px] m-auto" />
            </div>
        </div>
    )
}

export default SkeletonFrom