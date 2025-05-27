import { create, Get, Delete, update, GetUserFroms } from "../../controllers/from"
import { Router } from "express"
import auth from "../../middlewares/auth"

const form = Router()

form.use(auth)
form.post("/create", create)
form.get("/Get", Get)
form.get("/GetUser", GetUserFroms)
form.delete("/delete/:id", Delete)
form.put("/update/:id", update)


export default form