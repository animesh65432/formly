import { Router } from "express"
import { generateOAuthURL, handleGoogleOAuthCallback, createGoogleSheet, listGoogleSheets, getSheetData, uploadSheetData } from "../../../controllers/Integration/googlesheets"
const googlesheets = Router()
import { auth } from "../../../middlewares"

googlesheets.get("/oauth", auth, generateOAuthURL)
googlesheets.get("/oauth/callback", handleGoogleOAuthCallback)
googlesheets.post("/sheets", auth, createGoogleSheet)
googlesheets.get("/sheets", auth, listGoogleSheets)
googlesheets.put("/upload", uploadSheetData)
googlesheets.get("/sheets/:sheetId", auth, getSheetData)

export default googlesheets