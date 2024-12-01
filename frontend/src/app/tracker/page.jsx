'use client';
import { useState, useEffect } from 'react'


import { redirect } from 'next/navigation'


import DisplayExercises from './DisplayExercises';
import SessionCard from './SessionCard';

import { VStack, Input, Button, Stack, Heading, Flex, HStack} from "@chakra-ui/react"
import { InputGroup } from "@/components/ui/input-group"
import { Field } from "@/components/ui/field"
import { NumberInputField, NumberInputRoot } from "@/components/ui/number-input"
import { Alert } from "@/components/ui/alert"

import { GiWeightLiftingUp } from
  "react-icons/gi";

  import { Radio, RadioGroup } from "@/components/ui/radio"




export default function Page() {



  // exercise
  const [exercises, setExercises] = useState([]);

  // session
  const [sessions, setSessions] = useState([]);
  const [sessionWarning, setSessionWarning] = useState('');
  const [selectedDay, setSelectedDay] = useState("");


  // detects updates to changes in sessions (add or remove)
  const [update, setUpdate] = useState(false)




  useEffect(() => {
    
    const data = window.localStorage.getItem('MY_APP_STATE');
    if (data !== null) setExercises(JSON.parse(data));
  }, []);

  useEffect(() => {
    window.localStorage.setItem('MY_APP_STATE', JSON.stringify(exercises));
  }, [exercises]);



  // fetches sessions from DB
  useEffect(() => {
    const jwt = window.localStorage.getItem('jwt');

    const fetchWorkouts = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}workouts/getWorkouts`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt}`
        },
        credentials: 'include'
      })

      const json = await response.json();

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
    const unit = e.target.unit.value;

    
    let nameCapitalized = name.charAt(0).toUpperCase() + name.slice(1);

    const currExercise = {
      name: nameCapitalized,
      weight,
      sets,
      reps,
      unit
    }

    setExercises(e => [...e, currExercise]);


    document.getElementById('exerciseForm').reset();

    // console.log('adding exercise', currExercise)
    // console.log(unit)
  
  }




  // posting workout session to DB using backend API
  async function addSession(e) {

    const jwt = window.localStorage.getItem('jwt');
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
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`
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



  // TODO: fix for multiple words?
  const createSessionElements = sessions.map((session, idx) => {

    if (session.day.toLowerCase() === selectedDay.toLowerCase()) {
      return <SessionCard key={session._id} session={session} remove={removeUpdate} /> // key = session.id 
    } else if (selectedDay.trim() === "") {
      return <SessionCard key={session._id} session={session} remove={removeUpdate} />
    }

    return "";

  }).reverse()




  return (


    <>


      <VStack gap="12" width="100vw" color="white" padding="2rem">

        {/* container for form and display */}
        <Flex marginTop="3rem" gap="8" justify={'space-evenly'} width="100%" flexDirection={{ base: "column", md: "row" }}>


          <form id="exerciseForm" onSubmit={addExercise}>
            <Heading as="h1" size="2xl">Add Exercises Here</Heading>
            <Stack gap="4" align="flex-start" maxW="sm" fontSize={'1.5rem'} minW="30vw" color="white">

              <Field label="Exercise name">
                <Input name="exerciseName" type="text" required />
              </Field>

              <Field label="Weight">
                <NumberInputRoot defaultValue="1" width="200px">
                  <NumberInputField name="weight" />
                </NumberInputRoot>

                <RadioGroup defaultValue="lbs" name="unit" required>
                <HStack gap="6">
                  <Radio value="lbs">Lbs</Radio>
                  <Radio value="kg">Kgs</Radio>
                  <Radio value="bodyweight">Bodyweight</Radio>

                </HStack>
              </RadioGroup>
              </Field>
              

              <Field label="Sets">
                <NumberInputRoot defaultValue="1" width="200px" required>
                  <NumberInputField name="sets" />
                </NumberInputRoot>
              </Field>
              <Field label="Reps">
                <NumberInputRoot defaultValue="1" width="200px" required>
                  <NumberInputField name="reps" />
                </NumberInputRoot>
              </Field>
              <Button type="submit">Add Exercise</Button>
            </Stack>
          </form>

          <DisplayExercises exercises={exercises}></DisplayExercises>
        </Flex>






        <form id="sessionForm" onSubmit={addSession}>

          <VStack gap={5}>
            <Field label="What did we focus on today?">
              <InputGroup flex="1" startElement={<GiWeightLiftingUp />} color="white" width={{ base: "80vw", md: "30vw" }}>
                <Input name="day" ps="4.75em" placeholder="e.g. cardio, back/chest, legs " required />
              </InputGroup>
            </Field>

            <Button type="submit">Finish Workout</Button>
            {sessionWarning ? <Alert status="info" title={sessionWarning} /> : <p></p>}

          </VStack>

        </form>







        <Field label="Filter by focus" width={{ base: "80vw", md: "30vw" }} color="white" >
          <Input onChange={e => setSelectedDay(e.target.value)} type="text" required />
        </Field>





        <VStack width="100vw" justify="center">

          {createSessionElements}
        </VStack>

     

        



      </VStack>

    </>


  );
}



