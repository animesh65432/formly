import { RequestHandler, Router } from "express"
import usersrouter from "./users"
import { rateLimiter } from "../middlewares"


const router = Router()
router.use(rateLimiter(10, 60000) as RequestHandler);
router.use("/users", usersrouter)

export default router