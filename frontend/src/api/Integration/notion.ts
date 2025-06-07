import { Call } from "../../service/call"

export const generateOAuthURL = (token: string) => Call({
    headers: {
        Authorization: token
    },
    path: "/integration/notion/oauth",
    method: "GET"
})

export const setupThenotiondatabase = (token: string, fromId: string, data: Record<string, string>) => Call({
    headers: {
        Authorization: token
    },
    path: `/integration/notion/setup?formId=${fromId}`,
    method: "POST",
    request: {
        ...data
    }
})

export const uploadDatanotiondatabase = (token: string, fromId: string, data: Record<string, string>) => Call({
    headers: {
        Authorization: token
    },
    path: `/integration/notion/upload?fromId=${fromId}`,
    method: "POST",
    request: {
        ...data
    }
})

