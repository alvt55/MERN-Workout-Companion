
import { useState, useRef, createContext, useEffect } from 'react'
import './SessionsStyles.css';


// displays sessions 
function Sessions(props) {


    useEffect(() => {
        displayAllSessions()
    }, [props.sessions]);



    const sessions = props.sessions;


    // resets sessions div then adds all sessions 
    function displayAllSessions() {


        // TODO: create a seperate card component 
        document.getElementById('sessions-text').innerHTML = "";

        for (let i = 0; i < sessions.length; i++) {

            let currSession = sessions[i];

            let container = document.createElement('div'); // container for each session 
            container.classList.add("session-container");


            // unique class based on day property 
            if (currSession.day == "Push") {
                container.classList.add("push");
            } else if (currSession.day == "Pull") {
                container.classList.add("pull");
            } else {
                container.classList.add("legs");
            }

            let dateDay = document.createElement('h3');
            let dateDayNode = document.createTextNode(currSession.date + ": " + currSession.day);

            dateDay.appendChild(dateDayNode);
            container.appendChild(dateDay);

            let exList = document.createElement('ul');
            const sessionExercises = currSession.exercises;     // all exercises for sessions[i]

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
            document.getElementById('sessions-text').prepend(container);

        }



    }





    return (

        <>
            <div id="sessions-text"></div>
        </>

    );
}

export default Sessions 