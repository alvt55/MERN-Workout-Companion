import { useState, useRef, useContext, createContext } from 'react'
import './SessionFirstStyles.css'
import Exercises from './Exercises';




// prompting for workout info beforehand - date and day of split 
function SessionFirst() {


    const [date, setDate] = useState("");
    const [day, setDay] = useState(""); // day of split 


    // clears all fields and DOM representation, called when session is added 
    function reset() {
        setDate("");

        setDay("");
        document.getElementById("push-button").style.backgroundColor = "#1f1f1f";
        document.getElementById("pull-button").style.backgroundColor = "#1f1f1f";
        document.getElementById("legs-button").style.backgroundColor = "#1f1f1f"

    }

    function updateDate(event) {
        setDate(event.target.value);
    }


    function updateDayPush() {
        setDay("Push");

        // TODO: use state instead 
        document.getElementById("push-button").style.backgroundColor = "#c8b1e4";
        document.getElementById("pull-button").style.backgroundColor = "#1f1f1f";
        document.getElementById("legs-button").style.backgroundColor = "#1f1f1f";


    }

    function updateDayPull() {
        setDay("Pull");
        document.getElementById("push-button").style.backgroundColor = "#1f1f1f";
        document.getElementById("pull-button").style.backgroundColor = "#c8b1e4";
        document.getElementById("legs-button").style.backgroundColor = "#1f1f1f";

    }

    function updateDayLegs() {
        setDay("Legs");
        document.getElementById("push-button").style.backgroundColor = "#1f1f1f";
        document.getElementById("pull-button").style.backgroundColor = "#1f1f1f";
        document.getElementById("legs-button").style.backgroundColor = "#c8b1e4";

    }


    return (

        <>


            <div className="session">
                <div className="sf-container">

                    <div className="date">
                        <label htmlFor="">Date</label>
                        <input value={date} onChange={updateDate} />
                    </div>





                    <div className="day-buttons">

                        <button onClick={updateDayPush} id='push-button'>Push</button>
                        <button onClick={updateDayPull} id='pull-button'>Pull</button>
                        <button onClick={updateDayLegs} id='legs-button'>Legs</button>
                    </div>




                </div>

            </div>


            {/* resetDate wrapped in function to prevent auto calls  */}
            {/* resetDate allows Exercises component to clear parent(this) field */}
            <Exercises date={date} day={day} reset={() => reset()}></Exercises>

        </>
    );
}

export default SessionFirst

