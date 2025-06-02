import { Request, Response } from "express";
import axios from "axios";
import { asyncerrorhandler } from "../../../middlewares";
import config from "../../../config";
import db from "../../../db";
const redirect_uri = config.GOOGLE_SHEETS_REDIRECT_URI as string;

export const generateOAuthURL = asyncerrorhandler(async (req: Request, res: Response) => {
    const checkalreadyintragtedwithgoogle = await db.integration.findFirst({
        where: {
            userId: Number(req.user?.id),
            type: "GOOGLE_SHEETS"
        }
    })

    if (checkalreadyintragtedwithgoogle) {
        res.status(400).json({ message: "already authenticated with google" })
        return
    }
    const scope = [
        "https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/spreadsheets",
        "https://www.googleapis.com/auth/drive.readonly",
    ].join(" ");

    const params = new URLSearchParams({
        client_id: config.GOOGLE_SHEETS_CLIENT_ID!,
        redirect_uri,
        response_type: "code",
        access_type: "offline",
        prompt: "consent",
        scope,
    });
    params.append("state", req.user?.id?.toString() || "");


    res.json({
        url: `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`,
    });
});

export const handleGoogleOAuthCallback = async (req: Request, res: Response) => {
    const { code, state } = req.query;
    const codeString = Array.isArray(code) ? code[0] : typeof code === "string" ? code : undefined;
    const userId = Number(state)
    if (!codeString || !userId) {
        res.status(400).send("Missing authorization code or user ID");
        return
    }

    try {
        const tokenResponse = await axios.post(
            "https://oauth2.googleapis.com/token",
            new URLSearchParams({
                code: codeString as string,
                client_id: config.GOOGLE_SHEETS_CLIENT_ID!,
                client_secret: config.GOOGLE_SHEETS_CLIENT_SECRET!,
                redirect_uri,
                grant_type: "authorization_code",
            }),
            { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        );

        const tokens = tokenResponse.data;

        const userInfoResponse = await axios.get(`https://www.googleapis.com/oauth2/v2/userinfo?access_token=${tokens.access_token}`);
        const userEmail = userInfoResponse.data.email;

        await db.integration.create({
            data: {
                type: "GOOGLE_SHEETS",
                enabled: true,
                config: {
                    access_token: tokens.access_token,
                    refresh_token: tokens.refresh_token,
                    expires_in: tokens.expires_in,
                    scope: tokens.scope,
                },
                userId
            },
        });



        res.send(`
      <div style="font-family: Arial; text-align: center; margin-top: 50px;">
        <h2>✅ Successfully Connected!</h2>
        <p>Email: ${userEmail}</p>
        <p>You can now close this window and return to your app.</p>
        <script> setTimeout(() => window.close(), 3000); </script>
      </div>
    `);
    } catch (error: any) {
        console.error("OAuth Error ❌", error.response?.data || error.message);
        res.status(500).send(`
      <div style="font-family: Arial; text-align: center; margin-top: 50px;">
        <h2>❌ OAuth Failed</h2>
        <p>Error: ${error.response?.data?.error_description || error.message}</p>
      </div>
    `);
    }
}

export const createGoogleSheet = asyncerrorhandler(async (req: Request, res: Response) => {
    const userId = Number(req.user?.id);
    const { title = "New From Sheet" } = req.body;

    const integration = await db.integration.findFirst({
        where: { type: "GOOGLE_SHEETS", enabled: true, userId },
    });

    if (!integration) {
        res.status(401).json({ error: "User not authenticated" });
        return
    }

    const access_token = (integration.config as any).access_token;

    const response = await axios.post(
        "https://sheets.googleapis.com/v4/spreadsheets",
        { properties: { title } },
        { headers: { Authorization: `Bearer ${access_token}` } }
    );

    const sheetId = response.data.spreadsheetId;
    const sheetUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/edit`;

    await db.integration.update({
        where: { id: integration.id },
        data: {
            GoogleSheetId: sheetId,
        }
    })
    res.json({ sheetId, sheetUrl });
    return
});

export const listGoogleSheets = asyncerrorhandler(async (req: Request, res: Response) => {
    const userId = Number(req.user?.id);

    const integration = await db.integration.findFirst({
        where: { type: "GOOGLE_SHEETS", enabled: true, userId },
    });

    if (!integration) {
        res.status(401).json({ error: "User not authenticated" });
        return
    }

    const access_token = (integration.config as any).access_token;

    const response = await axios.get("https://www.googleapis.com/drive/v3/files", {
        headers: { Authorization: `Bearer ${access_token}` },
        params: {
            q: "mimeType='application/vnd.google-apps.spreadsheet'",
            fields: "files(id,name,createdTime,modifiedTime)",
        },
    });

    res.json({ sheets: response.data.files });
    return
});

export const getSheetData = asyncerrorhandler(async (req: Request, res: Response) => {
    const { range = "A1:Z1000" } = req.query;
    const userId = Number(req.user?.id);

    const integration = await db.integration.findFirst({
        where: { type: "GOOGLE_SHEETS", enabled: true, userId },
    });

    if (!integration) {
        res.status(401).json({ error: "User not authenticated" });
        return
    }

    const access_token = (integration.config as any).access_token;

    const response = await axios.get(
        `https://sheets.googleapis.com/v4/spreadsheets/${integration.userId}/values/${range}`,
        { headers: { Authorization: `Bearer ${access_token}` } }
    );

    res.json({ data: response.data.values, range: response.data.range });
    return
});

export const updateSheetData = asyncerrorhandler(async (req: Request, res: Response) => {
    const { range, values } = req.body;
    const userId = Number(req.user?.id);

    if (!range || !values) {
        res.status(400).json({ error: "Missing range or values" });
        return
    }

    const integration = await db.integration.findFirst({
        where: { type: "GOOGLE_SHEETS", enabled: true, userId },
    });

    if (!integration) {
        res.status(401).json({ error: "User not authenticated" });
        return
    }

    const access_token = (integration.config as any).access_token;

    const response = await axios.put(
        `https://sheets.googleapis.com/v4/spreadsheets/${integration.GoogleSheetId}/values/${range}?valueInputOption=USER_ENTERED`,
        { values },
        { headers: { Authorization: `Bearer ${access_token}` } }
    );

    res.json({ updatedRange: response.data.updatedRange });
    return
});

export const getSheetMetadata = asyncerrorhandler(async (req: Request, res: Response) => {
    const { email } = req.params;

    const integration = await db.integration.findFirst({
        where: { type: "GOOGLE_SHEETS", enabled: true, user: { email } },
    });
    if (!integration) {
        res.status(401).json({ error: "User not authenticated" });
        return
    }
    const access_token = (integration.config as any).access_token;

    const response = await axios.get(`https://sheets.googleapis.com/v4/spreadsheets/${integration.GoogleSheetId}`, {
        headers: { Authorization: `Bearer ${access_token}` },
    });

    const { properties, sheets } = response.data;

    res.json({
        title: properties.title,
        sheets: sheets.map((sheet: any) => ({
            title: sheet.properties.title,
            sheetId: sheet.properties.sheetId,
            gridProperties: sheet.properties.gridProperties,
        })),
    });
    return
});
