import jsonwebtoken from "jsonwebtoken"

const createToken = (email: string): string => {
    const token = jsonwebtoken.sign(
        { email },
        process.env.JWT_SECRET as string,
        {
            expiresIn: "1h",
        }
    )
    return token
}

export { createToken }