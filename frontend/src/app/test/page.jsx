"use client";

import { Stack } from "@chakra-ui/react";

export default function Page() {
  return (
    <Stack>
      <label htmlFor="birthday">Birthday:</label>
      <input
        type="date"
        id="birthday"
        name="birthday"
        onChange={(e) => console.log(e.target.value)}
      />
    </Stack>
  );
}
