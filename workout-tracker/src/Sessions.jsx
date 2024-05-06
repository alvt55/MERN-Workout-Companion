
import { useState, useRef, createContext, useEffect } from 'react'


// displays sessions 
function Sessions(props) {

    
    useEffect(() => {
        displaySessions()
    }, [props]); 




    // TODO: call displaysessions when sessions field updates 
    
    
    const sessions = props.sessions; 


    function displaySessions() {
    
        // TODO : add the newly added session to the dom instead of the entire array of sessions 
       
        for (let i = 0; i < sessions.length; i++) {

            let container = document.createElement('div'); // container for each session 

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
            
            <button onClick={displaySessions}>DisplaySessions</button>
            <div id="sessions-text">DIV HERE</div>
        </>

    );
}

export default Sessions 