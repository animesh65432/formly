import React, { useState } from 'react'
import { generateOAuthURL } from "../../../api/Integration/notion"
import { Button } from "../../ui/button"
import { useAuth } from '../../../store/auth'
import Icons from '../../Icons'
import { toast } from "react-toastify"
const Notion: React.FC = () => {
    const { token } = useAuth()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const fetchAuthUrl = async () => {
        setIsLoading(true)
        try {
            const response = await generateOAuthURL(token) as {
                authUrl
                : string
            }
            window.location.href = response.authUrl
            toast.success("sucessfully authenticated with notion")
        }
        finally {
            setIsLoading(false)
        }
    }

    return (
        <Button className='bg-green-800 hover:bg-green-600 rounded-md p-2 sm:p-4' onClick={fetchAuthUrl}>{isLoading ? <Icons.spinner className='animate-spin h-4 w-4' /> : "Notion"}</Button>
    )
}

export default Notion
