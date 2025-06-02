import { generateOAuthURL, handlenotionOAuthCallback } from "../../../controllers/Integration/notion"
import { Router } from "express"
import { auth } from "../../../middlewares"

const notion = Router()

notion.get("/oauth", auth, generateOAuthURL)
notion.get("/oauth/callback", handlenotionOAuthCallback)

export default notion