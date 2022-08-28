import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import AppContext from "../context/AppContext";
import styles from '../styles/Navbar.module.css'

function Navbar() {
    const value = useContext(AppContext)
    let isAuthenticated = value.isAuthenticated
    let setIsAuthenticated = value.setIsAuthenticated
    let setRole = value.setRole
    const router = useRouter()

    const logout = () => {
        axios.post('/api/auth/logout')
            .then(_res => {
                setIsAuthenticated(false)
                setRole(null)
                router.push('/')
            })
            .catch(err => console.error(err))
    }

    return (
        <header className={styles.header}>
            <nav className={styles.headerNav}>
                <Link href='/'>
                    <a className={styles.navLink}>Home</a>
                </Link>
                <Link href='/dashboard'>
                    <a className={styles.navLink}>Dashboard</a>
                </Link>
                {!isAuthenticated ?
                    <Link href='/login'>
                        <a className={styles.navLink}>Login</a>
                    </Link>
                    :
                    <button className={styles.navButton} onClick={logout}>Logout</button>
                }
            </nav>
        </header>
    );
}

export default Navbar;