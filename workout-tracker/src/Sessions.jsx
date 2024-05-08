
import { useState, useRef, createContext, useEffect } from 'react'
import './SessionsStyles.css';


// displays sessions 
function Sessions(props) {


    useEffect(() => {
        displaySessions()
    }, [props.sessions]);







    const sessions = props.sessions;




    function displaySessions() {

       
        const idx = sessions.length - 1;
        let latestSession = sessions[idx];


        // prevents error - using .date operator when sessions is empty 
        if (idx >= 0) {
            let container = document.createElement('div'); // container for each session 
            container.classList.add("session-container");

            let dateDay = document.createElement('h3');
            let dateDayNode = document.createTextNode(latestSession.date + ": " + latestSession.day);
            // TODO: display different colored highlights for cards depending on day of split 
            // 
            dateDay.appendChild(dateDayNode);
            container.appendChild(dateDay);

            let exList = document.createElement('ul');
            const sessionExercises = latestSession.exercises;     // all exercises for sessions[i]

            for (let e = 0; e < sessionExercises.length; e++) {
                let exBulletPoint = document.createElement("li");
                let currExercise = sessionExercises[e];


                // text for exercise 
                let weight = currExercise.weight; 

                if (weight <= 0) {
                    weight = "bw"; 
                }

                const currExerciseWeight = " (" + weight + ") ";
                let exText = currExercise.sets + "x" + currExercise.reps + currExerciseWeight + currExercise.name + "\n";

                let exerciseNode = document.createTextNode(exText);
                exBulletPoint.appendChild(exerciseNode);
                exList.appendChild(exBulletPoint);

            }


            container.appendChild(exList);
            document.getElementById("sessions-text").prepend(container); // prepend adds to top of sessions
        }



    }

    return (

        <>
            <div id="sessions-text"></div>
        </>

    );
}

export default Sessions 