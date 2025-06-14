import { Request, Response } from 'express'
import db from "../../../db";
import config from '../../../config';
import { asyncerrorhandler } from "../../../middlewares"
import { v4 } from "uuid"
import { redis } from "../../../service"
import { buildNotionProperties, notionRequestWithAutoRefresh } from '../../../utils/notionUtils';
import { getNotionClient, getNotionDatabaseUrl } from '../../../service/notionService';
import { EmailtoUser } from "../../../utils/EmailtoUser"
export const generateOAuthURL = asyncerrorhandler(async (req: Request, res: Response) => {
    const userId = req.user?.id;
    if (!userId) {
        res.status(400).json({ error: 'Missing userId parameter' });
        return;
    }

    const checkalreadyintragtedwithnotion = await db.integration.findFirst({
        where: {
            type: "NOTION",
            userId: userId
        }
    })

    if (checkalreadyintragtedwithnotion) {
        res.status(400).json({
            message: "user already authenticated with notion"
        })
        return
    }
    const key = v4()
    redis.set(key, userId)
    const notionAuthUrl = `https://api.notion.com/v1/oauth/authorize?client_id=${config.NOTION_CLIENT_ID}&response_type=code&owner=user&redirect_uri=${encodeURIComponent(config.NOTION_REDIRECT_URI as string)}&state=${key}`;
    res.json({ authUrl: notionAuthUrl });
    return;
});

export const handlenotionOAuthCallback = async (req: Request, res: Response) => {
    try {


        const { code, state } = req.query;
        if (!code || !state || typeof state !== 'string') {
            res.status(400).json({ error: 'No authorization code provided' });
            return
        }

        const userId = await redis.get(state) as string

        if (!userId) {
            res.status(200).json({
                message: "user not autheticatd"
            })
        }

        const response = await fetch('https://api.notion.com/v1/oauth/token', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Basic ${Buffer.from(`${process.env.NOTION_CLIENT_ID}:${process.env.NOTION_CLIENT_SECRET}`).toString('base64')}`
            },
            body: JSON.stringify({
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: config.NOTION_REDIRECT_URI
            })
        });

        const tokenData = await response.json();

        if (tokenData.error) {
            console.log(tokenData.error)
            throw new Error(tokenData.error_description || 'OAuth token exchange failed');
        }

        await db.integration.create({
            data: {
                type: "NOTION",
                userId: userId,
                config: {
                    access_token: tokenData.access_token,
                    workspace_name: tokenData.workspace_name,
                    workspace_icon: tokenData.workspace_icon,
                    workspace_id: tokenData.workspace_id,
                    bot_id: tokenData.bot_id
                }
            }
        })

        res.redirect(`${config.FRONTEND_URL}/intergations?notion=success`);
        return
    }
    catch {
        res.redirect(`${config.FRONTEND_URL}/intergations?notion=error`);
        return

    }

}

export const setupDatabaseController = asyncerrorhandler(async (req: Request, res: Response) => {
    const userId = req.user?.id;
    const { formId } = req.query
    const data = req.body

    if (!userId || !formId || typeof formId !== "string" || !data) {
        console.log(formId);
        res.status(400).json({ error: "Missing credentials" });
        return;
    }

    const form = await db.form.findFirst({
        where: { id: formId, userId },
    });
    if (!form) {
        res.status(404).json({ error: "Form not found or not owned by user" });
        return
    }

    if (form.notionId) {
        res.json({
            message: "Database already set up for this form",
            databaseId: form.notionId,
        });
        return
    }

    const integration = await db.integration.findFirst({
        where: { userId, type: "NOTION" },
    });
    if (!integration) {
        res.status(401).json({ error: "User not authenticated with Notion" });
        return
    }

    const cfg = integration.config as Record<string, any>;
    const notion = getNotionClient(cfg.access_token)


    const pageSearch = await notion.search({
        filter: { property: "object", value: "page" },
    });
    if (pageSearch.results.length === 0) {
        res.status(400).json({ error: "No pages found in Notion workspace" });
        return
    }
    const parentPage = pageSearch.results[0];

    const dbProperties: Record<string, any> = {};


    let titleKey = "";
    for (const key of Object.keys(data)) {
        if (key === "button" || key === "heading") {
            continue
        }
        else if (!titleKey) {
            titleKey = key;
            dbProperties[titleKey] = { title: {} };
        }
        else {
            dbProperties[key] = { rich_text: {} };
        }
    }

    const newDb = await notionRequestWithAutoRefresh(userId, () =>
        notion.databases.create({
            parent: { page_id: (parentPage as any).id },
            title: [
                {
                    type: "text",
                    text: { content: `Form Database - ${form.id}` },
                },
            ],
            properties: dbProperties,
        })
    );


    const updatefrom = db.form.update({
        where: { id: form.id },
        data: {
            notionId: newDb.id,

        },
    });

    const updatgeintegration = db.integration.update({ where: { id: integration.id }, data: { FromId: form.id } })

    await Promise.all([updatefrom, updatgeintegration])
    res.json({
        message: "Database created for form successfully",
        databaseId: newDb.id,
        databaseUrl: newDb.url,
    });
    return
});

export const uploadNotionData = asyncerrorhandler(async (req: Request, res: Response) => {
    const data = req.body;
    const fromId = req.query.fromId as string;

    if (!data || typeof data !== "object" || !data || !fromId) {
        res.status(400).json({ error: "Invalid request body: 'data' is missing or malformed" });
        return;
    }
    const form = await db.form.findFirst({ where: { id: fromId } });
    if (!form || !form.notionId) {
        res.status(404).json({ error: "Form does not exist" });
        return;
    }

    const userId = form.userId

    if (!userId) {
        res.status(200).json({
            message: "user not autheticatd"
        })
        return
    }

    const integration = await db.integration.findFirst({
        where: {
            type: "NOTION",
            userId,
            FromId: fromId,
        },
    });

    if (!integration) {
        res.status(401).json({ error: "Notion integration not found " });
        return;
    }
    const cfg = integration.config as {
        access_token: string;
        workspace_id: string;
        app_database_url?: string;
    };

    const notion = getNotionClient(cfg.access_token)
    const notionDb = await notionRequestWithAutoRefresh(userId, () =>
        notion.databases.retrieve({ database_id: form.notionId! })
    );

    const dbProps = notionDb.properties;
    const properties = buildNotionProperties(data, dbProps);
    await notionRequestWithAutoRefresh(userId, () =>
        notion.pages.create({ parent: { database_id: form.notionId! }, properties })
    );

    const databaseUrl = getNotionDatabaseUrl(cfg.workspace_id, form.notionId) || cfg.app_database_url || ""
    EmailtoUser(userId, null, databaseUrl)
    res.json({
        message: "Data uploaded to Notion successfully",
        databaseUrl
    });
    return
});
