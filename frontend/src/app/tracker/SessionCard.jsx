import { useState, useRef, createContext, useEffect } from 'react'
import styles from '../styles/sessions.module.css'

function SessionCard(props) {


    const session = props.session;
    const day = session.day; 
    const container = styles.sessioncontainer;


    const deleteSession = async ()=> {

        const response = await fetch(`/api/workouts/${session._id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            }
          })

          if (response) {
            console.log("client side delete works")
          } else {
            console.log('client delete null')
          }
    }
//

    // formats session cards 
    return (
        <div className={`${styles.sessioncontainer} ${styles[day]}`}>
            <h3>{props.session.date}: {props.session.day}</h3>

            <ul>
                {session.exercises.map((e, idx) => {

                    let weight = e.weight ? " (" + e.weight + ") " : " ";

                    let exText = e.sets + "x" + e.reps + weight + e.name;
                    return <li key={idx}>{exText}</li>
                })}
            </ul>

            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={deleteSession}> Delete</button>
        </div>
    )
}

export default SessionCard