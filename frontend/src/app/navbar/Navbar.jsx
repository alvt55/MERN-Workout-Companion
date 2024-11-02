'use client'
import Link from 'next/link'
import styles from '../styles/navbar.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell } from '@fortawesome/free-solid-svg-icons';
import { redirect } from 'next/navigation'





// navbar that is always accessible 
export default function Navbar() {

    const logout = async (e) => {

    
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

            <Link href="/"><h1>Companion {}<FontAwesomeIcon icon={faDumbbell}/></h1></Link>

            <div className={styles.navbarlinks}>

                <Link href="/tracker" className={styles.navbarlink}>Gym Tracker</Link>
                <Link href="/searchpage" className={styles.navbarlink}>Exercise Search</Link>
                <button onClick={logout}>logout</button>


            </div>

        </div>









    )
}