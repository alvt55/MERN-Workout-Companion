'use client'
import { redirect } from 'next/navigation'
import { Card, Heading, Button, Text } from '@chakra-ui/react';
import { socket } from './socket';


export default function FriendCard(props) {


    const session = props.session;

    




    return (


        <Card.Root w="80vw" height="50%" boxShadow="2xl" borderRadius="2xl" border="none" backgroundColor={"#181818"}>
            <Card.Body color="white" borderRadius="xl">
                <Text color="white" marginBottom={4}>From {session.email}</Text>
                <Heading color="teal.500" className={"capitalize"} marginBottom={2}>{session.date}  |  {session.day}</Heading>




                <ul>
                    {session.exercises.map((e, idx) => {



                        let weight = " (" + e.weight + e.unit + ")";
                        if (e.weight <= 0 || e.unit === 'bodyweight') {
                            weight = " (Bodyweight)";
                        }

                        let firstLine = e.sets + "x" + e.reps + weight;
                        return <span key={idx}><li key={idx}>{firstLine}<br></br> {e.name}</li> <br></br> </span>
                    })}
                </ul>

                {/* <Button marginTop="3rem" h={"fit-content"} w={"fit-content"} onClick={} color="red.500" variant="outline">Delete</Button> */}


            </Card.Body>

        </Card.Root>
    )
}

