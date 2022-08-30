import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

export default async function (req, res) {
    if (req.method === 'GET') {
        return await getAllArtists(req, res);
    } else {
        return res.status(405).json({ message: 'Method not allowed', success: false });
    }
}

async function getAllArtists(_req, res) {
    try {
        const allArtists = await prisma.user.findMany({
            where: {
                role: "ARTIST"
            }
        })
        return res.status(200).json(allArtists, { success: true })
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error reading from database", success: false });
    }
}