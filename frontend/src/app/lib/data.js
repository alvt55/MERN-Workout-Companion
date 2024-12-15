'use server'
import { redirect } from "next/navigation";

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

const targets = [
    "abductors",
    "abs",
    "adductors",
    "biceps",
    "calves",
    "cardiovascular system",
    "delts",
    "forearms",
    "glutes",
    "hamstrings",
    "lats",
    "levator scapulae",
    "pectorals",
    "quads",
    "serratus anterior",
    "spine",
    "traps",
    "triceps",
    "upper back"
]


export async function fetchSearchExercises(search) {


    if (bodyParts.includes(search)) {
        const url = `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${search}?limit=10&offset=0`;
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': process.env.EXERCISEDB_KEY,
                'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
            }
        };
        const response = await fetch(url, options);
        const result = await response.json();
        return result;
    } else if (targets.includes(search)) {
        const url = `https://exercisedb.p.rapidapi.com/exercises/target/${search}?limit=10&offset=0`;
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': process.env.EXERCISEDB_KEY,
                'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
            }
        };
        const response = await fetch(url, options);
        const result = await response.json();
        return result;
    }
    else {
        console.log('invalid search')
        return [];
    }
}


export async function fetchWorkouts(jwt) {
    console.log(jwt); 

    const response = await fetch(`${process.env.BACKEND_URL}workouts/getWorkouts`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Cookie': `jwt=${jwt.value}`
        }
    })

    const json = await response.json();

    if (json.authError || json.error) {
        // console.log(json.authError);
        redirect('/login');
    } else {
        console.log('fetch workout successful');
        return json; 
    }


}


