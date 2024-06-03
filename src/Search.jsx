import { useState, useRef, createContext, useEffect, useId } from 'react'
import { Link, Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import axios from 'axios';


export default function Search() {

    const [search, setSearch] = useState(''); 
    const [exercises, setExercises] = useState([]); 
    const [bodyParts, setBodyParts] = useState([]); 

    const optionsExercises = {
        method: 'GET',
        url: 'https://exercisedb.p.rapidapi.com/exercises/bodyPart/back',
        params: {limit: '8'},
        headers: {
          'X-RapidAPI-Key': '', // TODO: hide this key 
          'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
        }
      };

      const optionsBodyParts = {
        method: 'GET',
        url: 'https://exercisedb.p.rapidapi.com/exercises/bodyPartList',
        headers: {
          'X-RapidAPI-Key': '',
          'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
        }
      };
   

      useEffect(() => {
        

        const bodyPartsFunction = async () => {
            try {
                const response = await axios.request(optionsBodyParts);
                let data = await response.data; 
                setBodyParts(b => data); 
            } catch(error) {
                console.log(error); 
            }
        }
      
        bodyPartsFunction(); 
      }, []);


    async function handleSubmit() {

        if (bodyParts.includes(search)) {
            try {
                const response = await axios.request({
                    ...optionsExercises, 
                    url: `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${search}`
                    
                });

                setBodyParts(b => response); 
                
            } catch (error) {
                console.error(error);
            }
        }
        
    }


    function createExerciseCards() {

        const allCards = exercises.map((exercise, idx) => {
            return // TODO: create cards for each exercise with gifs 
        })
    }





    return (


        <>

        <Navbar></Navbar>
        
        <form>
            <input
                type="text"
                name="search"
                onChange={(e) => setSearch(e.target.value.toLowerCase())}
                value={search}
            />
            
        </form>
        <button onClick={handleSubmit}>Submit</button>

        <div className="exercise-cards">
            <h1>exercise cards go here</h1>

        </div>

        </>


    );
}