import { Call } from "../service/call";

export const gethefileurl = (token: string, file: any) => {
    return Call({
        headers: { Authorization: token },
        path: `/file/upload`,
        method: "POST",
        request: {
            file
        }
    });
};
