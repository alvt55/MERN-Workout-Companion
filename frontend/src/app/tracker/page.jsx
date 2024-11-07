'use client';
import { useState, useEffect } from 'react'

import Sessions from './Sessions'
import Exercises from './Exercises'

import { useSelector, useDispatch, Provider } from 'react-redux'
import { updateDay, updateDate, resetExerciseList, addOrRemove, updateAddOrRemove } from '../../SessionSlice'
import { redirect } from 'next/navigation'
import headerStyles from '../styles/header.module.css'


export default function Page() {


  const [day, setDay] = useState(""); 
  const [date, setDate] = useState(""); 
  const exercises = useSelector(state => state.session.exercises)
  const addOrRemove = useSelector(state => state.session.addOrRemove)


  const dispatch = useDispatch();

  const [sessions, setSessions] = useState([]);



  // fetches sessions from DB
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
  }, [addOrRemove])




  // posting workout session to DB using backend API
  async function updateSessions() {



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

    if (json.authError) {
      console.log(json.authError)
      redirect('/login')
    }


    if (!response.ok) {
      console.log('failed to post session')
    } else {
      console.log('workout posted')

      dispatch(updateAddOrRemove());

      dispatch(updateDay(""));
      dispatch(updateDate(""));
      dispatch(resetExerciseList());
    }




  }




console.log(day)



  return (


    <>

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
      <Exercises updateSessions={updateSessions} />
      <Sessions sessions={sessions} />
    </>


  );
}



