import { Request, Response } from "express"
import db from "../../db"
import { asyncerrorhandler } from "../../middlewares"
import { v4 } from 'uuid';
const createfrom = asyncerrorhandler(async (req: Request, res: Response) => {
    const { blocks } = req.body
    const userId = Number(req.user?.id)

    console.log(blocks, "blocks")
    if (blocks.length === 0) {
        res.status(400).json({ message: "please create some fromfileds" })
        return
    }
    await db.form.create({
        data: {
            blocks: {
                create: blocks
            },
            userId
        }
    });

    res.status(200).json({
        message: "done it"
    })
    return
})

const GetFroms = asyncerrorhandler(async (req: Request, res: Response) => {
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

    res.status(200).json({
        message: "Get the froms",
        blocks
    })
    return
})

const GetUserFroms = asyncerrorhandler(async (req: Request, res: Response) => {
    const userId = Number(req.user?.id)
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

    res.status(200).json({
        message: "Get the froms",
        blocks
    })
    return

})

const deletefrom = asyncerrorhandler(async (req: Request, res: Response) => {
    const userId = Number(req.user?.id)
    const fromId = req.params.id

    if (!userId || !fromId) {
        res.status(400).json({
            message: "userId and fromId are required"
        })
        return
    }
    await db.form.delete({
        where: {
            userId,
            id: fromId
        }
    })
    res.status(200).json({
        message: "delete the froms",
    })
    return
})

const updatefrom = asyncerrorhandler(async (req: Request, res: Response) => {
    const userId = Number(req.user?.id)
    const fromId = req.params.id

    const { blocks } = req.body

    if (!userId || !fromId || blocks.length === 0) {
        res.status(400).json({
            message: "userId and fromId and empty block's  are required"
        })
        return
    }

    await db.form.delete({
        where: {
            userId,
            id: fromId
        }
    })

    await db.form.create({
        data: {
            id: v4(),
            blocks: {
                create: blocks
            },
            userId
        }
    })
    res.status(200).json({
        message: "update the froms",
    })
    return
})
export { createfrom, GetFroms, GetUserFroms, deletefrom, updatefrom }