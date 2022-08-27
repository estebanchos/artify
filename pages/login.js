import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';


function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const handleSubmit = () => {
        if (email && password) {
            axios.post(`api/auth/login`, {
                email,
                password
            })
                .then(res => {
                    setEmail('')
                    setPassword('')
                    // redirectToNextPage()
                })
                .catch(err => {
                    console.error(err)
                })
        }
    }

    return (
        <div className=''>
            <h1 className=''>Log in</h1>
            <p className=''>Sign in to access your dashboard.</p>
            <div className=''>
                <input
                    className=''
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoCapitalize='none'
                />
                <input
                    className=''
                    placeholder='Password'
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                />
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
                >
                    Log in
                </button>
            </div>
            <div className=''>
                <p className=''>Don't yet have an account?</p>
                <Link className='' href='/register'>Sign Up</Link>
            </div>
        </div>
    );
}

export default Login;