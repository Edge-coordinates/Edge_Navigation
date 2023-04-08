import { Request, Response } from 'express'
import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

class PostController {
    async create(req: Request, res: Response) {
        try {
            const data = req.body
            const updates = {
                title: data.title,
                content: data.content,
                post_status: parseInt(data.post_status),
                author: { connect: { id: data.authorId } },
                ...(data.summary && { summary: data.summary }),
                ...(data.tags && { tags: { connect: data.tags } }),
                ...(data.categories && {
                    categories: { connect: data.categories },
                }),
            }
            const post = await prisma.post.create({
                data: updates,
            })
            res.json(post)
        } catch (error) {
            console.log(error)
            res.status(500).send(String(error))
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params
            const data = req.body
            const updates: Prisma.PostCreateInput = {
                ...(data.title && { title: data.title }),
                ...(data.content && { content: data.content }),
                ...(data.post_status && {
                    post_status: parseInt(data.post_status),
                }),
                ...(data.authorId && {
                    author: { connect: { id: data.authorId } },
                }),
                ...(data.summary && { summary: data.summary }),
                ...(data.tags && { tags: { connect: data.tags } }),
                ...(data.categories && {
                    categories: { connect: data.categories },
                }),
            }
            const post = await prisma.post.update({
                where: { id: parseInt(id) },
                data: updates,
            })
            res.json(post)
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

        const posts = await prisma.post.findMany({
            where: {
                categories: {
                    some: {
                        id: { in: categories_id },
                    },
                },
            },
            include: {
                author:true,
                categories:true
            }
        })
        res.json(posts)
    }

    async list(_req: Request, res: Response) {
        try {
            const posts = await prisma.post.findMany({
                include: {
                    author: true,
                    categories: true,
                    tags: true,
                },
            })
            res.json(posts)
        } catch (error) {
            res.status(500).send(error)
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const { id } = req.params
            const post = await prisma.post.findUnique({
                where: { id: parseInt(id) },
                include: {
                    author: true,
                    categories: true,
                    tags: true,
                },
            })
            if (!post) return res.status(404).send('Post not found')
            res.json(post)
        } catch (error) {
            res.status(500).send(error)
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params
            await prisma.post.delete({
                where: { id: parseInt(id) },
            })
            res.send('Post deleted successfully')
        } catch (error) {
            res.status(500).send(error)
        }
    }
}

export default new PostController()
