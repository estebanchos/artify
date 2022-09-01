import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { Novu } from '@novu/node';
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

    // assign artist ID
    let artistId
    if (user.role === 'ARTIST') {
        const userFound = await prisma.user.findUnique({
            where: {
                email: user.email
            },
        })
        artistId = Number(userFound.id)
    } else {
        artistId = Number(req.body.artistId)
    }
    const { title, creationDate, imageSrc } = req.body

    try {
        const newEntry = await prisma.art.create({
            data: {
                title,
                creationDate,
                imageSrc,
                artistId,
            }
        })

        // send notification
        const artist = await prisma.user.findUnique({
            where: {
                id: artistId
            },
        })
        const novu = new Novu(process.env.NOVU_TOKEN);
        console.log(artist)
        novu.trigger('artify', {
            to: {
                subscriberId: artist.email,
                email: artist.email
            },
            payload: {
                name: artist.name,
                title: title,
                imageSrc: imageSrc
            }
        });

        return res.status(200).json({ newEntry, success: true })
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