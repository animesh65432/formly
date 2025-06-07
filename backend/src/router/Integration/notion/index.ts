import { generateOAuthURL, handlenotionOAuthCallback, setupDatabaseController, uploadNotionData } from "../../../controllers/Integration/notion"
import { Router } from "express"
import { auth } from "../../../middlewares"

const notion = Router()

notion.get("/oauth", auth, generateOAuthURL)
notion.get("/oauth/callback", handlenotionOAuthCallback)
notion.post("/setup", auth, setupDatabaseController)
notion.post("/upload", auth, uploadNotionData)
export default notion