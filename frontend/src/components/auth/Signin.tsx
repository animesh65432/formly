import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../../components/ui/card"
import { GoogleLogin } from "@react-oauth/google"
import type { CredentialResponse } from "@react-oauth/google"
import React, { useState } from "react"
import Icons from "../Icons"


const Singin: React.FC = () => {
    const [loading, setloading] = useState<boolean>(false)
    const handleLoginSuccess = async (credentialResponse: CredentialResponse) => {
        setloading(true)
        try {
            console.log(credentialResponse)
        }
        catch {
        }
        finally {
            setloading(false)
        }
    }
    return (
        <div className="h-screen flex justify-center items-center">
            <Card className="w-[90vw] max-w-md shadow-xl rounded-2xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700">
                <CardHeader>
                    <CardTitle className="text-center text-2xl font-bold text-green-800 dark:text-white">
                        Sign in with Google
                    </CardTitle>
                    <CardDescription className="text-center text-gray-500 dark:text-gray-300">
                        Access your account using your Google credentials
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center py-6">
                    {loading ? <Icons.spinner className="animate-spin h-5 w-5" /> : <GoogleLogin
                        onSuccess={(credentialResponse) => {
                            handleLoginSuccess(credentialResponse)
                        }}
                    />}
                </CardContent>
                <CardFooter className="justify-center text-sm text-gray-400 dark:text-gray-500">
                    We do not store your personal data.
                </CardFooter>
            </Card>
        </div>
    )
}

export default Singin