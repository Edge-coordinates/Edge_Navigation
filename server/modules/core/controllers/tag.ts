import { Request, Response } from 'express'
import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

class tagController {
    async create(req: Request, res: Response) {
        try {
            const data = req.body
            // 校验 path 是否由 数字开头，数字结尾，并且只有数字和,
            let updates: Prisma.TagCreateInput = {
                name: data.name,
                ...(data.summary && { summary: data.summary }),
            }
            let tag = await prisma.tag.create({
                data: updates,
            })
            res.json(tag)
        } catch (error) {
            res.status(500).send(error)
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params
            const data = req.body
            let updates: Prisma.TagUpdateInput = {
                ...(data.name && { name: data.name }),
                ...(data.summary && { summary: data.summary })
            }
            const seed = await prisma.tag.update({
                where: { id: parseInt(id) },
                data: updates,
            })
            res.json(seed)
        } catch (error) {
            res.status(500).send(error)
        }
    }

    async list(_req: Request, res: Response) {
        try {
            const seeds = await prisma.tag.findMany({
                // include: { author: true, tag: true },
            })
            res.json(seeds)
        } catch (error) {
            res.status(500).send(error)
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const { id } = req.params
            const seed = await prisma.tag.findUnique({
                where: { id: parseInt(id) },
            })
            if (!seed) return res.status(404).send('Seed not found')
            res.json(seed)
        } catch (error) {
            res.status(500).send(error)
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params
            await prisma.tag.delete({
                where: { id: parseInt(id) },
            })
            res.send('Seed deleted successfully')
        } catch (error) {
            res.status(500).send(error)
        }
    }
}

export default new tagController()
