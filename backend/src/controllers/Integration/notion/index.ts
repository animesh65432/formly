import { Request, Response } from 'express'
import { Client } from '@notionhq/client'
import db from "../../../db";
import config from '../../../config';
import { asyncerrorhandler } from "../../../middlewares"

export const generateOAuthURL = asyncerrorhandler(async (req: Request, res: Response) => {
    const notionAuthUrl = `https://api.notion.com/v1/oauth/authorize?client_id=${config.NOTION_REDIRECT_URI}&response_type=code&owner=user&redirect_uri=${encodeURIComponent(config.NOTION_REDIRECT_URI as string)}&userId=${req.user?.id}`;
    res.json({ authUrl: notionAuthUrl });
    return
})

export const handlenotionOAuthCallback = asyncerrorhandler(async (req: Request, res: Response) => {
    const { code, userId } = req.query;

    if (!code || !userId) {
        res.status(400).json({ error: 'No authorization code provided' });
        return
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
            redirect_uri: process.env.NOTION_REDIRECT_URI
        })
    });

    const tokenData = await response.json();

    if (tokenData.error) {
        throw new Error(tokenData.error_description || 'OAuth token exchange failed');
    }

    await db.integration.create({
        data: {
            type: "NOTION",
            userId: Number(userId),
            config: {
                access_token: tokenData.access_token,
                workspace_name: tokenData.workspace_name,
                workspace_icon: tokenData.workspace_icon,
                workspace_id: tokenData.workspace_id,
                bot_id: tokenData.bot_id
            }
        }
    })

    res.redirect(`http://localhost:5173/dashboard?userId=${userId}&success=true`);
    return

})


export const getUserProfileController = asyncerrorhandler(async (req, res) => {
    const { userId } = req.params;

    const userintegration = await db.integration.findFirst({
        where: {
            userId: Number(userId),
            type: "NOTION"
        }
    });

    if (!userintegration) {
        res.status(401).json({ error: 'User not authenticated' });
        return
    }

    const userToken = userintegration.config as {
        access_token: string,
        workspace_name: string,
        workspace_icon: string,
        workspace_id: string,
        bot_id: string
    };

    const notion = new Client({ auth: userToken.access_token });

    const user = await notion.users.me({});


    res.json({
        user,
        workspace: {
            name: userToken.workspace_name,
            icon: userToken.workspace_icon,
            id: userToken.workspace_id
        }
    });
    return
});



export const getUserDatabasesController = asyncerrorhandler(async (req: Request, res: Response) => {
    const { userId } = req.params;

    const userIntegration = await db.integration.findFirst({
        where: {
            userId: Number(userId),
            type: "NOTION"
        }
    });

    if (!userIntegration) {
        res.status(401).json({ error: 'User not authenticated' });
        return
    }

    const userToken = userIntegration.config as {
        access_token: string,
        workspace_name: string,
        workspace_icon: string,
        workspace_id: string,
        bot_id: string
    };

    const notion = new Client({ auth: userToken.access_token });


    const response = await notion.search({
        filter: {
            property: 'object',
            value: 'database'
        }
    });

    res.json({ databases: response.results });
    return
});

export const getUserPagesController = asyncerrorhandler(async (req: Request, res: Response) => {
    const { userId } = req.params;

    const userIntegration = await db.integration.findFirst({
        where: {
            userId: Number(userId),
            type: "NOTION"
        }
    });

    if (!userIntegration) {
        res.status(401).json({ error: 'User not authenticated' });
        return
    }

    const userToken = userIntegration.config as {
        access_token: string,
        workspace_name: string,
        workspace_icon: string,
        workspace_id: string,
        bot_id: string
    };

    const notion = new Client({ auth: userToken.access_token });


    const response = await notion.search({
        filter: {
            property: 'object',
            value: 'page'
        }
    });

    res.json({ pages: response.results });
    return

});



export const setupDatabaseController = asyncerrorhandler(async (req: Request, res: Response) => {
    const { userId } = req.params;

    const userIntegration = await db.integration.findFirst({
        where: {
            userId: Number(userId),
            type: "NOTION"
        }
    });

    if (!userIntegration) {
        res.status(401).json({ error: 'User not authenticated' });
        return
    }

    const userToken = userIntegration.config as {
        access_token: string,
        workspace_name: string,
        workspace_icon: string,
        workspace_id: string,
        bot_id: string
    };
    const notion = new Client({ auth: userToken.access_token });

    const dbSearch = await notion.search({
        query: 'My App Database',
        filter: { property: 'object', value: 'database' }
    });

    if (dbSearch.results.length > 0) {
        const existingDb = dbSearch.results[0];

        await db.integration.update({
            where: { id: userIntegration.id },
            data: {
                config: {
                    ...(userIntegration.config as Record<string, any>),
                    app_database_id: existingDb.id,
                    app_database_url: 'url' in existingDb ? existingDb.url : null
                }
            }
        });

        res.json({
            message: 'Found existing database',
            database: existingDb,
            databaseUrl: 'url' in existingDb ? existingDb.url : null
        });
        return
    }


    const pageSearch = await notion.search({
        filter: { property: 'object', value: 'page' }
    });

    if (pageSearch.results.length === 0) {
        res.status(400).json({
            error: 'No pages found. Please create a page in your Notion workspace first.'
        });
        return
    }

    let parentPage = pageSearch.results.find(page => {

        const titleProperty = 'properties' in page ? page.properties?.title : undefined;
        let title = '';

        if (titleProperty && Array.isArray(titleProperty)) {
            title = titleProperty[0]?.plain_text || '';
        } else if ('properties' in page && page.properties?.title && Array.isArray(page.properties.title)) {
            const titleProperty = 'properties' in page && page.properties?.title;
            title = Array.isArray(titleProperty) ? titleProperty[0]?.plain_text || '' : '';
        }

        return ['Home', 'Workspace'].includes(title);
    }) || pageSearch.results[0];


    const database = await notion.databases.create({
        parent: { page_id: parentPage.id },
        title: [
            {
                type: 'text',
                text: { content: 'My App Database' }
            }
        ],
        properties: {
            'Title': { title: {} },
            'Content': { rich_text: {} },
            'Created At': { created_time: {} },
            'Status': {
                select: {
                    options: [
                        { name: 'Draft', color: 'yellow' },
                        { name: 'Published', color: 'green' },
                        { name: 'Archived', color: 'red' }
                    ]
                }
            }
        }
    });

    await db.integration.update({
        where: { id: userIntegration.id },
        data: {
            config: {
                ...(typeof userIntegration.config === 'object' && userIntegration.config !== null ? userIntegration.config : {}),
                app_database_id: database.id,
                app_database_url: 'url' in database ? (database.url as string) : null
            }
        }
    });

    res.json({
        message: 'Database created successfully',
        database,
        databaseUrl: 'url' in database ? (database.url as string) : null
    });
    return
});

export const getAppDatabaseController = asyncerrorhandler(async (req: Request, res: Response) => {
    const { userId } = req.params;
    const integration = await db.integration.findFirst({
        where: {
            userId: Number(userId),
            type: "NOTION"
        }
    });

    if (!integration) {
        res.status(401).json({ error: 'User not authenticated' });
        return
    }

    const userToken = integration.config as {
        access_token: string,
        workspace_name: string,
        workspace_icon: string,
        workspace_id: string,
        bot_id: string,
        app_database_id: string
    };


    const notion = new Client({ auth: userToken.access_token });

    const database = await notion.databases.retrieve({
        database_id: userToken.app_database_id,
    });

    res.json({
        hasDatabase: true,
        database,
        databaseUrl: 'url' in database ? database.url : null,
    });
    return

});


export const getPageContentController = asyncerrorhandler(async (req: Request, res: Response) => {
    const { userId, pageId } = req.params;
    const integration = await db.integration.findFirst({
        where: {
            userId: Number(userId),
            type: "NOTION"
        }
    });

    if (!integration) {
        res.status(401).json({ error: 'User not authenticated' });
        return
    }

    const userToken = integration.config as {
        access_token: string,
        workspace_name: string,
        workspace_icon: string,
        workspace_id: string,
        bot_id: string
    };

    const notion = new Client({ auth: userToken.access_token });

    const page = await notion.pages.retrieve({ page_id: pageId });
    const blocks = await notion.blocks.children.list({ block_id: pageId });

    res.json({ page, blocks: blocks.results });
    return
});
