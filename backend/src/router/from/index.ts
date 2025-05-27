import { createfrom, GetFroms, deletefrom, updatefrom, GetUserFroms } from "../../controllers/from"
import { Router } from "express"
import auth from "../../middlewares/auth"

const form = Router()



form.use(auth)
form.post("/create", createfrom)
form.get("/Get", GetFroms)
form.get("/GetUser", GetUserFroms)
form.delete("/delete/:id", deletefrom)
form.put("/update/:id", updatefrom)


export default form