import { Request, Response } from "express";
import axios from "axios";
import { asyncerrorhandler } from "../../../middlewares";
import config from "../../../config";
import db from "../../../db";
import { refreshGoogleAccessToken } from "../../../utils"
import { EmailtoUser } from "../../../utils/EmailtoUser"
const redirect_uri = config.GOOGLE_SHEETS_REDIRECT_URI as string;

export const generateOAuthURL = asyncerrorhandler(async (req: Request, res: Response) => {
    const userId = req.user?.id
    if (!userId) {
        res.status(200).json({
            message: "user not autheticatd"
        })
    }
    const checkalreadyintragtedwithgoogle = await db.integration.findFirst({
        where: {
            userId,
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
    try {

        const { code, state } = req.query;
        const codeString = Array.isArray(code) ? code[0] : typeof code === "string" ? code : undefined;
        const userId = state
        if (!codeString || !userId || typeof userId !== "string") {
            res.status(400).send("Missing authorization code or user ID");
            return
        }
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



        res.redirect(`${config.FRONTEND_URL}/integrationwindow?google=success`);
        return
    }
    catch {
        res.redirect(`${config.FRONTEND_URL}/integrationwindow?google=error`);
        return

    }

}


export const createGoogleSheet = asyncerrorhandler(async (req: Request, res: Response) => {
    const fromId = req.query.fromId
    const userId = req.user?.id

    if (!fromId || typeof fromId !== "string") {
        res.status(401).json({ error: "User not authenticated" });
        return;
    }
    const integration = await db.integration.findFirst({
        where: {
            userId
            , type: "GOOGLE_SHEETS"
        },
    });

    if (!integration) {
        res.status(401).json({ error: "User not authenticated" });
        return;
    }

    let { access_token, refresh_token } = integration.config as any
    try {
        const response = await axios.post(
            "https://sheets.googleapis.com/v4/spreadsheets",
            { properties: { title: "New Form Sheet" } },
            { headers: { Authorization: `Bearer ${access_token}` } }
        );

        const sheetId = response.data.spreadsheetId;
        const sheetUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/edit`;

        await db.form.update({
            where: { id: fromId },
            data: { googleSheetId: sheetId }
        });

        res.json({ sheetId, sheetUrl });
        return
    } catch (error: any) {
        console.log(error.response?.status, "status code", refresh_token)
        if (error.response?.status === 401 && refresh_token) {
            console.log("errors")
            const newTokens = await refreshGoogleAccessToken(refresh_token);
            access_token = newTokens.access_token;
            await db.integration.update({
                where: { id: integration.id },
                data: {
                    config: {
                        access_token,
                        expires_in: newTokens.expires_in,
                        refresh_token: newTokens.refresh_token ? newTokens.refresh_token : refresh_token
                    }
                }
            });


            const retryResponse = await axios.post(
                "https://sheets.googleapis.com/v4/spreadsheets",
                { properties: { title: "New Form Sheet" } },
                { headers: { Authorization: `Bearer ${access_token}` } }
            );

            const sheetId = retryResponse.data.spreadsheetId;


            await db.form.update({
                where: { id: fromId },
                data: { googleSheetId: sheetId }
            });

            res.json({ sheetId });
            return
        } else {
            console.error("Google Sheets Error", error.response?.data || error.message);
            res.status(500).json({ error: "Failed to create Google Sheet" });
            return
        }
    }
});

export const uploadSheetData = asyncerrorhandler(async (req: Request, res: Response) => {
    const { data } = req.body as { data: Record<string, string> };
    const fromId = req.query.fromId;

    if (!fromId || typeof fromId !== "string") {
        res.status(401).json({ error: "User not authenticated" });
        return;
    }

    const form = await db.form.findFirst({ where: { id: fromId } });
    if (!form) {
        res.status(404).json({ error: "Form does not exist" });
        return;
    }

    const userId = form.userId
    const sheetId = req.query.sheetId as string;

    if (!sheetId || !userId) {
        res.status(400).json({ error: "Missing sheet ID or userId is missing" });
        return;
    }

    const integration = await db.integration.findFirst({
        where: { type: "GOOGLE_SHEETS", enabled: true, userId },
    }) as any | undefined

    if (!integration) {
        res.status(401).json({ error: "Google Sheets integration not found" });
        return;
    }


    let access_token = integration.config.access_token
    const expires_at = integration.config.expires_at || 0;

    if (Date.now() > expires_at) {
        const refreshed = await refreshGoogleAccessToken(integration.config.refresh_token);
        access_token = refreshed.access_token;
        await db.integration.update({
            where: { id: integration.id },
            data: {
                config: {
                    ...integration.config,
                    access_token: refreshed.access_token,
                    expires_at: Date.now() + (refreshed.expires_in * 1000),
                }
            }
        });
    }
    let response
    const dataValues = Object.values(data);
    const dataKeys = Object.keys(data)
    if (!form.isHeaderWritten) {
        const values = [dataKeys, dataValues];
        response = await axios.post(
            `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1!A1:append?valueInputOption=USER_ENTERED`,
            { values },
            { headers: { Authorization: `Bearer ${access_token}` } }
        );

        await db.form.update({
            where: {
                id: fromId
            },
            data: {
                isHeaderWritten: true
            }
        })
    }
    else {
        const values = [dataValues];
        response = await axios.post(
            `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1!A1:append?valueInputOption=USER_ENTERED`,
            { values },
            { headers: { Authorization: `Bearer ${access_token}` } }
        );
    }
    const sheetUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/edit`;

    await EmailtoUser(userId, sheetUrl, null)

    res.json({
        message: "Data appended successfully",
        updatedRange: response.data.updates.updatedRange,
    });
});


