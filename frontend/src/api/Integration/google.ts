import { Call } from "../../service/call"

export const generateOAuthURL = (token: string) => Call({
    headers: {
        Authorization: token
    },
    path: "/integration/googlesheets/oauth",
    method: "GET"
})


export const handleGoogleOAuthCallback = (token: string) => Call({
    headers: {
        Authorization: token
    },
    path: "/integration/googlesheets/oauth",
    method: "GET"
})