import { Router } from "express"
import { generateOAuthURL, handleGoogleOAuthCallback, createGoogleSheet, listGoogleSheets, getSheetData, getSheetMetadata, } from "../../../controllers/Integration/googlesheets"
const googlesheets = Router()
import { auth } from "../../../middlewares"

googlesheets.get("/oauth", auth, generateOAuthURL)
googlesheets.get("/oauth/callback", handleGoogleOAuthCallback)
googlesheets.post("/sheets", auth, createGoogleSheet)
googlesheets.get("/sheets", auth, listGoogleSheets)
googlesheets.get("/sheets/:sheetId", auth, getSheetData)

export default googlesheets