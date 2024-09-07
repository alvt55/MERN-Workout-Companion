import { useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Navbar from './Navbar'
import Header from './Tracker/Header'
import Exercises from './Tracker/Exercises'
import Sessions from './Tracker/Sessions'
import Search from './SearchPage/Search'

function App() {

  // TODO: 
  // figure out json console error 
  // do fetch/post data 
  // save this to org repo 
  
  const [date, setDate] = useState("");
  const [day, setDay] = useState("");
  const [sessions, setSessions] = useState([]); 


  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('api/workouts')
      const json = await response.json()

      if (response.ok) {
        setSessions(s => json)
        console.log("setting sessions")
        console.log(json)
                
      }
    }

    fetchWorkouts()
  }, [])


  // // load
  // useEffect(() => {
  //   const data = localStorage.getItem('my_sessions');
  //   if (data !== null) {
  //     setSessions(JSON.parse(data));
  //     console.log(sessions);
  //   }
  // }, []);


  // // save 
  // useEffect(() => {
  //   localStorage.setItem("my_sessions", JSON.stringify(sessions));
  // }, [sessions]);




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

      default:
        setDay("")
        break; 

    }
  }


  async function updateSessions(exercises) {

    

    let dateCapitalized = date.charAt(0).toUpperCase() + date.slice(1);

    const currSession = {
      date: dateCapitalized,
      day: day,
      exercises: exercises
    };

    const response = await fetch('/api/workouts', {
      method: 'POST',
      body: JSON.stringify(currSession), // change this? 
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json()

    console.log("checkpoint")

    if (!response.ok) {
      console.log('failed to post session')
    } else {
      console.log('workout posted')
    }
    

    
    console.log(sessions);

    resetDateDay()
  }



 
 



  return (

<BrowserRouter>
<Navbar/>
    <Routes>

      <Route path="/" element={

        <>
           
          <Header date={date} day={day} updateDate={updateDate}
            updateDay={updateDay} />
          <Exercises
            updateSessions={updateSessions} date={date} day={day}/>
          <Sessions sessions={sessions}/>

        </>


      } />

      <Route path="/search" element={ <Search/>} />

    </Routes>
</BrowserRouter>


  );
}

export default App


