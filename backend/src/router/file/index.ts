import { Router } from "express"
import { upload } from "../../controllers/files"

const router = Router()

router.post("/upload", upload)


export default router