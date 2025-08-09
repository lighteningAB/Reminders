import { Heading, Box, Flex } from "@chakra-ui/react"
import DayBlock from "./DayBlock";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];


const LandingPage = () => {
  return(
    <Flex width ={"100%"} align="center" justify={"center"} mt="5%" direction="column">
      <Box mb={4} border = "1px solid red" padding = "3%" width = "50%" display="flex" justifyContent="center" alignItems="center" borderRadius="30" >
        <Heading>Email Reminders</Heading>
      </Box>
      <Box mb={4} border = "1px solid red" padding = "1%" width = "80%" borderRadius="30" >
        <Heading size="md">Your Weekly Schedule: </Heading>
        <Flex direction="row">
          {days.map((day, idx) => (
            <DayBlock day={day} key = {idx} width = "25%"/>
          ))}
        </Flex>
      </Box>
      <Box mb={4} border = "1px solid red" padding = "1%" width = "80%" borderRadius="30">
        <Heading size="md">Special Tasks: </Heading>
      </Box>
    </Flex>
  )
}

export default LandingPage;