import { useContext, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/router';
import AppContext from '../context/AppContext';
import styles from '../styles/Login.module.css'


import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Card } from 'antd';

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const router = useRouter()
    const value = useContext(AppContext)
    let setIsAuthenticated = value.setIsAuthenticated
    let setRole = value.setRole

    const handleSubmit = (e) => {
        e.preventDefault()
        if (email && password) {
            axios.post('/api/auth/login', {
                email,
                password
            })
                .then(res => {
                    setIsAuthenticated(true)
                    setRole(res.data.role)
                    redirectToDashboard(res.data.role)
                    setEmail('')
                    setPassword('')
                })
                .catch(err => console.error(err))
        }
    }

    const redirectToDashboard = (role) => {
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

    return (
        <div style={{
            width: '80%',
            maxWidth: '40rem',
            margin: '2rem auto'
        }}>
            <h1 className={styles.loginTitle}>Log in</h1>
            <Card
                style={{
                    width: '100%',
                    minHeight: '75vh',
                }}
                title="Sign in to access your dashboard"
            >
                <form className={styles.loginContainer}>
                    <div className={styles.inputContainer}>
                        <input
                            id='email'
                            name='email'
                            className={styles.loginInput}
                            placeholder='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoCapitalize='none'
                        />
                        <span className={styles.userIcon}><UserOutlined
                            style={{
                                color: 'gray',
                            }}
                        /></span>
                    </div>
                    <div className={styles.inputContainer}>
                        <input
                            id='password'
                            name='password'
                            placeholder='Password'
                            className={styles.loginInput}
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <span className={styles.lockIcon}><LockOutlined
                            style={{
                                color: 'gray',
                            }}
                        /></span>
                    </div>
                    <button
                        className={styles.button}
                        onClick={handleSubmit}
                        onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                    >
                        Log in
                    </button>
                </form>
                <div className={styles.register}>
                    <p className={styles.registerCopy}>Don't yet have an account?</p>
                    <Link href='/register'>
                        <a className={styles.registerLink}>Sign Up</a>
                    </Link>
                </div>
            </Card >
        </div>
    )
}