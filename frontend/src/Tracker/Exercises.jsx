import { useState, useId } from 'react'
import './ExerciseStyles.css'
import DisplayExercises from './DisplayExercises';

import {useSelector, useDispatch } from 'react-redux'
import { addNewExercise, resetExerciseList} from '../SessionSlice';


// exercise input, adding session button 
function Exercises(props) {



    const [currExercise, setCurrExercise] = useState(
        {
            name: "",
            weight: 0,
            sets: 0,
            reps: 0
        }
    );

    // const [exercises, setExercises] = useState([]);
    const [exFields, setExFields] = useState(true);
    const [sessionFields, setSessionFields] = useState(true);

    const dispatch = useDispatch()
    const exercises = useSelector(state => state.session.exercises)



    // accessibility for keyboard users on exercise form 
    const id = useId();


    function handleExerciseFormChange(event) {
        setCurrExercise(prev => {
            return {
                ...prev,
                [event.target.name]: event.target.value
            }
        });
    }



    function addExercise() {

        // empty input detection
        if (currExercise.name === "" || currExercise.sets === 0 || currExercise.reps === 0) {
            setExFields(false);
        }

        else {

            // capitalize first letter of exercise
            let nameCapitalized = currExercise.name.charAt(0).toUpperCase() + currExercise.name.slice(1);
            setCurrExercise(prev => {
                return {
                    ...prev,
                    name: nameCapitalized
                }
            });

            // setExercises(e => [...e, currExercise]);
            dispatch(addNewExercise(currExercise));


            setExFields(true);


            // resets current exercise 
            setCurrExercise({
                name: "",
                weight: 0,
                sets: 0,
                reps: 0
            });

            // TODO: test if this needed 
            document.getElementById('my-form').reset();

        }


    }


    function addSession() {


        // empty date/day detection 
        if (props.date === "" || props.day === "" || exercises.length === 0) {
            setSessionFields(false);
        }

        else {
            // call updateSsssions with exercises here 
            props.updateSessions(exercises)
            dispatch(resetExerciseList())
            setSessionFields(true);
        }
    }




    return (

        <>
            <div className="ex-all">

                <div className="exercises">
                    <form id="my-form" className='my-form'>

                        {/* .label-input represents a pair of label and inputs in a row */}
                        <div className="label-input">
                            <label htmlFor={id + "-name"}>Name of Exercise</label>
                            <input type="text" id={id + "-name"} onInput={handleExerciseFormChange} name="name" value={currExercise.name} />
                        </div>


                        <div className="label-input">
                            <label htmlFor={id + "-weight"}>Weight in lbs</label>
                            <input type="number" id={id + "-weight"} onInput={handleExerciseFormChange} name="weight" value={currExercise.weight} />
                        </div>


                        <div className="label-input">
                            <label htmlFor={id + "-reps"}>Repetitions </label>
                            <input type="number" id={id + "-reps"} onInput={handleExerciseFormChange} name="reps" value={currExercise.reps} />
                        </div>

                        <div className="label-input">
                            <label htmlFor={id + "-sets"}>Sets</label>
                            <input type="number" id={id + "-sets"} onInput={handleExerciseFormChange} name="sets" value={currExercise.sets} />
                        </div>

                    </form >


                    {/* submit exercise */}
                    <button onClick={addExercise}>Add Exercise</button> <br />
                    {!exFields && <p id="missing-exercise-text">Please fill in all exercise fields</p>}

                    <p id="exercise-count">You have added {exercises.length} exercises</p>


                    {/* submit session */}
                    <button onClick={addSession} id='sessions-button'>Add session</button>
                    {!sessionFields && <p id="missing-session-text">Please fill in all session fields</p>}


                </div >

                <DisplayExercises exercises={exercises}></DisplayExercises>

            </div>

        </>


    );


}

export default Exercises