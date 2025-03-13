import ExerciseCard from "./ExerciseCard";

import { Button, Text, VStack } from "@chakra-ui/react";
import {
  PopoverArrow,
  PopoverContent,
  PopoverRoot,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import Search from "./Search";

import { fetchSearchExercises } from "../lib/data";

// TODO: change ui to make the "click me " more visible and obvious
export default async function Page(props) {
  const { searchParams: searchParamsPromise } = props || {};
  const searchParams = await searchParamsPromise;

  const query = searchParams?.query;

  const exercises = await fetchSearchExercises(query);

  return (
    <VStack maxWidth={"100vw"} padding="2rem" color="white" gap={5}>
      <Search />

      <PopoverRoot>
        <PopoverTrigger asChild>
          <Button
            size="sm"
            variant="outline"
            color="white"
            backgroundColor="teal.500"
          >
            Click Me!
          </Button>
        </PopoverTrigger>
        <PopoverContent p="5">
          <PopoverArrow />
          <PopoverTitle fontWeight="heavy">Try searching these: </PopoverTitle>
          <Text my="4">
            Back, Cardio, Chest, Lower Arms, Lower Legs, Neck, Shoulders, Upper
            Arms, Upper Legs, Waist, Abductors, Abs, Adductors, Biceps, Calves,
            Cardiovascular System, Delts, Forearms, Glutes, Hamstrings, Lats,
            Levator Scapulae, Pectorals, Quads, Serratus Anterior, Spine, Traps,
            Triceps, Upper Back
          </Text>
        </PopoverContent>
      </PopoverRoot>

      <VStack gap={5}>
        {exercises.map((exercise) => {
          return <ExerciseCard key={exercise.id} exerciseObj={exercise} />;
        })}
      </VStack>
    </VStack>
  );
}
