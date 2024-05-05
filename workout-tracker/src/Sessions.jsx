
import { useState, useRef, createContext, useEffect } from 'react'


function Sessions(props) {

    const [sessions, setSessions] = useState([]);
    const [currsession, setCurrSession] = useState(null);


    // TODO: call displaysessions when sessions field updates 
    

    function updateSessions() {
        const currSession = {
            date: props.date,
            day: props.day,
            exercises: props.exercises
        };

        console.log(currSession); 

        setSessions(s => [...s, currSession]); 
        console.log(sessions.length); // real length is +1 b/c useState is async 
       
        
    
    }


    function displaySessions() {
       

        // console.log(sessions[1].date); 

       
        for (let i = 0; i < sessions.length; i++) {

            let container = document.createElement('div'); 

            let dateDay = document.createElement('h2'); 
            let dateDayNode = document.createTextNode(sessions[i].date + ": " + sessions[i].day); 
            
           
            dateDay.appendChild(dateDayNode); 
            container.appendChild(dateDay); 

            let exList = document.createElement('ul'); 
            const sessionExercises = sessions[i].exercises;     // all exercises for sessions[i]

            for (let e = 0; e < sessionExercises.length; e++) {
                let exBulletPoint = document.createElement("li");
                let currExercise = sessionExercises[e];

                // text for exercise 
                const currExerciseWeight = " (" + currExercise.weight + ") "; 
                let exText = currExercise.sets + "x" + currExercise.reps + currExerciseWeight + currExercise.name + "\n";

                let exerciseNode = document.createTextNode(exText); 
                exBulletPoint.appendChild(exerciseNode);
                exList.appendChild(exBulletPoint); 
                
            }

           
            container.appendChild(exList); 

            document.getElementById("sessions-text").prepend(container); // prepend adds new items to the top of list

        }

    


    }

    return (

        <>
            <button onClick={updateSessions}>Add Session</button>
            <button onClick={displaySessions}>DisplaySessions</button>
            <div id="sessions-text">DIV HERE</div>
        </>

    );
}

export default Sessions 