import { useState, useRef, createContext, useEffect, useId } from 'react'
import { Link, Outlet } from 'react-router-dom';



export default function Search() {

    const [search, setSearch] = useState(''); 
   



    return (


        <>

        <Link to="/tracker">Tracker</Link>
        <Outlet></Outlet>
        <form>
            <input
                type="text"
                name="search"
                onChange={(e) => setSearch(e.target.value.toLowerCase())}
                value={search}
            />
            
        </form>
        <button>Submit</button>

        </>


    );
}