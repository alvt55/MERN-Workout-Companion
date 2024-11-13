'use client'

import { useState, useEffect } from 'react'
import ExerciseCard from './ExerciseCard';
import axios from 'axios';

import styles from '../styles/searchpage.module.css'





export default function Page() {

    const [search, setSearch] = useState('');
    const [exercises, setExercises] = useState([]);
    const [bodyParts, setBodyParts] = useState([]);


    // exercises from external exercise API
    const optionsExercises = {
        method: 'GET',
        url: 'https://exercisedb.p.rapidapi.com/exercises/target/abductors',
        params: { limit: '12' },
        headers: {
            'X-RapidAPI-Key': process.env.NEXT_PUBLIC_EXERCISEDB_KEY,
            'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
        }
    };

    // list of body parts (used for endpoints)
    const optionsBodyParts = {
        method: 'GET',
        url: 'https://exercisedb.p.rapidapi.com/exercises/targetList',
        headers: {
            'X-RapidAPI-Key': process.env.NEXT_PUBLIC_EXERCISEDB_KEY,
            'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
        }
    };



    // requesting all possible body parts for searching 
    useEffect(() => {

        const bodyPartsFunction = async () => {
            try {
                const response = await axios.request(optionsBodyParts);
                let data = await response.data;
                setBodyParts(data);
                console.log(`Body Parts Include...\n${data}`) // displayed in console for debugging
            } catch (error) {
                console.log(error);
            }
        }

        bodyPartsFunction();
    }, []);


    const displayBodyParts = bodyParts.map((i, idx) => {


        // removes comma from last element
        if (idx !== bodyParts.length - 1) {

            return i + ", ";
        }

        return i;
    })



    // requesting + storing all exercises related to search 
    async function handleSubmit() {
        console.log("trying")

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

        
            <div className={styles.container}>

                <form>
                    <div className={styles.labelinput}>
                        <label>Search</label>
                        <input
                            type="text"
                            name="search"
                            onChange={(e) => setSearch(e.target.value.toLowerCase())}
                            value={search} />


                    </div>
                    <h1>Available search inputs: </h1>
                    {displayBodyParts}
                </form>

                <button onClick={handleSubmit}>Submit</button>

                {allCards}
            </div>



        



    );
}