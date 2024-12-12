'use client'
import { useState, useEffect } from 'react'
import SessionCard from '../tracker/SessionCard'
import { VStack, Input, Heading, Box} from "@chakra-ui/react"
import { Field } from "@/components/ui/field"
import { redirect } from 'next/navigation'
import { socket } from './socket'
import FriendCard from './FriendCard'

export default function Page() {


  const [mySessions, setMySessions] = useState([]);
  const [friendSessions, setFriendSessions] = useState([]);
  const [update, setUpdate] = useState(false);
  const [selectedDay, setSelectedDay] = useState("");





  // fetching/setting user sessions AND shared sessions
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

      const friendResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}workouts/getFriendWorkouts`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt}`
        },
        credentials: 'include'
      })

      const jsonFriend = await friendResponse.json();

      if (jsonFriend.authError) {
        console.log(json.authError)
        redirect('/login')
      }

      if (jsonFriend.error) {
        console.log(json.error)
      } else {
        console.log('fetch friend workouts successful');
        setFriendSessions(s => jsonFriend)

      }

    }

    fetchWorkouts();
  }, [update]);





  // socket.io functionality 
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

      const email = await response.json();
      socket.emit('register', email);



      async function addSharedSession(theirSession) {
        setFriendSessions((prev) => [...prev, theirSession]);
      }

      socket.on('shareActivity', async session => addSharedSession(session));


    }

    main();

    return () => {
      socket.off('sharedSession');
      socket.disconnect();
    };
  }, []);






  function removeUpdate() {
    setUpdate(s => !s);
    console.log(update);
  }


  // user sessions
  const createSessionElements = mySessions.map((session, idx) => {


    if (session.day.toLowerCase() === selectedDay.toLowerCase()) {
      return <SessionCard key={session._id} session={session} remove={removeUpdate} shareButton={true} /> // key = session.id 
    } else if (selectedDay.trim() === "") {
      return <SessionCard key={session._id} session={session} remove={removeUpdate} shareButton={true} />
    }

    return "";

  }).reverse()


  // friend sessions
  const createFriendElements = friendSessions.map((session, idx) => {

    if (session.day.toLowerCase() === selectedDay.toLowerCase()) {
      return <FriendCard key={session._id} session={session} remove={removeUpdate} /> // key = session.id 
    } else if (selectedDay.trim() === "") {
      console.log('session', session._id);
      return <FriendCard key={session._id} session={session} remove={removeUpdate} />
    }

    return "";

  }).reverse()



  console.log(friendSessions)

  return (

    <>

      <VStack width="100vw" justify="center" gap={7}>

        <Field label="Filter by focus" width={{ base: "80vw", md: "30vw" }} color="white" >
          <Input onChange={e => setSelectedDay(e.target.value)} type="text" required />
        </Field>

          <Heading color="teal.500">Your Sessions</Heading>
          {createSessionElements}

          <Heading color="teal.500">Your Friend's Sessions</Heading>
          {createFriendElements}

      </VStack>


    </>

  );







}