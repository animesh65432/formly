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

        return response.data; // contains new access_token, expires_in, etc.
    } catch (error: any) {
        console.error("Failed to refresh token", error.response?.data || error.message);
        throw new Error("Token refresh failed");
    }
};


export function colIndexToLetter(col: number): string {
    let s = "";
    while (col >= 0) {
        s = String.fromCharCode((col % 26) + 65) + s;
        col = Math.floor(col / 26) - 1;
    }
    return s;
}

export function makeA1Range(
    sheetName: string,
    startRow: number,
    startColIdx: number,
    values2D: string[][]
): string {
    const numRows = values2D.length;
    const numCols = values2D[0]?.length || 1;

    const startColLetter = colIndexToLetter(startColIdx);
    const endColLetter = colIndexToLetter(startColIdx + numCols - 1);

    const startCell = `${startColLetter}${startRow}`;
    const endCell = `${endColLetter}${startRow + numRows - 1}`;

    return `${sheetName}!${startCell}:${endCell}`;
}
