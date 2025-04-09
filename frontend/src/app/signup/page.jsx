"use client";

import Link from "next/link";
import { useState } from "react";
import { Box, Input, Stack, Button, Heading } from "@chakra-ui/react";
import { Field } from "../../components/ui/field";
import { PasswordInput } from "../../components/ui/password-input";

export default function Page() {
  // signup request - triggers error messages if needed
  const signup = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const passConfirm = e.target.confirmpass.value;

    setEmailError("");
    setPasswordError("");

    if (password !== passConfirm) {
      setPasswordError("The passwords you entered do not match");
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}auth/signup`,
        {
          method: "POST",
          body: JSON.stringify({ email, password }),
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      const data = await res.json();

      if (data.errors) {
        setEmailError(data.errors.email);
        setPasswordError(data.errors.password);
      }

      if (data.user) {
        window.location.assign("/tracker");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minH="90vh"
      color="white"
    >
      <form onSubmit={signup}>
        <Heading as="h1" size="2xl">
          Signup
        </Heading>
        <Stack
          gap="4"
          align="flex-start"
          maxW="sm"
          m="3rem 0"
          fontSize={"1.5rem"}
          minW="30vw"
        >
          <Field label="Email">
            <Input
              name="email"
              type="email"
              placeholder="Enter your email"
              required
            />
          </Field>
          {emailError && <Box color="red.500">{emailError}</Box>}

          <Field label="Password">
            <PasswordInput
              name="password"
              type="password"
              placeholder="Enter your password"
              required
            />
          </Field>
          <Field label="Confirm Password">
            <PasswordInput
              name="confirmpass"
              type="password"
              placeholder="Enter your password again"
              required
            />
          </Field>
          {passwordError && <Box color="red.500">{passwordError}</Box>}

          <Button type="submit">Signup</Button>
        </Stack>

        <Link href="/login">Have an account? Login here.</Link>
      </form>
    </Box>
  );
}
