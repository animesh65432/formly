import { Request, Response } from "express"
import db from "../../db"
import bcrypt from "bcrypt"
import { createToken } from "../../utils"
import { asyncerrorhandler } from "../../middlewares"
import { googleclient } from "../../service"


const createUser = asyncerrorhandler(async (req: Request, res: Response) => {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        res.status(400).json({ message: "All fields are required" })
        return
    }

    const exsitingUser = await db.user.findUnique({
        where: {
            email
        }
    })

    console.log(exsitingUser)

    if (exsitingUser) {
        res.status(400).json({ message: "User already exists" })
        return
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    })

    res.status(201).json({ message: "User created successfully" })
    return
})

const loginUser = asyncerrorhandler(async (req: Request, res: Response) => {
    const { email, password } = req.body

    if (!email || !password) {
        res.status(400).json({ message: "All fields are required" })
        return
    }

    const user = await db.user.findUnique({
        where: {
            email
        }
    })

    if (!user || !user.password) {
        res.status(400).json({ message: "Invalid credentials" })
        return
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        res.status(400).json({ message: "Invalid credentials" })
        return
    }

    const token = await createToken(user.email)

    res.status(200).json({ message: "Login successful", token })
    return
})

const googleAuth = asyncerrorhandler(async (req: Request, res: Response) => {
    const { credential, clientId } = req.body;

    if (!credential || !clientId) {
        res.status(400).json({ message: "Missing credential or client ID" });
        return
    }

    const ticket = await googleclient.verifyIdToken({
        idToken: credential,
        audience: clientId,
    });

    const payload = ticket.getPayload();

    if (!payload || !payload.email) {
        res.status(400).json({ message: "Invalid Google token payload" });
        return
    }

    const { email } = payload

    let user = await db.user.findUnique({
        where: {
            email

        },
    });

    if (!user) {
        user = await db.user.create({
            data: { email },
        });
    }

    const token = createToken(user.email)

    res.status(user ? 200 : 201).json({
        message: user ? "Successfully logged in" : "Account created and logged in",
        token
    });
    return
});

export { createUser, loginUser, googleAuth }