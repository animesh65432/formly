import config from "../config";
import { createTransport } from "nodemailer"

const transporter = createTransport({
    service: 'gmail',
    auth: {
        user: config.NODEMAILER_EMAIL,
        pass: config.NODEMAILER_EMAIL_PASSWORD,
    },
});

export default transporter