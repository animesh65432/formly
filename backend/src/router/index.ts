import { RequestHandler, Router } from "express"
import usersrouter from "./users"
import form from "./from"
import integration from "./Integration"
import file from "./file"
import { rateLimiter } from "../middlewares"


const router = Router()
router.use(rateLimiter(35, 60000) as RequestHandler);
router.use("/users", usersrouter)
router.use("/form", form)
router.use("/integration", integration)
router.use("/file", file)

export default router