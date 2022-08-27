import { sign } from "jsonwebtoken"
import { serialize } from "cookie"

const secret = process.env.SECRET

export default async function (req, res) {
    const { email, password } = req.body
    console.log(email, password)
    // check and validate user
    //  need to return 401 if user is not validated


    // token should return role??
    let id = '123'
    let role = 'test'
    const token = sign(
        {
            exp: Math.floor(Date.now() / 1000) + (60 * 60),
            id: id,
            role: role
        },
        secret
    )

    const serialised = serialize('artify', token, {
        httpOnly: true,
        secure: 'development',
        sameSite: 'strict',
        maxAge: 60 * 60,
        path: '/',
    })

    res.setHeader('Set-Cookie', serialised)
    res.status(200).send('Successful login')
    
}