import axios from "axios";
import type { AxiosRequestConfig, AxiosResponse } from "axios";
import { config } from "../config";
import { toast } from "react-toastify"

const apiUrl = config.API_URL;

export async function Call<T, ResponseType>({
    path,
    request,
    suppressError = false,
    headers = {},
    method,
    formDataRequest = false,
}: {
    path: string;
    request?: T;
    suppressError?: boolean;
    autoClose?: number | false;
    method: "POST" | "GET" | "PUT" | "DELETE";
    headers?: Record<string, string>;
    formDataRequest?: boolean;
}): Promise<ResponseType> {
    const mergedPath = path.startsWith("https://") ? path : `${apiUrl}${path}`;

    const config: AxiosRequestConfig = {
        method,
        url: mergedPath,
        headers: headers || {}
    };

    if (formDataRequest && request instanceof FormData) {
        config.data = request;
    } else if (request) {
        config.data = JSON.stringify(request);
        config.headers = {
            ...config.headers,
            'Content-Type': 'application/json',
        };
    }

    try {
        const response: AxiosResponse<ResponseType> = await axios(config);
        return response.data;
    } catch (error: unknown) {
        const errMsg = "Something went wrong.";

        if (!suppressError) {
            console.error(error);
        }

        if (axios.isAxiosError(error)) {
            if (error.response) {
                console.error("Error Response:", error.response.data);
                toast.error(`${error.response.data.message}`)
                console.error("Error Status:", error.response.status);
            } else if (error.request) {
                console.error("Error Request:", error.request);
            } else {
                console.error("Error Message:", error.message);
            }
        }

        throw { handled: !suppressError, wrapped: error instanceof Error ? error.message : errMsg };
    }
}