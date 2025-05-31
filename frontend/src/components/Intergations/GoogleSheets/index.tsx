import React, { useEffect, useState } from 'react'
import { Button } from "../../../components/ui/button"
import { generateOAuthURL } from "../../../api/Integration/google"
import { useAuth } from '../../../store/auth'

const GoogleSheets: React.FC = () => {
    const { token } = useAuth()
    const [authUrl, setAuthUrl] = useState<string | null>(null)

    const fetchAuthUrl = async () => {
        const response = await generateOAuthURL(token) as { url: string }
        setAuthUrl(response.url)
    }
    useEffect(() => {
        fetchAuthUrl()
    }, [])

    const handleGoogleAuth = () => {
        if (!authUrl) return;
        console.log("clicked")

        const popup = window.open(authUrl, "googleAuth", "width=500,height=600");
        if (!popup) {
            alert("Popup blocked! Please allow popups and try again.");
            return;
        }

        const checkClosed = setInterval(() => {
            if (popup.closed) {
                clearInterval(checkClosed);
            }
        }, 1000);
    };

    return (
        <Button onClick={handleGoogleAuth} className='bg-green-800 hover:bg-green-600 rounded-md'>Google sheets</Button>
    )
}

export default GoogleSheets