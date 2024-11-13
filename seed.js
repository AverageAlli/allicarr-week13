const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()



const seed = async () => {
        const createMany = await prisma.Video.createMany({
            data: [
            { name: 'Cat video', url: '/videos/test.mp4', votes: 10, length: 100 },
            { name: 'Dog video', url: '/videos/test.mp4', votes: 0, length: 180 },
            { name: 'An analsysis of undersea audio structures', url: '/videos/test.mp4', votes: 2, length: 60 },
            { name: 'Test video, please ignore', url: '/videos/test.mp4', votes: 100, length: 270 },
            ],
            skipDuplicates: true
        })
}

seed()