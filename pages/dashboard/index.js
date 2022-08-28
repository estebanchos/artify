import { useRouter } from "next/router"
import { useContext, useEffect } from "react"
import AppContext from "../../context/AppContext"

export default function Dashboard() {
    const router = useRouter()
    const value = useContext(AppContext)
    let currentRole = value.role

    const redirect = (role) => {
        const url = ''
        switch (role) {
            case 'ADMIN':
                url = '/dashboard/admin'
                break
            case 'ARTIST':
                url = '/dashboard/artists'
                break
            case 'VISITOR':
                url = '/dashboard/visitors'
                break
            default:
                url = '/login'
        }
        router.push(`${url}`)
    }

    useEffect(() => {
        redirect(currentRole)
    }, [])
    
    return ( 
        <div className="flex content-center justify-center">Loading...</div>
     );
}