'use client'

import { useState } from 'react'
import ExerciseCard from './ExerciseCard';
import axios from 'axios';

import styles from '../styles/searchpage.module.css'





export default function Page() {

    const [search, setSearch] = useState('');
    const [exercises, setExercises] = useState([]);

    const bodyParts = [
        "back",
        "cardio",
        "chest",
        "lower arms",
        "lower legs",
        "neck",
        "shoulders",
        "upper arms",
        "upper legs",
        "waist"
    ];

    const [searchError, setSearchError] = useState(''); 



    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const search = e.target.search.value;
    
        if (bodyParts.includes(search.toLowerCase())) {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}search/getExercises?bodyPart=${search}`);
                setExercises(response.data);
                setSearchError('');
            } catch (error) {
                setSearchError('Could not fetch exercises');
            }
        } else {
            setSearchError('Please enter a valid search');
        }
    
        document.getElementById('myform').reset();
    };
    




    // returns exercise cards formatted
    const allCards = exercises.map(exercise => {
        return <ExerciseCard key={exercise.id} exerciseObj={exercise} />

    })





    return (


        <div className={styles.container}>

            <form onSubmit={handleSubmit} id="myform">
                <div className={styles.labelinput}>
                    <label>Search</label>
                    <input
                        type="text"
                        name="search"
                        required />


                </div>
                <h1>Available search inputs: </h1>
                <p>
                    Back Cardio Chest Lower Arms Lower Legs Neck Shoulders Upper Arms Upper Legs Waist
                </p>
                <button type="submit">Submit</button>
                <p className="searchError">{searchError}</p>
            </form>

            {allCards}
        </div>







    );
}