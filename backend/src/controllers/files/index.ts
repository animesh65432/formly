import { Request, Response } from 'express';
import { asyncerrorhandler } from "../../middlewares";
import cloudinary from '../../service/cloudinary';

export const upload = asyncerrorhandler(async (req: Request, res: Response) => {
    const { file } = req.body;

    console.log(file)

    if (!file || typeof file !== "string") {
        res.status(400).json({ message: "No file provided" });
        return
    }


    const matches = file.match(/^data:(.*?);base64,(.*)$/);
    if (!matches || matches.length !== 3) {
        res.status(400).json({ message: "Invalid base64 format" });
        return
    }

    const mimeType = matches[1];
    const base64Data = matches[2];

    const isPDF = mimeType === "application/pdf";

    const uploadResult = await cloudinary.uploader.upload(`data:${mimeType};base64,${base64Data}`, {
        resource_type: isPDF ? "raw" : "auto"
    });

    res.status(200).json({
        message: "Upload successful",
        url: uploadResult.secure_url
    });
    return
});