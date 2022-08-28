import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/router';


export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const router = useRouter()

    const handleSubmit = (e) => {
        e.preventDefault()
        if (email && password) {
            axios.post('/api/auth/login', {
                email,
                password
            })
                .then(res => {
                    setEmail('')
                    setPassword('')
                    redirectToDashboard(res.data.role)
                })
                .catch(err => {
                    console.error(err)
                })
        }
    }

    const redirectToDashboard = (role) => {
        const url = ''
        switch (role) {
            case 'ADMIN':
                url = 'admin'
                break
            case 'ARTIST':
                url = 'artists'
                break
            default:
                url = 'visitors'
        }
        
        console.log(url)
        router.push(`/dashboard/${url}`)
    }

    return (
        <div className='flex flex-col items-center justify-center w-full h-screen space-y-8 lg-flex-row'>
            <h1 className=''>Log in</h1>
            <p className=''>Sign in to access your dashboard.</p>
            <form className=''>
                <div>
                    <label className='' htmlFor='email'>Email</label>
                    <input
                        id='email'
                        name='email'
                        className=''
                        placeholder='you@example.com'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoCapitalize='none'
                    />
                </div>
                <div>
                    <label className='' htmlFor='password'>Password</label>
                    <input
                        id='password'
                        name='password'
                        className=''
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className=''>
                    <div className={`${!showPassword ? '' : 'hidden'}`} onClick={() => setShowPassword(!showPassword)}>
                        <Image
                            src='/icons/show.svg'
                            alt='show password icon'
                            // layout='fill'
                            objectFit='cover'
                            width='1.5rem'
                            height='1.5rem'
                        />
                    </div>
                    <div className={`${showPassword ? '' : 'hidden'}`} onClick={() => setShowPassword(!showPassword)}>
                        <Image
                            src='/icons/show.svg'
                            alt='hide password icon'
                            // layout='fill'
                            objectFit='cover'
                            width='1.5rem'
                            height='1.5rem'
                        />
                    </div>
                </div>
                <button
                    className=''
                    onClick={handleSubmit}
                    onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                >
                    Log in
                </button>
            </form>
            <div className=''>
                <p className=''>Don't yet have an account?</p>
                <Link className='' href='/register'>Sign Up</Link>
            </div>
        </div>
    );
}