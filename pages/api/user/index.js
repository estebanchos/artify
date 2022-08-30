import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

export default async function (req, res) {
    if (req.method === 'GET') {
        return await readAllUsers(req, res);
    } else {
        return res.status(405).json({ message: 'Method not allowed', success: false });
    }
}

async function readAllUsers(_req, res) {
    try {
        const allUsers = await prisma.user.findMany()
        return res.status(200).json(allUsers, { success: true })
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error reading from database", success: false });
    }
}