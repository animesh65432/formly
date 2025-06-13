import React from 'react'
import { Singin } from "../components"
import { GoogleOAuthProvider } from "@react-oauth/google"
import { config } from "../config"

const singinPage: React.FC = () => {
    return (
        <GoogleOAuthProvider clientId={config.GOOGLE_CLIENT_ID}>
            <div className='bg-slate-100 w-[100vw]'>
                <Singin />
            </div>
        </GoogleOAuthProvider>
    )
}

export default singinPage