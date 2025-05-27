import jsonwebtoken from "jsonwebtoken"

const createToken = (email: string): string => {
    const token = jsonwebtoken.sign(
        { email },
        process.env.JWT_SECRET as string)
    return token
}

export { createToken }