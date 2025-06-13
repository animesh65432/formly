import z from "zod"

const singinSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long")
})

export default singinSchema