// 'use client'
import { Card, Text} from "@chakra-ui/react"




function DisplayExercises(props) {

    const exercises = props.exercises;


    // displays exercises formatted in preview
    function display() {

        let temp = "";

        for (let i = 0; i < exercises.length; i++) {
            const obj = exercises[i];

            // removes weight if 0 
            let weight = " (" + obj.weight + obj.unit + ")";
            if (obj.weight <= 0 || obj.unit === 'bodyweight') {
                weight = " (Bodyweight)";
            }


            temp += obj.sets + "x" + obj.reps + weight + "\n" + obj.name + "\n" + "\n";
        }

        return temp;
    }


    return (

        <>

            <Card.Root width={{ base: "100%", lg: "40%" }} height="50vh" boxShadow="2xl" borderRadius="2xl" border="none" backgroundColor={"#181818"}>
                <Card.Body color="white" overflowY="auto" overflowX="auto" borderRadius="xl">
              
                        <Text textAlign={"left"} color="teal.500">SetsxReps (Weight)</Text>
                        
                        <Text textAlign={"left"} color="teal.500"> Exercise</Text>
                    
                   


                    <br></br>
                    <pre>{display()}</pre>
                </Card.Body>

            </Card.Root>




        </>
    );
}



export default DisplayExercises