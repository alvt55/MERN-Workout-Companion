'use client'
import Link from 'next/link'
import styles from '../styles/navbar.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell } from '@fortawesome/free-solid-svg-icons';





// navbar that is always accessible 
export default function Navbar() {


    return (


        <div className={styles.navbarcontainer}>

            <Link href="/"><h1>Companion <FontAwesomeIcon icon={faDumbbell}/></h1></Link>

            <div className={styles.navbarlinks}>

                <Link href="/tracker" className={styles.navbarlink}>Gym Tracker</Link>
                <Link href="/searchpage" className={styles.navbarlink}>Exercise Search</Link>
                {/* <Link href="/">Contact Us</Link> */}


            </div>

        </div>









    )
}