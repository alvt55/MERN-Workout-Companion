'use client'
import Link from 'next/link'
import './NavbarStyles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell } from '@fortawesome/free-solid-svg-icons';





// navbar that is always accessible 
export default function Navbar() {


    return (

        
        <div className="navbar-container">

            <Link href="/"><h1>Companion <FontAwesomeIcon icon={faDumbbell}/></h1></Link>
            
            <div className="navbar-links">

            <Link href="/tracker" className='navbar-link'>Gym Tracker</Link>
            <Link href="/searchpage" className='navbar-link'>Exercise Search</Link>
            {/* <Link href="/">Contact Us</Link> */}


            </div>

        </div>







        
        
    )
}