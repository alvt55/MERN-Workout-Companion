
import styles from '../styles/sessions.module.css'
import { redirect } from 'next/navigation'
import { Card, Heading, Image, HStack } from '@chakra-ui/react';


function SessionCard(props) {


  const session = props.session;
  const day = session.day;




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


    <Card.Root width="30%" height="50%" boxShadow="2xl" borderRadius="2xl" border="none" backgroundColor={"#181818"}>
      <Card.Body color="white" borderRadius="xl">
        <Heading color="teal.500" className={"capitalize"}>{props.session.date}  |  {props.session.day}</Heading>
       

          <ul>
            {session.exercises.map((e, idx) => {

              let weight = e.weight ? " (" + e.weight + ") " : " ";

              let exText = e.sets + "x" + e.reps + weight + e.name;
              return <li key={idx}>{exText}</li>
            })}
          </ul>

      
      </Card.Body>

    </Card.Root>

    // <div className={`${styles.sessioncontainer} ${styles[day]}`}>
    //   <h3>{props.session.date}: {props.session.day}</h3>

    //   <ul>
    //     {session.exercises.map((e, idx) => {

    //       let weight = e.weight ? " (" + e.weight + ") " : " ";

    //       let exText = e.sets + "x" + e.reps + weight + e.name;
    //       return <li key={idx}>{exText}</li>
    //     })}
    //   </ul>

    //   <button onClick={deleteSession}> Delete</button>
    // </div>
  )
}

export default SessionCard