import { Request, Response } from "express"
import db from "../../db"
import { asyncerrorhandler } from "../../middlewares"
import { redisClient } from "../../service"
import { v4 as uuidv4 } from 'uuid';

const create = asyncerrorhandler(async (req: Request, res: Response) => {
    const { block } = req.body;
    const userId = Number(req.user?.id);

    if (!block || block.length === 0) {
        res.status(400).json({ message: "please create some form fields" });
        return
    }


    const sortedBlocks = [...block].sort((a, b) => a.id.localeCompare(b.id));


    const uniqueIds = new Set<string>();
    const updatedBlocks = sortedBlocks.map((b, index) => {
        let currentId = b.id;
        if (!currentId || uniqueIds.has(currentId)) {
            currentId = uuidv4();
        }
        uniqueIds.add(currentId);
        return { ...b, id: currentId };
    });


    const Form = await db.form.create({
        data: {
            form_blocks: {
                create: updatedBlocks
            },
            userId
        }
    });

    const deleteUserFormsCache = redisClient.del(`users-forms:${userId}`);
    const deleteAllFormsCache = redisClient.del(`forms:${req.user?.id}`);
    await Promise.all([deleteUserFormsCache, deleteAllFormsCache]);

    res.status(200).json({
        message: "done it",
        fromid: Form.id
    });
    return
});

const Get = asyncerrorhandler(async (req: Request, res: Response) => {
    const redisKey = `forms:${req.user?.id}`;
    const cachedData = await redisClient.get(redisKey);

    if (cachedData) {
        res.status(200).json(JSON.parse(cachedData));
        return
    }

    const blocks = await db.form.findMany({
        include: {
            form_blocks: {
                select: {
                    id: true,
                    type: true,
                    label: true,
                    placeholder: true,
                    required: true,
                    options: true
                },
                orderBy: {
                    position: "asc"
                }
            },
            user: {
                select: {
                    name: true
                }
            },

        },
        orderBy: {
            id: 'desc'
        }
    })

    await redisClient.set(redisKey, JSON.stringify(blocks), { EX: 300 });

    res.status(200).json(blocks)
    return
})

const GetUserFroms = asyncerrorhandler(async (req: Request, res: Response) => {
    const userId = Number(req.user?.id)
    const redisKey = `users-forms:${req.user?.id}`;
    const cachedData = await redisClient.get(redisKey);

    if (cachedData) {
        res.status(200).json(JSON.parse(cachedData));
        return
    }
    const block = await db.form.findMany({
        include: {
            form_blocks: {
                select: {
                    id: true,
                    type: true,
                    label: true,
                    placeholder: true,
                    required: true,
                    options: true,
                },
                orderBy: {
                    position: "asc"
                }
            },


        },
        where: { userId }
    })

    await redisClient.set(redisKey, JSON.stringify(block), { EX: 300 });

    res.status(200).json(block)
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
            form_blocks: {
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
            form_blocks: {
                select: {
                    id: true,
                    type: true,
                    label: true,
                    placeholder: true,
                    required: true,
                    options: true
                },
                orderBy: {
                    position: "asc"
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