import { RequestHandler, Router } from "express"
import usersrouter from "./users"
import form from "./from"
import integration from "./Integration"
import { rateLimiter } from "../middlewares"


const router = Router()
router.use(rateLimiter(10, 60000) as RequestHandler);
router.use("/users", usersrouter)
router.use("/form", form)
router.use("/integration", integration)

export default router