
import { Card, Text } from "@chakra-ui/react"




function DisplayExercises(props) {

    const exercises = props.exercises;


    // displays exercises formatted in preview
    function display() {

        let temp = "";

        for (let i = 0; i < exercises.length; i++) {
            const obj = exercises[i];

            // removes weight if 0 
            let weight = " (" + obj.weight + "lbs) ";
            if (obj.weight <= 0) {
                weight = " ";
            }


            temp += obj.sets + "x" + obj.reps + weight + obj.name + "\n";
        }

        return temp;
    }


    return (

        <>

            <Card.Root width="25%" height="50vh"  boxShadow="2xl"  borderRadius="2xl" border="none" backgroundColor={"#181818"}>
                <Card.Body  color="white" overflowY="auto" borderRadius="xl">

                        <Text color="teal.500">SetsxReps (Weight) Exercise</Text>
                        <pre>{display()}</pre>
                </Card.Body>
          
            </Card.Root>
            

           

        </>
    );
}



export default DisplayExercises