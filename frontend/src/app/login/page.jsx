'use client'
import { useState } from 'react';
import Link from 'next/link'
import { Box, Input, Stack, Button, Heading } from '@chakra-ui/react';
import { Field } from "@/components/ui/field"
import { PasswordInput } from "@/components/ui/password-input"



export default function Page() {



    const loginRequest = async (e) => {

        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        setEmailError('');
        setPasswordError('');




        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}auth/login`, {
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
                window.location.assign('/tracker')

            }

        } catch (err) {
            console.log(err);
        }

    }

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');


    return (

        <Box display="flex" justifyContent="center" alignItems="center" minH="90vh" color="white">

            <form onSubmit={loginRequest}>
                <Heading as="h1" size="2xl">Login</Heading>
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

                <Link href="/signup">Don't have an account? Sign up here.</Link>
            </form>


        </Box>




    );



}