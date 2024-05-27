import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import SessionFirst from './SessionFirst'
import Exercises from './Exercises'
import './index.css'


function App() {

  
  const [date, setDate] = useState("");
  const [day, setDay] = useState("");
  const [sessions, setSessions] = useState([]);


  // loading data every render 
  useEffect(() => {
    const data = localStorage.getItem('my_sessions');
    if (data !== null) {
      setSessions(JSON.parse(data));
      console.log(sessions);
    }
  }, []);


  // saving sessions to "my_sessions" everytime sessions changes 
  useEffect(() => {
    localStorage.setItem("my_sessions", JSON.stringify(sessions));
  }, [sessions]);
  


 
  function resetDateDay() {
    setDate("");
    setDay("");
  }

  function updateDate(event) {
    setDate(event.target.value);
    console.log(date)
  }


  function updateDay(day) {

    switch (day) {
      case "Push":
        setDay("Push")
        break;

      case "Pull":
        setDay("Pull")
        break;

      case "Legs":
        setDay("Legs")
        break;

    }
  }

  function updateSessions(exercises) {


    // capitalize first letter of date
    let dateCapitalized = date.charAt(0).toUpperCase() + date.slice(1);

    const currSession = {
      date: dateCapitalized,
      day: day,
      exercises: exercises
    };

    setSessions(s => [...s, currSession]);
    console.log(sessions);

    resetDateDay()
  }


  return (

    <>
      <SessionFirst date={date} day={day} updateDate={updateDate}
        updateDay={updateDay}></SessionFirst>
      <Exercises 
       updateSessions={updateSessions}></Exercises>
       {/* refactor sessions and cards  */}
    </>
  );
}

export default App
