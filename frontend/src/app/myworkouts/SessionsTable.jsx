import { cookies } from 'next/headers'
import {fetchWorkouts} from '../lib/data'
import { VStack } from '@chakra-ui/react';
import SessionCard from './SessionCard';

export default async function SessionsTable() {

    const cookieStore = await cookies();
    const jwt = cookieStore.get('jwt');

    const workouts = await fetchWorkouts(jwt) || []; 

    const createSessionElements = workouts.map((session, idx) => {

        // TODO: implement search 
        // if (session.day.toLowerCase() === selectedDay.toLowerCase()) {
          return <SessionCard key={session._id} session={session} /> // key = session.id 
        // } else if (selectedDay.trim() === "") {
        //   return <SessionCard key={session._id} session={session} remove={removeUpdate} />
        // }
    
        return "";
    
      }).reverse()

    return(
  <VStack width="100vw" justify="center">

          {createSessionElements}
        </VStack>

    )
}