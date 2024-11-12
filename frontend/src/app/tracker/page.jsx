'use client';
import { useState, useEffect, useId } from 'react'


import { redirect } from 'next/navigation'
import headerStyles from '../styles/header.module.css'
import exerciseStyles from '../styles/exercises.module.css'
import sessionStyles from '../styles/sessions.module.css'

import DisplayExercises from './DisplayExercises';
import SessionCard from './SessionCard';

import { socket } from '../../socket';

export default function Page() {

  // Header section
  const [day, setDay] = useState("");
  const [date, setDate] = useState("");

  // Add exercises/session section
  const [exercises, setExercises] = useState([]);
  const [exFields, setExFields] = useState(true);
  const [sessionFields, setSessionFields] = useState(true);
  const id = useId(); // accessibility for keyboard users 

  let userEmail = ""; 

  const [currExercise, setCurrExercise] = useState(
    {
      name: "",
      weight: "",
      sets: "",
      reps: ""
    }
  );


  // display sessions section
  const [sessions, setSessions] = useState([]);
  const [selectedDay, setSelectedDay] = useState("All");


  // detects updates to changes in sessions (add or remove)
  const [update, setUpdate] = useState(false)


  // socket.io
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);
  const [sharedSessions, setSharedSessions] = useState([]);



  // gets all user workouts from DB
  useEffect(() => {

    const fetchWorkouts = async () => {
      const response = await fetch('http://localhost:4000/api/workouts', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })

      const json = await response.json() // convert obj into js 

      if (json.authError) {
        console.log(json.authError)
        window.alert('Please login first')
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


  async function findEmail() {


    const response = await fetch('http://localhost:4000/auth/findEmail', {
      method: 'GET',
      credentials: 'include'
    })

    const json = await response.json()

    userEmail = json; 

  }

  useEffect(() => {

    async function main() {
      socket.connect();

      socket.on('connect', () => {
          console.log(socket.id, "has connected");
      });
  
      function addSharedSession(s) {
        console.log('Received shared session from server:', s);
        setSharedSessions((prev) => [...prev, s]); 
      }
  
      socket.on('sharedSession', addSharedSession);
  
  
      await findEmail(); 
      console.log('user email', userEmail)


    }
  
   main(); 

    return () => {
        socket.off('sharedSession', addSharedSession);
        socket.disconnect();
    };
}, []);

  function testEmit() {
    console.log('testing emit')
    socket.emit('sharedSession', sessions[0]); 
  }
 




  // handles form changes 
  function handleExerciseFormChange(event) {
    setCurrExercise(prev => {
      return {
        ...prev,
        [event.target.name]: event.target.value
      }
    });
  }


  // handles adding exercises to session 
  function addExercise() {

    // empty input detection, triggers warning text
    if (currExercise.name === "" || currExercise.sets === 0 || currExercise.reps === 0) {
      setExFields(false);
    }

    else {

      let nameCapitalized = currExercise.name.charAt(0).toUpperCase() + currExercise.name.slice(1);
      setCurrExercise(prev => {
        return {
          ...prev,
          name: nameCapitalized
        }
      });

      setExercises(e => [...e, currExercise]);


      // no warning text
      setExFields(true);


      // resets current exercise 
      setCurrExercise({
        name: "",
        weight: "",
        sets: "",
        reps: ""
      });
    }

  }




  // posting workout session to DB 
  async function addSession() {

    // empty field detectoin 
    if (date == "" || day == "" || exercises.length == 0) {
      console.log(date, day, exercises)
      setSessionFields(false); // warning text
      return;
    }

    let dateCapitalized = date.charAt(0).toUpperCase() + date.slice(1);

    const currSession = {
      date: dateCapitalized,
      day: day,
      exercises: exercises
    };

    const response = await fetch('http://localhost:4000/api/workouts', {
      method: 'POST',
      body: JSON.stringify(currSession),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })

    const json = await response.json();

    // jwt is invalid or missing 
    if (json.authError) {
      console.log(json.authError)
      redirect('/login')
    }


    if (!response.ok) {
      console.log('failed to post session')
    } else {
      console.log('workout posted')

      // triggers rerender for displaying sessions 
      setUpdate(s => !s)

      resetSessionValues();

    }

    // cancels warning text
    setSessionFields(true);


  }

  // resets all values for a session 
  function resetSessionValues() {
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

  // updates displaying sessions, passed to SessionCard as a prop 
  function removeUpdate() {
    setUpdate(s => !s);
    console.log(update);
  }



  // maps through sessions, creates cards for each 
  const createSessionElements = sessions.map((session, idx) => {

    if (session.day === selectedDay) {
      return <SessionCard key={session._id} session={session} remove={removeUpdate} />
    } else if (selectedDay === "All") {
      return <SessionCard key={session._id} session={session} remove={removeUpdate} />
    }

    return "";

  }).reverse()


  const createSharedElements = sharedSessions.map((session, idx) => {

    if (session.day === selectedDay) {
      return <SessionCard key={session._id} session={session} remove={removeUpdate} />
    } else if (selectedDay === "All") {
      return <SessionCard key={session._id} session={session} remove={removeUpdate} />
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
              <input type="number" id={id + "-weight"} onInput={handleExerciseFormChange} name="weight" value={currExercise.weight || ""} />
            </div>


            <div className='labelinput'>
              <label htmlFor={id + "-reps"}>Repetitions </label>
              <input type="number" id={id + "-reps"} onInput={handleExerciseFormChange} name="reps" value={currExercise.reps || ""} />
            </div>

            <div className='labelinput'>
              <label htmlFor={id + "-sets"}>Sets</label>
              <input type="number" id={id + "-sets"} onInput={handleExerciseFormChange} name="sets" value={currExercise.sets || ""} />
            </div>

          </form >


          <button onClick={addExercise} id='button'>Add Exercise</button> <br />
          {!exFields && <p className='missingfields'>Please fill in all exercise fields</p>}

          <p id={exerciseStyles.exercisecount}>You have added {exercises.length} exercises</p>


          {/* submit session */}
          <button onClick={addSession} id='sessionbutton'>Add session</button>
          {!sessionFields && <p className='missingfields'>Please fill in all session fields</p>}


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

      <button onClick={findEmail}>findemail</button>

      <div className={sessionStyles.sessionsText}>
        {createSessionElements}
        <h1>SHARED IS UNDER HERE</h1>
        {createSharedElements}
      </div>


    </>


  );
}



