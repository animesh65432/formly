import { Call } from "../../service/call"

export const generateOAuthURL = (token: string) => Call({
    headers: {
        Authorization: token
    },
    path: "/integration/googlesheets/oauth",
    method: "GET"
})

export const createGoogleSheet = (token: string, fromId: string) => Call({
    headers: {
        Authorization: token
    },
    path: `/integration/googlesheets/sheets?fromId=${fromId}`,
    method: "POST"
})

export const uploadGoogleSheet = (token: string, sheetId: string, data: Record<string, string>, fromId: string) => Call({
    headers: {
        Authorization: token
    },
    path: `/integration/googlesheets/upload?sheetId=${sheetId}&fromId=${fromId}`,
    method: "PUT",
    request: {
        data
    }
})