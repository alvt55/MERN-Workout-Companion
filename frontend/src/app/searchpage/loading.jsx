import { Spinner, VStack, Text } from '@chakra-ui/react';

export default function loading() {
  return (
    <VStack justify="center" align="center" minH="100vh" spacing={4}>
      <Spinner size="xl" color="blue.500" />
      <Text>Loading...</Text>
    </VStack>
  );
}