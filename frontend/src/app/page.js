
import { Box, Center, Heading, Text } from "@chakra-ui/react"


// entry point of application 
export default function Page() {



    return (
        <>
            <Box
                bg="blackAlpha.100"
                maxWidth="100%"
                h="90vh"
                display="flex"
                justifyContent="center"
                alignItems="center"
                color="white" 
                overflowX="hidden"
                overflowY="hidden"
                >
                <Center textAlign="center" px={6} flexDirection={{ base: "column", md: "row" }} gap={5}>

                    <Heading as="h1" size="3xl" mb={4} w={{ base: "70%", md: "30%" }}>
                        Gym Efficiency with <b>GCompanion</b>
                    </Heading>

                    <Text fontSize="xl" mb={6} w="50%">
                        Manage your fitness journey with ease. <b>GCompanion</b> helps organize fitness, your way.
                    </Text>

                </Center>

            </Box>



        </>
    )
}