'use server'; 

import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache';


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

export async function deleteWorkoutSession(id) {
    const response = await fetch(`${process.env.BACKEND_URL}workouts/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `jwt=${jwt.value}`
      },
      credentials: 'include'
    })

    const json = await response.json();


    // auth error handling 
    if (json.authError) {
      console.log(json.authError)
      redirect('/login')
    } else {
      console.log('delete successful')

    }

    // delete errors 
    if (json.error) {
      console.log(json.error)
    } else {
      // props.remove();
      console.log('delete successful')
      revalidatePath('/myworkouts'); 
      
    }


  }

