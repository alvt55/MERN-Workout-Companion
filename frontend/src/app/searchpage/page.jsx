'use client'

import { useState } from 'react'
import ExerciseCard from './ExerciseCard';

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
                const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}search/getExercises?bodyPart=${search}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })

                const json = await response.json();
                console.log("this is json.data", json)
                setExercises(json);


                setSearchError('');        
            } catch (error) {
                setSearchError('Could not fetch exercises', error);
            }
        } else {
            setSearchError('Please enter a valid search');
        }

        // const url = `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${search}?limit=10&offset=0`;
        // const options = {
        //   method: 'GET',
        //   headers: {
        //     'x-rapidapi-key': process.env.EXERCISEDB_KEY,
        //     'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
        //   }
        // };

        
        // const response = await fetch(url, options);
        // const result = await response.json();

        // console.log(result)

        // if (response.error) {
        //     console.log(response.error); 
        // } else {
        //     setExercises(result); 
        // }
      
        // document.getElementById('myForm').reset();
    };



    console.log('exercises', exercises)


    // returns exercise cards formatted

  
        const allCards = exercises.map(exercise => {
            return <ExerciseCard key={exercise.id} exerciseObj={exercise} />
    
        })
   
    






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









    );
}