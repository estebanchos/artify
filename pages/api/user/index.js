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
        const returnAllUsers = allUsers.map(user => {
            return {
                id: user.id,
                name: user.name,
                role: user.role,
                suspended: user.suspended
            }
        })

        return res.status(200).json(returnAllUsers, { success: true })
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error reading from database", success: false });
    }
}