'use client'
import Link from 'next/link'
import styles from '../styles/navbar.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell } from '@fortawesome/free-solid-svg-icons';

import { Box, Flex, Button} from '@chakra-ui/react';
import { usePathname } from 'next/navigation'





// navbar that is always accessible 
export default function Navbar(props) {



    const path = usePathname();


    const logoutRequest = async (e) => {

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}auth/logout`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });

            if (res) {
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


        // <div className={styles.navbarcontainer}>

        //     <Link href="/"><h1>Companion <FontAwesomeIcon icon={faDumbbell} /></h1></Link>

        //     <div className={styles.navbarlinks}>

        //         <Link href="/tracker" className={styles.navbarlink}>Gym Tracker</Link>
        //         <Link href="/searchpage" className={styles.navbarlink}>Exercise Search</Link>

        //         {/* displays login or logout based on current url */}
        //         {path === '/tracker' ?
        //             <button onClick={logoutRequest}>logout</button> :
        //             <Link href="/login" className={styles.navbarlink}>Login</Link>}


        //     </div>

        // </div>


        <Box w="100%" h="10vh" bg="teal.500" alignContent={'center'} >

            <Flex gap="10" justifyContent='space-evenly' m="0 3rem">
               
                <Flex >
                    <Link href="/" style={{ textDecoration: 'none' }}>
                        <h1 style={{ fontSize: '2rem' }}>
                            GCompanion <FontAwesomeIcon icon={faDumbbell} />
                        </h1>
                    </Link>
                </Flex>


                <Flex justifyContent="space-evenly" flex="1" alignItems='center' fontSize="1.6rem">

                    <Link href="/tracker" className={styles.navbarlink}>Gym Tracker</Link>
                    <Link href="/searchpage" className={styles.navbarlink}>Exercise Search</Link>

                    {/* displays login or logout based on current url */}
                    {path === '/tracker' ?
                        <Button onClick={logoutRequest}>Logout</Button> :
                        <Button onClick={loginRequest}>Login</Button> }

                        {/* // <Link href="/login" className={styles.navbarlink}>Login</Link>} */}

                    {/* <Button onClick={logoutRequest}>Logout</Button> */}
                </Flex>
            </Flex>

        </Box>










    )
}