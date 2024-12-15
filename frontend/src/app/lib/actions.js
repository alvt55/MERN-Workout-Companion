'use server'; 

import { cookies } from 'next/headers'



const cookieStore = await cookies();
const jwt = cookieStore.get('jwt');



// server action for adding a workout
export async function addWorkoutSession(currSession) {

    const response = await fetch(`${process.env.BACKEND_URL}workouts/createWorkout`, {
        method: 'POST',
        body: JSON.stringify(currSession),
        headers: {
          'Content-Type': 'application/json',
          'Cookie': `jwt=${jwt.value}`
        },
        credentials: 'include'
      });

      if (!response.ok) {
        return null; 
      }
  
      const json = await response.json();
      return json; 
}

