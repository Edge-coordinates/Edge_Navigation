import { Request, Response } from 'express'
import { PrismaClient, User } from '@prisma/client'

const prisma = new PrismaClient()

class PostController {
    async create(req: Request, res: Response) {
        try {
            const data = req.body
            // 数据校验暂时放在纯前端
            const updates: User = {
                name: data.name,
                nickname: data.nickname,
                email: data.email,
                password: data.password,
                ...(data.profile && { profile: data.profile }),
            }
            const post = await prisma.user.create({
                data: updates,
            })
            res.json(post)
        } catch (error) {
            res.status(500).send(error)
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { name } = req.params
            const data = req.body
            const updates = {
                ...(data.nickname && { nickname: data.nickname }),
                ...(data.email && { email: data.email }),
                ...(data.password && { password: data.password }),
                ...(data.profile && { profile: data.profile }),
            }
            const post = await prisma.user.update({
                where: { name: String(name) },
                data: updates,
            })
            res.json(post)
        } catch (error) {
            res.status(500).send(error)
        }
    }

    async list(_req: Request, res: Response) {
        try {
            const users = await prisma.user.findMany()
            res.json(users)
        } catch (error) {
            res.status(500).send(error)
        }
    }

    async getByname(req: Request, res: Response) {
        try {
            const { name } = req.params
            const post = await prisma.user.findUnique({
                where: { name: String(name) },
            })
            if (!post) return res.status(404).send('Post not found')
            res.json(post)
        } catch (error) {
            res.status(500).send(error)
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { name } = req.params
            await prisma.user.delete({
                where: { name: String(name) },
            })
            res.send('Post deleted successfully')
        } catch (error) {
            res.status(500).send(error)
        }
    }
}

export default new PostController()
