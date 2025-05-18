import { Request, Response, NextFunction } from "express";
import db from "../db";
const RateLimiter = (limit: number, windowMs: number) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const ip = req.ip;
        const now = Date.now();

        let entry

        try {

            entry = await db.rateLimit.findUnique({ where: { ip } });

            if (!entry && ip) {
                entry = await db.rateLimit.create({
                    data: { ip, count: 1, lastRequest: now },
                });

            }

            const elapsed = entry ? now - Number(entry.lastRequest) : Infinity;

            if (elapsed > windowMs) {
                await db.rateLimit.update({
                    where: { ip },
                    data: { count: 1, lastRequest: now },
                });
                next();
                return
            }

            if (entry && entry.count < limit) {
                await db.rateLimit.update({
                    where: { ip },
                    data: {
                        count: { increment: 1 },
                        lastRequest: now,
                    },
                });
                next();
                return
            }


            res.status(429).json({ message: "Too many requests. please try again later" });
            return
        } catch (err) {
            console.error("Rate limiter error:", err);
            next();
            return
        }
    };
};

export default RateLimiter;