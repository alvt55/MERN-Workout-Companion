
import { Link, Outlet } from 'react-router-dom'; 


export default function Navbar() {


    return(
        <div className="navbar-container">

            <h1>THIS IS NAVBAR</h1>
            <Link to="/">Tracker</Link>
       
            <Link to="/search">Search</Link>

                <Outlet></Outlet>
        </div>
    )
}