import { Client } from '@notionhq/client';

export const getNotionClient = (accessToken: string) => {
    return new Client({ auth: accessToken });
};

export const getNotionDatabaseUrl = (workspaceId: string, dbId: string): string => {
    return `https://www.notion.so/${workspaceId.replace(/-/g, '')}/${dbId.replace(/-/g, '')}`;
};
