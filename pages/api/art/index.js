import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
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
    // verify user is logged in
    const token = req.cookies.artify
    if (!token) {
        return res.status(401).json({ message: 'Login required', success: false })
    }
    // verify user is authorized to proceed
    const user = jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
        if (err) {
            res.status(401).json({ message: 'Unauthorized', success: false })
            return null
        }
        return decoded
    })
    if (user.role === 'VISITOR') res.status(401).json({ message: 'Unauthorized', success: false })

    // user has email and role
    // find user to get ID
    if (user.role === 'ARTIST') {
        const userFound = await prisma.user.findUnique({
            where: {
                email: user.email
            },
        })
        const artistId = userFound.id
    }
    const { title, creationDate, imageSrc } = req.body
    // temporal id for testing with artist ldavinci
    const artistId = 1
    try {
        const newEntry = await prisma.art.create({
            data: {
                title,
                creationDate,
                imageSrc,
                artistId
            }
        })
        console.log(newEntry)
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