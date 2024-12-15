'use client'
import { redirect } from 'next/navigation'
import { Card, Heading, Button } from '@chakra-ui/react';


function SessionCard(props) {


  const session = props.session;





  const deleteSession = async () => {

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}workouts/${session._id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    })

    const json = await response.json();


    // auth error handling 
    if (json.authError) {
      console.log(json.authError)
      redirect('/login')
    }

    // delete errors 
    if (json.error) {
      console.log(json.error)
    } else {
      props.remove();
      console.log('delete successful')
    }


  }
  //

  // formats session cards 
  return (


    <Card.Root w="80vw" height="50%" boxShadow="2xl" borderRadius="2xl" border="none" backgroundColor={"#181818"}>
      <Card.Body color="white" borderRadius="xl">
        <Heading color="teal.500" className={"capitalize"} marginBottom={2}>{props.session.date}  |  {props.session.day}</Heading>


        <ul>
          {session.exercises.map((e, idx) => {

         

            let weight = " (" + e.weight + e.unit + ")";
            if (e.weight <= 0 || e.unit === 'bodyweight') {
              weight = " (Bodyweight)";
            }

            let firstLine = e.sets + "x" + e.reps + weight; 
            return <span key={idx}><li key={idx}>{firstLine}<br></br> {e.name}</li> <br></br> </span>
          })}
        </ul>

          {/* TODO: add a warning before deleting */}
        <Button marginTop="3rem" h={"fit-content"} w={"fit-content"} onClick={deleteSession} color="red.500" variant="outline">Delete</Button>


      </Card.Body>

    </Card.Root>
  )
}

export default SessionCard