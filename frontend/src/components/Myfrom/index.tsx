import React from 'react'
import Mainlayout from '../Mainlayout'
import Header from './Header'
import { useGetUserfroms } from "../../actions/from"
import { useAuth } from '../../store/auth'
import Templates from '../Templates'
import SkeletonFrom from '../SkeletonFrom'
const MyFrom: React.FC = () => {
    const { token } = useAuth()
    const { data: blocks, isLoading } = useGetUserfroms(token)
    return (
        <Mainlayout>
            <div className='flex flex-col gap-14 h-full '>
                <div className='w-[80vw] md:w-[78vw]  flex justify-end h-[5vh]'>
                    <Header />
                </div>
                <div className='h-[80vh] scrollbar-custom-x  '>
                    {isLoading
                        &&
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-4 p-4">
                            <SkeletonFrom />
                            <SkeletonFrom />
                            <SkeletonFrom />
                            <SkeletonFrom />
                        </div>
                    }
                    {!isLoading &&
                        <div className="grid  grid-cols-1 mt-4 lg:grid-cols-2  gap-2 lg:gap-4 p-4">
                            {blocks?.map((block, index) => <Templates block={block} key={index} />)}
                        </div>
                    }
                </div>
            </div>
        </Mainlayout>
    )
}

export default MyFrom