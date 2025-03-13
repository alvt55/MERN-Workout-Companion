// 'use client'
import { Box, Card, HStack, Text, Button, VStack } from "@chakra-ui/react";

export default function DisplayExercises(props) {
  const exercises = props.exercises;

  // TODO: is this the best practice?
  function edit(e, idx) {
    console.log("hi", e);
    props.functionEdit(e, idx);
  }

  return (
    <>
      <Card.Root
        width={{ base: "100%", lg: "40%" }}
        height="50vh"
        boxShadow="2xl"
        borderRadius="2xl"
        border="none"
        backgroundColor={"#181818"}
      >
        <Card.Body
          color="white"
          overflowY="auto"
          overflowX="auto"
          borderRadius="xl"
        >
          <Text textAlign={"left"} color="teal.500">
            SetsxReps (Weight)
          </Text>

          <Text textAlign={"left"} color="teal.500" mb={5}>
            {" "}
            Exercise
          </Text>

          <ul>
            {exercises.map((e, idx) => {
              let weight = " (" + e.weight + e.unit + ")";
              if (e.weight <= 0 || e.unit === "bodyweight") {
                weight = " (Bodyweight)";
              }

              let temp = e.sets + "x" + e.reps + weight;

              return (
                <HStack key={idx} gap={8} mb={7}>
                  <Button
                    variant="outline"
                    color="teal.500"
                    onClick={() => edit(e, idx)}
                  >
                    Edit
                  </Button>

                  <VStack>
                    <Text>{temp}</Text>
                    <Text>{e.name}</Text>
                  </VStack>
                </HStack>
              );
            })}
          </ul>
        </Card.Body>
      </Card.Root>
    </>
  );
}
