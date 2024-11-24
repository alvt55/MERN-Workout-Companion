
import { Card, Text} from "@chakra-ui/react"




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

            <Card.Root width={{ base: "100%", lg: "40%" }} height="45vh"  boxShadow="2xl"  borderRadius="2xl" border="none" backgroundColor={"#181818"}>
                <Card.Body color="white" overflowY="auto" overflowX="auto" borderRadius="xl">
                      
                            <Text textAlign={"left"} color="teal.500">Exercises Added</Text>
                            <Text>SetsxReps (Weight) Exercise</Text>
                       
                        <br></br>
                        <pre>{display()}</pre>
                </Card.Body>
          
            </Card.Root>
            

           

        </>
    );
}



export default DisplayExercises