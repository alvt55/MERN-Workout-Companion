'use client';
import { useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Navbar from '../Navbar/Navbar';
import Header from './Header'
import Sessions from './Sessions'
import Exercises from './Exercises'

import { useSelector, useDispatch, Provider } from 'react-redux'
import { updateDay, updateDate, resetExerciseList }  from '../../SessionSlice' 
import { redirect } from 'next/navigation'


function Temp() {


  const day = useSelector(state => state.session.day)
  const date = useSelector(state => state.session.date)
  const exercises = useSelector(state => state.session.exercises)

  const dispatch = useDispatch();
  // const [date, setDate] = useState("");
  // const [day, setDay] = useState("");
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
      }) // returns response obj 
      
      const json = await response.json() // convert obj into js 

      if (json.errors) {
        redirect('/login')
      } 

      if (response.ok) {
        setSessions(s => json)
    } else {
      redirect('/login')
    }

  }


    fetchWorkouts()
  }, [])




  // posting workout session to DB using backend API
  async function updateSessions() {

    // remember to include credentials 

    console.log("adding session");

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

    if (json.errors) {
      redirect('/login')
    } 



    if (!response.ok) {
      console.log('failed to post session')
    } else {
      console.log('workout posted')
    }



    console.log(sessions);


    // resets all fields for current session in store 
    dispatch(updateDay(""));
    dispatch(updateDate(""));
    dispatch(resetExerciseList());

  }








  return (


    <>

      {/* <Navbar /> */}
      <Header />
      <Exercises updateSessions={updateSessions} />
      <Sessions sessions={sessions} />
    </>


  );
}

export default Temp


