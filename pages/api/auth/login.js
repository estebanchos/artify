import jwt from "jsonwebtoken"
import { serialize } from "cookie"
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()
const bcrypt = require('bcryptjs')

const secret = process.env.SECRET

export default async function (req, res) {
    const { email, password } = req.body
    console.log(email, password)

    // validate inputs
    if (!email || !password) return res.status(400).json({
        message: 'Please enter the required fields',
        success: false
    });
    // validate user exists
    const userFound = await prisma.user.findUnique({
        where: {
            email: email
        },
    })
    if (!userFound) return res.status(400).json({
        message: 'Invalid user',
        success: false
    });
    // validate password is correct
    const isPasswordCorrect = bcrypt.compareSync(password, userFound.password)
    if (!isPasswordCorrect) return res.status(400).json({
        message: 'Invalid password',
        success: false
    });

    // create token and serialize it
    const token = jwt.sign(
        {
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
            email: userFound.email,
            role: userFound.role
        },
        secret
    )

    const serialized = serialize('artify', token, {
        httpOnly: true,
        secure: 'development',
        sameSite: 'strict',
        maxAge: 60 * 60,
        path: '/',
    })

    res.setHeader('Set-Cookie', serialized)
    res.status(200).send('Successful login')

}