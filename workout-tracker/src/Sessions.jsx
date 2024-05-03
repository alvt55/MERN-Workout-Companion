
import { useState, useRef, createContext, useEffect } from 'react'


function Sessions(props) {

    const [sessions, setSessions] = useState([]);
    const [currsession, setCurrSession] = useState(null);

    useEffect(() => {

    }, []);

    function updateSessions() {
        setCurrSession({
            date: props.date,
            day: props.day,
            exercises: props.exercises
        });

        console.log(currsession); 

        setSessions(s => [...s, currsession]); //!!!
        console.log(sessions); 
    }


    function displaySessions() {
        // appendchild 
       

        for (let i = 0; i < sessions.length, i++;) {
             console.log("test");


            // let container = document.createElement('div'); 
            // // TODO: assign a classname to container 
            // let dateDay = document.createElement('h2'); 
            // let dateDayNode = document.createTextNode(sessions[i].date + ": " + sessions[i].day); 
            // dateDay.append(dateDayNode); 

            // let exList = document.createElement('li'); 
            // const sessionExercises = sessions[i].exercises;     // all exercises for sessions[i]

            // for (let e = 0; e < sessionExercises.length; e++) {
            //     let currExercise = sessionExercises[e];
            //     const currExerciseWeight = " (" + currExercise.weight + ") "; 
            //     let temp = currExercise.sets + "x" + currExercise.reps + currExerciseWeight + currExercise.name + "\n";
            //     let exerciseInfo = document.createTextNode(temp); 
            //     exList.appendChild(exerciseInfo);
                
            // }

            // container.appendChild(dateDay);
            // container.appendChild(exList); 

            // document.getElementById("sessions-text").appendChild(container); 

        }

    


    }

    return (

        <>
            <button onClick={updateSessions}>Add Session</button>
            <button onClick={displaySessions}>DisplaySessions</button>
            <div id="sessions-text">uhu</div>
        </>

    );
}

export default Sessions 