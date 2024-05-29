import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import Header from './Header'
import Exercises from './Exercises'
import Sessions from './Sessions'
import './index.css'


function App() {


  const [date, setDate] = useState("");
  const [day, setDay] = useState("");
  const [sessions, setSessions] = useState([]);


  // load
  useEffect(() => {
    const data = localStorage.getItem('my_sessions');
    if (data !== null) {
      setSessions(JSON.parse(data));
      console.log(sessions);
    }
  }, []);


  // save 
  useEffect(() => {
    localStorage.setItem("my_sessions", JSON.stringify(sessions));
  }, [sessions]);




  function resetDateDay() {
    setDate("");
    setDay("");
  }

  function updateDate(event) {
    setDate(event.target.value);
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


  // TODO: refine UML diagram

  return (

    <>
      <Header date={date} day={day} updateDate={updateDate}
        updateDay={updateDay}></Header>
      <Exercises
        updateSessions={updateSessions} date={date} day={day}></Exercises>
      <Sessions sessions={sessions}></Sessions>
    </>
  );
}

export default App
