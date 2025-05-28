import { create, Get, Delete, update, GetUserFroms, GetfrombyId } from "../../controllers/from"
import { Router } from "express"
import auth from "../../middlewares/auth"

const form = Router()

form.post("/create", auth, create)
form.get("/Get", auth, Get)
form.get("/GetUser", auth, GetUserFroms)
form.delete("/delete/:id", auth, Delete)
form.put("/update/:id", auth, update)
form.get("/GetfrombyId/:id", GetfrombyId)


export default form