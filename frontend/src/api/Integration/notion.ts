import { Call } from "../../service/call"

export const generateOAuthURL = (token: string) => Call({
    headers: {
        Authorization: token
    },
    path: "/integration/notion/oauth",
    method: "GET"
})


