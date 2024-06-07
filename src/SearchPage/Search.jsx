import { useState, useRef, createContext, useEffect, useId } from 'react'
import Navbar from '../Navbar';
import ExerciseCard from './ExerciseCard';
import axios from 'axios';
import key from '../../ApiKey';




export default function Search() {

    const [search, setSearch] = useState(''); 
    const [exercises, setExercises] = useState([]); 
    const [bodyParts, setBodyParts] = useState([]); 


    // TODO: get random exercises instead of alphabetical 
    const optionsExercises = {
        method: 'GET',
        url: 'https://exercisedb.p.rapidapi.com/exercises/bodyPart/back',
        params: {limit: '12'},
        headers: {
          'X-RapidAPI-Key': key,
          'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
        }
      };

      const optionsBodyParts = {
        method: 'GET',
        url: 'https://exercisedb.p.rapidapi.com/exercises/bodyPartList',
        headers: {
          'X-RapidAPI-Key': key,
          'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
        }
      };
   


      // requesting all possible body parts for searching 
      useEffect(() => {
        
        const bodyPartsFunction = async () => {
            try {
                const response = await axios.request(optionsBodyParts);
                let data = await response.data; 
                setBodyParts(b => data); 
                console.log(data)
            } catch(error) {
                console.log(error); 
            }
        }
      
        bodyPartsFunction(); 
      }, []);




    
    // requesting/storing all exercises related to search 
    async function handleSubmit() {

        if (bodyParts.includes(search)) {
            try {
                const response = await axios.request({
                    ...optionsExercises, 
                    url: `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${search}`
                    
                });

                setExercises(b => response.data); 
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        
    }




        const allCards = exercises.map(exercise=> {
            return <ExerciseCard key={exercise.id} exerciseObj={exercise}/>
         
        })
    




    return (


        <>

   
        
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
            
            {allCards}
        </div>
        
        </>


    );
}