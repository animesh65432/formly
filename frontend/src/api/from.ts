import { Call } from "../service/call"


export const Get = () => Call({
    headers: {},
    path: "/form/Get",
    method: "GET"
})

export const create = () => Call({
    headers: {},
    path: "/form",
    method: "POST"
})