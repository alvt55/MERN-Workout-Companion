"use client";
import { useState, useEffect } from "react";

import { redirect } from "next/navigation";
import { useSearchParams } from "next/navigation";

import {
  VStack,
  Input,
  Button,
  Stack,
  Heading,
  Flex,
  HStack,
} from "@chakra-ui/react";
import { InputGroup } from "@/components/ui/input-group";
import { Field } from "@/components/ui/field";
import {
  NumberInputField,
  NumberInputRoot,
} from "@/components/ui/number-input";
import { Alert } from "@/components/ui/alert";
import { GiWeightLiftingUp } from "react-icons/gi";
import { Radio, RadioGroup } from "@/components/ui/radio";

import { addWorkoutSession } from "../../lib/actions";
import { fetchAWorkout } from "../../lib/data";
import DisplayExercises from "../DisplayExercises";

export default function Page({ params }) {
  const searchParams = useSearchParams();

  // const temp = searchParams.get("exercises");
  // const editExercises = JSON.parse(temp);

  // exercise
  const [exercises, setExercises] = useState([]);
  const [sessionWarning, setSessionWarning] = useState("");

  // temporary storage for exercises on device
  useEffect(() => {
    async function edit() {
      const id = searchParams.get("id");
      console.log("id", id);

      if (id) {
        const result = await fetchAWorkout(id);
        setExercises(result.exercises);
        document.querySelector('input[name="day"]').value = result.day;
        document.querySelector('input[name="date"]').valueAsDate = new Date(
          result.date
        );

        console.log(result);
      }
    }

    edit();

    const data = window.localStorage.getItem("MY_APP_STATE");
    if (data !== null) setExercises(JSON.parse(data));
  }, []);

  useEffect(() => {
    window.localStorage.setItem("MY_APP_STATE", JSON.stringify(exercises));
  }, [exercises]);

  function addExercise(e) {
    e.preventDefault();
    const name = e.target.exerciseName.value;
    const weight = e.target.weight.value;
    const sets = e.target.sets.value;
    const reps = e.target.reps.value;
    const unit = e.target.unit.value;

    let nameCapitalized = name.charAt(0).toUpperCase() + name.slice(1);

    const currExercise = {
      name: nameCapitalized,
      weight,
      sets,
      reps,
      unit,
    };

    setExercises((e) => [...e, currExercise]);

    document.getElementById("exerciseForm").reset();
  }

  // posting workout session to DB using backend API
  async function addSession(e) {
    e.preventDefault();

    const date = new Date(e.target.date.value);
    const day = e.target.day.value;
    const dayCapitalized = day.charAt(0).toUpperCase() + day.slice(1);

    if (exercises.length === 0) {
      setSessionWarning("Please add at least 1 exercise");
      return;
    }

    const currSession = {
      date: date,
      day: dayCapitalized,
      exercises: exercises,
    };

    const json = await addWorkoutSession(currSession);

    if (json.authError) {
      redirect("/login");
    }

    if (!json) {
      setSessionWarning("Unable to send workout to database");
    } else {
      document.getElementById("sessionForm").reset();
      setSessionWarning("");
      setExercises((s) => []);
    }
  }

  // autofills form data with the exercise to be edited
  function editExercise(exercise, idx) {
    const name = document.querySelector('input[name="exerciseName"]');
    const weight = document.querySelector('input[name="weight"]');
    const sets = document.querySelector('input[name="sets"]');
    const reps = document.querySelector('input[name="reps"]');

    // Set the value of the input field
    if (name && weight && sets && reps) {
      name.value = exercise.name;
      weight.value = exercise.weight;
      sets.value = exercise.sets;
      reps.value = exercise.reps;

      const tempArr = [...exercises];
      tempArr.splice(idx, 1);
      setExercises(tempArr);
    }
  }

  return (
    <>
      <VStack gap="12" width="100vw" color="white" padding="2rem">
        <Flex
          marginTop="3rem"
          gap="8"
          justify={"space-evenly"}
          width="100%"
          flexDirection={{ base: "column", md: "row" }}
        >
          <form id="exerciseForm" onSubmit={addExercise}>
            <Heading as="h1" size="2xl">
              Add Exercises Here
            </Heading>
            <Stack
              gap="4"
              align="flex-start"
              maxW="sm"
              fontSize={"1.5rem"}
              minW="30vw"
              color="white"
            >
              <Field label="Exercise name">
                <Input name="exerciseName" type="text" required />
              </Field>

              <Field label="Weight">
                <NumberInputRoot defaultValue="1" width="200px">
                  <NumberInputField name="weight" />
                </NumberInputRoot>

                <RadioGroup defaultValue="lbs" name="unit" required>
                  <HStack gap="6">
                    <Radio value="lbs">Lbs</Radio>
                    <Radio value="kg">Kgs</Radio>
                    <Radio value="bodyweight">Bodyweight</Radio>
                  </HStack>
                </RadioGroup>
              </Field>

              <Field label="Sets">
                <NumberInputRoot defaultValue="1" width="200px" required>
                  <NumberInputField name="sets" />
                </NumberInputRoot>
              </Field>
              <Field label="Reps">
                <NumberInputRoot defaultValue="1" width="200px" required>
                  <NumberInputField name="reps" />
                </NumberInputRoot>
              </Field>

              <Button type="submit">Add Exercise</Button>
            </Stack>
          </form>

          <DisplayExercises
            exercises={exercises}
            functionEdit={editExercise}
          ></DisplayExercises>
        </Flex>

        <form id="sessionForm" onSubmit={addSession}>
          <VStack gap={5}>
            <Field label="Date">
              <Input name="date" type="date" required />
            </Field>
            <Field label="What did we focus on today?">
              <InputGroup
                flex="1"
                startElement={<GiWeightLiftingUp />}
                color="white"
                width={{ base: "80vw", md: "30vw" }}
              >
                <Input
                  name="day"
                  ps="4.75em"
                  placeholder="e.g. cardio, back/chest, legs "
                  required
                />
              </InputGroup>
            </Field>

            <Button type="submit">Finish Workout</Button>
            {sessionWarning ? (
              <Alert status="info" title={sessionWarning} />
            ) : (
              <p></p>
            )}
          </VStack>
        </form>
      </VStack>
    </>
  );
}
