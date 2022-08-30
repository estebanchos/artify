
export default async function (req, res) {
    const { cookies } = req

    const jwt = cookies.artify

    if (!jwt) return req.json({ message: 'Invalid token' })

    res.json({ message: 'Successful' })
}