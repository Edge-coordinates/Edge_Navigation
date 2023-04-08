import { Request, Response } from 'express'
import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

class linkController {
    async create(req: Request, res: Response) {
        // Categories 不得为空，校验
        try {
            const data_list = req.body
            let updates: Prisma.LinkCreateInput[] = []
            data_list.forEach((data) =>
                updates.push({
                    title: data.title,
                    content: data.content,
                    ...(data.summary && { summary: data.summary }),
                    ...(data.tags && { tags: { connect: data.tags } }),
                    ...(data.categories && {
                        categories: { connect: data.categories },
                    }),
                })
            )
            // console.log(updates)
            let Link_Create_tasks: Promise<any>[] = []
            let data: Prisma.LinkCreateInput
            for (data of updates) {
                console.log(data)
                Link_Create_tasks.push(
                    prisma.link.create({
                        data: data,
                    })
                )
            }
            let linklist = await Promise.all(Link_Create_tasks)
            res.json(linklist)
        } catch (error) {
            console.log(error)
            res.status(500).send(String(error))
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params
            const data = req.body
            const updates: Prisma.LinkCreateInput = {
                ...(data.title && { title: data.title }),
                ...(data.content && { content: data.content }),
                ...(data.summary && { summary: data.summary }),
                ...(data.tags && { tags: { connect: data.tags } }),
                ...(data.categories && {
                    categories: { connect: data.categories },
                }),
            }
            const link = await prisma.link.update({
                where: { id: parseInt(id) },
                data: updates,
            })
            res.json(link)
        } catch (error) {
            console.log(error)
            res.status(500).send(String(error))
        }
    }

    async listByCategory(req: Request, res: Response) {
        const { categorie_path } = req.body
        //校验path？
        let categories = await prisma.category.findMany({
            where: {
                path: {
                    startsWith: categorie_path,
                },
            },
            select: {
                id: true, // 只查询 ID 字段
            },
        })
        let categories_id: number[] = []
        categories.forEach((t) => categories_id.push(t.id))
        // console.log(categories)

        const links = await prisma.link.findMany({
            where: {
                categories: {
                    some: {
                        id: { in: categories_id },
                    },
                },
            },
            include: {
                categories: true,
            },
        })
        res.json(links)
    }

    async list(_req: Request, res: Response) {
        try {
            const links = await prisma.link.findMany({
                include: {
                    categories: true,
                    tags: true,
                },
            })
            res.json(links)
        } catch (error) {
            res.status(500).send(error)
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const { id } = req.params
            const link = await prisma.link.findUnique({
                where: { id: parseInt(id) },
                include: {
                    categories: true,
                    tags: true,
                },
            })
            if (!link) return res.status(404).send('link not found')
            res.json(link)
        } catch (error) {
            res.status(500).send(error)
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params
            await prisma.link.delete({
                where: { id: parseInt(id) },
            })
            res.send('link deleted successfully')
        } catch (error) {
            res.status(500).send(error)
        }
    }
}

export default new linkController()
