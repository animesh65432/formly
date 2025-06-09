import axios from "axios";
import config from "../config";
import db from "../db";
import { Client } from "@notionhq/client";


export const buildNotionProperties = (
    data: Record<string, any>,
    dbProps: Record<string, any>
): Record<string, any> => {
    const properties: Record<string, any> = {};

    for (const [key, value] of Object.entries(data)) {
        const prop = dbProps[key];
        if (!prop) continue;

        switch (prop.type) {
            case "title":
                properties[key] = { title: [{ text: { content: String(value) } }] };
                break;
            case "rich_text":
                properties[key] = { rich_text: [{ text: { content: String(value) } }] };
                break;
            case "number":
                properties[key] = { number: Number(value) };
                break;
            case "select":
                properties[key] = { select: { name: String(value) } };
                break;
            case "multi_select":
                properties[key] = {
                    multi_select: String(value)
                        .split(",")
                        .map((v) => ({ name: v.trim() })),
                };
                break;
            case "email":
                properties[key] = { email: String(value) };
                break;
            case "phone_number":
                properties[key] = { phone_number: String(value) };
                break;
            case "url":
                properties[key] = { url: String(value) };
                break;
            default:
                console.warn(`Unsupported Notion property: ${key}`);
                break;
        }
    }

    return properties;
};

export const refreshNotionAccessToken = async (userId: string) => {
    const integration = await db.integration.findFirst({
        where: { userId, type: "NOTION" },
    });

    if (!integration) throw new Error("No Notion integration found");

    const cfg = integration.config as { refresh_token: string };

    if (!cfg.refresh_token) throw new Error("Missing refresh token");

    const response = await axios.post("https://api.notion.com/v1/oauth/token", {
        grant_type: "refresh_token",
        refresh_token: cfg.refresh_token,
        client_id: config.NOTION_CLIENT_ID,
        client_secret: config.NOTION_CLIENT_SECRET,
    });

    const newToken = response.data;


    await db.integration.update({
        where: { id: integration.id },
        data: {
            config: {
                ...cfg,
                access_token: newToken.access_token,

            }
        }
    });

    return newToken.access_token;
};



export const notionRequestWithAutoRefresh = async (
    userId: string,
    requestFn: (client: Client) => Promise<any>
) => {
    const integration = await db.integration.findFirst({
        where: { userId, type: "NOTION" },
    });

    if (!integration) throw new Error("Notion integration not found");

    let cfg = integration.config as any;
    let client = new Client({ auth: cfg.access_token });

    try {
        return await requestFn(client);
    } catch (err: any) {
        if (err.status === 401 || err.code === "unauthorized") {
            const newAccessToken = await refreshNotionAccessToken(userId);
            client = new Client({ auth: newAccessToken });
            return await requestFn(client);
        }
        throw err;
    }
};
