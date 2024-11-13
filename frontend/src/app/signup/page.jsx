'use client'

import styles from '../styles/signup.module.css'
import Link from 'next/link'
import { useState } from 'react';
import { Box, Input, Stack, Button, Heading} from '@chakra-ui/react';
import { Field } from "../../components/ui/field"
import { PasswordInput } from "../../components/ui/password-input"

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
                body: JSON.stringify({ email, password }),
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
        // <div className={styles.container}>


        //     <form onSubmit={signup} className={styles.form}>
        //         <h2>Sign up</h2>
        //         <div className='labelinput'>
        //             <label htmlFor="email">Email</label>
        //             <input name="email" type="text" required />
        //         </div>
        //         <div className='labelinput'>
        //             <label htmlFor="password">Password</label>
        //             <input name="password" type="password" required />
        //         </div>
        //         <div className="emailerror">{emailError}</div>
        //         <div className="passworderror" >{passwordError}</div>
        //         <button type="submit" id="button">Sign up</button>
        //     </form>

        //     <Link href="login">Have an account? Sign in here.</Link>
        // </div>


        <Box display="flex" justifyContent="center" alignItems="center" minH="90vh" color="white">
            
            <form onSubmit={signup}>
            <Heading as="h1" size="2xl">Signup</Heading>
                <Stack gap="4" align="flex-start" maxW="sm" m="3rem 0" fontSize={'1.5rem'} minW="30vw">
                
                    <Field label="Email">
                        <Input name="email" type="email" placeholder="Enter your email" required />
                    </Field>
                    {emailError && <Box color="red.500">{emailError}</Box>}

                    <Field label="Password">
                        <PasswordInput name="password" type="password" placeholder="Enter your password" required />
                    </Field>
                    {passwordError && <Box color="red.500">{passwordError}</Box>}

                    <Button type="submit">Login</Button>
                </Stack>

                <Link href="/login">Have an account? Login here.</Link>
            </form>


        </Box>

    );



}