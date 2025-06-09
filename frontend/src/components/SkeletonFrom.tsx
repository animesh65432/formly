import React from 'react'
import { Skeleton } from "../components/ui/skeleton"

const SkeletonFrom: React.FC = () => {
    return (
        <div className="flex flex-col space-y-3">
            <Skeleton className="rounded-md md:h-[50vh] h-[40vh] lg:w-[30vw]" />
            <div className="space-y-2">
                <Skeleton className="w-[60vw] lg:w-[30vw] m-auto" />
                <Skeleton className="w-[60vw] lg:w-[30vw] m-auto" />
                <Skeleton className="w-[60vw] lg:w-[30vw] m-auto" />
                <Skeleton className="h-4 w-[60vw] lg:w-[30vw] m-auto" />
            </div>
        </div>
    )
}

export default SkeletonFrom