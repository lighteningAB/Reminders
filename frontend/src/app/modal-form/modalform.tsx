import { Input, Flex, Box} from "@chakra-ui/react"

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const Form = () => {
  return (
    <Flex minH="100vh" align="center" justify="center">
      <Box width={"50%"}>
        <Input placeholder="Enter your email" mb={4} />
        {days.map((text, idx) => (
          <Input key={idx} placeholder={`Enter your tasks for ${text}` } mb={2}/>
        ))}
      </Box>
    </Flex>
  )
}

export default Form;