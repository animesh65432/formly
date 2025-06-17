import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../../../components/ui/card"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { GoogleLogin } from "@react-oauth/google"
import type { CredentialResponse } from "@react-oauth/google"
import React, { useState } from "react"
import Icons from "../../Icons"
import { SingupSchema } from "../../../schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import type { z } from "zod"
import { useNavigate } from "react-router-dom"
import { createUser, googleLogin } from "../../../api/Users"
import Hi from "../../Hi"
import { toast } from "react-toastify"
import { useAuth } from "../../../store/auth"

type SigninSchemaType = z.infer<typeof SingupSchema>

const Signup: React.FC = () => {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { addtoken } = useAuth()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SigninSchemaType>({
        resolver: zodResolver(SingupSchema),
    })

    const onSubmit = async (data: SigninSchemaType) => {
        setLoading(true)
        try {
            await createUser(data.name, data.email, data.password)
            toast.success("Signup successful")
        } catch (error) {
            console.error("Login failed", error)
        } finally {
            setLoading(false)
        }
    }

    const handleLoginSuccess = async (credentialResponse: CredentialResponse) => {
        setLoading(true)
        try {
            const response = await googleLogin(credentialResponse.credential as string, credentialResponse.clientId as string) as { token: string }
            addtoken(response?.token)
            toast.success("Login successful")
        } catch (error) {
            console.error("Google login failed", error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="h-[100vh] overflow-auto w-[100vw] md:flex md:flex-row flex flex-col justify-around items-center">
            <Hi />
            <Card className="w-[90vw] flex flex-col gap-2 max-w-md shadow-xl rounded-2xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700">
                <CardHeader>
                    <CardTitle className="text-center text-2xl font-bold text-green-800 dark:text-white">
                        Sign up
                    </CardTitle>
                </CardHeader>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <CardContent className="space-y-4 flex flex-col items-center">
                        <div className="grid gap-2 w-[90%]">
                            <Label htmlFor="email" className="dark:text-white">Name</Label>
                            <Input id="email" type="email" {...register("name")} />
                            {errors.name && (
                                <p className="text-sm text-red-500">{errors.name?.message}</p>
                            )}
                        </div>
                        <div className="grid gap-2 w-[90%]">
                            <Label htmlFor="email" className="dark:text-white">Email</Label>
                            <Input id="email" type="email" {...register("email")} />
                            {errors.email && (
                                <p className="text-sm text-red-500">{errors.email.message}</p>
                            )}
                        </div>
                        <div className="grid gap-2 w-[90%]">
                            <Label htmlFor="password" className="dark:text-white">Password</Label>
                            <Input id="password" type="password" {...register("password")} />
                            {errors.password && (
                                <p className="text-sm text-red-500">{errors.password.message}</p>
                            )}
                        </div>
                        <Button type="submit" className=" rounded-md w-[30%]  bg-green-800 hover:bg-green-700" disabled={loading}>
                            {loading ? <Icons.spinner className="animate-spin h-4 w-4" /> : "Sign up"}
                        </Button>
                    </CardContent>
                </form>

                <CardContent className="flex flex-col items-center justify-center py-4">
                    <div className="flex gap-0.5 items-start">
                        have an account?{" "}
                        <span
                            className="text-green-800 dark:text-white"
                            onClick={() => navigate("/signin")}
                        >Sign in</span>
                    </div>
                    <div className="md:text-xl text-sm text-black font-semibold dark:text-gray-500">or</div>
                </CardContent>

                <CardContent className="flex justify-center pb-4">
                    {loading ? (
                        <Icons.spinner className="animate-spin h-5 w-5" />
                    ) : (
                        <GoogleLogin onSuccess={handleLoginSuccess} />
                    )}
                </CardContent>

                <CardFooter className="justify-center text-sm text-gray-400 dark:text-gray-500">
                    We do not store your personal data.
                </CardFooter>
            </Card>
        </div>
    )
}

export default Signup