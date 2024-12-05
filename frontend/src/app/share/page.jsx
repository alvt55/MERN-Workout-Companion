'use client'
import { useState, useEffect } from 'react'
import SessionCard from '../tracker/SessionCard'
import { VStack, Input, Button, Stack, Heading, Flex, HStack } from "@chakra-ui/react"
import { InputGroup } from "@/components/ui/input-group"
import { Field } from "@/components/ui/field"
import { NumberInputField, NumberInputRoot } from "@/components/ui/number-input"
import { Alert } from "@/components/ui/alert"
import { redirect } from 'next/navigation'
import { socket } from './socket'
import io from "socket.io-client";
import FriendCard from './FriendCard'

export default function Page() {


  const [mySessions, setMySessions] = useState([]);
  const [friendSessions, setFriendSessions] = useState([]);
  const [update, setUpdate] = useState(false);
  const [selectedDay, setSelectedDay] = useState("");
  const [email, setEmail] = useState('')




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
        setMySessions(s => json)

      }

    }


    fetchWorkouts();
  }, [update]);







  useEffect(() => {

    async function main() {
      socket.connect();

      const jwt = "" || window.localStorage.getItem('jwt');
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}auth/findEmail`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt}`
        }
      })

      const email = await response.json()

      setEmail(email); 

      console.log('fetched email:', email)

      socket.emit('register', email);
      console.log('after register')


      function addSharedSession(theirSessions) {
        console.log('Received shared session from', theirSessions);
        

        setFriendSessions((prev) => [...prev, ...theirSessions]);
        console.log(friendSessions);
      }

      socket.on('shareActivity', addSharedSession);


    }

    main();

    return () => {
      socket.off('sharedSession');
      socket.disconnect();
    };
  }, []);



  function shareActivity() {

    const sendingSessions = mySessions.map((session) => {
     return {...session, 
        email: email
      }
    })


    socket.emit('shareActivity', ["web1@gmail.com", "a@gmail.com"], sendingSessions);
  }



  function removeUpdate() {
    setUpdate(s => !s);
    console.log(update);
  }

  const createSessionElements = mySessions.map((session, idx) => {

    if (session.day.toLowerCase() === selectedDay.toLowerCase()) {
      return <SessionCard key={session._id} session={session} remove={removeUpdate} /> // key = session.id 
    } else if (selectedDay.trim() === "") {
      return <SessionCard key={session._id} session={session} remove={removeUpdate} />
    }

    return "";

  }).reverse()


  const createFriendElements = friendSessions.map((session, idx) => {

 
      if (session.day.toLowerCase() === selectedDay.toLowerCase()) {
      return <FriendCard key={session._id} session={session} remove={removeUpdate} from={session.email}/> // key = session.id 
    } else if (selectedDay.trim() === "") {
      return <FriendCard key={session._id} session={session} remove={removeUpdate} from={session.email}/>
    }

    return "";

  }).reverse()

  console.log(friendSessions)

  return (

    <>
    <Heading color={"white"}>{email}</Heading>

      <Field label="Filter by focus" width={{ base: "80vw", md: "30vw" }} color="white" >
        <Input onChange={e => setSelectedDay(e.target.value)} type="text" required />
      </Field>

      <VStack width="100vw" justify="center">
    YOur sessions
        {createSessionElements}
    
      </VStack>


      <Button onClick={shareActivity}>Share</Button>


      <VStack width="100vw" justify="center">
        friend sessions
        {createFriendElements}

      </VStack>





    </>

  );







}