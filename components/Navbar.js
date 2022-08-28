import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import AppContext from "../context/AppContext";

function Navbar() {
    const value = useContext(AppContext)
    let isAuthenticated = value.isAuthenticated
    let setIsAuthenticated = value.setIsAuthenticated
    const router = useRouter()

    const logout = () => {
        axios.post('/api/auth/logout')
        .then(_res => {
            setIsAuthenticated(false)
            router.push('/')
        })
        .catch(err => console.error(err))
    }

    return (
        <div className='container flex justify-end h-10' >
            <div className='flex items-center w-1/4 justify-evenly'>
                <Link href='/'>Home</Link>
                <Link href='/dashboard'>Dashboard</Link>
                {!isAuthenticated ?
                    <Link href='/login'>Login</Link>
                    :
                    <button onClick={logout}>Logout</button>    
                }
            </div>
        </div>
    );
}

export default Navbar;