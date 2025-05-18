import React from 'react'
import { Signup } from "../components"
import { GoogleOAuthProvider } from "@react-oauth/google"
import { config } from '../config'


const Singuppage: React.FC = () => {
    return (
        <GoogleOAuthProvider clientId={config.GOOGLE_CLIENT_ID}>
            <Signup />
        </GoogleOAuthProvider>
    )
}

export default Singuppage