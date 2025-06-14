import config from "./config"
import cors from "cors"
import express from "express"
import router from "./router"
import { errorMiddleware } from "./middlewares"

const app = express()
app.use(cors({
    origin: "*"
}))
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(router)
app.use(errorMiddleware)

app.listen(config.PORT || 4000, () => {
    console.log(`Server is running on port ${config.PORT}`)
})