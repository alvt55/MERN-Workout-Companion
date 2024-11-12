'use client'

import styles from '../styles/signup.module.css' // uses the same css as signup
import { useState } from 'react';
import Link from 'next/link'

export default function Page() {



    const loginRequest = async (e) => {

        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        setEmailError('');
        setPasswordError('');

        try {
            const res = await fetch('http://localhost:4000/auth/login', {
                method: 'POST',
                body: JSON.stringify({email, password}),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            }); 

            const data = await res.json(); 

            if (data.errors) {
                setEmailError(data.errors.email);
                setPasswordError(data.errors.password);
            }
            
            if (data.user) {
                location.assign('/tracker')

            }
            
        } catch (err) {
            console.log(err); 
        }

    }

        const [emailError, setEmailError] = useState('');
        const [passwordError, setPasswordError] = useState('');


    return (
        <div className={styles.container}>


            <form onSubmit={loginRequest} className={styles.form}>
                <h2>Login</h2>
                <div className='labelinput'>
                    <label htmlFor="email">Email</label>
                    <input name="email" type="text" required />
                </div>
                <div className='labelinput'>
                    <label htmlFor="password">Password</label>
                    <input name="password" type="password" required />
                </div>
                <div className="emailerror">{emailError}</div>
                <div className="passworderror" >{passwordError}</div>
                <button type="submit" id="button">Login</button>
            </form>

            <Link href="signup">Don't have an account? Sign up here.</Link>
        </div>
    );



}