import React from 'react'
import { generateOAuthURL } from "../../../api/Integration/notion"
import { Button } from "../../ui/button"
import { useAuth } from '../../../store/auth'
const Notion: React.FC = () => {
    const { token } = useAuth()
    const fetchAuthUrl = async () => {
        const response = await generateOAuthURL(token) as {
            authUrl
            : string
        }
        console.log("from notion", response)
        window.location.href = response.authUrl
    }

    return (
        <Button className='bg-green-800 hover:bg-green-600 rounded-md' onClick={fetchAuthUrl}>Notion</Button>
    )
}

export default Notion
