import { cookies } from 'next/headers'
import { fetchWorkouts } from '../lib/data'
import { VStack } from '@chakra-ui/react';
import SessionCard from './SessionCard';

export default async function SessionsTable() {

  const cookieStore = await cookies();
  const jwt = cookieStore.get('jwt');

  const workouts = await fetchWorkouts(jwt) || [];

  const createSessionElements = workouts.map((session, idx) => {


    return <SessionCard key={session._id} session={session} />

  });


  return (
    <VStack width="100vw" justify="center">

      {createSessionElements}
    </VStack>

  )
}