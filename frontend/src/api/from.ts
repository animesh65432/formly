import { Call } from "../service/call"
import type { FormBlock, Blocks, GetFormResponse } from "../types"

export const Get = (token: string) =>
    Call<undefined, Blocks>({
        headers: {
            Authorization: token,
        },
        path: "/form/Get",
        method: "GET",
    });


export const create = (token: string, block: FormBlock[]) => Call({
    headers: {
        Authorization: token
    },
    path: "/form/create",
    method: "POST",
    request: { block }
})

export const GetUserfroms = (token: string) => Call<undefined, Blocks>({
    headers: {
        Authorization: token
    },
    path: "/form/GetUser",
    method: "GET"
})

export const Delete = (token: string, id: string) => Call({
    headers: {
        Authorization: token
    },
    path: `/form/delete/${id}`,
    method: "DELETE"
})

export const update = (token: string, block: FormBlock[], id: string) => Call({
    headers: { Authorization: token },
    path: `/form/update/${id}`,
    method: "PUT",
    request: {
        block
    }
})

export const GetfrombyId = (token: string, id: string) => Call<undefined, GetFormResponse>({
    headers: {
        Authorization: token
    },
    path: `/form/GetfrombyId/${id}`,
    method: "GET"
})