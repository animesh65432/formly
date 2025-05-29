import React from 'react'
import Mainlayout from '../Mainlayout'
import Header from './Header'
import { useGetUserfroms } from "../../actions/from"
import { useAuth } from '../../store/auth'
import Templates from '../dashboard/Templates'
const MyFrom: React.FC = () => {
    const { token } = useAuth()
    const { data: blocks } = useGetUserfroms(token)
    return (
        <Mainlayout>
            <div className='flex flex-col gap-14'>
                <div className='w-[78vw]  flex justify-end'>
                    <Header />
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-2 lg:gap-4  mt-10'>
                    {blocks?.map((block) => <Templates block={block} />)}
                </div>
            </div>
        </Mainlayout>
    )
}

export default MyFrom