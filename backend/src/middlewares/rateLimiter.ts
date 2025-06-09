import { Request, Response, NextFunction } from "express";
import { redis } from "../service";

const RateLimiter = (limit: number, windowMs: number) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const ip = req.ip;
        const key = `rate-limit:${ip}`;

        try {
            const count = await redis.get<string>(key);

            if (count && parseInt(count) >= limit) {
                return res.status(429).json({ message: "Too many requests, please try again later." });
            }

            if (count) {
                await redis.incr(key);
            } else {
                await redis.set(key, "1", { ex: Math.floor(windowMs / 1000) });
            }

            next();
        } catch (error) {
            console.error("Redis rate limiter error:", error);
            next();
        }
    };
};

export default RateLimiter;
