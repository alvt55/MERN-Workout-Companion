import Exercises from "./Exercises";
import { useState, useRef, useEffect} from 'react'
import Sessions from "./Sessions";
import './DisplayExercisesStyles.css'


function DisplayExercises(props) {
    

    // calls display when exercises are added
    useEffect(() => {
        display() 
    },[props]);



    function display() {
        
        let temp = ""; 

        for (let i = 0; i < props.exercises.length; i++) {
            const obj = props.exercises[i]; 
            const objWeight = " (" + obj.weight + ") "; 
            temp += obj.sets + "x" + obj.reps + objWeight + obj.name + "\n";
        }

        document.getElementById("display-text").innerHTML = temp; 
    }


    return(
        
        <>
        
        <div className="displayEx-container">
            {/* pre keeps the new lines created by display()*/}
            <pre id="display-text"></pre>

            <button>hi</button>
        </div>
       
        </>
    ); 
}

// props.exercises

export default DisplayExercises