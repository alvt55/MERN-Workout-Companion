
import Navbar from "./Navbar/Navbar"
import '../index.css'
import workoutimg from '../../public/workoutimg.jpg'


export default function Page() {


    return (
        <>
            <Navbar />

            <div className='homepage'>
                <h1>Welcome</h1>
                <img src={workoutimg.src} />
            </div>


        </>
    )
}