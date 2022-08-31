import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient()

export default async function handler(req, res) {
    if (req.method === 'GET') {
        return await getArtistPortfolio(req, res)
    } else {
        return res.status(405).json({ message: 'Method not allowed', success: false });
    }
}

// ****** handlers ********

async function getArtistPortfolio(req, res) {
    const { artistId } = req.query
    const artistPortfolio = await prisma.art.findMany({
        where: {
            artistId: Number(artistId)
        }
    })
    res.status(200).json({ artistPortfolio, success: true })
}
