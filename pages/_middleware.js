import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const secret = process.env.SECRET

export default function middleware(req) {
    const { cookies } = req

    const token = cookies.artify

    const url = req.url
    
    if (url.includes('/login')) {
        if (token) {
            try {
                jwt.verify(token, secret)
                return NextResponse.redirect('/dashboard')
            } catch (e) {
                return NextResponse.next()
            }
        }
    }

    if (url.includes('/dashboard')) {
        if (token === undefined) {
            return NextResponse.redirect('/login')
        }

        try {
            jwt.verify(token, secret)
            return NextResponse.next()
        } catch (e) {
            return NextResponse.redirect('/login')
        }
    }
    return NextResponse.next()

}