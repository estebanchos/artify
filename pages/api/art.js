import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

// ****** Route + behaviour ********
export default async function handler(req, res) {
    if (req.method === 'POST') {
        return await addArt(req, res);
    } else if (req.method === 'GET') {
        return await readArt(req, res)
    }
    else {
        return res.status(405).json({ message: 'Method not allowed', success: false });
    }
}

// ****** handlers ********

async function addArt(req, res) {
    const { title, creationDate, imageSrc } = req.body
    try {
        const newEntry = await prisma.art.create({
            data: {
                title,
                creationDate,
                imageSrc
                // pending adding artistId
            }
        })
        return res.status(200).json({ success: true })
    } catch (err) {
        console.error('Request error', err)
        res.status(500).json({ error: "Error adding entry", success: false });
    }
}

async function readArt(req, res) {
    try {
        const artRegistry = await prisma.art.findMany()
        return res.status(200).json(artRegistry, { success: true })
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error reading from database", success: false });
    }
}