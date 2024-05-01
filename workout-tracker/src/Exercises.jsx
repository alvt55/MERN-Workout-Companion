
import { useState, useRef, createContext } from 'react'
import './ExerciseStyles.css'
import DisplayExercises from './DisplayExercises';
import Sessions from './Sessions';



function Exercises(prop) {

    const name = useRef("");
    const weight = useRef(0);
    const reps = useRef(0);
    const sets = useRef(0);

    let currExercise = useState(null);
    const [exercises, setExercises] = useState([]);


    // field updaters 
    function updateName(event) {
        name.current = event.target.value;
        console.log(name.current);
    }

    function updateWeight(event) {
        weight.current = event.target.value;
        console.log(weight.current);
    }

    function updateReps(event) {
        reps.current = event.target.value;
        console.log(reps.current);
    }

    function updateSets(event) {
        sets.current = event.target.value;
        console.log(sets.current);
    }

    // creating a current exercise, adding it to the list of exercises 
    function addExercise(event) {

        // TODO: notify if any of the fields are blank 
        currExercise = {
            name: name.current,
            weight: weight.current,
            sets: sets.current,
            reps: reps.current
        };

        setExercises(e => [...e, currExercise]);
        document.getElementById('my-form').reset();



    }




    return (

        <>
        <div className="ex-all">

            <div className="exercises">
                <form id="my-form" className='my-form'>

                    {/* .label-input represents a pair of label and inputs in a row */}

                    <div className="label-input">
                        <label >Name of Exercise</label>
                        <input type="text" onChange={updateName} placeholder='ex. push ups' id="input" />
                    </div>

                    <div className="label-input">
                        <label>Weight in lbs</label>
                        <input type="number" onChange={updateWeight} placeholder='ex. 50lbs' />
                    </div>


                    <div className="label-input">
                        <label>Repetitions </label>
                        <input type="number" onChange={updateReps} />
                    </div>

                    <div className="label-input">
                        <label>Sets</label>
                        <input type="number" onChange={updateSets} />
                    </div>

                </form >

                <button onClick={addExercise}>Add Exercise</button>
                <p id="exercise-count">You have added {exercises.length} exercises</p>


            </div >

            <DisplayExercises exercises={exercises}></DisplayExercises>
           
        </div>
        <Sessions exercises={exercises} date={prop.date} day={prop.day}></Sessions>
        </>


    );


}

export default Exercises