import { Request, Response, NextFunction } from "express"

export type asyncerrorhandlerpayload = (req: Request, res: Response, next: NextFunction) => Promise<void>