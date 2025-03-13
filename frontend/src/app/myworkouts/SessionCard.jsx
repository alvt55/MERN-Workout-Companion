"use client";

import { Card, Heading, Button } from "@chakra-ui/react";
import { deleteWorkoutSession } from "../lib/actions";
import {
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverRoot,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";

import Link from "next/link";

function SessionCard(props) {
  const session = props.session;

  async function deleteSession() {
    const res = await deleteWorkoutSession(session._id);
  }

  // console.log(props.session.date);

  const dateObj = new Date(session.date);
  const dateString = dateObj.toLocaleDateString();

  // formats session cards
  return (
    <Card.Root
      w="80vw"
      height="50%"
      boxShadow="2xl"
      borderRadius="2xl"
      border="none"
      backgroundColor={"#181818"}
    >
      <Card.Body color="white" borderRadius="xl">
        <Heading color="teal.500" className={"capitalize"} marginBottom={2}>
          {dateString} | {props.session.day}
        </Heading>

        <ul>
          {session.exercises.map((e, idx) => {
            let weight = " (" + e.weight + e.unit + ")";
            if (e.weight <= 0 || e.unit === "bodyweight") {
              weight = " (Bodyweight)";
            }

            let firstLine = e.sets + "x" + e.reps + weight;
            return (
              <span key={idx}>
                <li key={idx}>
                  {firstLine}
                  <br></br> {e.name}
                </li>{" "}
                <br></br>{" "}
              </span>
            );
          })}
        </ul>

        {/* delete popover and button */}
        <PopoverRoot color="white">
          <PopoverTrigger asChild>
            <Button
              size="xs"
              w="25%"
              p="1"
              h="fit-content"
              variant="outline"
              color="white"
              backgroundColor="red.500"
            >
              Delete
            </Button>
          </PopoverTrigger>
          <PopoverContent p="5" backgroundColor="#1f1f1d" color="white">
            <PopoverArrow backgroundColor="#1f1f1d" />
            <PopoverTitle fontWeight="heavy">Confirm Delete?</PopoverTitle>

            <Button
              marginTop="3rem"
              h={"fit-content"}
              w={"fit-content"}
              onClick={deleteSession}
              color="red.500"
              variant="outline"
            >
              Delete
            </Button>
          </PopoverContent>
        </PopoverRoot>
        {console.log(session)}
        <Link
          href={{
            pathname: "/tracker/edit",
            query: {
              id: JSON.stringify(session._id),
              exercises: JSON.stringify(session.exercises),
              focus: JSON.stringify(session.day),
            },
          }}
        >
          Edit
        </Link>
      </Card.Body>
    </Card.Root>
  );
}

export default SessionCard;
