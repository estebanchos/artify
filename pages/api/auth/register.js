import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()
import bcrypt from 'bcryptjs'

export default async function (req, res) {
    if (req.method === 'POST') {
        return await createUser(req, res);
    } else if (req.method === 'GET') {
        return await readAll(req, res)
    }else {
        return res.status(405).json({ message: 'Method not allowed', success: false });
    }
}

// ****** handlers ********
async function createUser(req, res) {
    const { name, email, password, role } = req.body
    const hashedPassword = bcrypt.hashSync(password, 8)
    try {
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role
            }
        })
        return res.status(200).json({ success: true })
    } catch (err) {
        console.error('Request error', err)
        res.status(500).json({ error: "Error adding entry", success: false });
    }

}

async function readAll(_req, res) {
    try {
        const allUsers = await prisma.user.findMany()
        return res.status(200).json(allUsers, { success: true })
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error reading from database", success: false });
    }
}