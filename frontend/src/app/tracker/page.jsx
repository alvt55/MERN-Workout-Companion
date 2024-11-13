'use client';
import { useState, useEffect, useId } from 'react'


import { redirect } from 'next/navigation'
import headerStyles from '../styles/header.module.css'
import exerciseStyles from '../styles/exercises.module.css'
import sessionStyles from '../styles/sessions.module.css'

import DisplayExercises from './DisplayExercises';
import SessionCard from './SessionCard';

export default function Page() {


  // Header
  const [day, setDay] = useState("");
  const [date, setDate] = useState("");

  // Add exercises/session
  const [exercises, setExercises] = useState([]);
  const [exFields, setExFields] = useState(true);
  const [sessionFields, setSessionFields] = useState(true);
  const id = useId(); // accessibility for keyboard users 

  const [currExercise, setCurrExercise] = useState(
    {
      name: "",
      weight: 0,
      sets: 0,
      reps: 0
    }
  );


  // display sessions 
  const [sessions, setSessions] = useState([]);
  const [selectedDay, setSelectedDay] = useState("All");


  // detects updates to changes in sessions (add or remove)
  const [update, setUpdate] = useState(false)

  // fetches sessions from DB
  useEffect(() => {

    const fetchWorkouts = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/workouts`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })

      const json = await response.json() // convert obj into js 

      if (json.authError) {
        console.log(json.authError)
        redirect('/login')
      }

      if (json.error) {
        console.log(json.error)
      } else {
        console.log('fetch workout successful');
        setSessions(s => json)

      }

    }


    fetchWorkouts()
  }, [update])



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

      setExercises(e => [...e, currExercise]);


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




  // posting workout session to DB using backend API
  async function addSession() {


    if (date === "" || day === "" || exercises.length === 0) {
      console.log(date, day, exercises)
      setSessionFields(false);
      return;
    }

    let dateCapitalized = date.charAt(0).toUpperCase() + date.slice(1);

    const currSession = {
      date: dateCapitalized,
      day: day,
      exercises: exercises
    };

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/workouts`, {
      method: 'POST',
      body: JSON.stringify(currSession),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })

    const json = await response.json();

    if (json.authError) {
      console.log(json.authError)
      redirect('/login')
    }


    if (!response.ok) {
      console.log('failed to post session')
    } else {
      console.log('workout posted')

      setUpdate(s => !s)

      //  reset all values 
      setDate(s => "")
      setDay(s => "")
      setExercises(s => [])
      setCurrExercise({
        name: "",
        weight: 0,
        sets: 0,
        reps: 0
      });
    }

    setSessionFields(true);


  }


  function removeUpdate() {
    setUpdate(s => !s); 
    console.log(update); 
  }



  const createSessionElements = sessions.map((session, idx) => {

    if (session.day === selectedDay) {
      return <SessionCard key={session._id} session={session} remove={removeUpdate}/> // key = session.id 
    } else if (selectedDay === "All") {
      return <SessionCard key={session._id} session={session} remove={removeUpdate}/>
    }

    return "";

  }).reverse()




  return (


    <>

      {/* header */}
      <div className={headerStyles.session}>
        <div className={headerStyles.sfcontainer}>

          <div className={headerStyles.date}>
            <label htmlFor="">Date</label>
            <input value={date} onChange={e => setDate(e.target.value)} />
          </div>

          <div className={headerStyles.daybuttons}>
            <button onClick={() => setDay(s => "Push")} className={day === "Push" ? headerStyles.active : headerStyles.inactive}>Push</button>
            <button onClick={() => setDay(s => "Pull")} className={day === "Pull" ? headerStyles.active : headerStyles.inactive}>Pull</button>
            <button onClick={() => setDay(s => "Legs")} className={day === "Legs" ? headerStyles.active : headerStyles.inactive}>Legs</button>

          </div>

        </div>

      </div>


      {/* track exercises/sessions */}
      <div className={exerciseStyles.exall}>

        <div className={exerciseStyles.exercises}>
          <form id={exerciseStyles.myform} className={exerciseStyles.myform}>

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


          <button onClick={addExercise} id='button'>Add Exercise</button> <br />
          {!exFields && <p id={exerciseStyles.missingexercise}>Please fill in all exercise fields</p>}

          <p id={exerciseStyles.exercisecount}>You have added {exercises.length} exercises</p>


          {/* submit session */}
          <button onClick={addSession} id='sessionbutton'>Add session</button>
          {!sessionFields && <p id={exerciseStyles.missingsessiontext}>Please fill in all session fields</p>}


        </div >
        {/* exercises preview */}
        <DisplayExercises exercises={exercises} />

      </div>


      {/* display sessions */}
      <div className={sessionStyles.sessionsort}>

        <button onClick={() => setSelectedDay("All")}>All</button>
        <button onClick={() => setSelectedDay("Push")}>Push</button>
        <button onClick={() => setSelectedDay("Pull")}>Pull</button>
        <button onClick={() => setSelectedDay("Legs")}>Legs</button>
      </div>

      <div className={sessionStyles.sessionsText}>
        {createSessionElements}
      </div>
    </>


  );
}



