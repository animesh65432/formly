import React from 'react'
import { Button } from "../../../components/ui/button"
import { useNavigate } from "react-router-dom"

const Header: React.FC = () => {
    const naviagate = useNavigate()
    return (
        <div className='flex justify-end mt-10 mb-10 fixed '>
            <Button onClick={() => naviagate("/build")} className=' shadow-md z-50 bg-green-800 hover:bg-green-700 rounded-md text-sm md:text-xl'>create from</Button>
        </div>
    )
}

export default Header