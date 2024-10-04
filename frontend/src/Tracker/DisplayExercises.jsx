
import './DisplayExercisesStyles.css'

import { useSelector } from 'react-redux';



function DisplayExercises() {

    const exercises = useSelector(state => state.session.exercises)



    // displays exercises formatted in preview
    function display() {

        let temp = "";

        for (let i = 0; i < exercises.length; i++) {
            const obj = exercises[i];

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