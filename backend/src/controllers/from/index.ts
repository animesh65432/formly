import { Request, Response } from "express"
import db from "../../db"
import { asyncerrorhandler } from "../../middlewares"
import { redis } from "../../service"
import { v4 as uuidv4 } from 'uuid';

const create = asyncerrorhandler(async (req: Request, res: Response) => {
    const { block } = req.body;
    const userId = req.user?.id

    if (!block || block.length === 0 || !userId) {
        res.status(400).json({ message: "please create some form fields" });
        return
    }

    const checkfromexsit = await db.formBlock.findFirst({
        where: {
            id: block[0].id
        }
    })
    let Form
    if (!checkfromexsit) {
        Form = await db.form.create({
            data: {
                form_blocks: {
                    create: block
                },
                userId: userId
            }
        });
    }
    else {
        const blockWithNewIds = block.map((item: any) => ({
            ...item,
            id: uuidv4()
        }));
        Form = await db.form.create({
            data: {
                form_blocks: {
                    create: blockWithNewIds
                },
                userId
            }
        });
    }

    const deleteUserFormsCache = redis.del(`users-forms:${userId}`);
    const deleteAllFormsCache = redis.del(`forms:${req.user?.id}`);
    await Promise.all([deleteUserFormsCache, deleteAllFormsCache]);

    res.status(200).json({
        message: "done it",
        fromid: Form.id
    });
    return
});

const Get = asyncerrorhandler(async (req: Request, res: Response) => {
    const redisKey = `forms:${req.user?.id}`;
    const cachedData = await redis.get<any>(redisKey);

    if (cachedData) {
        res.status(200).json(cachedData);
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

    await redis.set(redisKey, blocks, { ex: 300 });

    res.status(200).json(blocks)
    return
})

const GetUserFroms = asyncerrorhandler(async (req: Request, res: Response) => {
    const userId = req.user?.id
    const redisKey = `users-forms:${req.user?.id}`;
    const cachedData = await redis.get<any>(redisKey);

    if (!userId) {
        res.status(200).json({
            message: "user not autheticatd"
        })
    }

    if (cachedData) {
        res.status(200).json(cachedData);
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

    await redis.set(redisKey, block, { ex: 300 });

    res.status(200).json(block)
    return

})

const Delete = asyncerrorhandler(async (req: Request, res: Response) => {
    const userId = req.user?.id
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
    const deleteUserFormsCache = redis.del(`users-forms:${userId}`);
    const deleteAllFormsCache = redis.del(`forms:${req.user?.id}`)

    await Promise.all([deleteAllForm, deleteAllFormsCache, deleteUserFormsCache])
    res.status(200).json({
        message: "delete the froms",
    })
    return
})

const update = asyncerrorhandler(async (req: Request, res: Response) => {
    const userId = req.user?.id
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

    const deleteUserFormsCache = redis.del(`users-forms:${userId}`);
    const deleteAllFormsCache = redis.del(`forms:${req.user?.id}`)

    await Promise.all([deletedForm, createFrom, deleteAllFormsCache, deleteUserFormsCache])

    res.status(200).json({
        message: "update the froms",
    })
    return
})

const GetfrombyId = asyncerrorhandler(async (req: Request, res: Response) => {
    const { id } = req.params

    const redisKey = `form:${id}`;
    const cachedData = await redis.get<any>(redisKey);


    if (cachedData) {
        res.status(200).json({
            message: "Get the forms ",
            block: cachedData,
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


    await redis.set(redisKey, block, { ex: 300 });

    res.status(200).json({
        message: "Get the froms",
        block
    })
    return
})
export { create, Get, GetUserFroms, Delete, update, GetfrombyId }