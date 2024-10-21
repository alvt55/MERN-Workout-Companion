import { useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Navbar from './Navbar/Navbar'
import Header from './Tracker/Header'
import Exercises from './Tracker/Exercises'
import Sessions from './Tracker/Sessions'
import Search from './SearchPage/Search'

import { useSelector, useDispatch } from 'react-redux'
import { updateDay, updateDate, resetExerciseList } from './SessionSlice'


function App() {


  const day = useSelector(state => state.session.day)
  const date = useSelector(state => state.session.date)
  const exercises = useSelector(state => state.session.exercises)

  const dispatch = useDispatch();
  // const [date, setDate] = useState("");
  // const [day, setDay] = useState("");
  const [sessions, setSessions] = useState([]);


  // fetches sessions from DB
  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('api/workouts') // returns response obj 
      const json = await response.json() // convert obj into js 

      // self note: .parse() is used for JSON strings 

      if (response.ok) {
        setSessions(s => json)
        console.log("setting sessions to ", json)

      }
    }

    fetchWorkouts()
  }, [])


  // data persistence through local storage
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




  // function resetDateDay() {
  //   setDate("");
  //   setDay("");
  // }

  // function updateDate(event) {
  //   setDate(event.target.value);
  // }


  // function updateDay(day) {

  //   // TODO: switch statement unneccessary, just use setDay
  //   switch (day) {
  //     case "Push":
  //       setDay("Push")
  //       break;


  //     case "Pull":
  //       setDay("Pull")
  //       break;

  //     case "Legs":
  //       setDay("Legs")
  //       break;

  //     default:
  //       setDay("")
  //       break;

  //   }
  // }


  // posting workout session to DB using backend API
  async function updateSessions() {


    let dateCapitalized = date.charAt(0).toUpperCase() + date.slice(1);

    const currSession = {
      date: dateCapitalized,
      day: day,
      exercises: exercises
    };

    const response = await fetch('/api/workouts', {
      method: 'POST',
      body: JSON.stringify(currSession),
      headers: {
        'Content-Type': 'application/json'
      }
    })



    if (!response.ok) {
      console.log('failed to post session')
    } else {
      console.log('workout posted')
    }



    console.log(sessions);

   
    // resets all fields for current session in store 
    dispatch(updateDay(""));
    dispatch(updateDate(""));
    dispatch(resetExerciseList()); 

  }








  return (


    
    <BrowserRouter>
      <Navbar />

      <Routes>


        {/* tracker page  */}
        <Route path="/" element={

          <>
            {/* <Header date={date} day={day} updateDate={updateDate} updateDay={updateDay} /> */}
            <Header />
            <Exercises updateSessions={updateSessions} />
            <Sessions sessions={sessions} />
          </>

        } />

        {/* search page */}
        <Route path="/search" element={<Search />} />

      </Routes>
    </BrowserRouter>

    


  );
}

export default App


