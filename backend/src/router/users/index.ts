import { Router } from "express"
import { createUser, loginUser, googleAuth } from "../../controllers"

const router = Router()

router.post("/signup", createUser)
router.post("/login", loginUser)
router.post("/google", googleAuth)


export default router