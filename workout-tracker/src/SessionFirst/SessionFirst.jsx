import { useState, useRef } from 'react'
import './SessionFirstStyles.css'

// prompting for workout info beforehand - date and day of split 
function SessionFirst() {


    const [date, setDate] = useState("");
    const [day, setDay] = useState(); // day of split 

    function updateDate(event) {
        setDate(event.target.value);

    }


    // function updateDay(event) {
    //     setDay(event.target.value);

    // }


    function updateDayPush() {
        setDay("Push");
        document.getElementById("push-button").style.backgroundColor = "Blue";
        document.getElementById("pull-button").style.backgroundColor = "white";
        document.getElementById("legs-button").style.backgroundColor = "white";


    }

    function updateDayPull() {
        setDay("Pull");
        document.getElementById("push-button").style.backgroundColor = "white";
        document.getElementById("pull-button").style.backgroundColor = "Blue";
        document.getElementById("legs-button").style.backgroundColor = "white";

    }

    function updateDayLegs() {
        setDay("Legs");
        document.getElementById("push-button").style.backgroundColor = "white";
        document.getElementById("pull-button").style.backgroundColor = "white";
        document.getElementById("legs-button").style.backgroundColor = "Blue";

    }


    return (


        <div className="session">
            <div className="container">

                <div className="date">
                    <label htmlFor="">Date</label>
                    <input value={date} onChange={updateDate}/>
                </div>





                {/* radio instead of buttons  */}
                {/* <label>Push</label>
                <input type="radio" value="Push" checked={day === "Push"} onChange={updateDay}/>
                <label>Pull</label>
                <input type="radio" value="Pull" checked={day === "Pull"} onChange={updateDay}/>
                <label>Legs</label>
                <input type="radio" value="Legs" checked={day === "Legs"} onChange={updateDay}/>  */}




       
                    <div className="day-buttons">
                        
                        <button onClick={updateDayPush} id='push-button'>Push</button>
                        <button onClick={updateDayPull} id='pull-button'>Pull</button>
                        <button onClick={updateDayLegs} id='legs-button'>Legs</button>
                    </div>
             



            </div>
        </div>
    );
}

export default SessionFirst

