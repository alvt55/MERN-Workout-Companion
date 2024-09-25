import { Link } from 'react-router-dom';
import './NavbarStyles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell } from '@fortawesome/free-solid-svg-icons';





// navbar that is always accessible 
export default function Navbar(props) {


    return (
        <div className="navbar-container">

            <h1>Companion <FontAwesomeIcon icon={faDumbbell}/></h1>
            
            <div className="navbar-links">

            <Link to="/" className='navbar-link'>Gym Tracker</Link>
            <Link to="/search" className='navbar-link'>Exercise Search</Link>
            <Link to="/">Contact Us</Link>
            </div>

       


        </div>
    )
}