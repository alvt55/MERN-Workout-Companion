'use client'

import { useState } from 'react'
import ExerciseCard from './ExerciseCard';
import axios from 'axios';

import { Box, Input, Stack, Button, Heading, Text, VStack } from '@chakra-ui/react';
import { Field } from "../../components/ui/field"





export default function Page() {
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

        document.getElementById('myForm').reset();
    };





    // returns exercise cards formatted
    const allCards = exercises.map(exercise => {
        return <ExerciseCard key={exercise.id} exerciseObj={exercise} />

    })



    // TODO: detect no cookies



    return (

        <VStack maxWidth={"100vw"} padding="2rem">

            <Box display="flex" justifyContent="center" alignItems="center" minH="50vh" color="white">

                <form id="myForm" onSubmit={handleSubmit}>
                    <Heading as="h1" size="2xl">Find Exercises</Heading>
                    <Text>Try these: </Text>
                    <Text color="teal.500">Back, Cardio, Chest, Lower Arms, Lower Legs, Neck, Shoulders, Upper Arms, Upper Legs, Waist</Text>
                    <Stack gap="4" align="flex-start" maxW="sm" m="3rem 0" fontSize={'1.5rem'} minW="30vw">

                        <Field label="Search">
                            <Input name="search" placeholder="What are we looking for?" required />
                        </Field>
                        {searchError && <Box color="red.500">{searchError}</Box>}

                        <Button type="submit">Search</Button>
                    </Stack>
                </form>

            </Box>


            <VStack gap={5}>
                {allCards}
            </VStack>

        </VStack>


        // <div className={styles.container}>

        //     <form onSubmit={handleSubmit} id="myform">
        //         <div className={styles.labelinput}>
        //             <label>Search</label>
        //             <input
        //                 type="text"
        //                 name="search"
        //                 required />


        //         </div>
        //         <h1>Available search inputs: </h1>
        //         <p>
        //             Back Cardio Chest Lower Arms Lower Legs Neck Shoulders Upper Arms Upper Legs Waist
        //         </p>
        //         <button type="submit">Submit</button>
        //         <p className="searchError">{searchError}</p>
        //     </form>

        //     {allCards}
        // </div>







    );
}