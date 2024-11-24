
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
        <Heading color="teal.500" className={"capitalize"}>{props.session.date}  |  {props.session.day}</Heading>


        <ul>
          {session.exercises.map((e, idx) => {

            let weight = e.weight ? " (" + e.weight + ") " : " ";

            let exText = e.sets + "x" + e.reps + weight + e.name;
            return <li key={idx}>{exText}</li>
          })}
        </ul>

        <Button marginTop="3rem" h={"fit-content"} w={"fit-content"} onClick={deleteSession} color="red.500" variant="outline">Delete</Button>


      </Card.Body>

    </Card.Root>
  )
}

export default SessionCard