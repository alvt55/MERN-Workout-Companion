import { useState, useId } from 'react'
import styles from '../styles/exercises.module.css'
import DisplayExercises from './DisplayExercises';

import { useSelector, useDispatch } from 'react-redux'
import { addNewExercise } from '../../SessionSlice';


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
    const date = useSelector(state => state.session.date)
    const day = useSelector(state => state.session.day)



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

         
            

        }


    }


    function addSession() {

            // call updateSsssions with exercises here 
            if (date == "" || day == "" || exercises.length == 0) {
                console.log(date, day, exercises)
                setSessionFields(false); 
                return; 
            }



            props.updateSessions()
            setSessionFields(true);  
    }




    return (

        <>
            <div className={styles.exall}>

                <div className={styles.exercises}>
                    <form id={styles.myform} className={styles.myform}>

                        {/* .label-input represents a pair of label and inputs in a row */}
                        <div className='labelinput'>
                            <label htmlFor={id + "-name"}>Name of Exercise</label>
                            <input type="text" id={id + "-name"} onInput={handleExerciseFormChange} name="name" value={currExercise.name} />
                        </div>


                        <div className='labelinput'>
                            <label htmlFor={id + "-weight"}>Weight in lbs</label>
                            <input type="number" id={id + "-weight"} onInput={handleExerciseFormChange} name="weight" value={currExercise.weight} />
                        </div>


                        <div className='labelinput'>
                            <label htmlFor={id + "-reps"}>Repetitions </label>
                            <input type="number" id={id + "-reps"} onInput={handleExerciseFormChange} name="reps" value={currExercise.reps} />
                        </div>

                        <div className='labelinput'>
                            <label htmlFor={id + "-sets"}>Sets</label>
                            <input type="number" id={id + "-sets"} onInput={handleExerciseFormChange} name="sets" value={currExercise.sets} />
                        </div>

                    </form >


                    {/* submit exercise */}
                    <button onClick={addExercise} id='button'>Add Exercise</button> <br />
                    {!exFields && <p id={styles.missingexercise}>Please fill in all exercise fields</p>}

                    <p id={styles.exercisecount}>You have added {exercises.length} exercises</p>


                    {/* submit session */}
                    <button onClick={addSession} id='sessionbutton'>Add session</button>
                    {!sessionFields && <p id={styles.missingsessiontext}>Please fill in all session fields</p>}


                </div >

                <DisplayExercises/>

            </div>

        </>


    );


}

export default Exercises