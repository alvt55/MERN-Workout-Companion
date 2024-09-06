
import {useEffect } from 'react'
import './DisplayExercisesStyles.css'



function DisplayExercises(props) {


    // calls display when exercises are added
    useEffect(() => {
        display()
    }, [props]);



    function display() {

        let temp = "";

        for (let i = 0; i < props.exercises.length; i++) {
            const obj = props.exercises[i];

            // removes weight if 0 
            let weight = " (" + obj.weight + ") ";
            if (obj.weight <= 0) {
                weight = " ";
            }

           
            temp += obj.sets + "x" + obj.reps + weight + obj.name + "\n";
        }

        return temp;
    }


    return (

        <>

            <div className="displayEx-container">
                {/* pre keeps the new lines created by display()*/}
                <pre id="display-text">{display()}</pre>


            </div>

        </>
    );
}



export default DisplayExercises