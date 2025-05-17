import { Router } from "express"
import usersrouter from "./users"
import { rateLimiter } from "../middlewares"


const router = Router()
router.use(rateLimiter(5, 60000))
router.use("/users", usersrouter)

export default router