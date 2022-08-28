import { serialize } from "cookie"

export default async function (req, res) {
    if (req.method === 'POST') {
        return await logout(req, res);
    } else {
        return res.status(405).json({ message: 'Method not allowed', success: false });
    }
}

// ****** handlers ********
async function logout(req, res) {
    const { cookies } = req

    const jwt = cookies.artify
    if (jwt) {
        const serialised = serialize('artify', jwt, {
            httpOnly: true,
            secure: 'development',
            sameSite: 'strict',
            maxAge: -1,
            path: '/',
        })
        res.setHeader('Set-Cookie', serialised)
        res.status(200).send('Successful log out')
    }
}