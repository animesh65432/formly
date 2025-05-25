import "dotenv/config"

const config = {
    PORT: process.env.PORT || 4000,
    JWT_SECRET: process.env.JWT_SECRET,
    REDIS_URL: process.env.REDIS_URL
}

export default config