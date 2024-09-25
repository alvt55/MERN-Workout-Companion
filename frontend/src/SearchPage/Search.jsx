import { useState, useEffect } from 'react'
import ExerciseCard from './ExerciseCard';
import axios from 'axios';
import apikey from '../ApiKey';
import './SearchStyles.css'





export default function Search() {

    const [search, setSearch] = useState('');
    const [exercises, setExercises] = useState([]);
    const [bodyParts, setBodyParts] = useState("");


    // exercises from external exercise API
    const optionsExercises = {
        method: 'GET',
        url: 'https://exercisedb.p.rapidapi.com/exercises/target/abductors',
        params: { limit: '12' },
        headers: {
            'X-RapidAPI-Key': apikey,
            'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
        }
    };

    // list of body parts (used for endpoints)
    const optionsBodyParts = {
        method: 'GET',
        url: 'https://exercisedb.p.rapidapi.com/exercises/targetList',
        headers: {
            'X-RapidAPI-Key': apikey,
            'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
        }
    };



    // requesting all possible body parts for searching 
    // TODO: display this to the user instead of just in the console 
    useEffect(() => {

        const bodyPartsFunction = async () => {
            try {
                const response = await axios.request(optionsBodyParts);
                let data = await response.data;
                setBodyParts(b => data);
                console.log(`Body Parts Include...\n${data}`) // displayed in console for debugging
            } catch (error) {
                console.log(error);
            }
        }

        bodyPartsFunction();
    }, []);


   





    // requesting + storing all exercises related to search 
    async function handleSubmit() {

        if (bodyParts.includes(search)) {
            try {
                const response = await axios.request({
                    ...optionsExercises,
                    url: `https://exercisedb.p.rapidapi.com/exercises/target/${search}`

                });

                setExercises(b => response.data);
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        }

    }



    // returns exercise cards formatted
    const allCards = exercises.map(exercise => {
        return <ExerciseCard key={exercise.id} exerciseObj={exercise} />

    })





    return (


        <div className="search-container">

            <form>

                <div className="label-input" id='search'>
                    <label>Search</label>
                    <input
                        type="text"
                        name="search"
                        onChange={(e) => setSearch(e.target.value.toLowerCase())}
                        value={search} />

                    
                </div>
                <pre>Body Parts Include... {bodyParts}</pre>
            </form>

            <button onClick={handleSubmit}>Submit</button>

            <div className="exercise-cards">
                {allCards}
            </div>

        </div>







    );
}