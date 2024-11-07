'use client'
import Link from 'next/link'
import styles from '../styles/navbar.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell } from '@fortawesome/free-solid-svg-icons';


import { usePathname } from 'next/navigation'





// navbar that is always accessible 
export default function Navbar(props) {



    const path = usePathname();


    const logoutRequest = async (e) => {

        try {
            const res = await fetch('http://localhost:4000/auth/logout', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });

            location.assign('/login')

        } catch (err) {
            console.log(err);
        }

    }


    return (


        <div className={styles.navbarcontainer}>

            <Link href="/"><h1>Companion <FontAwesomeIcon icon={faDumbbell} /></h1></Link>

            <div className={styles.navbarlinks}>

                <Link href="/tracker" className={styles.navbarlink}>Gym Tracker</Link>
                <Link href="/searchpage" className={styles.navbarlink}>Exercise Search</Link>

                {/* displays login or logout based on current url */}
                {path === '/tracker' ?
                    <button onClick={logoutRequest}>logout</button> :
                    <Link href="/login" className={styles.navbarlink}>Login</Link>}


            </div>

        </div>









    )
}