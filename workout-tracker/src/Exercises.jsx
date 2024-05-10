
import { useState, useRef, createContext, useEffect } from 'react'
import './ExerciseStyles.css'
import DisplayExercises from './DisplayExercises';
import Sessions from './Sessions';


// exercise input, adding session button 
function Exercises(props) {






    // exercises 
    const name = useRef("");
    const weight = useRef(0);
    const reps = useRef(0);
    const sets = useRef(0);

    let currExercise = useState(null);
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


        // TODO: fix empty input detection 
        if (name.current === "" || sets.current === 0 || reps.current === 0) {
            // reminder message 
            document.getElementById("missing-exercise-text").style.display = "inline-block";
            console.log(name.current);
            console.log(sets.current);
            console.log(reps.current);
        }

        else {

            let nameCapitalized = name.current.charAt(0).toUpperCase() + name.current.slice(1);

            currExercise = {
                name: nameCapitalized,
                weight: weight.current,
                sets: sets.current,
                reps: reps.current
            };



            setExercises(e => [...e, currExercise]);
            document.getElementById('my-form').reset();


            // removes the reminder message 
            document.getElementById("missing-exercise-text").style.display = "none";

            // resets all values after adding 
            name.current = "";
            weight.current = 0;
            sets.current = 0;
            reps.current = 0;

        }





    }



    function updateSessions() {

        if (props.date === "" || props.day === "") {
            // reminder message 
            document.getElementById("missing-session-text").style.display = "inline-block";
        }

        else {

            //TODO: automatically capitalize first letter of date 

            const currSession = {
                date: props.date,
                day: props.day,
                exercises: exercises
            };

            setSessions(s => [...s, currSession]);

            setExercises([]);
            props.reset();


            // for debugging 
            console.log(exercises);
            console.log(currSession);
            console.log(sessions.length); // real length is +1 b/c useState is async 

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
                            <input type="text" className="name-input" onChange={updateName} placeholder='ex. push ups' />
                        </div>

                        <div className="label-input">
                            <label>Weight in lbs</label>
                            <input type="number" className="weight-input" onChange={updateWeight} placeholder='ex. 50lbs' />
                        </div>


                        <div className="label-input">
                            <label>Repetitions </label>
                            <input type="number" className="rep-input" onChange={updateReps} />
                        </div>

                        <div className="label-input">
                            <label>Sets</label>
                            <input type="number" className="set-input" onChange={updateSets} />
                        </div>

                    </form >

                    <button onClick={addExercise}>Add Exercise</button> <br />
                    <p id="missing-exercise-text">Please fill in all exercise fields</p>
                    <p id="exercise-count">You have added {exercises.length} exercises</p>
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