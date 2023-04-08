import { Request, Response } from 'express'
import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

class CategoryController {
    async create(req: Request, res: Response) {
        try {
            const data = req.body
            // 校验 path 是否由 数字开头，数字结尾，并且只有数字和,
            let updates: Prisma.CategoryCreateInput = {
                name: data.name,
                ...(data.forlink && { forlink: parseInt(data.forlink) }),
                ...(data.summary && { summary: data.summary }),
            }
            let category = await prisma.category.create({
                data: updates,
            })
            let path:string = data.path? (data.path += ',' + category.id) : String(category.id)
            category = await prisma.category.update({
                where: { id: category.id },
                data: { path: path },
            })
            res.json(category)
        } catch (error) {
            res.status(500).send(error)
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params
            const data = req.body
            let updates: Prisma.CategoryUpdateInput = {
                ...(data.name && { name: data.name }),
                ...(data.summary && { summary: data.summary }),
                ...(data.path && { path: data.path }),
                ...(data.forlink && { forlink: data.forlink }),
            }
            const category = await prisma.category.update({
                where: { id: parseInt(id) },
                data: updates,
            })
            res.json(category)
        } catch (error) {
            res.status(500).send(error)
        }
    }

    async list(_req: Request, res: Response) {
        try {
            const categorys = await prisma.category.findMany({
                // include: { author: true, category: true },
            })
            res.json(categorys)
        } catch (error) {
            console.log(error)
            res.status(500).send(String(error))
        }
    }

    async listByGroup(req: Request, res: Response) {
        try {
            const { num } = req.params
            // console.log(num)
            // console.log(req.params)
            const categorys = await prisma.category.findMany({
                where: {forlink: parseInt(num)}
            })
            res.json(categorys)
        } catch (error) {
            console.log(error)
            res.status(500).send(String(error))
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const { id } = req.params
            const seed = await prisma.category.findUnique({
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
            await prisma.category.delete({
                where: { id: parseInt(id) },
            })
            res.send('Seed deleted successfully')
        } catch (error) {
            res.status(500).send(error)
        }
    }
}

export default new CategoryController()
