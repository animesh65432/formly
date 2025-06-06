import { Router } from "express"
import { generateOAuthURL, handleGoogleOAuthCallback, createGoogleSheet, uploadSheetData } from "../../../controllers/Integration/googlesheets"
import { auth } from "../../../middlewares"


const googlesheets = Router()

googlesheets.get("/oauth", auth, generateOAuthURL)
googlesheets.get("/oauth/callback", handleGoogleOAuthCallback)
googlesheets.post("/sheets", auth, createGoogleSheet)
googlesheets.put("/upload", uploadSheetData)

export default googlesheets