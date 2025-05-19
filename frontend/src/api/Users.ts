import { Call } from "../service/call"

export const createUser = (name: string, email: string, password: string) => Call({
    method: "POST",
    request: { name, email, password },
    path: "/users/signup"
})

export const longinUser = (email: string, password: string) => Call({
    method: "POST",
    request: { email, password },
    path: "/users/login"
})

export const googleLogin = (credential: string, clientId: string) => Call({
    headers: {},
    method: "POST",
    request: { clientId, credential },
    path: "/users/google"
})