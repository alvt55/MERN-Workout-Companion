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


  // Add exercises/session
  const [exercises, setExercises] = useState([]);
  const [sessionWarning, setSessionWarning] = useState('');
  const id = useId(); // accessibility for keyboard users 




  // display sessions 
  const [sessions, setSessions] = useState([]);
  const [selectedDay, setSelectedDay] = useState("");


  // detects updates to changes in sessions (add or remove)
  const [update, setUpdate] = useState(false)


  // fetches sessions from DB
  useEffect(() => {

    const fetchWorkouts = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}workouts/getWorkouts`, {
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






  function addExercise(e) {

    e.preventDefault();
    const name = e.target.exerciseName.value;
    const weight = e.target.weight.value;
    const sets = e.target.sets.value;
    const reps = e.target.reps.value;

    let nameCapitalized = name.charAt(0).toUpperCase() + name.slice(1);

    const currExercise = {
      name: nameCapitalized,
      weight,
      sets,
      reps
    }

    setExercises(e => [...e, currExercise]);


    document.getElementById('exerciseForm').reset();

    console.log('adding exercise', currExercise)

  }




  // posting workout session to DB using backend API
  async function addSession(e) {



    e.preventDefault();


    const d = new Date();
    const date = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
    const day = e.target.day.value;



    if (exercises.length === 0) {
      setSessionWarning('Please add at least 1 exercise')
      return;
    }

    let dateCapitalized = date.charAt(0).toUpperCase() + date.slice(1);
    let dayCapitalized = day.charAt(0).toUpperCase() + day.slice(1);

    const currSession = {
      date: dateCapitalized,
      day: dayCapitalized,
      exercises: exercises
    };

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}workouts/createWorkout`, {
      method: 'POST',
      body: JSON.stringify(currSession),
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })

    const json = await response.json();

    if (json.authError) {
      redirect('/login')
    }


    if (!response.ok) {
      setSessionWarning('Unable to send workout to database')
      console.log('failed to post session')
    } else {
      console.log('workout posted')


      setUpdate(s => !s)

      //  reset all values 
      document.getElementById('sessionForm').reset()
      setSessionWarning('');
      setExercises(s => [])

    }


  }


  function removeUpdate() {
    setUpdate(s => !s);
    console.log(update);
  }


  const createSessionElements = sessions.map((session, idx) => {

    if (session.day.toLowerCase() === selectedDay.toLowerCase()) {
      return <SessionCard key={session._id} session={session} remove={removeUpdate} /> // key = session.id 
    } else if (selectedDay.trim() === "") {
      return <SessionCard key={session._id} session={session} remove={removeUpdate} />
    }

    return "";

  }).reverse()




  // testing 


  console.log("exercises added", exercises)
  console.log('selected day', selectedDay)

  return (


    <>

      <form id="sessionForm" onSubmit={addSession}>
  
          <InputGroup flex="1" startElement={<GiWeightLiftingUp />} color="white">
            <Input name="day" ps="4.75em" placeholder="What we focus on today?" required />
          </InputGroup>

        <Button type="submit">Finish Workout</Button>
        {sessionWarning ? <Alert status="info" title={sessionWarning} /> : <p></p>}

      </form>


      <HStack gap="10" width="full" color="white">


        <form id="exerciseForm" onSubmit={addExercise}>
          <Heading as="h1" size="2xl">Add Exercises Here</Heading>
          <Stack gap="4" align="flex-start" maxW="sm" fontSize={'1.5rem'} minW="30vw" color="white">

            <Field label="Exercise name">
              <Input name="exerciseName" type="text" required />
            </Field>

            <Field label="Exercise name">
              <NumberInputRoot defaultValue="10" width="200px">
                <NumberInputField name="weight" />
              </NumberInputRoot>
            </Field>
            <Field label="Exercise name">
              <NumberInputRoot defaultValue="0" width="200px" required>
                <NumberInputField name="sets" />
              </NumberInputRoot>
            </Field>
            <Field label="Exercise name">
              <NumberInputRoot defaultValue="10" width="200px" required>
                <NumberInputField name="reps" />
              </NumberInputRoot>
            </Field>
            <Button type="submit">Add Exercise</Button>
          </Stack>
        </form>

        <DisplayExercises exercises={exercises}></DisplayExercises>
      </HStack>






      {/* display sessions */}
      {/* <div className={sessionStyles.sessionsort}>

        <button onClick={() => setSelectedDay("All")}>All</button>
        <button onClick={() => setSelectedDay("Push")}>Push</button>
        <button onClick={() => setSelectedDay("Pull")}>Pull</button>
        <button onClick={() => setSelectedDay("Legs")}>Legs</button>
      </div> */}


      <Stack gap="4" align="flex-start" maxW="sm" fontSize={'1.5rem'} minW="30vw" color="white">
        <Field label="Filter by focus">
          <Input onChange={e => setSelectedDay(e.target.value)} type="text" required />
        </Field>

      </Stack>

      <div className={sessionStyles.sessionsText}>
        {createSessionElements}
      </div>
    </>


  );
}

import { Box, HStack, Input, Button, Stack, Heading, InputAddon } from "@chakra-ui/react"
import { CiCalendarDate } from "react-icons/ci"
import { InputGroup } from "@/components/ui/input-group"
import { Field } from "@/components/ui/field"
import { NumberInputField, NumberInputRoot } from "@/components/ui/number-input"
import { Alert } from "@/components/ui/alert"



import { GiWeightLiftingUp } from
  "react-icons/gi";

