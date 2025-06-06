import jsonwebtoken from "jsonwebtoken"
import config from "../config"
import axios from "axios"
function buildMultipartRequestBody(
    fileBuffer: Buffer,
    filename: string,
    mimeType: string
): string {
    const boundary = "foo_bar_baz";

    const metaData = JSON.stringify({
        name: filename,
        mimeType,
    });

    const body = [
        `--${boundary}`,
        'Content-Type: application/json; charset=UTF-8',
        '',
        metaData,
        `--${boundary}`,
        `Content-Type: ${mimeType}`,
        '',
        fileBuffer.toString("base64"),
        `--${boundary}--`,
    ].join("\r\n");

    return body;
}

async function uploadToDrive(
    base64Data: string,
    filename: string,
    mimeType: string,
    accessToken: string
): Promise<string> {
    try {


        const fileData = base64Data.split(",")[1];
        const buffer = Buffer.from(fileData, "base64");
        const uploadResponse = await axios.post(
            "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart",
            buildMultipartRequestBody(buffer, filename, mimeType),
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "multipart/related; boundary=foo_bar_baz",
                },
            }
        );

        const fileId = uploadResponse.data.id;

        await axios.post(
            `https://www.googleapis.com/drive/v3/files/${fileId}/permissions`,
            {
                role: "reader",
                type: "anyone",
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            }
        );

        return `https://drive.google.com/uc?id=${fileId}`;
    }
    catch (err: any) {
        console.error("Upload failed:", err?.response?.data || err.message);
        return ""
    }
}


function isBase64Image(value: string): boolean {
    return value.startsWith("data:image/");
}

function isBase64File(value: string): boolean {
    return value.startsWith("data:application/") || value.startsWith("data:text/");
}

function getMimeType(base64String: string): string {
    const match = base64String.match(/^data:([^;]+);base64,/);
    return match ? match[1] : "application/octet-stream";
}


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

export async function processFormData(
    data: Record<string, string>,
    accessToken: string
): Promise<Record<string, string>> {
    const result: Record<string, string> = {};

    for (const [key, value] of Object.entries(data)) {
        if (isBase64Image(value)) {
            console.log("clicked")
            const mime = getMimeType(value);
            const ext = mime.split("/")[1];
            result[key] = await uploadToDrive(value, `${key}_${Date.now()}.${ext}`, mime, accessToken);
        } else if (isBase64File(value)) {
            const mime = getMimeType(value);
            const ext = mime.split("/")[1];
            result[key] = await uploadToDrive(value, `${key}_${Date.now()}.${ext}`, mime, accessToken);
        } else {
            result[key] = value;
        }
    }

    return result;
}
