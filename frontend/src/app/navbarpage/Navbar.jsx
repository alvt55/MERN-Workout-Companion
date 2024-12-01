'use client'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell } from '@fortawesome/free-solid-svg-icons';

import { Box, Flex, Button, Heading, VStack} from '@chakra-ui/react';
import {
    MenuContent,
    MenuRoot,
    MenuTrigger,
  } from "@/components/ui/menu"
import { usePathname } from 'next/navigation'





// navbar that is always accessible 
export default function Navbar(props) {



    const path = usePathname();
    const loggedIn = path === '/tracker' || path === '/searchpage'; 


    const logoutRequest = async (e) => {
        const jwt = window.localStorage.getItem('jwt');

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}auth/logout`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${jwt}`
                },
                credentials: 'include'
            });

            if (res) {
                window.localStorage.removeItem('jwt');
                window.location.assign('/login')
            }


        } catch (err) {
            console.log(err);
        }

    }


    const loginRequest = () => {
        window.location.assign('/login')
    }

    return (

        <Box maxWidth="100%" h="10vh" bg="teal.500" alignContent={'center'} color="#1f1f1f" overflowX="hidden">

            <Flex gap="10" justifyContent='space-evenly' m="0 3rem">

                <Flex >
                    <Link href="/" style={{ textDecoration: 'none' }}>
                        <Flex fontSize='2rem' gap={5}>
                            <Heading hideBelow="md">GCompanion</Heading> <FontAwesomeIcon icon={faDumbbell} />
                        </Flex>
                    </Link>
                </Flex>


                {/* links for larger screens */}
                <Flex justifyContent="space-evenly" flex="1" alignItems='center' fontSize="1.6rem" hideBelow="lg">
                    { loggedIn ?
                        <>
                            <Link href="/tracker" >Gym Tracker</Link>
                            <Link href="/searchpage" >Exercise Search</Link>
                            <Button onClick={logoutRequest} >Logout</Button>

                        </> :
                        <Button onClick={loginRequest} marginLeft="auto">Login</Button>}
                </Flex>

                <MenuRoot>
                    <MenuTrigger asChild display={{ base: "flex", md: "flex", lg: "none", xl: "none" }} >
                        <Button variant="outline" size="sm">
                            Menu
                        </Button>
                    </MenuTrigger>
                    <MenuContent backgroundColor="#1f1f1f" color="white" outline="white" display={{ base: "flex", md: "flex", lg: "none", xl: "none" }}>
                    { loggedIn ?
                        <VStack justify="center">
                             <Link href="/tracker" >Gym Tracker</Link>
                            <Link href="/searchpage" >Exercise Search</Link>
                            <Button onClick={logoutRequest} >Logout</Button>

                        </VStack> :

                        <Button onClick={loginRequest} marginLeft="auto">Login</Button>
                        }
                    </MenuContent>
                </MenuRoot>
            </Flex>

        </Box>










    )
}