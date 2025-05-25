import { Request, Response, NextFunction } from "express";
import { redisClient } from "../service";

const RateLimiter = (limit: number, windowMs: number) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const ip = req.ip;
        const key = `rate-limit:${ip}`;

        try {
            const count = await redisClient.get(key);

            if (count && parseInt(count) >= limit) {
                return res.status(429).json({ message: "Too many requests, please try again later." });
            }

            if (count) {
                await redisClient.incr(key);
            } else {
                await redisClient.set(key, "1", { EX: Math.floor(windowMs / 1000) });
            }

            next();
        } catch (error) {
            console.error("Redis rate limiter error:", error);
            next();
        }
    };
};

export default RateLimiter;
