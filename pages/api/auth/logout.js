import { serialize } from "cookie"

export default async function (req, res) {
    const { cookies } = req

    const jwt = cookies.artify

    const serialised = serialize('artify', token, {
        httpOnly: true,
        secure: 'development',
        sameSite: 'strict',
        maxAge: -1,
        path: '/',
    })
    res.setHeader('Set-Cookie', serialised)
    res.status(200).send('Successful log out')
}