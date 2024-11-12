
import styles from '../styles/sessions.module.css'
import { redirect } from 'next/navigation'
import { useEffect } from 'react';

import { socket } from '../../socket';

function SessionCard(props) {


  const session = props.session;
  const day = session.day;
  const container = styles.sessioncontainer;


  

  function shareSession() {

    const recievers = ['a@gmail.com']
 
    socket.emit('sharedSession', recievers, session); 
  }


  


  const deleteSession = async () => {

    const response = await fetch(`http://localhost:4000/api/workouts/${session._id}`, {
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
    <div className={`${styles.sessioncontainer} ${styles[day]}`}>
      <h3>{props.session.date}: {props.session.day}</h3>
      <h3>From {props.from}</h3>
      <ul>
        {session.exercises.map((e, idx) => {

          let weight = e.weight ? " (" + e.weight + ") " : " ";

          let exText = e.sets + "x" + e.reps + weight + e.name;
          return <li key={idx}>{exText}</li>
        })}
      </ul>

      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={deleteSession}> Delete</button>
        <button onClick={shareSession}>share</button>
    </div>
  )
}

export default SessionCard