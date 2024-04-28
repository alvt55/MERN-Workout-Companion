import { useState, useRef} from 'react'

function SessionFirst() {

    const [date, setDate] = useState(""); 
    const [day, setDay] = useState(); // day of split 
    
    function updateDate(event) {
        setDate(event.target.value);
        console.log(date); 
    }

    
    function updateDay(event) {
        setDay(event.target.value);
  
    }


    return(

       <div className="session">
            <div className="container">
                <label htmlFor="">Date</label>
                <input value={date} onChange={updateDate}/>

            <h1>{day}</h1>

                <label>Push</label>
                <input type="radio" value="Push" checked={day === "Push"} onChange={updateDay}/>
                <label>Pull</label>
                <input type="radio" value="Pull" checked={day === "Pull"} onChange={updateDay}/>
                <label>Legs</label>
                <input type="radio" value="Legs" checked={day === "Legs"} onChange={updateDay}/>
               
            </div>
       </div>
    ); 
}

export default SessionFirst 