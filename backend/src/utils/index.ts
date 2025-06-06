import jsonwebtoken from "jsonwebtoken"
import config from "../config"
import axios from "axios"
export const createToken = (email: string): string => {
    const token = jsonwebtoken.sign(
        { email },
        process.env.JWT_SECRET as string)
    return token
}

export const refreshGoogleAccessToken = async (refresh_token: string) => {
    try {
        console.log(refresh_token, "token")
        const response = await axios.post(
            "https://oauth2.googleapis.com/token",
            new URLSearchParams({
                client_id: config.GOOGLE_SHEETS_CLIENT_ID!,
                client_secret: config.GOOGLE_SHEETS_CLIENT_SECRET!,
                grant_type: "refresh_token",
                refresh_token
            }),
            { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        );


        return response.data;
    } catch (error: any) {
        console.error("Failed to refresh token", error.response?.data || error.message);
        throw new Error("Token refresh failed");
    }
};

