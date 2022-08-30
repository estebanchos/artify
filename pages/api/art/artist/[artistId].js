import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient()

export default async function handler(req, res) {
    if (req.method === 'GET') {
        return await getSingleArtist(req, res)
    } else {
        return res.status(405).json({ message: 'Method not allowed', success: false });
    }
}

// ****** handlers ********

async function getSingleArtist(req, res) {
    const { artistId } = req.query
    const artistFound = await prisma.user.findUnique({
        where: {
            id: Number(artistId)
        }
    })
    res.status(200).json({ artistFound, success: true })
}
