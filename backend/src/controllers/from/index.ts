import { Request, Response } from "express"
import db from "../../db"
import { asyncerrorhandler } from "../../middlewares"
import { redisClient } from "../../service"
const create = asyncerrorhandler(async (req: Request, res: Response) => {
    const { block } = req.body
    const userId = Number(req.user?.id)
    if (block.length === 0) {
        res.status(400).json({ message: "please create some fromfileds" })
        return
    }

    console.log(block, "block")
    const createFormPromise = db.form.create({
        data: {
            block: {
                create: block
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
            block: JSON.parse(cachedData),
        });
        return
    }

    const block = await db.form.findMany({
        include: {
            block: {
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

    await redisClient.set(redisKey, JSON.stringify(block), { EX: 300 });

    res.status(200).json({
        message: "Get the froms",
        block
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
            block: JSON.parse(cachedData),
        });
        return
    }
    const block = await db.form.findMany({
        include: {
            block: {
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

    await redisClient.set(redisKey, JSON.stringify(block), { EX: 300 });

    res.status(200).json({
        message: "Get the froms",
        block
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

    const { block } = req.body

    if (!userId || !fromId || block.length === 0) {
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
            block: {
                create: block
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

const GetfrombyId = asyncerrorhandler(async (req: Request, res: Response) => {
    const { id } = req.params

    const redisKey = `form:${id}`;
    const cachedData = await redisClient.get(redisKey);

    if (cachedData) {
        res.status(200).json({
            message: "Get the forms ",
            block: JSON.parse(cachedData),
        });
        return
    }

    const block = await db.form.findUnique({
        where: {
            id
        },
        include: {
            block: {
                select: {
                    id: true,
                    type: true,
                    label: true,
                    placeholder: true,
                    required: true,
                    options: true
                }
            }
        }
    })


    await redisClient.set(redisKey, JSON.stringify(block), { EX: 300 });

    res.status(200).json({
        message: "Get the froms",
        block
    })
    return
})
export { create, Get, GetUserFroms, Delete, update, GetfrombyId }