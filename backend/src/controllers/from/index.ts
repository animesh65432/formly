import { Request, Response } from "express"
import db from "../../db"
import { asyncerrorhandler } from "../../middlewares"
import { v4 } from 'uuid';
import { redisClient } from "../../service"
const create = asyncerrorhandler(async (req: Request, res: Response) => {
    const { blocks } = req.body
    const userId = Number(req.user?.id)
    if (blocks.length === 0) {
        res.status(400).json({ message: "please create some fromfileds" })
        return
    }
    const createFormPromise = db.form.create({
        data: {
            blocks: {
                create: blocks
            },
            userId
        }
    });

    const deleteUserFormsCache = redisClient.del(`users-forms:${userId}`);
    const deleteAllFormsCache = redisClient.del(`forms:${req.user?.id}`)

    await Promise.all([createFormPromise, deleteAllFormsCache, deleteUserFormsCache])

    res.status(200).json({
        message: "done it"
    })
    return
})

const Get = asyncerrorhandler(async (req: Request, res: Response) => {
    const redisKey = `forms:${req.user?.id}`;
    const cachedData = await redisClient.get(redisKey);

    if (cachedData) {
        res.status(200).json({
            message: "Get the forms",
            blocks: JSON.parse(cachedData),
        });
        return
    }

    const blocks = await db.form.findMany({
        include: {
            blocks: {
                select: {
                    id: true,
                    type: true,
                    label: true,
                    placeholder: true,
                    required: true,
                    options: true
                }
            },
            user: {
                select: {
                    name: true
                }
            }

        },
    })

    await redisClient.set(redisKey, JSON.stringify(blocks), { EX: 300 });

    res.status(200).json({
        message: "Get the froms",
        blocks
    })
    return
})

const GetUserFroms = asyncerrorhandler(async (req: Request, res: Response) => {
    const userId = Number(req.user?.id)
    const redisKey = `users-forms:${req.user?.id}`;
    const cachedData = await redisClient.get(redisKey);

    if (cachedData) {
        res.status(200).json({
            message: "Get the forms ",
            blocks: JSON.parse(cachedData),
        });
        return
    }
    const blocks = await db.form.findMany({
        include: {
            blocks: {
                select: {
                    id: true,
                    type: true,
                    label: true,
                    placeholder: true,
                    required: true,
                    options: true
                }
            }

        },
        where: { userId }
    })

    await redisClient.set(redisKey, JSON.stringify(blocks), { EX: 300 });

    res.status(200).json({
        message: "Get the froms",
        blocks
    })
    return

})

const Delete = asyncerrorhandler(async (req: Request, res: Response) => {
    const userId = Number(req.user?.id)
    const fromId = req.params.id

    if (!userId || !fromId) {
        res.status(400).json({
            message: "userId and fromId are required"
        })
        return
    }
    const deleteAllForm = db.form.delete({
        where: {
            userId,
            id: fromId
        }
    })
    const deleteUserFormsCache = redisClient.del(`users-forms:${userId}`);
    const deleteAllFormsCache = redisClient.del(`forms:${req.user?.id}`)

    await Promise.all([deleteAllForm, deleteAllFormsCache, deleteUserFormsCache])
    res.status(200).json({
        message: "delete the froms",
    })
    return
})

const update = asyncerrorhandler(async (req: Request, res: Response) => {
    const userId = Number(req.user?.id)
    const fromId = req.params.id

    const { blocks } = req.body

    if (!userId || !fromId || blocks.length === 0) {
        res.status(400).json({
            message: "userId and fromId and empty block's  are required"
        })
        return
    }

    const deletedForm = await db.form.delete({
        where: {
            userId,
            id: fromId
        }
    })

    const createFrom = await db.form.create({
        data: {
            id: v4(),
            blocks: {
                create: blocks
            },
            userId
        }
    })

    const deleteUserFormsCache = redisClient.del(`users-forms:${userId}`);
    const deleteAllFormsCache = redisClient.del(`forms:${req.user?.id}`)

    await Promise.all([deletedForm, createFrom, deleteAllFormsCache, deleteUserFormsCache])

    res.status(200).json({
        message: "update the froms",
    })
    return
})
export { create, Get, GetUserFroms, Delete, update }