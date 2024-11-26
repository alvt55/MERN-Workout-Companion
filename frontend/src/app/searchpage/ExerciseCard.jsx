"use client"
import { Card, Heading, Flex, Image} from '@chakra-ui/react';


export default function ExerciseCard(props) {


    const name = props.exerciseObj.name;

    // formats the instructions for the exercise card from API
    const steps = props.exerciseObj.instructions.map((i, idx) => {
        return <li key={idx}>{i}</li>
    })

    return (

        <Card.Root width="100%" height={{ base: "50%", md: "50%" }} boxShadow="2xl" borderRadius="2xl" border="none" backgroundColor={"#181818"}>
            <Card.Body color="white" borderRadius="xl">
                <Heading color="teal.500" className={"capitalize"}>{name}</Heading>
                <Flex marginTop="2rem" gap="8" width="100%" flexDirection={{ base: "column", md: "row" }}>


                    <Image height={{ base: "30%", md: "40%" }} src={props.exerciseObj.gifUrl} alt="" />
                    <ol>
                        {steps}
                    </ol>
                </Flex>
            </Card.Body>

        </Card.Root>
     

    );
}