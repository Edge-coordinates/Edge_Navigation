import { Router } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const router = Router()

router.get('/users', async (_req, res) => {
    const posts = await prisma.user.findMany()
    res.json(posts)
})

router.get('/posts', async (_req, res) => {
    const posts = await prisma.post.findMany({
        include: { author: true },
    })
    res.json(posts)
})

router.get('/posts/:id', async (req, res) => {
    const { id } = req.params
    const post = await prisma.post.findUnique({
        where: { id: parseInt(id) },
        include: { author: true },
    })
    if (!post) {
        return res.status(404).json({ message: 'Post not found' })
    }
    res.json(post)
    return
})

router.post('/posts', async (req, res) => {
    const { title, content, post_status, author_id } = req.body
    // console.log(req)
    const post = await prisma.post.create({
        data: {
            title: title,
            content: content,
            post_status: post_status,
            author: {
                connect: {
                    id: author_id,
                },
            },
        },
        include: {
            author: true,
        },
    })

    res.json(post)
})

router.put('/posts/:id', async (req, res) => {
    const { id } = req.params
    const { title, content } = req.body
    const post = await prisma.post.update({
        where: { id: parseInt(id) },
        data: { title, content },
        include: { author: true },
    })
    res.json(post)
})

router.delete('/posts/:id', async (req, res) => {
    const { id } = req.params
    await prisma.post.delete({
        where: { id: parseInt(id) },
    })
    res.sendStatus(204)
})

export default router
