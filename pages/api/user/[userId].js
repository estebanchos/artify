import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient()

export default async function handler(req, res) {
    if (req.method === 'PATCH') {
        return await updateSuspension(req, res)
    } else {
        return res.status(405).json({ message: 'Method not allowed', success: false });
    }
}

async function updateSuspension(req, res) {
    const { userId } = req.query
    const { suspended } = req.body

    const updatedUser = await prisma.user.update({
        where: {
            id: Number(userId)
        },
        data: {
            suspended: suspended
        }
    })
    const returnUpdatedUser = {
        id: updatedUser.id,
        name: updatedUser.name,
        role: updatedUser.role,
        suspended: updatedUser.suspended
    }
    res.status(200).json({ returnUpdatedUser, success: true })
}