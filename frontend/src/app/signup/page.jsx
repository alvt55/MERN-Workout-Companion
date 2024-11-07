'use client'

import styles from '../styles/signup.module.css'
import Link from 'next/link'
import { useState } from 'react';

export default function Page() {


     const signup = async (e) => {

        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        setEmailError('');
        setPasswordError('');

        try {
            const res = await fetch('http://localhost:4000/auth/signup', {
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


            <form onSubmit={signup} className={styles.form}>
                <h2>Sign up</h2>
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
                <button type="submit" id="button">Sign up</button>
            </form>

            <Link href="login">Have an account? Sign in here.</Link>
        </div>
        
    );



}