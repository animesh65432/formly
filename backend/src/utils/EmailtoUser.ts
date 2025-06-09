import config from "../config";
import db from "../db";
import nodemailer from "../service/nodemailer";

export const EmailtoUser = async (
    userId: string,
    googleSheeturl: string | null,
    notionurl: string | null
) => {
    try {
        const user = await db.user.findUnique({
            where: { id: userId },
        });
        let message = "";

        if (googleSheeturl) {
            message += `✅ Your data has been updated in the linked Google Sheet (ID: ${googleSheeturl}).\n`;
        }

        if (notionurl) {
            message += `✅ Your data has been updated in the linked Notion document (ID: ${notionurl}).\n`;
        }

        if (message) {
            await nodemailer.sendMail({
                from: config.NODEMAILER_EMAIL,
                to: user?.email,
                subject: "Your Data Update Notification",
                text: message,
            });
        }
    } catch (error) {
        console.error("Failed to send email:", error);
    }
};
