
import { useState, useRef, createContext, useEffect } from 'react'
import './ExerciseStyles.css'
import DisplayExercises from './DisplayExercises';
import Sessions from './Sessions';


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

    const [exercises, setExercises] = useState([]);

    // sessions 
    const [sessions, setSessions] = useState([]);


    // loading data every render 
    useEffect(() => {
        const data = localStorage.getItem('my_sessions');
        if (data !== null) {
            setSessions(JSON.parse(data));
            console.log(sessions);
        }
    }, []);


    // saving sessions to "my_sessions" everytime sessions changes 
    useEffect(() => {
        localStorage.setItem("my_sessions", JSON.stringify(sessions));
    }, [sessions]);



    function handleExerciseFormChange(event) {
        setCurrExercise(prev => {
            return {
                ...prev,
                [event.target.name]: event.target.value
            }
        }


        );
    }


    // creating a current exercise, adding it to the list of exercises 
    function addExercise() {

        // empty input detection
        if (currExercise.name == "" || currExercise.sets == 0 || currExercise.reps == 0) {
            // reminder message 
            document.getElementById("missing-exercise-text").style.display = "inline-block";
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

            setExercises(e => [...e, currExercise]);
            document.getElementById('my-form').reset();


            // removes the reminder message 
            document.getElementById("missing-exercise-text").style.display = "none";



            // resets current exercise 
            setCurrExercise({
                name: "",
                weight: 0,
                sets: 0,
                reps: 0
            });

        }


    }


    function updateSessions() {


        // empty date/day detection 
        if (props.date === "" || props.day === "" || exercises.length === 0) {
            // reminder message 
            document.getElementById("missing-session-text").style.display = "inline-block";
        }

        else {

            // capitalize first letter of date
            let dateCapitalized = props.date.charAt(0).toUpperCase() + props.date.slice(1);

            const currSession = {
                date: dateCapitalized,
                day: props.day,
                exercises: exercises
            };

            setSessions(s => [...s, currSession]);

            setExercises([]);
            props.reset();

            document.getElementById("missing-session-text").style.display = "none";
        }


    }




    return (

        <>
            <div className="ex-all">

                <div className="exercises">
                    <form id="my-form" className='my-form'>

                        {/* .label-input represents a pair of label and inputs in a row */}

                        <div className="label-input">
                            <label >Name of Exercise</label>
                            <input type="text" onInput={handleExerciseFormChange} name="name" value={currExercise.name} placeholder='ex. push ups' />
                        </div>

                        <div className="label-input">
                            <label>Weight in lbs</label>
                            <input type="number" onInput={handleExerciseFormChange} name="weight" value={currExercise.weight} />
                        </div>


                        <div className="label-input">
                            <label>Repetitions </label>
                            <input type="number" onInput={handleExerciseFormChange} name="reps" value={currExercise.reps} />
                        </div>

                        <div className="label-input">
                            <label>Sets</label>
                            <input type="number" onInput={handleExerciseFormChange} name="sets" value={currExercise.sets} />
                        </div>

                    </form >


                    {/* submit exercise */}
                    <button onClick={addExercise}>Add Exercise</button> <br />
                    <p id="missing-exercise-text">Please fill in all exercise fields</p>
                    <p id="exercise-count">You have added {exercises.length} exercises</p>


                    {/* submit session */}
                    <button onClick={updateSessions} id='sessions-button'>Add session</button>
                    <p id="missing-session-text">Please fill in all session fields</p>




                </div >

                <DisplayExercises exercises={exercises}></DisplayExercises>

            </div>
            <Sessions date={props.date} day={props.day} exercises={exercises} sessions={sessions}></Sessions>
        </>


    );


}

export default Exercises