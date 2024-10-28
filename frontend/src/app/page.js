
import Navbar from "./Navbar/Navbar"

import workoutimg from '../../public/workoutimg.jpg'


// entry point of application 
export default function Page() {


    return (
        <>
            

            <div className='homepage'>
                <h1>Welcome</h1>
                <img src={workoutimg.src} />
            </div>


        </>
    )
}