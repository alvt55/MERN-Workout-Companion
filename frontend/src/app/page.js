
import { Box, Center, Heading, Text} from "@chakra-ui/react"


// entry point of application 
export default function Page() {



    return (
        <>
            <Box
                bg="blackAlpha.100"
                w="100%"              // Full width of the screen
                h="90vh"             // Full height of the viewport
                display="flex"
                justifyContent="center"
                alignItems="center"
                color="white"         // Text color set to white
            >
                <Center textAlign="center" px={6} >
                    {/* Hero Title */}
                    <Heading as="h1" size="3xl" mb={4} w="30%">
                        Gym Efficiency with <b>GCompanion</b>
                    </Heading>


           


                    {/* Hero Description */}
                    <Text fontSize="xl" mb={6} w="50%">
                        Manage your fitness journey with ease. <b>GCompanion</b> helps organize fitness, your way. 
                    </Text>
                    
                    
                    
                </Center>
                
            </Box>



        </>
    )
}