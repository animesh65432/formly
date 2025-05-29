import React from 'react'
import { Skeleton } from "../components/ui/skeleton"

const SkeletonFrom: React.FC = () => {
    return (
        <div className="flex flex-col space-y-3">
            <Skeleton className="rounded-md md:h-[50vh] h-[40vh] lg:w-[30vw]" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-[150px]" />
                <Skeleton className="h-4 w-[150px]" />
                <Skeleton className="h-4 w-[150px]" />
                <Skeleton className="h-4 w-[100px]" />
            </div>
        </div>
    )
}

export default SkeletonFrom