"use client";
import { useState, useEffect } from "react";

import { redirect } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

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

import { editWorkoutSession } from "../../lib/actions";
import DisplayExercises from "../DisplayExercises";

// Similar to main trackerpage but for updating workouts
export default function Page() {
  // initial data
  const searchParams = useSearchParams();
  const tempExercises = searchParams.get("exercises");
  const tempFocus = searchParams.get("focus");
  const editID = searchParams.get("id");
  const editExercises = JSON.parse(tempExercises);
  const editFocus = JSON.parse(tempFocus);

  // exercise
  const [exercises, setExercises] = useState([]);
  const [sessionWarning, setSessionWarning] = useState("");
  const [focus, setFocus] = useState();

  const router = useRouter();

  // TODO: make this less messy, maybe use a different way to go to edit mode
  // temporary storage for exercises on device
  useEffect(() => {
    if (editExercises && editID) {
      window.localStorage.setItem("EDIT-ID", editID);
      window.localStorage.setItem("EDIT-FOCUS", editFocus);
      setFocus(editFocus);
      setExercises(editExercises);
      router.replace("/tracker/edit", undefined, { shallow: true });
    } else {
      const data = window.localStorage.getItem("EDIT-EXERCISES");
      const focus = window.localStorage.getItem("EDIT-FOCUS");
      if (data !== null) setExercises(JSON.parse(data));
      if (focus !== null) setFocus(focus);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("EDIT-EXERCISES", JSON.stringify(exercises));
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
  async function editSession(e) {
    e.preventDefault();

    const d = new Date();

    const date = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
    const day = e.target.day.value;

    if (exercises.length === 0) {
      setSessionWarning("Please add at least 1 exercise");
      return;
    }

    let dateCapitalized = date.charAt(0).toUpperCase() + date.slice(1);
    let dayCapitalized = day.charAt(0).toUpperCase() + day.slice(1);

    const id = window.localStorage.getItem("EDIT-ID");

    const currSession = {
      id: JSON.parse(id),
      date: dateCapitalized,
      day: dayCapitalized,
      exercises: exercises,
    };

    const json = await editWorkoutSession(currSession);

    if (json.authError) {
      redirect("/login");
    }

    if (!json) {
      setSessionWarning("Unable to send workout to database");
    } else {
      document.getElementById("sessionForm").reset();
      setSessionWarning("");
      setExercises((s) => []);
      window.localStorage.setItem("EDIT-ID", "");
      window.localStorage.setItem("EDIT-FOCUS", "");
      redirect("/myworkouts");
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
        {/* container for form and display */}
        <Flex
          marginTop="3rem"
          gap="8"
          justify={"space-evenly"}
          width="100%"
          flexDirection={{ base: "column", md: "row" }}
        >
          <form id="exerciseForm" onSubmit={addExercise}>
            <Heading as="h1" size="2xl">
              Edit Workout
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

        <form id="sessionForm" onSubmit={editSession}>
          <VStack gap={5}>
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
                  defaultValue={focus}
                  required
                />
              </InputGroup>
            </Field>

            <Button type="submit">Edit Workout</Button>
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
